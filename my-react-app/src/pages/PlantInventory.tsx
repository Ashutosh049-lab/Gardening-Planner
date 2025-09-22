
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, orderBy } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { Plant } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Plus, Search, Filter } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';

// export default function PlantInventory() {
//   const { currentUser } = useAuth();
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchPlants = async () => {
//       try {
//         const plantsQuery = query(
//           collection(db, 'users', currentUser.id, 'plants'),
//           orderBy('createdAt', 'desc')
//         );
//         const plantsSnapshot = await getDocs(plantsQuery);
//         const plantsData = plantsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date(),
//           plantedOn: doc.data().plantedOn?.toDate() || new Date(),
//           lastWateredAt: doc.data().lastWateredAt?.toDate()
//         })) as Plant[];

//         setPlants(plantsData);
//         setFilteredPlants(plantsData);
//       } catch (error) {
//         console.error('Error fetching plants:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlants();
//   }, [currentUser]);

//   useEffect(() => {
//     const filtered = plants.filter(plant =>
//       plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       plant.notes.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPlants(filtered);
//   }, [searchTerm, plants]);

//   const getHealthStatusColor = (status: string) => {
//     switch (status) {
//       case 'excellent': return 'bg-green-100 text-green-800';
//       case 'good': return 'bg-blue-100 text-blue-800';
//       case 'fair': return 'bg-yellow-100 text-yellow-800';
//       case 'poor': return 'bg-orange-100 text-orange-800';
//       case 'critical': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading plants...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">My Plants</h1>
//           <p className="text-muted-foreground">
//             Manage your plant collection and track their health.
//           </p>
//         </div>
//         <Link to="/plants/add">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Plant
//           </Button>
//         </Link>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex items-center space-x-4">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Search plants..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//         <Button variant="outline">
//           <Filter className="mr-2 h-4 w-4" />
//           Filter
//         </Button>
//       </div>

//       {/* Plants Grid */}
//       {filteredPlants.length === 0 ? (
//         <div className="text-center py-12">
//           {plants.length === 0 ? (
//             <div>
//               <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No plants yet</h3>
//               <p className="text-muted-foreground mb-6">
//                 Start your garden by adding your first plant!
//               </p>
//               <Link to="/plants/add">
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Your First Plant
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search terms.
//               </p>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredPlants.map((plant) => (
//             <Card key={plant.id} className="hover:shadow-md transition-shadow cursor-pointer">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="font-semibold text-lg">{plant.nickname}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Planted {format(plant.plantedOn, 'MMM d, yyyy')}
//                     </p>
//                   </div>
//                   <Badge className={getHealthStatusColor(plant.healthStatus)}>
//                     {plant.healthStatus}
//                   </Badge>
//                 </div>

//                 {plant.images.length > 0 && (
//                   <div className="mb-4">
//                     <img
//                       src={plant.images[0]}
//                       alt={plant.nickname}
//                       className="w-full h-32 object-cover rounded-md"
//                     />
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Pot Size:</span>
//                     <span>{plant.potSize}</span>
//                   </div>
//                   {plant.lastWateredAt && (
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Last Watered:</span>
//                       <span>{format(plant.lastWateredAt, 'MMM d')}</span>
//                     </div>
//                   )}
//                 </div>

//                 {plant.notes && (
//                   <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
//                     {plant.notes}
//                   </p>
//                 )}

//                 <div className="mt-4 flex space-x-2">
//                   <Button variant="outline" size="sm" className="flex-1">
//                     View Details
//                   </Button>
//                   <Button variant="outline" size="sm" className="flex-1">
//                     Add Journal
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }










// import { useEffect, useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Plus, Search, Filter, Droplets, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface Plant {
//   id: string;
//   nickname: string;
//   scientificName?: string;
//   category: string;
//   plantedOn: Date;
//   healthStatus: string;
//   potSize: string;
//   lastWateredAt?: Date;
//   notes: string;
//   images: string[];
//   createdAt: Date;
// }

// export default function PlantInventory() {
//   const { currentUser } = useAuth();
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Sample plants data
//   const samplePlants: Plant[] = [
//     {
//       id: '1',
//       nickname: 'Cherry Tomato',
//       scientificName: 'Solanum lycopersicum',
//       category: 'vegetable',
//       plantedOn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
//       healthStatus: 'excellent',
//       potSize: 'Large (12")',
//       lastWateredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//       notes: 'Growing well, first flowers appearing. Regular watering needed.',
//       images: [],
//       createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '2',
//       nickname: 'Sweet Basil',
//       scientificName: 'Ocimum basilicum',
//       category: 'herb',
//       plantedOn: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
//       healthStatus: 'good',
//       potSize: 'Medium (8")',
//       lastWateredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//       notes: 'Regular harvesting for cooking. Pinching flowers to encourage leaf growth.',
//       images: [],
//       createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '3',
//       nickname: 'Sunflower Giant',
//       scientificName: 'Helianthus annuus',
//       category: 'flower',
//       plantedOn: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
//       healthStatus: 'excellent',
//       potSize: 'Extra Large (16")',
//       lastWateredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//       notes: 'Growing tall and strong. Needs support stake soon.',
//       images: [],
//       createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '4',
//       nickname: 'Lavender Bush',
//       scientificName: 'Lavandula angustifolia',
//       category: 'herb',
//       plantedOn: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
//       healthStatus: 'good',
//       potSize: 'Large (12")',
//       lastWateredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
//       notes: 'Fragrant and beautiful. Needs less frequent watering.',
//       images: [],
//       createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '5',
//       nickname: 'Spider Plant',
//       scientificName: 'Chlorophytum comosum',
//       category: 'houseplant',
//       plantedOn: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
//       healthStatus: 'fair',
//       potSize: 'Medium (8")',
//       lastWateredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
//       notes: 'Easy care plant. Producing baby plants for propagation.',
//       images: [],
//       createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '6',
//       nickname: 'Rose Bush',
//       scientificName: 'Rosa gallica',
//       category: 'flower',
//       plantedOn: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
//       healthStatus: 'good',
//       potSize: 'Large (12")',
//       lastWateredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//       notes: 'Beautiful red roses. Regular pruning needed for health.',
//       images: [],
//       createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
//     }
//   ];

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchPlants = async () => {
//       try {
//         // Using sample data instead of Firebase
//         setPlants(samplePlants);
//         setFilteredPlants(samplePlants);
//       } catch (error) {
//         console.error('Error fetching plants:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlants();
//   }, [currentUser]);

//   useEffect(() => {
//     const filtered = plants.filter(plant =>
//       plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       plant.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setFilteredPlants(filtered);
//   }, [searchTerm, plants]);

//   const getHealthStatusColor = (status: string) => {
//     switch (status) {
//       case 'excellent': return 'bg-green-100 text-green-800';
//       case 'good': return 'bg-blue-100 text-blue-800';
//       case 'fair': return 'bg-yellow-100 text-yellow-800';
//       case 'poor': return 'bg-orange-100 text-orange-800';
//       case 'critical': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'vegetable': return 'bg-green-50 text-green-700';
//       case 'fruit': return 'bg-red-50 text-red-700';
//       case 'herb': return 'bg-purple-50 text-purple-700';
//       case 'flower': return 'bg-pink-50 text-pink-700';
//       case 'houseplant': return 'bg-blue-50 text-blue-700';
//       default: return 'bg-gray-50 text-gray-700';
//     }
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };

//   const formatDateShort = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric'
//     }).format(date);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading plants...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-green-600">My Plants</h1>
//           <p className="text-muted-foreground">
//             Manage your plant collection and track their health.
//           </p>
//         </div>
//         <Link to="/plants/add">
//           <Button className="bg-green-600 hover:bg-green-700 text-white">
//             <Plus className="mr-2 h-4 w-4" />
//             Add Plant
//           </Button>
//         </Link>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex items-center space-x-4">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Search plants..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 bg-white"
//           />
//         </div>
//         <Button variant="outline" className="bg-white">
//           <Filter className="mr-2 h-4 w-4" />
//           Filter
//         </Button>
//       </div>

//       {/* Plants Grid */}
//       {filteredPlants.length === 0 ? (
//         <div className="text-center py-12">
//           {plants.length === 0 ? (
//             <div>
//               <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No plants yet</h3>
//               <p className="text-muted-foreground mb-6">
//                 Start your garden by adding your first plant!
//               </p>
//               <Link to="/plants/add">
//                 <Button className="bg-green-600 hover:bg-green-700 text-white">
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Your First Plant
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
//               <p className="text-muted-foreground">
//                 Try adjusting your search terms.
//               </p>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredPlants.map((plant) => (
//             <Card key={plant.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-200">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg text-gray-900">{plant.nickname}</h3>
//                     {plant.scientificName && (
//                       <p className="text-sm text-muted-foreground italic">
//                         {plant.scientificName}
//                       </p>
//                     )}
//                     <p className="text-sm text-muted-foreground">
//                       Planted {formatDate(plant.plantedOn)}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <Badge className={getHealthStatusColor(plant.healthStatus)}>
//                       {plant.healthStatus}
//                     </Badge>
//                     <Badge variant="outline" className={getCategoryColor(plant.category)}>
//                       {plant.category}
//                     </Badge>
//                   </div>
//                 </div>

//                 {plant.images.length > 0 ? (
//                   <div className="mb-4">
//                     <img
//                       src={plant.images[0]}
//                       alt={plant.nickname}
//                       className="w-full h-32 object-cover rounded-md"
//                     />
//                   </div>
//                 ) : (
//                   <div className="mb-4 h-32 bg-gray-100 rounded-md flex items-center justify-center">
//                     <div className="text-gray-400 text-center">
//                       <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-xs">No image</span>
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Pot Size:</span>
//                     <span className="font-medium">{plant.potSize}</span>
//                   </div>
//                   {plant.lastWateredAt && (
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground flex items-center">
//                         <Droplets className="h-3 w-3 mr-1" />
//                         Last Watered:
//                       </span>
//                       <span className="font-medium">{formatDateShort(plant.lastWateredAt)}</span>
//                     </div>
//                   )}
//                 </div>

//                 {plant.notes && (
//                   <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
//                     {plant.notes}
//                   </p>
//                 )}

//                 <div className="flex space-x-2">
//                   <Button variant="outline" size="sm" className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
//                     View Details
//                   </Button>
//                   <Button variant="outline" size="sm" className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
//                     <Calendar className="h-3 w-3 mr-1" />
//                     Journal
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Summary Stats */}
//       {filteredPlants.length > 0 && (
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//             <div>
//               <div className="text-2xl font-bold text-green-600">{filteredPlants.length}</div>
//               <div className="text-sm text-muted-foreground">Total Plants</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-blue-600">
//                 {filteredPlants.filter(p => ['excellent', 'good'].includes(p.healthStatus)).length}
//               </div>
//               <div className="text-sm text-muted-foreground">Healthy</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-purple-600">
//                 {filteredPlants.filter(p => p.category === 'herb').length}
//               </div>
//               <div className="text-sm text-muted-foreground">Herbs</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-pink-600">
//                 {filteredPlants.filter(p => p.category === 'flower').length}
//               </div>
//               <div className="text-sm text-muted-foreground">Flowers</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Droplets, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Plant {
  id: string;
  nickname: string;
  scientificName?: string;
  category: string;
  plantedOn: Date;
  healthStatus: string;
  potSize: string;
  lastWateredAt?: Date;
  notes: string;
  images: string[];
  createdAt: Date;
}

export default function PlantInventory() {
  const { currentUser } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample plants data
  const samplePlants: Plant[] = [
    {
      id: '1',
      nickname: 'Cherry Tomato',
      scientificName: 'Solanum lycopersicum',
      category: 'vegetable',
      plantedOn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      healthStatus: 'excellent',
      potSize: 'Large (12")',
      lastWateredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      notes: 'Growing well, first flowers appearing. Regular watering needed.',
      images: [],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      nickname: 'Sweet Basil',
      scientificName: 'Ocimum basilicum',
      category: 'herb',
      plantedOn: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      healthStatus: 'good',
      potSize: 'Medium (8")',
      lastWateredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      notes: 'Regular harvesting for cooking. Pinching flowers to encourage leaf growth.',
      images: [],
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      nickname: 'Sunflower Giant',
      scientificName: 'Helianthus annuus',
      category: 'flower',
      plantedOn: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      healthStatus: 'excellent',
      potSize: 'Extra Large (16")',
      lastWateredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      notes: 'Growing tall and strong. Needs support stake soon.',
      images: [],
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      nickname: 'Lavender Bush',
      scientificName: 'Lavandula angustifolia',
      category: 'herb',
      plantedOn: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      healthStatus: 'good',
      potSize: 'Large (12")',
      lastWateredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      notes: 'Fragrant and beautiful. Needs less frequent watering.',
      images: [],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      nickname: 'Spider Plant',
      scientificName: 'Chlorophytum comosum',
      category: 'houseplant',
      plantedOn: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      healthStatus: 'fair',
      potSize: 'Medium (8")',
      lastWateredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      notes: 'Easy care plant. Producing baby plants for propagation.',
      images: [],
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      nickname: 'Rose Bush',
      scientificName: 'Rosa gallica',
      category: 'flower',
      plantedOn: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      healthStatus: 'good',
      potSize: 'Large (12")',
      lastWateredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      notes: 'Beautiful red roses. Regular pruning needed for health.',
      images: [],
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    if (!currentUser) return;

    const fetchPlants = async () => {
      try {
        // Using sample data instead of Firebase
        setPlants(samplePlants);
        setFilteredPlants(samplePlants);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [currentUser]);

  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPlants(filtered);
  }, [searchTerm, plants]);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vegetable': return 'bg-green-50 text-green-700 border-green-200';
      case 'fruit': return 'bg-red-50 text-red-700 border-red-200';
      case 'herb': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'flower': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'houseplant': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatDateShort = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">My Plants</h1>
            <p className="text-gray-600 text-lg">
              Manage your plant collection and track their health.
            </p>
          </div>
          <Link to="/plants/add">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="mr-2 h-5 w-5" />
              Add Plant
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search plants by name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-lg bg-white border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-50 px-6 py-3">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16">
            {plants.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No plants yet</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Start your garden by adding your first plant!
                </p>
                <Link to="/plants/add">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Your First Plant
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No plants found</h3>
                <p className="text-gray-600 text-lg">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlants.map((plant) => (
              <Card key={plant.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white border-0 shadow-lg hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Section */}
                  {plant.images.length > 0 ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={plant.images[0]}
                        alt={plant.nickname}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <div className="text-green-300 text-center">
                        <svg className="mx-auto h-16 w-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">No image</span>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{plant.nickname}</h3>
                        {plant.scientificName && (
                          <p className="text-sm text-gray-500 italic mb-2">
                            {plant.scientificName}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Planted {formatDate(plant.plantedOn)}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`${getHealthStatusColor(plant.healthStatus)} font-medium px-3 py-1`}>
                        {plant.healthStatus}
                      </Badge>
                      <Badge variant="outline" className={`${getCategoryColor(plant.category)} font-medium px-3 py-1`}>
                        {plant.category}
                      </Badge>
                    </div>

                    {/* Plant Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Pot Size:</span>
                        <span className="font-semibold text-gray-900">{plant.potSize}</span>
                      </div>
                      {plant.lastWateredAt && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium flex items-center">
                            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                            Last Watered:
                          </span>
                          <span className="font-semibold text-gray-900">{formatDateShort(plant.lastWateredAt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {plant.notes && (
                      <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                        {plant.notes}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 font-medium py-2">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 font-medium py-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        Journal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredPlants.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Garden Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">{filteredPlants.length}</div>
                <div className="text-sm font-medium text-gray-600">Total Plants</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredPlants.filter(p => ['excellent', 'good'].includes(p.healthStatus)).length}
                </div>
                <div className="text-sm font-medium text-gray-600">Healthy Plants</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {filteredPlants.filter(p => p.category === 'herb').length}
                </div>
                <div className="text-sm font-medium text-gray-600">Herbs</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {filteredPlants.filter(p => p.category === 'flower').length}
                </div>
                <div className="text-sm font-medium text-gray-600">Flowers</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}