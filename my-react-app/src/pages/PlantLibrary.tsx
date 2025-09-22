
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase ';
// import { PlantLibraryEntry } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Search, Leaf, Sun, Droplets, Thermometer, Scissors, Bug, Users } from 'lucide-react';

// export default function PlantLibrary() {
//   const [plants, setPlants] = useState<PlantLibraryEntry[]>([]);
//   const [filteredPlants, setFilteredPlants] = useState<PlantLibraryEntry[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState<string>('all');
//   const [loading, setLoading] = useState(true);
//   const [selectedPlant, setSelectedPlant] = useState<PlantLibraryEntry | null>(null);

//   // Sample plant library data
//   const samplePlants: PlantLibraryEntry[] = [
//     {
//       id: '1',
//       commonName: 'Tomato',
//       scientificName: 'Solanum lycopersicum',
//       family: 'Solanaceae',
//       type: 'vegetable',
//       description: 'Popular warm-season vegetable that produces juicy, flavorful fruits. Perfect for home gardens and containers.',
//       careInstructions: {
//         watering: 'Water deeply 1-2 times per week. Keep soil consistently moist but not waterlogged.',
//         sunlight: 'full-sun',
//         soil: 'Well-draining, fertile soil with pH 6.0-6.8. Rich in organic matter.',
//         temperature: '65-85°F (18-29°C) during growing season',
//         humidity: '40-70% relative humidity',
//         fertilizing: 'Feed every 2-3 weeks with balanced fertilizer during growing season',
//         pruning: 'Remove suckers and lower leaves. Prune for air circulation.'
//       },
//       growingConditions: {
//         hardiness: 'USDA zones 2-11 (annual)',
//         spacing: '18-24 inches apart',
//         height: '3-6 feet',
//         spread: '18-24 inches'
//       },
//       seasonalCare: {
//         spring: ['Start seeds indoors', 'Prepare soil with compost', 'Transplant after last frost'],
//         summer: ['Regular watering', 'Stake tall varieties', 'Harvest ripe fruits'],
//         fall: ['Harvest green tomatoes before frost', 'Collect seeds for next year'],
//         winter: ['Plan next year\'s varieties', 'Clean up garden beds']
//       },
//       commonIssues: ['Blight', 'Blossom end rot', 'Hornworms', 'Cracking'],
//       companionPlants: ['Basil', 'Marigolds', 'Peppers', 'Carrots'],
//       createdAt: new Date()
//     },
//     {
//       id: '2',
//       commonName: 'Basil',
//       scientificName: 'Ocimum basilicum',
//       family: 'Lamiaceae',
//       type: 'herb',
//       description: 'Aromatic herb with sweet, peppery flavor. Essential for cooking and companion planting.',
//       careInstructions: {
//         watering: 'Water when top inch of soil is dry. Avoid overhead watering.',
//         sunlight: 'full-sun',
//         soil: 'Well-draining, fertile soil with pH 6.0-7.0',
//         temperature: '70-80°F (21-27°C) optimal',
//         humidity: '40-60% relative humidity',
//         fertilizing: 'Light feeding every 3-4 weeks with balanced fertilizer',
//         pruning: 'Pinch flowers to encourage leaf growth. Regular harvesting.'
//       },
//       growingConditions: {
//         hardiness: 'USDA zones 2-11 (annual)',
//         spacing: '6-12 inches apart',
//         height: '12-24 inches',
//         spread: '6-12 inches'
//       },
//       seasonalCare: {
//         spring: ['Start seeds indoors', 'Transplant after soil warms'],
//         summer: ['Regular harvesting', 'Pinch flowers', 'Adequate watering'],
//         fall: ['Harvest before frost', 'Dry leaves for storage'],
//         winter: ['Grow indoors on sunny windowsill']
//       },
//       commonIssues: ['Fusarium wilt', 'Aphids', 'Downy mildew'],
//       companionPlants: ['Tomatoes', 'Peppers', 'Oregano'],
//       createdAt: new Date()
//     },
//     {
//       id: '3',
//       commonName: 'Snake Plant',
//       scientificName: 'Sansevieria trifasciata',
//       family: 'Asparagaceae',
//       type: 'houseplant',
//       description: 'Low-maintenance succulent with striking upright leaves. Perfect for beginners and low-light conditions.',
//       careInstructions: {
//         watering: 'Water every 2-6 weeks. Allow soil to dry completely between waterings.',
//         sunlight: 'indirect',
//         soil: 'Well-draining cactus or succulent mix',
//         temperature: '65-80°F (18-27°C)',
//         humidity: '30-50% relative humidity',
//         fertilizing: 'Feed monthly in spring/summer with diluted liquid fertilizer',
//         pruning: 'Remove damaged or yellowing leaves at soil level'
//       },
//       growingConditions: {
//         hardiness: 'USDA zones 9-12 (houseplant elsewhere)',
//         spacing: '12-18 inches apart',
//         height: '1-4 feet',
//         spread: '6-12 inches'
//       },
//       seasonalCare: {
//         spring: ['Resume regular watering', 'Begin fertilizing'],
//         summer: ['Monitor for pests', 'Provide bright indirect light'],
//         fall: ['Reduce watering frequency', 'Stop fertilizing'],
//         winter: ['Minimal watering', 'Protect from cold drafts']
//       },
//       commonIssues: ['Root rot', 'Spider mites', 'Overwatering'],
//       companionPlants: ['Pothos', 'ZZ Plant', 'Peace Lily'],
//       createdAt: new Date()
//     },
//     {
//       id: '4',
//       commonName: 'Lavender',
//       scientificName: 'Lavandula angustifolia',
//       family: 'Lamiaceae',
//       type: 'herb',
//       description: 'Fragrant perennial herb with beautiful purple flowers. Attracts pollinators and repels pests.',
//       careInstructions: {
//         watering: 'Water deeply but infrequently. Drought tolerant once established.',
//         sunlight: 'full-sun',
//         soil: 'Well-draining, alkaline soil with pH 6.5-7.5',
//         temperature: 'Hardy to -10°F (-23°C)',
//         humidity: 'Low humidity preferred',
//         fertilizing: 'Minimal feeding. Compost in spring if needed',
//         pruning: 'Prune after flowering to maintain shape'
//       },
//       growingConditions: {
//         hardiness: 'USDA zones 5-9',
//         spacing: '12-18 inches apart',
//         height: '1-3 feet',
//         spread: '2-4 feet'
//       },
//       seasonalCare: {
//         spring: ['Light pruning', 'Apply compost mulch'],
//         summer: ['Harvest flowers for drying', 'Deadhead spent blooms'],
//         fall: ['Final harvest', 'Reduce watering'],
//         winter: ['Protect from harsh winds', 'Minimal watering']
//       },
//       commonIssues: ['Root rot', 'Fungal diseases', 'Overwatering'],
//       companionPlants: ['Rosemary', 'Thyme', 'Roses'],
//       createdAt: new Date()
//     },
//     {
//       id: '5',
//       commonName: 'Marigold',
//       scientificName: 'Tagetes patula',
//       family: 'Asteraceae',
//       type: 'flower',
//       description: 'Bright, cheerful annual flowers that repel pests and attract beneficial insects.',
//       careInstructions: {
//         watering: 'Water at soil level to avoid wetting foliage. Moderate watering.',
//         sunlight: 'full-sun',
//         soil: 'Well-draining soil, tolerates poor soil',
//         temperature: '65-75°F (18-24°C) optimal',
//         humidity: 'Moderate humidity',
//         fertilizing: 'Light feeding monthly with balanced fertilizer',
//         pruning: 'Deadhead regularly to encourage more blooms'
//       },
//       growingConditions: {
//         hardiness: 'USDA zones 2-11 (annual)',
//         spacing: '6-10 inches apart',
//         height: '6-18 inches',
//         spread: '6-12 inches'
//       },
//       seasonalCare: {
//         spring: ['Direct sow seeds after frost danger', 'Prepare planting beds'],
//         summer: ['Regular deadheading', 'Monitor for pests'],
//         fall: ['Collect seeds for next year', 'Continue deadheading'],
//         winter: ['Clean up spent plants', 'Plan next year\'s garden']
//       },
//       commonIssues: ['Aphids', 'Spider mites', 'Powdery mildew'],
//       companionPlants: ['Tomatoes', 'Peppers', 'Beans'],
//       createdAt: new Date()
//     }
//   ];

//   useEffect(() => {
//     // In a real app, this would fetch from Firestore
//     // For now, we'll use sample data
//     setPlants(samplePlants);
//     setFilteredPlants(samplePlants);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     let filtered = plants;

//     if (searchTerm) {
//       filtered = filtered.filter(plant =>
//         plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         plant.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedType !== 'all') {
//       filtered = filtered.filter(plant => plant.type === selectedType);
//     }

//     setFilteredPlants(filtered);
//   }, [searchTerm, selectedType, plants]);

//   const getSunlightIcon = (sunlight: string) => {
//     switch (sunlight) {
//       case 'full-sun': return <Sun className="h-4 w-4 text-yellow-500" />;
//       case 'partial-sun': return <Sun className="h-4 w-4 text-orange-500" />;
//       case 'shade': return <Sun className="h-4 w-4 text-gray-500" />;
//       case 'indirect': return <Sun className="h-4 w-4 text-blue-500" />;
//       default: return <Sun className="h-4 w-4 text-gray-400" />;
//     }
//   };

//   const getTypeColor = (type: string) => {
//     const colors = {
//       vegetable: 'bg-green-100 text-green-800',
//       herb: 'bg-purple-100 text-purple-800',
//       flower: 'bg-pink-100 text-pink-800',
//       tree: 'bg-brown-100 text-brown-800',
//       shrub: 'bg-emerald-100 text-emerald-800',
//       succulent: 'bg-teal-100 text-teal-800',
//       houseplant: 'bg-indigo-100 text-indigo-800',
//       fruit: 'bg-orange-100 text-orange-800'
//     };
//     return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading plant library...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Plant Library</h1>
//           <p className="text-muted-foreground">
//             Discover detailed care information for hundreds of plant species.
//           </p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search plants by name or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={selectedType} onValueChange={setSelectedType}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by type" />
//           </SelectTrigger>
//           <SelectContent >
//             <SelectItem value="all">All Types</SelectItem>
//             <SelectItem value="vegetable">Vegetables</SelectItem>
//             <SelectItem value="herb">Herbs</SelectItem>
//             <SelectItem value="flower">Flowers</SelectItem>
//             <SelectItem value="houseplant">Houseplants</SelectItem>
//             <SelectItem value="succulent">Succulents</SelectItem>
//             <SelectItem value="tree">Trees</SelectItem>
//             <SelectItem value="shrub">Shrubs</SelectItem>
//             <SelectItem value="fruit">Fruits</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Plant Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPlants.map((plant) => (
//           <Card key={plant.id} className="cursor-pointer hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <CardTitle className="text-lg">{plant.commonName}</CardTitle>
//                   <CardDescription className="italic">{plant.scientificName}</CardDescription>
//                 </div>
//                 <Badge className={getTypeColor(plant.type)}>
//                   {plant.type}
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
//                 {plant.description}
//               </p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   {getSunlightIcon(plant.careInstructions.sunlight)}
//                   <Droplets className="h-4 w-4 text-blue-500" />
//                   <Thermometer className="h-4 w-4 text-red-500" />
//                 </div>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" size="sm" onClick={() => setSelectedPlant(plant)}>
//                       View Details
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle className="flex items-center justify-between">
//                         <div>
//                           <span className="text-2xl">{plant.commonName}</span>
//                           <p className="text-sm text-muted-foreground italic mt-1">
//                             {plant.scientificName} • {plant.family}
//                           </p>
//                         </div>
//                         <Badge className={getTypeColor(plant.type)}>
//                           {plant.type}
//                         </Badge>
//                       </DialogTitle>
//                       <DialogDescription>
//                         {plant.description}
//                       </DialogDescription>
//                     </DialogHeader>
                    
//                     <Tabs defaultValue="care" className="mt-6">
//                       <TabsList className="grid w-full grid-cols-4">
//                         <TabsTrigger value="care">Care Guide</TabsTrigger>
//                         <TabsTrigger value="seasonal">Seasonal Care</TabsTrigger>
//                         <TabsTrigger value="issues">Common Issues</TabsTrigger>
//                         <TabsTrigger value="companions">Companions</TabsTrigger>
//                       </TabsList>
                      
//                       <TabsContent value="care" className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <Card>
//                             <CardHeader className="pb-3">
//                               <CardTitle className="text-sm flex items-center">
//                                 <Droplets className="mr-2 h-4 w-4 text-blue-500" />
//                                 Watering
//                               </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-sm">{plant.careInstructions.watering}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-3">
//                               <CardTitle className="text-sm flex items-center">
//                                 <Sun className="mr-2 h-4 w-4 text-yellow-500" />
//                                 Sunlight
//                               </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-sm capitalize">{plant.careInstructions.sunlight.replace('-', ' ')}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-3">
//                               <CardTitle className="text-sm flex items-center">
//                                 <Leaf className="mr-2 h-4 w-4 text-green-500" />
//                                 Soil
//                               </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-sm">{plant.careInstructions.soil}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-3">
//                               <CardTitle className="text-sm flex items-center">
//                                 <Thermometer className="mr-2 h-4 w-4 text-red-500" />
//                                 Temperature
//                               </CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-sm">{plant.careInstructions.temperature}</p>
//                             </CardContent>
//                           </Card>
//                         </div>
//                       </TabsContent>
                      
//                       <TabsContent value="seasonal" className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {Object.entries(plant.seasonalCare).map(([season, tasks]) => (
//                             <Card key={season}>
//                               <CardHeader>
//                                 <CardTitle className="text-lg capitalize">{season}</CardTitle>
//                               </CardHeader>
//                               <CardContent>
//                                 <ul className="space-y-2">
//                                   {tasks.map((task, index) => (
//                                     <li key={index} className="text-sm flex items-start">
//                                       <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                                       {task}
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </CardContent>
//                             </Card>
//                           ))}
//                         </div>
//                       </TabsContent>
                      
//                       <TabsContent value="issues">
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center">
//                               <Bug className="mr-2 h-5 w-5" />
//                               Common Issues
//                             </CardTitle>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="flex flex-wrap gap-2">
//                               {plant.commonIssues.map((issue, index) => (
//                                 <Badge key={index} variant="outline">
//                                   {issue}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </TabsContent>
                      
//                       <TabsContent value="companions">
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center">
//                               <Users className="mr-2 h-5 w-5" />
//                               Companion Plants
//                             </CardTitle>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="flex flex-wrap gap-2">
//                               {plant.companionPlants.map((companion, index) => (
//                                 <Badge key={index} className="bg-green-100 text-green-800">
//                                   {companion}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </TabsContent>
//                     </Tabs>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredPlants.length === 0 && (
//         <div className="text-center py-12">
//           <Leaf className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search terms or filters.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import { PlantLibraryEntry } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Leaf, Sun, Droplets, Thermometer, Scissors, Bug, Users, BookOpen, Filter } from 'lucide-react';

export default function PlantLibrary() {
  const [plants, setPlants] = useState<PlantLibraryEntry[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantLibraryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantLibraryEntry | null>(null);

  // Sample plant library data
  const samplePlants: PlantLibraryEntry[] = [
    {
      id: '1',
      commonName: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      family: 'Solanaceae',
      type: 'vegetable',
      description: 'Popular warm-season vegetable that produces juicy, flavorful fruits. Perfect for home gardens and containers.',
      careInstructions: {
        watering: 'Water deeply 1-2 times per week. Keep soil consistently moist but not waterlogged.',
        sunlight: 'full-sun',
        soil: 'Well-draining, fertile soil with pH 6.0-6.8. Rich in organic matter.',
        temperature: '65-85°F (18-29°C) during growing season',
        humidity: '40-70% relative humidity',
        fertilizing: 'Feed every 2-3 weeks with balanced fertilizer during growing season',
        pruning: 'Remove suckers and lower leaves. Prune for air circulation.'
      },
      growingConditions: {
        hardiness: 'USDA zones 2-11 (annual)',
        spacing: '18-24 inches apart',
        height: '3-6 feet',
        spread: '18-24 inches'
      },
      seasonalCare: {
        spring: ['Start seeds indoors', 'Prepare soil with compost', 'Transplant after last frost'],
        summer: ['Regular watering', 'Stake tall varieties', 'Harvest ripe fruits'],
        fall: ['Harvest green tomatoes before frost', 'Collect seeds for next year'],
        winter: ['Plan next year\'s varieties', 'Clean up garden beds']
      },
      commonIssues: ['Blight', 'Blossom end rot', 'Hornworms', 'Cracking'],
      companionPlants: ['Basil', 'Marigolds', 'Peppers', 'Carrots'],
      createdAt: new Date()
    },
    {
      id: '2',
      commonName: 'Basil',
      scientificName: 'Ocimum basilicum',
      family: 'Lamiaceae',
      type: 'herb',
      description: 'Aromatic herb with sweet, peppery flavor. Essential for cooking and companion planting.',
      careInstructions: {
        watering: 'Water when top inch of soil is dry. Avoid overhead watering.',
        sunlight: 'full-sun',
        soil: 'Well-draining, fertile soil with pH 6.0-7.0',
        temperature: '70-80°F (21-27°C) optimal',
        humidity: '40-60% relative humidity',
        fertilizing: 'Light feeding every 3-4 weeks with balanced fertilizer',
        pruning: 'Pinch flowers to encourage leaf growth. Regular harvesting.'
      },
      growingConditions: {
        hardiness: 'USDA zones 2-11 (annual)',
        spacing: '6-12 inches apart',
        height: '12-24 inches',
        spread: '6-12 inches'
      },
      seasonalCare: {
        spring: ['Start seeds indoors', 'Transplant after soil warms'],
        summer: ['Regular harvesting', 'Pinch flowers', 'Adequate watering'],
        fall: ['Harvest before frost', 'Dry leaves for storage'],
        winter: ['Grow indoors on sunny windowsill']
      },
      commonIssues: ['Fusarium wilt', 'Aphids', 'Downy mildew'],
      companionPlants: ['Tomatoes', 'Peppers', 'Oregano'],
      createdAt: new Date()
    },
    {
      id: '3',
      commonName: 'Snake Plant',
      scientificName: 'Sansevieria trifasciata',
      family: 'Asparagaceae',
      type: 'houseplant',
      description: 'Low-maintenance succulent with striking upright leaves. Perfect for beginners and low-light conditions.',
      careInstructions: {
        watering: 'Water every 2-6 weeks. Allow soil to dry completely between waterings.',
        sunlight: 'indirect',
        soil: 'Well-draining cactus or succulent mix',
        temperature: '65-80°F (18-27°C)',
        humidity: '30-50% relative humidity',
        fertilizing: 'Feed monthly in spring/summer with diluted liquid fertilizer',
        pruning: 'Remove damaged or yellowing leaves at soil level'
      },
      growingConditions: {
        hardiness: 'USDA zones 9-12 (houseplant elsewhere)',
        spacing: '12-18 inches apart',
        height: '1-4 feet',
        spread: '6-12 inches'
      },
      seasonalCare: {
        spring: ['Resume regular watering', 'Begin fertilizing'],
        summer: ['Monitor for pests', 'Provide bright indirect light'],
        fall: ['Reduce watering frequency', 'Stop fertilizing'],
        winter: ['Minimal watering', 'Protect from cold drafts']
      },
      commonIssues: ['Root rot', 'Spider mites', 'Overwatering'],
      companionPlants: ['Pothos', 'ZZ Plant', 'Peace Lily'],
      createdAt: new Date()
    },
    {
      id: '4',
      commonName: 'Lavender',
      scientificName: 'Lavandula angustifolia',
      family: 'Lamiaceae',
      type: 'herb',
      description: 'Fragrant perennial herb with beautiful purple flowers. Attracts pollinators and repels pests.',
      careInstructions: {
        watering: 'Water deeply but infrequently. Drought tolerant once established.',
        sunlight: 'full-sun',
        soil: 'Well-draining, alkaline soil with pH 6.5-7.5',
        temperature: 'Hardy to -10°F (-23°C)',
        humidity: 'Low humidity preferred',
        fertilizing: 'Minimal feeding. Compost in spring if needed',
        pruning: 'Prune after flowering to maintain shape'
      },
      growingConditions: {
        hardiness: 'USDA zones 5-9',
        spacing: '12-18 inches apart',
        height: '1-3 feet',
        spread: '2-4 feet'
      },
      seasonalCare: {
        spring: ['Light pruning', 'Apply compost mulch'],
        summer: ['Harvest flowers for drying', 'Deadhead spent blooms'],
        fall: ['Final harvest', 'Reduce watering'],
        winter: ['Protect from harsh winds', 'Minimal watering']
      },
      commonIssues: ['Root rot', 'Fungal diseases', 'Overwatering'],
      companionPlants: ['Rosemary', 'Thyme', 'Roses'],
      createdAt: new Date()
    },
    {
      id: '5',
      commonName: 'Marigold',
      scientificName: 'Tagetes patula',
      family: 'Asteraceae',
      type: 'flower',
      description: 'Bright, cheerful annual flowers that repel pests and attract beneficial insects.',
      careInstructions: {
        watering: 'Water at soil level to avoid wetting foliage. Moderate watering.',
        sunlight: 'full-sun',
        soil: 'Well-draining soil, tolerates poor soil',
        temperature: '65-75°F (18-24°C) optimal',
        humidity: 'Moderate humidity',
        fertilizing: 'Light feeding monthly with balanced fertilizer',
        pruning: 'Deadhead regularly to encourage more blooms'
      },
      growingConditions: {
        hardiness: 'USDA zones 2-11 (annual)',
        spacing: '6-10 inches apart',
        height: '6-18 inches',
        spread: '6-12 inches'
      },
      seasonalCare: {
        spring: ['Direct sow seeds after frost danger', 'Prepare planting beds'],
        summer: ['Regular deadheading', 'Monitor for pests'],
        fall: ['Collect seeds for next year', 'Continue deadheading'],
        winter: ['Clean up spent plants', 'Plan next year\'s garden']
      },
      commonIssues: ['Aphids', 'Spider mites', 'Powdery mildew'],
      companionPlants: ['Tomatoes', 'Peppers', 'Beans'],
      createdAt: new Date()
    },
    {
      id: '6',
      commonName: 'Peace Lily',
      scientificName: 'Spathiphyllum wallisii',
      family: 'Araceae',
      type: 'houseplant',
      description: 'Elegant houseplant with glossy leaves and white flowers. Excellent air purifier.',
      careInstructions: {
        watering: 'Keep soil consistently moist but not soggy. Water when top inch is dry.',
        sunlight: 'indirect',
        soil: 'Well-draining potting mix with peat',
        temperature: '65-80°F (18-27°C)',
        humidity: '40-60% relative humidity',
        fertilizing: 'Feed monthly in spring/summer with diluted liquid fertilizer',
        pruning: 'Remove spent flowers and yellowing leaves'
      },
      growingConditions: {
        hardiness: 'USDA zones 11-12 (houseplant elsewhere)',
        spacing: '12-18 inches apart',
        height: '1-3 feet',
        spread: '1-2 feet'
      },
      seasonalCare: {
        spring: ['Resume regular feeding', 'Repot if needed'],
        summer: ['Maintain consistent moisture', 'Provide humidity'],
        fall: ['Reduce feeding frequency', 'Monitor for pests'],
        winter: ['Reduce watering', 'Protect from cold drafts']
      },
      commonIssues: ['Brown leaf tips', 'Root rot', 'Scale insects'],
      companionPlants: ['Snake Plant', 'Pothos', 'Philodendron'],
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setPlants(samplePlants);
    setFilteredPlants(samplePlants);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = plants;

    if (searchTerm) {
      filtered = filtered.filter(plant =>
        plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(plant => plant.type === selectedType);
    }

    setFilteredPlants(filtered);
  }, [searchTerm, selectedType, plants]);

  const getSunlightIcon = (sunlight: string) => {
    switch (sunlight) {
      case 'full-sun': return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'partial-sun': return <Sun className="h-5 w-5 text-orange-500" />;
      case 'shade': return <Sun className="h-5 w-5 text-gray-500" />;
      case 'indirect': return <Sun className="h-5 w-5 text-blue-500" />;
      default: return <Sun className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      vegetable: 'bg-green-100 text-green-800 border-green-200',
      herb: 'bg-purple-100 text-purple-800 border-purple-200',
      flower: 'bg-pink-100 text-pink-800 border-pink-200',
      tree: 'bg-amber-100 text-amber-800 border-amber-200',
      shrub: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      succulent: 'bg-teal-100 text-teal-800 border-teal-200',
      houseplant: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      fruit: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeEmoji = (type: string) => {
    const emojis = {
      vegetable: '🥕',
      herb: '🌿',
      flower: '🌸',
      tree: '🌳',
      shrub: '🌲',
      succulent: '🌵',
      houseplant: '🪴',
      fruit: '🍎'
    };
    return emojis[type as keyof typeof emojis] || '🌱';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading plant library...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-green-600 flex items-center">
              <BookOpen className="mr-3 h-10 w-10" />
              Plant Library
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Discover detailed care information for hundreds of plant species
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-4 py-2">
              {filteredPlants.length} Plants Available
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="text-green-700 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search & Filter Plants
            </CardTitle>
            <CardDescription className="text-gray-600">
              Find the perfect plants for your garden and growing conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search plants by name, scientific name, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg bg-white border-2 border-gray-200 focus:border-green-500"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48 h-12 bg-white border-2 border-gray-200">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vegetable">🥕 Vegetables</SelectItem>
                  <SelectItem value="herb">🌿 Herbs</SelectItem>
                  <SelectItem value="flower">🌸 Flowers</SelectItem>
                  <SelectItem value="houseplant">🪴 Houseplants</SelectItem>
                  <SelectItem value="succulent">🌵 Succulents</SelectItem>
                  <SelectItem value="tree">🌳 Trees</SelectItem>
                  <SelectItem value="shrub">🌲 Shrubs</SelectItem>
                  <SelectItem value="fruit">🍎 Fruits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Plant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <Card key={plant.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer">
              <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-3xl">{getTypeEmoji(plant.type)}</span>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {plant.commonName}
                      </CardTitle>
                      <CardDescription className="italic text-gray-600">
                        {plant.scientificName}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`${getTypeColor(plant.type)} border font-medium`}>
                    {plant.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {plant.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getSunlightIcon(plant.careInstructions.sunlight)}
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <Leaf className="h-5 w-5 text-green-500" />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-4xl">{getTypeEmoji(plant.type)}</span>
                            <div>
                              <span className="text-2xl font-bold text-gray-800">{plant.commonName}</span>
                              <p className="text-sm text-gray-600 italic mt-1">
                                {plant.scientificName} • {plant.family}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${getTypeColor(plant.type)} border font-medium text-lg px-3 py-1`}>
                            {plant.type}
                          </Badge>
                        </DialogTitle>
                        <DialogDescription className="text-gray-700 text-base leading-relaxed">
                          {plant.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="care" className="mt-6">
                        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                          <TabsTrigger value="care" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                            🌱 Care Guide
                          </TabsTrigger>
                          <TabsTrigger value="seasonal" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                            📅 Seasonal Care
                          </TabsTrigger>
                          <TabsTrigger value="issues" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                            🐛 Common Issues
                          </TabsTrigger>
                          <TabsTrigger value="companions" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                            👥 Companions
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="care" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="border-2 border-blue-100">
                              <CardHeader className="pb-3 bg-blue-50">
                                <CardTitle className="text-sm flex items-center text-blue-700">
                                  <Droplets className="mr-2 h-4 w-4" />
                                  Watering
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-700">{plant.careInstructions.watering}</p>
                              </CardContent>
                            </Card>
                            
                            <Card className="border-2 border-yellow-100">
                              <CardHeader className="pb-3 bg-yellow-50">
                                <CardTitle className="text-sm flex items-center text-yellow-700">
                                  <Sun className="mr-2 h-4 w-4" />
                                  Sunlight
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-700 capitalize">{plant.careInstructions.sunlight.replace('-', ' ')}</p>
                              </CardContent>
                            </Card>
                            
                            <Card className="border-2 border-green-100">
                              <CardHeader className="pb-3 bg-green-50">
                                <CardTitle className="text-sm flex items-center text-green-700">
                                  <Leaf className="mr-2 h-4 w-4" />
                                  Soil
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-700">{plant.careInstructions.soil}</p>
                              </CardContent>
                            </Card>
                            
                            <Card className="border-2 border-red-100">
                              <CardHeader className="pb-3 bg-red-50">
                                <CardTitle className="text-sm flex items-center text-red-700">
                                  <Thermometer className="mr-2 h-4 w-4" />
                                  Temperature
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-700">{plant.careInstructions.temperature}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="seasonal" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(plant.seasonalCare).map(([season, tasks]) => {
                              const seasonColors = {
                                spring: 'border-green-200 bg-green-50',
                                summer: 'border-yellow-200 bg-yellow-50',
                                fall: 'border-orange-200 bg-orange-50',
                                winter: 'border-blue-200 bg-blue-50'
                              };
                              const seasonEmojis = {
                                spring: '🌸',
                                summer: '☀️',
                                fall: '🍂',
                                winter: '❄️'
                              };
                              return (
                                <Card key={season} className={`border-2 ${seasonColors[season as keyof typeof seasonColors]}`}>
                                  <CardHeader>
                                    <CardTitle className="text-lg capitalize flex items-center">
                                      <span className="mr-2 text-xl">{seasonEmojis[season as keyof typeof seasonEmojis]}</span>
                                      {season}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {tasks.map((task, index) => (
                                        <li key={index} className="text-sm flex items-start">
                                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                          {task}
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="issues">
                          <Card className="border-2 border-red-100">
                            <CardHeader className="bg-red-50">
                              <CardTitle className="flex items-center text-red-700">
                                <Bug className="mr-2 h-5 w-5" />
                                Common Issues & Problems
                              </CardTitle>
                              <CardDescription className="text-red-600">
                                Watch out for these common problems when growing {plant.commonName}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="flex flex-wrap gap-3">
                                {plant.commonIssues.map((issue, index) => (
                                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-sm px-3 py-1">
                                    🚨 {issue}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="companions">
                          <Card className="border-2 border-purple-100">
                            <CardHeader className="bg-purple-50">
                              <CardTitle className="flex items-center text-purple-700">
                                <Users className="mr-2 h-5 w-5" />
                                Companion Plants
                              </CardTitle>
                              <CardDescription className="text-purple-600">
                                These plants grow well together with {plant.commonName}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="flex flex-wrap gap-3">
                                {plant.companionPlants.map((companion, index) => (
                                  <Badge key={index} className="bg-green-100 text-green-800 border-green-200 text-sm px-3 py-1">
                                    🤝 {companion}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="text-center py-16">
              <Leaf className="mx-auto h-20 w-20 text-gray-400 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">No plants found</h3>
              <p className="text-lg text-gray-500 mb-6">
                Try adjusting your search terms or filters to find the plants you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
 