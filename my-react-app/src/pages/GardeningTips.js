import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { GardeningTip } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Search, Lightbulb, Droplets, Scissors, Sprout, Bug, Calendar, BookOpen, Star } from 'lucide-react';
// export default function GardeningTips() {
//   const [tips, setTips] = useState<GardeningTip[]>([]);
//   const [filteredTips, setFilteredTips] = useState<GardeningTip[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
//   const [loading, setLoading] = useState(true);
//   // Sample gardening tips data
//   const sampleTips: GardeningTip[] = [
//     {
//       id: '1',
//       title: 'Deep Watering vs. Frequent Shallow Watering',
//       content: 'Water your plants deeply but less frequently to encourage deep root growth. This makes plants more drought-resistant and healthier overall. Aim to water until you see water coming out of drainage holes, then wait until the top inch of soil is dry before watering again.',
//       category: 'watering',
//       difficulty: 'beginner',
//       season: 'summer',
//       plantTypes: ['All Plants'],
//       author: 'Garden Expert',
//       createdAt: new Date()
//     },
//     {
//       id: '2',
//       title: 'Companion Planting for Natural Pest Control',
//       content: 'Plant marigolds near tomatoes and peppers to repel aphids and whiteflies. Basil planted near tomatoes not only repels pests but can improve the flavor of your tomatoes. Nasturtiums act as trap crops for aphids and cucumber beetles.',
//       category: 'pest-control',
//       difficulty: 'intermediate',
//       plantTypes: ['Tomatoes', 'Peppers', 'Herbs'],
//       author: 'Organic Gardener',
//       createdAt: new Date()
//     },
//     {
//       id: '3',
//       title: 'Proper Pruning Techniques for Tomatoes',
//       content: 'Remove suckers (shoots that grow between the main stem and branches) to direct energy to fruit production. Prune lower leaves that touch the ground to prevent disease. Always use clean, sharp tools and prune in dry conditions to avoid spreading disease.',
//       category: 'pruning',
//       difficulty: 'intermediate',
//       season: 'summer',
//       plantTypes: ['Tomatoes'],
//       author: 'Vegetable Specialist',
//       createdAt: new Date()
//     },
//     {
//       id: '4',
//       title: 'Starting Seeds Indoors Successfully',
//       content: 'Use a seed starting mix, not regular potting soil. Keep soil consistently moist but not waterlogged. Provide 14-16 hours of light daily using grow lights placed 2-3 inches above seedlings. Maintain temperature between 65-75°F for most vegetables.',
//       category: 'planting',
//       difficulty: 'beginner',
//       season: 'spring',
//       plantTypes: ['Vegetables', 'Herbs', 'Flowers'],
//       author: 'Seed Starting Pro',
//       createdAt: new Date()
//     },
//     {
//       id: '5',
//       title: 'Organic Fertilizing with Compost Tea',
//       content: 'Make nutrient-rich compost tea by steeping finished compost in water for 24-48 hours. Strain and dilute 1:10 with water. Apply every 2-3 weeks during growing season. This provides slow-release nutrients and beneficial microorganisms to your plants.',
//       category: 'fertilizing',
//       difficulty: 'intermediate',
//       plantTypes: ['All Plants'],
//       author: 'Organic Expert',
//       createdAt: new Date()
//     },
//     {
//       id: '6',
//       title: 'Succession Planting for Continuous Harvest',
//       content: 'Plant small amounts of fast-growing crops like lettuce, radishes, and beans every 2-3 weeks throughout the growing season. This ensures a continuous harvest rather than having everything ready at once.',
//       category: 'planting',
//       difficulty: 'intermediate',
//       season: 'spring',
//       plantTypes: ['Lettuce', 'Radishes', 'Beans'],
//       author: 'Harvest Master',
//       createdAt: new Date()
//     },
//     {
//       id: '7',
//       title: 'Natural Pest Deterrents You Can Make at Home',
//       content: 'Mix 1 tablespoon of mild dish soap with 1 quart of water to create an effective aphid spray. For slugs, place shallow dishes of beer around plants. Sprinkle crushed eggshells around plants to deter soft-bodied pests.',
//       category: 'pest-control',
//       difficulty: 'beginner',
//       plantTypes: ['All Plants'],
//       author: 'Natural Gardener',
//       createdAt: new Date()
//     },
//     {
//       id: '8',
//       title: 'Fall Garden Preparation Tips',
//       content: 'Clean up fallen leaves and diseased plant material to prevent overwintering pests and diseases. Plant cover crops like winter rye or clover to improve soil. Mulch tender perennials after the first hard frost.',
//       category: 'seasonal',
//       difficulty: 'intermediate',
//       season: 'fall',
//       plantTypes: ['Perennials', 'Cover Crops'],
//       author: 'Seasonal Expert',
//       createdAt: new Date()
//     },
//     {
//       id: '9',
//       title: 'Harvesting at Peak Ripeness',
//       content: 'Harvest tomatoes when they start to turn color and let them ripen indoors for best flavor. Pick herbs in the morning after dew dries but before heat of day. Harvest leafy greens in cool morning or evening hours.',
//       category: 'harvesting',
//       difficulty: 'beginner',
//       season: 'summer',
//       plantTypes: ['Tomatoes', 'Herbs', 'Leafy Greens'],
//       author: 'Harvest Timing Expert',
//       createdAt: new Date()
//     },
//     {
//       id: '10',
//       title: 'Soil Testing and Amendment Guide',
//       content: 'Test your soil pH annually using a digital meter or test strips. Most vegetables prefer pH 6.0-7.0. Add lime to raise pH or sulfur to lower it. Incorporate 2-3 inches of compost annually to improve soil structure and fertility.',
//       category: 'seasonal',
//       difficulty: 'advanced',
//       plantTypes: ['All Plants'],
//       author: 'Soil Scientist',
//       createdAt: new Date()
//     }
//   ];
//   useEffect(() => {
//     // In a real app, this would fetch from a database
//     setTips(sampleTips);
//     setFilteredTips(sampleTips);
//     setLoading(false);
//   }, []);
//   useEffect(() => {
//     let filtered = tips;
//     if (searchTerm) {
//       filtered = filtered.filter(tip =>
//         tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tip.plantTypes.some(plant => plant.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(tip => tip.category === selectedCategory);
//     }
//     if (selectedDifficulty !== 'all') {
//       filtered = filtered.filter(tip => tip.difficulty === selectedDifficulty);
//     }
//     setFilteredTips(filtered);
//   }, [searchTerm, selectedCategory, selectedDifficulty, tips]);
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'watering': return <Droplets className="h-4 w-4 text-blue-500" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4 text-green-500" />;
//       case 'pruning': return <Scissors className="h-4 w-4 text-purple-500" />;
//       case 'pest-control': return <Bug className="h-4 w-4 text-red-500" />;
//       case 'planting': return <Sprout className="h-4 w-4 text-emerald-500" />;
//       case 'harvesting': return <Calendar className="h-4 w-4 text-orange-500" />;
//       case 'seasonal': return <Calendar className="h-4 w-4 text-indigo-500" />;
//       default: return <Lightbulb className="h-4 w-4 text-yellow-500" />;
//     }
//   };
//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'beginner': return 'bg-green-100 text-green-800';
//       case 'intermediate': return 'bg-yellow-100 text-yellow-800';
//       case 'advanced': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getCategoryColor = (category: string) => {
//     const colors = {
//       watering: 'bg-blue-100 text-blue-800',
//       fertilizing: 'bg-green-100 text-green-800',
//       pruning: 'bg-purple-100 text-purple-800',
//       'pest-control': 'bg-red-100 text-red-800',
//       planting: 'bg-emerald-100 text-emerald-800',
//       harvesting: 'bg-orange-100 text-orange-800',
//       seasonal: 'bg-indigo-100 text-indigo-800'
//     };
//     return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };
//   const getSeasonColor = (season?: string) => {
//     if (!season) return 'bg-gray-100 text-gray-800';
//     const colors = {
//       spring: 'bg-green-100 text-green-800',
//       summer: 'bg-yellow-100 text-yellow-800',
//       fall: 'bg-orange-100 text-orange-800',
//       winter: 'bg-blue-100 text-blue-800'
//     };
//     return colors[season as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };
//   const tipsByCategory = {
//     watering: filteredTips.filter(tip => tip.category === 'watering'),
//     fertilizing: filteredTips.filter(tip => tip.category === 'fertilizing'),
//     pruning: filteredTips.filter(tip => tip.category === 'pruning'),
//     'pest-control': filteredTips.filter(tip => tip.category === 'pest-control'),
//     planting: filteredTips.filter(tip => tip.category === 'planting'),
//     harvesting: filteredTips.filter(tip => tip.category === 'harvesting'),
//     seasonal: filteredTips.filter(tip => tip.category === 'seasonal')
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading gardening tips...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Gardening Tips & Resources</h1>
//           <p className="text-muted-foreground">
//             Expert advice and proven techniques to improve your gardening success.
//           </p>
//         </div>
//       </div>
//       {/* Search and Filters */}
//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search tips by title, content, or plant type..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-full lg:w-48">
//             <SelectValue placeholder="Filter by category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             <SelectItem value="watering">Watering</SelectItem>
//             <SelectItem value="fertilizing">Fertilizing</SelectItem>
//             <SelectItem value="pruning">Pruning</SelectItem>
//             <SelectItem value="pest-control">Pest Control</SelectItem>
//             <SelectItem value="planting">Planting</SelectItem>
//             <SelectItem value="harvesting">Harvesting</SelectItem>
//             <SelectItem value="seasonal">Seasonal</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
//           <SelectTrigger className="w-full lg:w-48">
//             <SelectValue placeholder="Filter by difficulty" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Levels</SelectItem>
//             <SelectItem value="beginner">Beginner</SelectItem>
//             <SelectItem value="intermediate">Intermediate</SelectItem>
//             <SelectItem value="advanced">Advanced</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       {/* Tips Display */}
//       <Tabs defaultValue="all" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="all">All Tips ({filteredTips.length})</TabsTrigger>
//           <TabsTrigger value="watering">Watering ({tipsByCategory.watering.length})</TabsTrigger>
//           <TabsTrigger value="planting">Planting ({tipsByCategory.planting.length})</TabsTrigger>
//           <TabsTrigger value="pest-control">Pest Control ({tipsByCategory['pest-control'].length})</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all" className="space-y-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {filteredTips.map((tip) => (
//               <Card key={tip.id} className="h-fit">
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center space-x-2">
//                       {getCategoryIcon(tip.category)}
//                       <CardTitle className="text-lg">{tip.title}</CardTitle>
//                     </div>
//                     <Badge className={getDifficultyColor(tip.difficulty)}>
//                       {tip.difficulty}
//                     </Badge>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     <Badge className={getCategoryColor(tip.category)}>
//                       {tip.category.replace('-', ' ')}
//                     </Badge>
//                     {tip.season && (
//                       <Badge className={getSeasonColor(tip.season)}>
//                         {tip.season}
//                       </Badge>
//                     )}
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
//                     {tip.content}
//                   </p>
//                   <div className="space-y-2">
//                     <div>
//                       <p className="text-xs font-medium text-gray-600 mb-1">Applies to:</p>
//                       <div className="flex flex-wrap gap-1">
//                         {tip.plantTypes.map((plantType, index) => (
//                           <Badge key={index} variant="outline" className="text-xs">
//                             {plantType}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between pt-2 border-t">
//                       <span className="text-xs text-muted-foreground">
//                         By {tip.author}
//                       </span>
//                       <div className="flex items-center space-x-1">
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         {Object.entries(tipsByCategory).map(([category, categoryTips]) => (
//           <TabsContent key={category} value={category} className="space-y-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {categoryTips.map((tip) => (
//                 <Card key={tip.id} className="h-fit">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-2">
//                         {getCategoryIcon(tip.category)}
//                         <CardTitle className="text-lg">{tip.title}</CardTitle>
//                       </div>
//                       <Badge className={getDifficultyColor(tip.difficulty)}>
//                         {tip.difficulty}
//                       </Badge>
//                     </div>
//                     {tip.season && (
//                       <Badge className={getSeasonColor(tip.season)}>
//                         {tip.season}
//                       </Badge>
//                     )}
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
//                       {tip.content}
//                     </p>
//                     <div className="space-y-2">
//                       <div>
//                         <p className="text-xs font-medium text-gray-600 mb-1">Applies to:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {tip.plantTypes.map((plantType, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {plantType}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between pt-2 border-t">
//                         <span className="text-xs text-muted-foreground">
//                           By {tip.author}
//                         </span>
//                         <div className="flex items-center space-x-1">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             {categoryTips.length === 0 && (
//               <div className="text-center py-12">
//                 <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
//                 <p className="text-muted-foreground">
//                   Try adjusting your search terms or filters.
//                 </p>
//               </div>
//             )}
//           </TabsContent>
//         ))}
//       </Tabs>
//       {filteredTips.length === 0 && (
//         <div className="text-center py-12">
//           <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search terms or filters to find relevant gardening tips.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Lightbulb, Droplets, Scissors, Sprout, Bug, Calendar, BookOpen, Star, Filter, Leaf } from 'lucide-react';
export default function GardeningTips() {
    const [tips, setTips] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [loading, setLoading] = useState(true);
    // Enhanced sample gardening tips data
    const sampleTips = [
        {
            id: '1',
            title: 'Deep Watering vs. Frequent Shallow Watering',
            content: 'Water your plants deeply but less frequently to encourage deep root growth. This makes plants more drought-resistant and healthier overall. Aim to water until you see water coming out of drainage holes, then wait until the top inch of soil is dry before watering again.',
            category: 'watering',
            difficulty: 'beginner',
            season: 'summer',
            plantTypes: ['All Plants'],
            author: 'Garden Expert',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '2',
            title: 'Companion Planting for Natural Pest Control',
            content: 'Plant marigolds near tomatoes and peppers to repel aphids and whiteflies. Basil planted near tomatoes not only repels pests but can improve the flavor of your tomatoes. Nasturtiums act as trap crops for aphids and cucumber beetles.',
            category: 'pest-control',
            difficulty: 'intermediate',
            plantTypes: ['Tomatoes', 'Peppers', 'Herbs'],
            author: 'Organic Gardener',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '3',
            title: 'Proper Pruning Techniques for Tomatoes',
            content: 'Remove suckers (shoots that grow between the main stem and branches) to direct energy to fruit production. Prune lower leaves that touch the ground to prevent disease. Always use clean, sharp tools and prune in dry conditions to avoid spreading disease.',
            category: 'pruning',
            difficulty: 'intermediate',
            season: 'summer',
            plantTypes: ['Tomatoes'],
            author: 'Vegetable Specialist',
            createdAt: new Date(),
            rating: 4
        },
        {
            id: '4',
            title: 'Starting Seeds Indoors Successfully',
            content: 'Use a seed starting mix, not regular potting soil. Keep soil consistently moist but not waterlogged. Provide 14-16 hours of light daily using grow lights placed 2-3 inches above seedlings. Maintain temperature between 65-75°F for most vegetables.',
            category: 'planting',
            difficulty: 'beginner',
            season: 'spring',
            plantTypes: ['Vegetables', 'Herbs', 'Flowers'],
            author: 'Seed Starting Pro',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '5',
            title: 'Organic Fertilizing with Compost Tea',
            content: 'Make nutrient-rich compost tea by steeping finished compost in water for 24-48 hours. Strain and dilute 1:10 with water. Apply every 2-3 weeks during growing season. This provides slow-release nutrients and beneficial microorganisms to your plants.',
            category: 'fertilizing',
            difficulty: 'intermediate',
            plantTypes: ['All Plants'],
            author: 'Organic Expert',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '6',
            title: 'Succession Planting for Continuous Harvest',
            content: 'Plant small amounts of fast-growing crops like lettuce, radishes, and beans every 2-3 weeks throughout the growing season. This ensures a continuous harvest rather than having everything ready at once.',
            category: 'planting',
            difficulty: 'intermediate',
            season: 'spring',
            plantTypes: ['Lettuce', 'Radishes', 'Beans'],
            author: 'Harvest Master',
            createdAt: new Date(),
            rating: 4
        },
        {
            id: '7',
            title: 'Natural Pest Deterrents You Can Make at Home',
            content: 'Mix 1 tablespoon of mild dish soap with 1 quart of water to create an effective aphid spray. For slugs, place shallow dishes of beer around plants. Sprinkle crushed eggshells around plants to deter soft-bodied pests.',
            category: 'pest-control',
            difficulty: 'beginner',
            plantTypes: ['All Plants'],
            author: 'Natural Gardener',
            createdAt: new Date(),
            rating: 4
        },
        {
            id: '8',
            title: 'Fall Garden Preparation Tips',
            content: 'Clean up fallen leaves and diseased plant material to prevent overwintering pests and diseases. Plant cover crops like winter rye or clover to improve soil. Mulch tender perennials after the first hard frost.',
            category: 'seasonal',
            difficulty: 'intermediate',
            season: 'fall',
            plantTypes: ['Perennials', 'Cover Crops'],
            author: 'Seasonal Expert',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '9',
            title: 'Harvesting at Peak Ripeness',
            content: 'Harvest tomatoes when they start to turn color and let them ripen indoors for best flavor. Pick herbs in the morning after dew dries but before heat of day. Harvest leafy greens in cool morning or evening hours.',
            category: 'harvesting',
            difficulty: 'beginner',
            season: 'summer',
            plantTypes: ['Tomatoes', 'Herbs', 'Leafy Greens'],
            author: 'Harvest Timing Expert',
            createdAt: new Date(),
            rating: 5
        },
        {
            id: '10',
            title: 'Soil Testing and Amendment Guide',
            content: 'Test your soil pH annually using a digital meter or test strips. Most vegetables prefer pH 6.0-7.0. Add lime to raise pH or sulfur to lower it. Incorporate 2-3 inches of compost annually to improve soil structure and fertility.',
            category: 'seasonal',
            difficulty: 'advanced',
            plantTypes: ['All Plants'],
            author: 'Soil Scientist',
            createdAt: new Date(),
            rating: 4
        }
    ];
    useEffect(() => {
        setTips(sampleTips);
        setFilteredTips(sampleTips);
        setLoading(false);
    }, []);
    useEffect(() => {
        let filtered = tips;
        if (searchTerm) {
            filtered = filtered.filter(tip => tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.plantTypes.some(plant => plant.toLowerCase().includes(searchTerm.toLowerCase())));
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(tip => tip.category === selectedCategory);
        }
        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(tip => tip.difficulty === selectedDifficulty);
        }
        setFilteredTips(filtered);
    }, [searchTerm, selectedCategory, selectedDifficulty, tips]);
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'watering': return _jsx(Droplets, { className: "h-5 w-5 text-blue-500" });
            case 'fertilizing': return _jsx(Sprout, { className: "h-5 w-5 text-green-500" });
            case 'pruning': return _jsx(Scissors, { className: "h-5 w-5 text-purple-500" });
            case 'pest-control': return _jsx(Bug, { className: "h-5 w-5 text-red-500" });
            case 'planting': return _jsx(Sprout, { className: "h-5 w-5 text-emerald-500" });
            case 'harvesting': return _jsx(Calendar, { className: "h-5 w-5 text-orange-500" });
            case 'seasonal': return _jsx(Calendar, { className: "h-5 w-5 text-indigo-500" });
            default: return _jsx(Lightbulb, { className: "h-5 w-5 text-yellow-500" });
        }
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getCategoryColor = (category) => {
        const colors = {
            watering: 'bg-blue-100 text-blue-800 border-blue-200',
            fertilizing: 'bg-green-100 text-green-800 border-green-200',
            pruning: 'bg-purple-100 text-purple-800 border-purple-200',
            'pest-control': 'bg-red-100 text-red-800 border-red-200',
            planting: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            harvesting: 'bg-orange-100 text-orange-800 border-orange-200',
            seasonal: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };
    const getSeasonColor = (season) => {
        if (!season)
            return 'bg-gray-100 text-gray-800 border-gray-200';
        const colors = {
            spring: 'bg-green-100 text-green-800 border-green-200',
            summer: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            fall: 'bg-orange-100 text-orange-800 border-orange-200',
            winter: 'bg-blue-100 text-blue-800 border-blue-200'
        };
        return colors[season] || 'bg-gray-100 text-gray-800 border-gray-200';
    };
    const renderStars = (rating) => {
        if (!rating)
            return null;
        return (_jsx("div", { className: "flex items-center space-x-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx(Star, { className: `h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}` }, star))) }));
    };
    const tipsByCategory = {
        watering: filteredTips.filter(tip => tip.category === 'watering'),
        fertilizing: filteredTips.filter(tip => tip.category === 'fertilizing'),
        pruning: filteredTips.filter(tip => tip.category === 'pruning'),
        'pest-control': filteredTips.filter(tip => tip.category === 'pest-control'),
        planting: filteredTips.filter(tip => tip.category === 'planting'),
        harvesting: filteredTips.filter(tip => tip.category === 'harvesting'),
        seasonal: filteredTips.filter(tip => tip.category === 'seasonal')
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading gardening tips..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Lightbulb, { className: "mr-3 h-10 w-10" }), "Gardening Tips & Resources"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Expert advice and proven techniques to improve your gardening success" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Badge, { variant: "secondary", className: "bg-green-100 text-green-800 text-lg px-4 py-2", children: [filteredTips.length, " Tips Available"] }) })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-green-50 border-b", children: [_jsxs(CardTitle, { className: "text-green-700 flex items-center", children: [_jsx(Filter, { className: "mr-2 h-5 w-5" }), "Search & Filter Tips"] }), _jsx(CardDescription, { className: "text-gray-600", children: "Find the perfect gardening advice for your needs" })] }), _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx(Input, { placeholder: "Search tips by title, content, or plant type...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 h-12 text-lg bg-white border-2 border-gray-200 focus:border-green-500" })] }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { className: "w-full lg:w-48 h-12 bg-white border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "Filter by category" }) }), _jsxs(SelectContent, { className: 'bg-white', children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), _jsx(SelectItem, { value: "watering", children: "\uD83D\uDCA7 Watering" }), _jsx(SelectItem, { value: "fertilizing", children: "\uD83C\uDF31 Fertilizing" }), _jsx(SelectItem, { value: "pruning", children: "\u2702\uFE0F Pruning" }), _jsx(SelectItem, { value: "pest-control", children: "\uD83D\uDC1B Pest Control" }), _jsx(SelectItem, { value: "planting", children: "\uD83C\uDF3F Planting" }), _jsx(SelectItem, { value: "harvesting", children: "\uD83D\uDDD3\uFE0F Harvesting" }), _jsx(SelectItem, { value: "seasonal", children: "\uD83D\uDCC5 Seasonal" })] })] }), _jsxs(Select, { value: selectedDifficulty, onValueChange: setSelectedDifficulty, children: [_jsx(SelectTrigger, { className: "w-full lg:w-48 h-12 bg-white border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "Filter by difficulty" }) }), _jsxs(SelectContent, { className: 'bg-white', children: [_jsx(SelectItem, { value: "all", children: "All Levels" }), _jsx(SelectItem, { value: "beginner", children: "\uD83C\uDF31 Beginner" }), _jsx(SelectItem, { value: "intermediate", children: "\uD83C\uDF3F Intermediate" }), _jsx(SelectItem, { value: "advanced", children: "\uD83C\uDF33 Advanced" })] })] })] }) })] }), _jsxs(Tabs, { defaultValue: "all", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 lg:grid-cols-7 bg-white shadow-md border-0 p-2", children: [_jsxs(TabsTrigger, { value: "all", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700", children: ["All (", filteredTips.length, ")"] }), _jsxs(TabsTrigger, { value: "watering", className: "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700", children: ["\uD83D\uDCA7 Water (", tipsByCategory.watering.length, ")"] }), _jsxs(TabsTrigger, { value: "planting", className: "data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700", children: ["\uD83C\uDF3F Plant (", tipsByCategory.planting.length, ")"] }), _jsxs(TabsTrigger, { value: "pest-control", className: "data-[state=active]:bg-red-100 data-[state=active]:text-red-700", children: ["\uD83D\uDC1B Pest (", tipsByCategory['pest-control'].length, ")"] }), _jsxs(TabsTrigger, { value: "fertilizing", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700 hidden lg:flex", children: ["\uD83C\uDF31 Fertilize (", tipsByCategory.fertilizing.length, ")"] }), _jsxs(TabsTrigger, { value: "pruning", className: "data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 hidden lg:flex", children: ["\u2702\uFE0F Prune (", tipsByCategory.pruning.length, ")"] }), _jsxs(TabsTrigger, { value: "seasonal", className: "data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 hidden lg:flex", children: ["\uD83D\uDCC5 Season (", tipsByCategory.seasonal.length, ")"] })] }), _jsx(TabsContent, { value: "all", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: filteredTips.map((tip) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getCategoryIcon(tip.category), _jsx(CardTitle, { className: "text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors", children: tip.title })] }), _jsx(Badge, { className: `${getDifficultyColor(tip.difficulty)} border font-medium`, children: tip.difficulty })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { className: `${getCategoryColor(tip.category)} border font-medium`, children: tip.category.replace('-', ' ') }), tip.season && (_jsx(Badge, { className: `${getSeasonColor(tip.season)} border font-medium`, children: tip.season }))] })] }), _jsxs(CardContent, { className: "pt-0", children: [_jsx("p", { className: "text-gray-600 mb-4 leading-relaxed line-clamp-4", children: tip.content }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "\uD83C\uDF31 Applies to:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: tip.plantTypes.map((plantType, index) => (_jsx(Badge, { variant: "outline", className: "text-xs bg-gray-50 border-gray-300", children: plantType }, index))) })] }), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100", children: [_jsxs("span", { className: "text-sm text-gray-500 font-medium", children: ["By ", tip.author] }), renderStars(tip.rating)] })] })] })] }, tip.id))) }) }), Object.entries(tipsByCategory).map(([category, categoryTips]) => (_jsxs(TabsContent, { value: category, className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: categoryTips.map((tip) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getCategoryIcon(tip.category), _jsx(CardTitle, { className: "text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors", children: tip.title })] }), _jsx(Badge, { className: `${getDifficultyColor(tip.difficulty)} border font-medium`, children: tip.difficulty })] }), tip.season && (_jsx(Badge, { className: `${getSeasonColor(tip.season)} border font-medium`, children: tip.season }))] }), _jsxs(CardContent, { className: "pt-0", children: [_jsx("p", { className: "text-gray-600 mb-4 leading-relaxed", children: tip.content }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "\uD83C\uDF31 Applies to:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: tip.plantTypes.map((plantType, index) => (_jsx(Badge, { variant: "outline", className: "text-xs bg-gray-50 border-gray-300", children: plantType }, index))) })] }), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-100", children: [_jsxs("span", { className: "text-sm text-gray-500 font-medium", children: ["By ", tip.author] }), renderStars(tip.rating)] })] })] })] }, tip.id))) }), categoryTips.length === 0 && (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-12", children: [_jsx(BookOpen, { className: "mx-auto h-16 w-16 text-gray-400 mb-4" }), _jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-2", children: "No tips found in this category" }), _jsx("p", { className: "text-gray-500", children: "Try adjusting your search terms or check other categories." })] }) }))] }, category)))] }), filteredTips.length === 0 && (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(Search, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No gardening tips found" }), _jsx("p", { className: "text-lg text-gray-500 mb-6", children: "Try adjusting your search terms or filters to find relevant gardening advice." }), _jsxs(Button, { onClick: () => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                    setSelectedDifficulty('all');
                                }, className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Leaf, { className: "mr-2 h-4 w-4" }), "Clear Filters"] })] }) }))] }) }));
}
