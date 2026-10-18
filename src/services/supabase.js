import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mwtaebvqlputoadjfowv.supabase.co';
const STORED_KEY = localStorage.getItem('summitpath_supabase_anon_key');
const DEFAULT_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || STORED_KEY || '';

let supabaseInstance = null;

export const initSupabase = (customKey) => {
  const key = customKey || DEFAULT_ANON_KEY;
  if (!key) {
    supabaseInstance = null;
    return null;
  }
  try {
    supabaseInstance = createClient(DEFAULT_SUPABASE_URL, key);
    if (customKey) {
      localStorage.setItem('summitpath_supabase_anon_key', customKey);
    }
    return supabaseInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const getSupabase = () => {
  if (!supabaseInstance && DEFAULT_ANON_KEY) {
    initSupabase();
  }
  return supabaseInstance;
};

export const isSupabaseConfigured = () => {
  return Boolean(getSupabase());
};

export const SUPABASE_PROJECT_REF = 'mwtaebvqlputoadjfowv';
export const SUPABASE_URL = DEFAULT_SUPABASE_URL;

export const SUPABASE_SCHEMA_SQL = `-- SummitPath Hiking Trail Explorer Database Schema
-- Run this in your Supabase SQL Editor (Project ref: mwtaebvqlputoadjfowv)

-- 1. Create table for user bookmarks/favorites
create table if not exists public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  trail_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create table for completed hike logbook
create table if not exists public.completed_hikes (
  id uuid default gen_random_uuid() primary key,
  trail_id text not null,
  trail_name text not null,
  completed_date date not null default current_date,
  duration_minutes integer,
  elevation_gain_m integer,
  distance_km numeric(5,2),
  rating integer check (rating >= 1 and rating <= 5),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create table for community reviews
create table if not exists public.trail_reviews (
  id uuid default gen_random_uuid() primary key,
  trail_id text not null,
  author_name text not null default 'Hiker',
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  hike_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) with public access policy for demo app
alter table public.bookmarks enable row level security;
alter table public.completed_hikes enable row level security;
alter table public.trail_reviews enable row level security;

create policy "Allow public read/write bookmarks" on public.bookmarks
  for all using (true) with check (true);

create policy "Allow public read/write completed_hikes" on public.completed_hikes
  for all using (true) with check (true);

create policy "Allow public read/write trail_reviews" on public.trail_reviews
  for all using (true) with check (true);
`;

// Helper data persistence with local storage fallback
export const storageService = {
  // Bookmarks
  async getBookmarks() {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('bookmarks').select('*');
        if (!error && data) {
          const ids = data.map(b => b.trail_id);
          localStorage.setItem('summitpath_bookmarks', JSON.stringify(ids));
          return ids;
        }
      } catch (e) {
        console.warn('Supabase fetch bookmarks error, using local:', e);
      }
    }
    const local = localStorage.getItem('summitpath_bookmarks');
    return local ? JSON.parse(local) : ['half-dome', 'fitz-roy'];
  },

  async toggleBookmark(trailId, isBookmarked) {
    const supabase = getSupabase();
    let current = await this.getBookmarks();
    if (isBookmarked) {
      current = current.filter(id => id !== trailId);
      if (supabase) {
        try {
          await supabase.from('bookmarks').delete().eq('trail_id', trailId);
        } catch (e) { console.warn(e); }
      }
    } else {
      if (!current.includes(trailId)) current.push(trailId);
      if (supabase) {
        try {
          await supabase.from('bookmarks').insert([{ trail_id: trailId }]);
        } catch (e) { console.warn(e); }
      }
    }
    localStorage.setItem('summitpath_bookmarks', JSON.stringify(current));
    return current;
  },

  // Completed hikes
  async getCompletedHikes() {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('completed_hikes')
          .select('*')
          .order('completed_date', { ascending: false });
        if (!error && data) {
          localStorage.setItem('summitpath_completed_hikes', JSON.stringify(data));
          return data;
        }
      } catch (e) {
        console.warn('Supabase fetch completed hikes error:', e);
      }
    }
    const local = localStorage.getItem('summitpath_completed_hikes');
    return local ? JSON.parse(local) : [
      {
        id: 'sample-1',
        trail_id: 'mont-blanc',
        trail_name: 'Tour du Mont Blanc (High Alpine Section)',
        completed_date: '2026-08-14',
        duration_minutes: 390,
        elevation_gain_m: 1050,
        distance_km: 18.2,
        rating: 5,
        notes: 'Incredible clear day at Lac Blanc! Mountain goats near the refugio.'
      }
    ];
  },

  async logCompletedHike(hike) {
    const newHike = {
      id: crypto.randomUUID(),
      ...hike,
      created_at: new Date().toISOString()
    };
    const current = await this.getCompletedHikes();
    const updated = [newHike, ...current];
    localStorage.setItem('summitpath_completed_hikes', JSON.stringify(updated));

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('completed_hikes').insert([newHike]);
      } catch (e) {
        console.warn('Could not sync hike to Supabase:', e);
      }
    }
    return updated;
  },

  // Reviews
  async getReviews(trailId) {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('trail_reviews')
          .select('*')
          .eq('trail_id', trailId)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {
        console.warn('Supabase fetch reviews error:', e);
      }
    }
    const local = localStorage.getItem(`summitpath_reviews_${trailId}`);
    return local ? JSON.parse(local) : null;
  },

  async addReview(review) {
    const newReview = {
      id: crypto.randomUUID(),
      ...review,
      created_at: new Date().toISOString()
    };
    const localKey = `summitpath_reviews_${review.trail_id}`;
    const local = localStorage.getItem(localKey);
    const list = local ? JSON.parse(local) : [];
    const updated = [newReview, ...list];
    localStorage.setItem(localKey, JSON.stringify(updated));

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('trail_reviews').insert([newReview]);
      } catch (e) {
        console.warn('Supabase save review error:', e);
      }
    }
    return updated;
  }
};
