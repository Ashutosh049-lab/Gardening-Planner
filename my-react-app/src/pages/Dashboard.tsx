
// import { useEffect, useState } from 'react';
// import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { Plant, JournalEntry } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Droplets, Scissors, Sprout, Plus, Calendar, BookOpen } from 'lucide-react';
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   const { currentUser } = useAuth();
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchDashboardData = async () => {
//       try {
//         // Fetch user's plants
//         const plantsQuery = query(
//           collection(db, 'users', currentUser.id, 'plants'),
//           orderBy('createdAt', 'desc'),
//           limit(6)
//         );
//         const plantsSnapshot = await getDocs(plantsQuery);
//         const plantsData = plantsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date(),
//           plantedOn: doc.data().plantedOn?.toDate() || new Date(),
//           lastWateredAt: doc.data().lastWateredAt?.toDate()
//         })) as Plant[];

//         // Fetch recent journal entries
//         const journalQuery = query(
//           collection(db, 'users', currentUser.id, 'journals'),
//           orderBy('createdAt', 'desc'),
//           limit(5)
//         );
//         const journalSnapshot = await getDocs(journalQuery);
//         const journalData = journalSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date()
//         })) as JournalEntry[];

//         setPlants(plantsData);
//         setRecentEntries(journalData);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [currentUser]);

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

//   const getCareIcon = (action: string) => {
//     switch (action) {
//       case 'watering': return <Droplets className="h-4 w-4" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4" />;
//       case 'pruning': return <Scissors className="h-4 w-4" />;
//       default: return <Calendar className="h-4 w-4" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser?.name}!</h1>
//           <p className="text-muted-foreground">
//             Here's what's happening in your garden today.
//           </p>
//         </div>
//         <Link to="/plants/add">
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Plant
//           </Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
//             <Droplets className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{plants.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
//             <Droplets className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {plants.filter(p => ['excellent', 'good'].includes(p.healthStatus)).length}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Care Due Today</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
//             <BookOpen className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{recentEntries.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Plants */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Plants</CardTitle>
//             <CardDescription>
//               Your most recently added plants
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {plants.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No plants yet</p>
//                 <Link to="/plants/add">
//                   <Button variant="outline">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Your First Plant
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {plants.slice(0, 4).map((plant) => (
//                   <div key={plant.id} className="flex items-center justify-between p-3 rounded-lg border">
//                     <div>
//                       <p className="font-medium">{plant.nickname}</p>
//                       <p className="text-sm text-muted-foreground">
//                         Added {format(plant.createdAt, 'MMM d, yyyy')}
//                       </p>
//                     </div>
//                     <Badge className={getHealthStatusColor(plant.healthStatus)}>
//                       {plant.healthStatus}
//                     </Badge>
//                   </div>
//                 ))}
//                 {plants.length > 4 && (
//                   <Link to="/plants">
//                     <Button variant="outline" className="w-full">
//                       View All Plants
//                     </Button>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Recent Journal Entries */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Your latest journal entries and care activities
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentEntries.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No journal entries yet</p>
//                 <Link to="/journal">
//                   <Button variant="outline">
//                     <BookOpen className="mr-2 h-4 w-4" />
//                     Start Journaling
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentEntries.map((entry) => (
//                   <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-lg border">
//                     <div className="mt-1">
//                       {getCareIcon(entry.careAction || 'other')}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{entry.text}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {format(entry.createdAt, 'MMM d, h:mm a')}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <Link to="/journal">
//                   <Button variant="outline" className="w-full">
//                     View All Entries
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from 'react';
// import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { Plant, JournalEntry } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Droplets, Scissors, Sprout, Plus, Calendar, BookOpen } from 'lucide-react';
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   const { currentUser } = useAuth();
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchDashboardData = async () => {
//       try {
//         // Fetch user's plants
//         const plantsQuery = query(
//           collection(db, 'users', currentUser.id, 'plants'),
//           orderBy('createdAt', 'desc'),
//           limit(6)
//         );
//         const plantsSnapshot = await getDocs(plantsQuery);
//         const plantsData = plantsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date(),
//           plantedOn: doc.data().plantedOn?.toDate() || new Date(),
//           lastWateredAt: doc.data().lastWateredAt?.toDate()
//         })) as Plant[];

//         // Fetch recent journal entries
//         const journalQuery = query(
//           collection(db, 'users', currentUser.id, 'journals'),
//           orderBy('createdAt', 'desc'),
//           limit(5)
//         );
//         const journalSnapshot = await getDocs(journalQuery);
//         const journalData = journalSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date()
//         })) as JournalEntry[];

//         setPlants(plantsData);
//         setRecentEntries(journalData);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [currentUser]);

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

//   const getCareIcon = (action: string) => {
//     switch (action) {
//       case 'watering': return <Droplets className="h-4 w-4" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4" />;
//       case 'pruning': return <Scissors className="h-4 w-4" />;
//       default: return <Calendar className="h-4 w-4" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-blue-600">Welcome back, {currentUser?.name}!</h1>
//           <p className="text-muted-foreground">
//             Here's what's happening in your garden today.
//           </p>
//         </div>
//         <Link to="/plants/add">
//           <Button>
//             <Plus className="mr-2 h-4 w-4 " />
//             Add Plant
//           </Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
//             <Droplets className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{plants.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
//             <Droplets className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {plants.filter(p => ['excellent', 'good'].includes(p.healthStatus)).length}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Care Due Today</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
//             <BookOpen className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{recentEntries.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Plants */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Plants</CardTitle>
//             <CardDescription>
//               Your most recently added plants
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {plants.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No plants yet</p>
//                 <Link to="/plants/add">
//                   <Button variant="outline">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Your First Plant
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {plants.slice(0, 4).map((plant) => (
//                   <div key={plant.id} className="flex items-center justify-between p-3 rounded-lg border">
//                     <div>
//                       <p className="font-medium">{plant.nickname}</p>
//                       <p className="text-sm text-muted-foreground">
//                         Added {format(plant.createdAt, 'MMM d, yyyy')}
//                       </p>
//                     </div>
//                     <Badge className={getHealthStatusColor(plant.healthStatus)}>
//                       {plant.healthStatus}
//                     </Badge>
//                   </div>
//                 ))}
//                 {plants.length > 4 && (
//                   <Link to="/plants">
//                     <Button variant="outline" className="w-full">
//                       View All Plants
//                     </Button>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Recent Journal Entries */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Your latest journal entries and care activities
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentEntries.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No journal entries yet</p>
//                 <Link to="/journal">
//                   <Button variant="outline">
//                     <BookOpen className="mr-2 h-4 w-4" />
//                     Start Journaling
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentEntries.map((entry) => (
//                   <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-lg border">
//                     <div className="mt-1">
//                       {getCareIcon(entry.careAction || 'other')}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{entry.text}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {format(entry.createdAt, 'MMM d, h:mm a')}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <Link to="/journal">
//                   <Button variant="outline" className="w-full">
//                     View All Entries
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { Plant, JournalEntry } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Droplets, Scissors, Sprout, Plus, Calendar, BookOpen } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   const { currentUser } = useAuth();
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Sample data
//   const samplePlants: Plant[] = [
//     {
//       id: '1',
//       name: 'Cherry Tomatoes',
//       scientificName: 'Solanum lycopersicum',
//       variety: 'Sweet 100',
//       category: 'vegetable',
//       plantedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
//       location: 'Garden Bed A',
//       status: 'flowering',
//       notes: 'Growing well, first flowers appearing',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
//       updatedAt: new Date()
//     },
//     {
//       id: '2',
//       name: 'Basil',
//       scientificName: 'Ocimum basilicum',
//       variety: 'Sweet Genovese',
//       category: 'herb',
//       plantedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
//       location: 'Herb Garden',
//       status: 'growing',
//       notes: 'Regular harvesting for cooking',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
//       updatedAt: new Date()
//     },
//     {
//       id: '3',
//       name: 'Sunflower',
//       scientificName: 'Helianthus annuus',
//       variety: 'Mammoth',
//       category: 'flower',
//       plantedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
//       location: 'Front Yard',
//       status: 'flowering',
//       notes: 'Growing tall and strong',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
//       updatedAt: new Date()
//     }
//   ];

//   const sampleEntries: JournalEntry[] = [
//     {
//       id: '1',
//       plantId: '1',
//       plantName: 'Cherry Tomatoes',
//       type: 'watering',
//       title: 'Regular watering',
//       description: 'Watered thoroughly in the morning',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
//     },
//     {
//       id: '2',
//       plantId: '2',
//       plantName: 'Basil',
//       type: 'harvesting',
//       title: 'Harvested leaves',
//       description: 'Picked fresh leaves for dinner',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
//     },
//     {
//       id: '3',
//       plantId: '3',
//       plantName: 'Sunflower',
//       type: 'observation',
//       title: 'Growth check',
//       description: 'Flower head is developing nicely',
//       userId: currentUser?.uid || '',
//       createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
//     }
//   ];

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchDashboardData = async () => {
//       try {
//         // Using sample data instead of Firebase
//         setPlants(samplePlants);
//         setRecentEntries(sampleEntries);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [currentUser]);

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

//   const getCareIcon = (action: string) => {
//     switch (action) {
//       case 'watering': return <Droplets className="h-4 w-4" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4" />;
//       case 'pruning': return <Scissors className="h-4 w-4" />;
//       default: return <Calendar className="h-4 w-4" />;
//     }
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };

//   const formatDateTime = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit'
//     }).format(date);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-green-600">Welcome back, {currentUser?.displayName || currentUser?.email || 'Gardener'}!</h1>
//           <p className="text-muted-foreground">
//             Here's what's happening in your garden today.
//           </p>
//         </div>
//         <Link to="/plant-inventory">
//           <Button className="bg-green-600 hover:bg-green-700 text-white">
//             <Plus className="mr-2 h-4 w-4" />
//             Add Plant
//           </Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
//             <Sprout className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{plants.length}</div>
//             <p className="text-xs text-muted-foreground">
//               +2 from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
//             <Droplets className="h-4 w-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {plants.filter(p => p.status === 'flowering' || p.status === 'growing').length}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               All plants thriving
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Care Due Today</CardTitle>
//             <Calendar className="h-4 w-4 text-orange-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-orange-600">3</div>
//             <p className="text-xs text-muted-foreground">
//               Watering scheduled
//             </p>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
//             <BookOpen className="h-4 w-4 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-purple-600">{recentEntries.length}</div>
//             <p className="text-xs text-muted-foreground">
//               This week
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Plants */}
//         <Card className="bg-white">
//           <CardHeader>
//             <CardTitle>Recent Plants</CardTitle>
//             <CardDescription>
//               Your most recently added plants
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {plants.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No plants yet</p>
//                 <Link to="/plant-inventory">
//                   <Button variant="outline">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Your First Plant
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {plants.slice(0, 4).map((plant) => (
//                   <div key={plant.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
//                     <div>
//                       <p className="font-medium">{plant.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         Added {formatDate(plant.createdAt)}
//                       </p>
//                     </div>
//                     <Badge className="bg-green-100 text-green-800">
//                       {plant.status}
//                     </Badge>
//                   </div>
//                 ))}
//                 {plants.length > 4 && (
//                   <Link to="/plant-inventory">
//                     <Button variant="outline" className="w-full">
//                       View All Plants
//                     </Button>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Recent Journal Entries */}
//         <Card className="bg-white">
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Your latest journal entries and care activities
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {recentEntries.length === 0 ? (
//               <div className="text-center py-6">
//                 <p className="text-muted-foreground mb-4">No journal entries yet</p>
//                 <Link to="/plant-journal">
//                   <Button variant="outline">
//                     <BookOpen className="mr-2 h-4 w-4" />
//                     Start Journaling
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentEntries.map((entry) => (
//                   <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-gray-50">
//                     <div className="mt-1 text-blue-600">
//                       {getCareIcon(entry.type)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{entry.title}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {entry.plantName} • {formatDateTime(entry.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <Link to="/plant-journal">
//                   <Button variant="outline" className="w-full">
//                     View All Entries
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card className="bg-white">
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>
//             Common gardening tasks and tools
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <Link to="/plant-inventory">
//               <Button variant="outline" className="w-full h-20 flex-col">
//                 <Sprout className="h-6 w-6 mb-2" />
//                 <span>Add Plant</span>
//               </Button>
//             </Link>
//             <Link to="/plant-journal">
//               <Button variant="outline" className="w-full h-20 flex-col">
//                 <BookOpen className="h-6 w-6 mb-2" />
//                 <span>Journal Entry</span>
//               </Button>
//             </Link>
//             <Link to="/reminders">
//               <Button variant="outline" className="w-full h-20 flex-col">
//                 <Calendar className="h-6 w-6 mb-2" />
//                 <span>Set Reminder</span>
//               </Button>
//             </Link>
//             <Link to="/weather-integration">
//               <Button variant="outline" className="w-full h-20 flex-col">
//                 <Droplets className="h-6 w-6 mb-2" />
//                 <span>Weather</span>
//               </Button>
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }































import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Scissors, Sprout, Plus, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Plant {
  id: string;
  nickname: string;
  healthStatus: string;
  createdAt: Date;
}

interface JournalEntry {
  id: string;
  text: string;
  careAction?: string;
  createdAt: Date;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration
  const samplePlants: Plant[] = [
    {
      id: '1',
      nickname: 'Cherry Tomato',
      healthStatus: 'excellent',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      nickname: 'Basil Herb',
      healthStatus: 'good',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      nickname: 'Rose Bush',
      healthStatus: 'fair',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  ];

  const sampleEntries: JournalEntry[] = [
    {
      id: '1',
      text: 'Watered the tomato plants - they look healthy!',
      careAction: 'watering',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      text: 'Pruned the rose bush, removed dead flowers',
      careAction: 'pruning',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: '3',
      text: 'Added fertilizer to the herb garden',
      careAction: 'fertilizing',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    if (!currentUser) return;

    const fetchDashboardData = async () => {
      try {
        // Using sample data instead of Firebase for now
        setPlants(samplePlants);
        setRecentEntries(sampleEntries);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCareIcon = (action: string) => {
    switch (action) {
      case 'watering': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'fertilizing': return <Sprout className="h-4 w-4 text-green-500" />;
      case 'pruning': return <Scissors className="h-4 w-4 text-orange-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-600">Welcome back, {currentUser?.displayName || currentUser?.email || 'Gardener'}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening in your garden today.
          </p>
        </div>
        <Link to="/plants">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Plant
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plants</CardTitle>
            <Sprout className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{plants.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
            <Droplets className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {plants.filter(p => ['excellent', 'good'].includes(p.healthStatus)).length}
            </div>
            <p className="text-xs text-muted-foreground">
              85% health rate
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Care Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              2 watering, 1 pruning
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{recentEntries.length}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Plants */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sprout className="mr-2 h-5 w-5 text-green-600" />
              Recent Plants
            </CardTitle>
            <CardDescription>
              Your most recently added plants
            </CardDescription>
          </CardHeader>
          <CardContent>
            {plants.length === 0 ? (
              <div className="text-center py-6">
                <Sprout className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-muted-foreground mb-4">No plants yet</p>
                <Link to="/plants">
                  <Button variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Plant
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {plants.slice(0, 4).map((plant) => (
                  <div key={plant.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                    <div>
                      <p className="font-medium">{plant.nickname}</p>
                      <p className="text-sm text-muted-foreground">
                        Added {formatDate(plant.createdAt)}
                      </p>
                    </div>
                    <Badge className={getHealthStatusColor(plant.healthStatus)}>
                      {plant.healthStatus}
                    </Badge>
                  </div>
                ))}
                {plants.length > 4 && (
                  <Link to="/plants">
                    <Button variant="outline" className="w-full">
                      View All Plants
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Journal Entries */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest journal entries and care activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentEntries.length === 0 ? (
              <div className="text-center py-6">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-muted-foreground mb-4">No journal entries yet</p>
                <Link to="/journal">
                  <Button variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Journaling
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-gray-50">
                    <div className="mt-1">
                      {getCareIcon(entry.careAction || 'other')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{entry.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(entry.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Link to="/journal">
                  <Button variant="outline" className="w-full">
                    View All Entries
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to keep your garden thriving
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/plants">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add Plant
              </Button>
            </Link>
            <Link to="/journal">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Log Activity
              </Button>
            </Link>
            <Link to="/reminders">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Set Reminder
              </Button>
            </Link>
            <Link to="/garden">
              <Button variant="outline" className="w-full justify-start">
                <Sprout className="mr-2 h-4 w-4" />
                Design Garden
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}