export const TRAILS_DATA = [
  {
    id: 'half-dome',
    name: 'Half Dome Cables Route',
    park: 'Yosemite National Park',
    location: 'California, USA',
    region: 'North America',
    difficulty: 'Strenuous',
    distanceKm: 25.7,
    elevationGainM: 1463,
    peakElevationM: 2694,
    routeType: 'Out & Back',
    estimatedHours: '10 - 12 hrs',
    rating: 4.9,
    reviewCount: 1420,
    bestSeason: 'May - October',
    permitRequired: true,
    dogFriendly: false,
    kidFriendly: false,
    heroImage: '/images/trails/half-dome.jpg',
    tags: ['Summit', 'Waterfalls', 'Cables', 'Granite', 'Historic'],
    description: 'One of the most iconic and demanding day hikes on the planet. Starting from Happy Isles in Yosemite Valley, you climb past the thundering mist of Vernal Fall and Nevada Fall, weave through Little Yosemite Valley, and scramble up the steep granite slope of Sub-Dome before tackling the spine-chilling 400-foot cable climb to the flat summit of Half Dome.',
    highlights: [
      'Ascend the famous Vernal Fall Mist Trail stairs',
      'Panoramic 360° views across Yosemite Valley, Cloud\'s Rest, and the High Sierra',
      'Adrenaline-inducing cable pitch on sheer 45-degree slick granite',
      'Ancient glacial erratic boulders perched atop the monolith'
    ],
    weather: {
      tempC: 16,
      condition: 'Partly Cloudy',
      windSpeedKmh: 14,
      uvIndex: 'High (8)',
      alert: 'Thunderstorm watch: Be off the summit cables before 1:00 PM if dark clouds build.'
    },
    gearChecklist: [
      { item: 'High-traction work gloves (essential for steel cables)', essential: true },
      { item: '4 Liters of drinking water + electrolyte tablets', essential: true },
      { item: 'Portable water filter (for Little Yosemite Valley river)', essential: true },
      { item: 'Sturdy high-traction hiking boots with vibram soles', essential: true },
      { item: 'Headlamp with extra batteries (for pre-dawn 4 AM start)', essential: true },
      { item: 'National Park Wilderness / Half Dome Permit printout', essential: true },
      { item: 'Compact rain shell and wind-blocking outer layer', essential: false },
      { item: 'High-energy trail snacks (nuts, dates, jerky, bars)', essential: false }
    ],
    coordinates: {
      center: [37.7400, -119.5380],
      zoom: 13,
      path: [
        [37.7327, -119.5583], // Happy Isles Trailhead
        [37.7315, -119.5530],
        [37.7290, -119.5475],
        [37.7275, -119.5439], // Vernal Fall Footbridge
        [37.7270, -119.5410], // Top of Vernal Fall
        [37.7260, -119.5370],
        [37.7249, -119.5332], // Nevada Fall
        [37.7280, -119.5240],
        [37.7320, -119.5160], // Little Yosemite Valley
        [37.7360, -119.5200],
        [37.7400, -119.5260],
        [37.7445, -119.5320], // Base of Sub Dome
        [37.7452, -119.5326], // Sub Dome Peak
        [37.7460, -119.5331]  // Half Dome Summit
      ]
    },
    waypoints: [
      { name: 'Happy Isles Trailhead', coords: [37.7327, -119.5583], type: 'trailhead', elevation: 1230, note: 'Shuttle stop #16, water refill station, restrooms' },
      { name: 'Vernal Fall Footbridge', coords: [37.7275, -119.5439], type: 'water', elevation: 1530, note: 'Spectacular view of Vernal Fall waterfall mist' },
      { name: 'Top of Nevada Fall', coords: [37.7249, -119.5332], type: 'viewpoint', elevation: 1810, note: 'Granite platform looking down 600 ft cascade' },
      { name: 'Little Yosemite Valley Camp', coords: [37.7320, -119.5160], type: 'campsite', elevation: 1870, note: 'Last reliable Merced River water source before summit push' },
      { name: 'The Sub-Dome', coords: [37.7445, -119.5320], type: 'warning', elevation: 2470, note: 'Ranger checkpoint for Half Dome permits. Steep switchback stairs cut in rock' },
      { name: 'Half Dome Summit', coords: [37.7460, -119.5331], type: 'summit', elevation: 2694, note: 'The Visor overhanging Yosemite Valley, 4,800 ft above the valley floor' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 1230, landmark: 'Happy Isles Trailhead' },
      { distanceKm: 1.6, elevationM: 1420, landmark: 'Bridge Trail' },
      { distanceKm: 2.5, elevationM: 1530, landmark: 'Vernal Fall Footbridge' },
      { distanceKm: 3.5, elevationM: 1680, landmark: 'Silver Apron' },
      { distanceKm: 4.8, elevationM: 1810, landmark: 'Top of Nevada Fall' },
      { distanceKm: 6.5, elevationM: 1870, landmark: 'Little Yosemite Valley' },
      { distanceKm: 8.8, elevationM: 2050, landmark: 'Ponderosa Pine Ridge' },
      { distanceKm: 10.5, elevationM: 2260, landmark: 'Granite Switchbacks' },
      { distanceKm: 11.8, elevationM: 2470, landmark: 'Sub-Dome Granite Steps' },
      { distanceKm: 12.4, elevationM: 2560, landmark: 'Cables Base' },
      { distanceKm: 12.85, elevationM: 2694, landmark: 'Half Dome Summit' }
    ]
  },
  {
    id: 'angels-landing',
    name: 'Angels Landing via West Rim',
    park: 'Zion National Park',
    location: 'Utah, USA',
    region: 'North America',
    difficulty: 'Strenuous',
    distanceKm: 8.7,
    elevationGainM: 453,
    peakElevationM: 1765,
    routeType: 'Out & Back',
    estimatedHours: '3.5 - 4.5 hrs',
    rating: 4.85,
    reviewCount: 2840,
    bestSeason: 'March - November',
    permitRequired: true,
    dogFriendly: false,
    kidFriendly: false,
    heroImage: '/images/trails/angels-landing.jpg',
    tags: ['Canyon', 'Ridge Scramble', 'Chains', 'Red Rock', 'Views'],
    description: 'Renowned as one of the most thrilling cliffside scrambles in North America. After traversing the paved West Rim trail through Refrigerator Canyon and climbing the 21 tight switchbacks of Walter\'s Wiggles, hikers reach Scout Lookout. The final half-mile is an unforgettable spine walk along a narrow sandstone fin flanked by 1,000-foot vertical drops, assisted by heavy anchor chains.',
    highlights: [
      'Climbing the engineering marvel of Walter\'s Wiggles (21 paved zig-zags)',
      'Traversing the knife-edge sandstone ridge with 1,000 ft drops on both sides',
      'Unsurpassed 360-degree panorama of Zion Canyon and the Virgin River',
      'Seeing California Condors soaring along canyon updrafts'
    ],
    weather: {
      tempC: 22,
      condition: 'Sunny & Dry',
      windSpeedKmh: 9,
      uvIndex: 'Very High (9)',
      alert: 'Do not hike if rocks are wet, icy, or high wind gusts exceed 30 km/h.'
    },
    gearChecklist: [
      { item: 'Grippy approach or hiking shoes (stiff soles recommended)', essential: true },
      { item: '2 to 3 Liters of cold water (no water along route)', essential: true },
      { item: 'Hands-free daypack (both hands needed for chain sections)', essential: true },
      { item: 'Angels Landing Lottery Permit QR Code', essential: true },
      { item: 'Sun hat and polarized UV sunglasses', essential: false },
      { item: 'Salty electrolyte chews for hot canyon ascent', essential: false }
    ],
    coordinates: {
      center: [37.2650, -112.9500],
      zoom: 14,
      path: [
        [37.2592, -112.9511], // The Grotto Trailhead
        [37.2615, -112.9520],
        [37.2640, -112.9505], // Refrigerator Canyon
        [37.2660, -112.9495],
        [37.2675, -112.9488], // Walter's Wiggles
        [37.2685, -112.9482], // Scout Lookout
        [37.2688, -112.9479], // The Spine Chain section
        [37.2692, -112.9478]  // Summit
      ]
    },
    waypoints: [
      { name: 'The Grotto Trailhead', coords: [37.2592, -112.9511], type: 'trailhead', elevation: 1312, note: 'Zion Canyon shuttle stop #6. Water fountains and restrooms' },
      { name: 'Refrigerator Canyon', coords: [37.2640, -112.9505], type: 'viewpoint', elevation: 1440, note: 'Shaded sandstone gorge that offers relief on warm desert mornings' },
      { name: 'Walter\'s Wiggles', coords: [37.2675, -112.9488], type: 'warning', elevation: 1560, note: '21 continuous steep switchbacks paved into sheer red sandstone' },
      { name: 'Scout Lookout', coords: [37.2685, -112.9482], type: 'viewpoint', elevation: 1640, note: 'Ranger permit checkpoint and final turnaround point before chain spine' },
      { name: 'The Spine Chains', coords: [37.2688, -112.9479], type: 'warning', elevation: 1710, note: 'Exposed sandstone fin with anchor chains and sheer vertical drop-offs' },
      { name: 'Angels Landing Summit', coords: [37.2692, -112.9478], type: 'summit', elevation: 1765, note: 'Observation point offering breathtaking vista up and down Zion Canyon' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 1312, landmark: 'The Grotto' },
      { distanceKm: 1.1, elevationM: 1375, landmark: 'Virgin River Bank' },
      { distanceKm: 2.2, elevationM: 1440, landmark: 'Refrigerator Canyon' },
      { distanceKm: 3.2, elevationM: 1560, landmark: 'Walter\'s Wiggles Base' },
      { distanceKm: 3.7, elevationM: 1640, landmark: 'Scout Lookout' },
      { distanceKm: 4.1, elevationM: 1710, landmark: 'The Spine' },
      { distanceKm: 4.35, elevationM: 1765, landmark: 'Angels Landing Summit' }
    ]
  },
  {
    id: 'fitz-roy',
    name: 'Laguna de los Tres (Mount Fitz Roy)',
    park: 'Los Glaciares National Park',
    location: 'El Chaltén, Patagonia, Argentina',
    region: 'South America',
    difficulty: 'Strenuous',
    distanceKm: 21.4,
    elevationGainM: 960,
    peakElevationM: 1160,
    routeType: 'Out & Back',
    estimatedHours: '7 - 9 hrs',
    rating: 4.98,
    reviewCount: 1910,
    bestSeason: 'November - April',
    permitRequired: false,
    dogFriendly: false,
    kidFriendly: false,
    heroImage: '/images/trails/fitz-roy.jpg',
    tags: ['Glacial Lake', 'Patagonia', 'Granite Spires', 'Wilderness', 'Alpine'],
    description: 'The crown jewel of Patagonian trekking. Journeying out of the trekking capital of El Chaltén, the trail cuts through native lenga forests, traverses panoramic lookouts over the Rio de las Vueltas valley, and crosses glacial streams. The final kilometer is a legendary 400m slog up a steep moraine boulder field, rewarded by the iridescent turquoise waters of Laguna de los Tres sitting directly below the sheer 3,405m granite monolith of Mount Fitz Roy.',
    highlights: [
      'Turquoise glacial tarn mirroring the three colossal Fitz Roy granite spires',
      'Side trail to overlook the secret cobalt-blue Laguna Sucia',
      'Walk among native Antarctic beech (lenga and ñire) forests',
      'Witness the legendary golden alpenglow at dawn'
    ],
    weather: {
      tempC: 8,
      condition: 'Windy & Crisp',
      windSpeedKmh: 38,
      uvIndex: 'Moderate (5)',
      alert: 'Patagonian wind gusts can exceed 70 km/h on the final moraine ridge. Trekking poles highly recommended.'
    },
    gearChecklist: [
      { item: 'Gore-Tex windproof & waterproof hardshell jacket', essential: true },
      { item: 'Sturdy waterproof hiking boots for sharp moraine shale', essential: true },
      { item: 'Adjustable trekking poles with carbide tips', essential: true },
      { item: 'Fleece or down insulated mid-layer', essential: true },
      { item: 'Buff / neck gaiter and warm wool beanie', essential: true },
      { item: 'Reusable water bottle (pure glacier stream refills along way)', essential: false },
      { item: 'High-calorie snacks and warm thermos of mate/tea', essential: false }
    ],
    coordinates: {
      center: [-49.3080, -72.9350],
      zoom: 12,
      path: [
        [-49.3280, -72.8890], // El Chaltén Trailhead
        [-49.3230, -72.9020],
        [-49.3190, -72.9150], // Mirador Rio de las Vueltas
        [-49.3140, -72.9310], // Mirador Fitz Roy
        [-49.3080, -72.9420], // Campamento Poincenot
        [-49.2980, -72.9560], // Rio Blanco Base Camp
        [-49.2890, -72.9690], // Steep Moraine
        [-49.2780, -72.9780]  // Laguna de los Tres
      ]
    },
    waypoints: [
      { name: 'El Chaltén Trailhead', coords: [-49.3280, -72.8890], type: 'trailhead', elevation: 410, note: 'North end of San Martín street, trail map board' },
      { name: 'Mirador Rio de las Vueltas', coords: [-49.3190, -72.9150], type: 'viewpoint', elevation: 560, note: 'First sweeping look across the glacial river valley' },
      { name: 'Mirador Mount Fitz Roy', coords: [-49.3140, -72.9310], type: 'viewpoint', elevation: 710, note: 'Iconic panoramic viewpoint with rest benches' },
      { name: 'Campamento Poincenot', coords: [-49.3080, -72.9420], type: 'campsite', elevation: 750, note: 'Designated backcountry tent camping in protected beech forest' },
      { name: 'Rio Blanco Ranger Shelter', coords: [-49.2980, -72.9560], type: 'warning', elevation: 770, note: 'Final checkpoint before grueling 1-hour 400m vertical climb up boulder moraine' },
      { name: 'Laguna de los Tres', coords: [-49.2780, -72.9780], type: 'summit', elevation: 1160, note: 'Spectacular turquoise glacial lake at base of Fitz Roy' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 410, landmark: 'El Chaltén' },
      { distanceKm: 2.1, elevationM: 560, landmark: 'Rio de las Vueltas' },
      { distanceKm: 4.5, elevationM: 710, landmark: 'Fitz Roy Mirador' },
      { distanceKm: 7.8, elevationM: 750, landmark: 'Camp Poincenot' },
      { distanceKm: 9.2, elevationM: 770, landmark: 'Rio Blanco Base' },
      { distanceKm: 10.0, elevationM: 990, landmark: 'Moraine Ascent' },
      { distanceKm: 10.7, elevationM: 1160, landmark: 'Laguna de los Tres' }
    ]
  },
  {
    id: 'mont-blanc',
    name: 'Tour du Mont Blanc: Grand Balcon Sud & Lac Blanc',
    park: 'Aiguilles Rouges Nature Reserve',
    location: 'Chamonix-Mont-Blanc, France',
    region: 'Europe',
    difficulty: 'Moderate',
    distanceKm: 14.8,
    elevationGainM: 820,
    peakElevationM: 2352,
    routeType: 'Loop',
    estimatedHours: '5 - 6.5 hrs',
    rating: 4.93,
    reviewCount: 1120,
    bestSeason: 'June - September',
    permitRequired: false,
    dogFriendly: true,
    kidFriendly: true,
    heroImage: '/images/trails/mont-blanc.jpg',
    tags: ['Alps', 'Alpine Lakes', 'Glaciers', 'Wildflowers', 'Refugio'],
    description: 'Arguably the most scenic day-stage along the renowned Tour du Mont Blanc. Traversing the sunny southern balcony of the Aiguilles Rouges, this trail provides an uninterrupted theatrical panorama across the Chamonix Valley directly toward the Mont Blanc massif, Mer de Glace, and the icy needles of Les Drus, concluding at the famous alpine lake of Lac Blanc.',
    highlights: [
      'Lac Blanc reflecting the snow-capped apex of Mont Blanc (4,807m)',
      'Alpine ibex and marmots grazing along high-altitude meadows',
      'Traditional French tarte aux myrtilles (blueberry tart) at Refuge du Lac Blanc',
      'Suspension bridges and fixed iron ladders over rocky escarpments'
    ],
    weather: {
      tempC: 13,
      condition: 'Sunny Alpine',
      windSpeedKmh: 12,
      uvIndex: 'High (7)',
      alert: 'Late June snowfields may persist around Lac Blanc; trekking poles recommended.'
    },
    gearChecklist: [
      { item: 'Trekking poles for rocky alpine steps and scree', essential: true },
      { item: 'Layered clothing: technical tee, warm mid-layer, and windbreaker', essential: true },
      { item: 'Sun protection: 50+ sunscreen, sunglasses, and cap', essential: true },
      { item: 'Cash in Euros (for Refuge du Lac Blanc pastries and refreshments)', essential: false },
      { item: 'Camera with wide-angle lens for alpine reflections', essential: false }
    ],
    coordinates: {
      center: [45.9600, 6.8850],
      zoom: 13,
      path: [
        [45.9380, 6.8850], // Les Praz
        [45.9490, 6.8840],
        [45.9602, 6.8860], // Refuge de La Flégère
        [45.9710, 6.8870],
        [45.9818, 6.8885], // Lac Blanc (Upper Lake)
        [45.9790, 6.8790], // Lacs des Chéserys
        [45.9650, 6.8720], // Grand Balcon Sud traverse
        [45.9520, 6.8650], // Planpraz trail link
        [45.9380, 6.8850]  // Loop return
      ]
    },
    waypoints: [
      { name: 'Les Praz Gondola Base', coords: [45.9380, 6.8850], type: 'trailhead', elevation: 1060, note: 'Valley trailhead or take cableway up to La Flégère' },
      { name: 'Refuge de La Flégère', coords: [45.9602, 6.8860], type: 'campsite', elevation: 1877, note: 'Alpine hut with terrace restaurant, water, and restrooms' },
      { name: 'Lacs des Chéserys', coords: [45.9790, 6.8790], type: 'water', elevation: 2211, note: 'Quiet cluster of crystal-clear alpine tarns, prime ibex sighting spot' },
      { name: 'Lac Blanc Alpine Tarn', coords: [45.9818, 6.8885], type: 'summit', elevation: 2352, note: 'World-famous glacial lake reflecting Mont Blanc and the Aiguilles' },
      { name: 'Grand Balcon Sud Path', coords: [45.9650, 6.8720], type: 'viewpoint', elevation: 2000, note: 'High altitude balcony path overlooking the entire Mont Blanc ridge' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 1060, landmark: 'Les Praz' },
      { distanceKm: 3.2, elevationM: 1540, landmark: 'Pine Forest' },
      { distanceKm: 5.5, elevationM: 1877, landmark: 'La Flégère' },
      { distanceKm: 7.6, elevationM: 2150, landmark: 'Ladders Section' },
      { distanceKm: 8.9, elevationM: 2352, landmark: 'Lac Blanc Refuge' },
      { distanceKm: 11.2, elevationM: 2100, landmark: 'Grand Balcon' },
      { distanceKm: 14.8, elevationM: 1060, landmark: 'Les Praz Finish' }
    ]
  },
  {
    id: 'kalalau',
    name: 'Kalalau Trail: Hanakapiai & Na Pali Cliffs',
    park: 'Na Pali Coast State Wilderness Park',
    location: 'Kauai, Hawaii, USA',
    region: 'Oceania / Hawaii',
    difficulty: 'Strenuous',
    distanceKm: 12.8,
    elevationGainM: 640,
    peakElevationM: 320,
    routeType: 'Out & Back',
    estimatedHours: '5 - 6.5 hrs',
    rating: 4.88,
    reviewCount: 960,
    bestSeason: 'May - September',
    permitRequired: true,
    dogFriendly: false,
    kidFriendly: false,
    heroImage: '/images/trails/kalalau.jpg',
    tags: ['Ocean Views', 'Emerald Cliffs', 'Waterfalls', 'Beaches', 'Tropical'],
    description: 'Carved directly into the sheer fluted volcanic cliffs of Kauai\'s legendary Na Pali Coast, the Kalalau Trail is often named among the top 10 most scenic and rugged trails in the world. Hikers climb over coastal ridges covered in ti plants and guava trees, navigate dramatic ocean precipices with views of pounding turquoise Pacific surf, and reach Hanakapiai Beach and its roaring 300-foot waterfall.',
    highlights: [
      'Gazing 1,000 feet straight down into emerald sea caves and pounding surf',
      'Hanakapiai Falls: a thundering 300-foot freshwater cascade tucked in a cathedral gorge',
      'Native Hawaiian archaeological stone terraces and tropical flora',
      'Humpback whale breaches visible offshore during winter months'
    ],
    weather: {
      tempC: 27,
      condition: 'Tropical Sun & Showers',
      windSpeedKmh: 18,
      uvIndex: 'Extreme (11)',
      alert: 'Flash flood alert: Never cross Hanakapiai stream if water is swollen, brown, or moving fast.'
    },
    gearChecklist: [
      { item: 'Aggressive trail runners or boots with deep mud lugs', essential: true },
      { item: 'Trekking poles for slippery red clay slopes', essential: true },
      { item: '3 Liters of water + reliable hollow-fiber filter (leptospirosis caution)', essential: true },
      { item: 'Reef-safe biodegradable mineral sunscreen', essential: true },
      { item: 'Haena State Park Entry reservation / shuttle voucher', essential: true },
      { item: 'Waterproof dry bag for phone, keys, and camera', essential: false }
    ],
    coordinates: {
      center: [22.2150, -159.5950],
      zoom: 14,
      path: [
        [22.2198, -159.5855], // Ke'e Beach Trailhead
        [22.2160, -159.5880],
        [22.2120, -159.5920],
        [22.2085, -159.5980], // Hanakapiai Beach
        [22.2045, -159.5995],
        [22.2010, -159.6015], // Bamboo Forest
        [22.1970, -159.6030]  // Hanakapiai Falls
      ]
    },
    waypoints: [
      { name: 'Ke\'e Beach Trailhead', coords: [22.2198, -159.5855], type: 'trailhead', elevation: 8, note: 'State park check-in, boardwalk entrance, showers and restrooms' },
      { name: 'One-Mile Coastline Vista', coords: [22.2120, -159.5920], type: 'viewpoint', elevation: 180, note: 'Unobstructed panorama back toward Ke\'e reef and the Na Pali coastline' },
      { name: 'Hanakapiai Beach', coords: [22.2085, -159.5980], type: 'warning', elevation: 12, note: 'Boulder beach and stream crossing. Dangerous riptides—no swimming' },
      { name: 'Bamboo Forest Trail', coords: [22.2010, -159.6015], type: 'water', elevation: 140, note: 'Dense enchanted grove of tall bamboo following the valley stream' },
      { name: 'Hanakapiai Falls', coords: [22.1970, -159.6030], type: 'summit', elevation: 230, note: 'Towering 300 ft amphitheater waterfall plunging into a deep swimmable pool' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 8, landmark: 'Ke\'e Beach' },
      { distanceKm: 1.6, elevationM: 180, landmark: 'First Ridge Crest' },
      { distanceKm: 3.2, elevationM: 12, landmark: 'Hanakapiai Stream' },
      { distanceKm: 4.8, elevationM: 110, landmark: 'Bamboo Forest' },
      { distanceKm: 6.4, elevationM: 230, landmark: 'Hanakapiai Falls' }
    ]
  },
  {
    id: 'skyline-rainier',
    name: 'Skyline Trail to Panorama Point',
    park: 'Mount Rainier National Park',
    location: 'Washington, USA',
    region: 'North America',
    difficulty: 'Moderate',
    distanceKm: 9.2,
    elevationGainM: 520,
    peakElevationM: 2072,
    routeType: 'Loop',
    estimatedHours: '3.5 - 4.5 hrs',
    rating: 4.91,
    reviewCount: 3250,
    bestSeason: 'July - October',
    permitRequired: false,
    dogFriendly: false,
    kidFriendly: true,
    heroImage: '/images/trails/mont-blanc.jpg',
    tags: ['Volcano', 'Glacier', 'Wildflowers', 'Loop', 'Views'],
    description: 'The premier alpine loop in the Pacific Northwest. Winding up from Paradise through carpeted meadows of vibrant lupine, glacier lilies, and scarlet paintbrush, hikers are treated to in-your-face views of the massive Nisqually Glacier, yawning crevasses, and the 14,411-foot volcanic peak of Mount Rainier.',
    highlights: [
      'Panorama Point: looking south at Mount Adams, Mount St. Helens, and Mount Hood',
      'Myrtle Falls cascading across a rustic wooden footbridge with Rainier backdrop',
      'Lush subalpine wildflower blooms peaking in late July and August',
      'Marmots whistling and sunning on alpine granite boulders'
    ],
    weather: {
      tempC: 14,
      condition: 'Sunny with Alpine Breeze',
      windSpeedKmh: 11,
      uvIndex: 'High (8)',
      alert: 'Watch out for lingering snowpack at the high crossover above Panorama Point.'
    },
    gearChecklist: [
      { item: 'Trekking poles with snow baskets (helpful on summer snow crossings)', essential: true },
      { item: 'Sunglasses with 100% UV protection against snow glare', essential: true },
      { item: 'Breathable windbreaker or light fleece', essential: true },
      { item: 'Camera with zoom for wildlife and alpine vistas', essential: false }
    ],
    coordinates: {
      center: [46.7930, -121.7370],
      zoom: 14,
      path: [
        [46.7865, -121.7350], // Paradise Visitor Center
        [46.7915, -121.7300], // Myrtle Falls
        [46.7980, -121.7360], // Glacier Vista
        [46.8040, -121.7345], // Panorama Point
        [46.8020, -121.7390], // High Skyline
        [46.7950, -121.7420], // Golden Gate path
        [46.7865, -121.7350]  // Loop finish
      ]
    },
    waypoints: [
      { name: 'Paradise Jackson Visitor Center', coords: [46.7865, -121.7350], type: 'trailhead', elevation: 1645, note: 'Ranger exhibits, water fill stations, parking' },
      { name: 'Myrtle Falls Bridge', coords: [46.7915, -121.7300], type: 'water', elevation: 1720, note: 'Iconic 72-foot waterfall with Mount Rainier towering behind' },
      { name: 'Glacier Vista', coords: [46.7980, -121.7360], type: 'viewpoint', elevation: 1930, note: 'Dramatic vantage point directly over the crevasses of Nisqually Glacier' },
      { name: 'Panorama Point', coords: [46.8040, -121.7345], type: 'summit', elevation: 2072, note: 'High point of trail offering 360-degree views across Cascade volcanoes' }
    ],
    elevationProfile: [
      { distanceKm: 0.0, elevationM: 1645, landmark: 'Paradise Visitor Center' },
      { distanceKm: 1.2, elevationM: 1720, landmark: 'Myrtle Falls' },
      { distanceKm: 2.8, elevationM: 1930, landmark: 'Glacier Vista' },
      { distanceKm: 4.4, elevationM: 2072, landmark: 'Panorama Point' },
      { distanceKm: 6.8, elevationM: 1850, landmark: 'Alta Vista' },
      { distanceKm: 9.2, elevationM: 1645, landmark: 'Paradise Loop Return' }
    ]
  }
];
