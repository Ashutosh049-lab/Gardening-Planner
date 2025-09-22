import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { HarvestRecord, Plant } from '@/types';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
// import { Plus, Apple, TrendingUp, Calendar, Scale, Star, Trash2, Camera } from 'lucide-react';
// interface HarvestFormData {
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: string;
// }
// export default function HarvestTracker() {
//   const { currentUser } = useAuth();
//   const [harvests, setHarvests] = useState<HarvestRecord[]>([]);
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingHarvest, setIsAddingHarvest] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('recent');
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<HarvestFormData>();
//   // Sample harvest data
//   const sampleHarvests: HarvestRecord[] = [
//     {
//       id: '1',
//       userId: currentUser?.id || 'sample',
//       plantId: 'plant-1',
//       quantity: 2.5,
//       unit: 'lbs',
//       quality: 'excellent',
//       notes: 'Perfect ripeness, great flavor',
//       harvestedAt: new Date(),
//       createdAt: new Date()
//     },
//     {
//       id: '2',
//       userId: currentUser?.id || 'sample',
//       plantId: 'plant-2',
//       quantity: 12,
//       unit: 'pieces',
//       quality: 'good',
//       notes: 'Nice size peppers',
//       harvestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
//       createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '3',
//       userId: currentUser?.id || 'sample',
//       plantId: 'plant-3',
//       quantity: 0.8,
//       unit: 'lbs',
//       quality: 'excellent',
//       notes: 'Fresh basil for pesto',
//       harvestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
//       createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
//     },
//     {
//       id: '4',
//       userId: currentUser?.id || 'sample',
//       plantId: 'plant-1',
//       quantity: 3.2,
//       unit: 'lbs',
//       quality: 'good',
//       notes: 'Second harvest from same plant',
//       harvestedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
//       createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
//     }
//   ];
//   useEffect(() => {
//     if (!currentUser) return;
//     const fetchData = async () => {
//       try {
//         // Fetch plants
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
//         // For now, we'll use sample harvest data
//         setPlants(plantsData);
//         setHarvests(sampleHarvests);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentUser]);
//   const onSubmit = async (data: HarvestFormData) => {
//     if (!currentUser) return;
//     setIsAddingHarvest(true);
//     try {
//       const harvestData = {
//         userId: currentUser.id,
//         plantId: data.plantId,
//         quantity: data.quantity,
//         unit: data.unit,
//         quality: data.quality,
//         notes: data.notes || '',
//         harvestedAt: new Date(data.harvestedAt),
//         createdAt: serverTimestamp()
//       };
//       // In a real app, this would save to Firestore
//       const newHarvest: HarvestRecord = {
//         id: Date.now().toString(),
//         ...harvestData,
//         harvestedAt: new Date(data.harvestedAt),
//         createdAt: new Date()
//       } as HarvestRecord;
//       setHarvests([newHarvest, ...harvests].sort((a, b) => b.harvestedAt.getTime() - a.harvestedAt.getTime()));
//       reset();
//       toast.success('Harvest recorded successfully!');
//     } catch (error) {
//       console.error('Error recording harvest:', error);
//       toast.error('Failed to record harvest');
//     } finally {
//       setIsAddingHarvest(false);
//     }
//   };
//   const deleteHarvest = async (harvestId: string) => {
//     try {
//       setHarvests(harvests.filter(harvest => harvest.id !== harvestId));
//       toast.success('Harvest record deleted');
//     } catch (error) {
//       console.error('Error deleting harvest:', error);
//       toast.error('Failed to delete harvest record');
//     }
//   };
//   const getQualityColor = (quality: string) => {
//     switch (quality) {
//       case 'excellent': return 'bg-green-100 text-green-800';
//       case 'good': return 'bg-blue-100 text-blue-800';
//       case 'fair': return 'bg-yellow-100 text-yellow-800';
//       case 'poor': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getQualityStars = (quality: string) => {
//     const stars = {
//       'excellent': 5,
//       'good': 4,
//       'fair': 3,
//       'poor': 2
//     };
//     return stars[quality as keyof typeof stars] || 0;
//   };
//   const getPlantName = (plantId: string) => {
//     const plant = plants.find(p => p.id === plantId);
//     return plant?.nickname || 'Unknown Plant';
//   };
//   const getTotalHarvestByPlant = () => {
//     const totals = new Map();
//     harvests.forEach(harvest => {
//       const plantName = getPlantName(harvest.plantId);
//       const key = `${plantName}-${harvest.unit}`;
//       const current = totals.get(key) || { plantName, quantity: 0, unit: harvest.unit };
//       current.quantity += harvest.quantity;
//       totals.set(key, current);
//     });
//     return Array.from(totals.values());
//   };
//   const getMonthlyHarvests = () => {
//     const monthly = new Map();
//     harvests.forEach(harvest => {
//       const monthKey = format(harvest.harvestedAt, 'yyyy-MM');
//       const current = monthly.get(monthKey) || { month: monthKey, harvests: [] };
//       current.harvests.push(harvest);
//       monthly.set(monthKey, current);
//     });
//     return Array.from(monthly.values()).sort((a, b) => b.month.localeCompare(a.month));
//   };
//   const recentHarvests = harvests.slice(0, 10);
//   const totalHarvestsByPlant = getTotalHarvestByPlant();
//   const monthlyHarvests = getMonthlyHarvests();
//   const totalHarvests = harvests.length;
//   const totalQuantity = harvests.reduce((sum, h) => sum + h.quantity, 0);
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading harvest tracker...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Harvest Tracker</h1>
//           <p className="text-muted-foreground">
//             Record and track your garden's productivity and yields.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Record Harvest
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Record Harvest</DialogTitle>
//               <DialogDescription>
//                 Log a new harvest from your garden.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="plantId">Plant *</Label>
//                 <Select onValueChange={(value) => setValue('plantId', value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select plant" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {plants.map((plant) => (
//                       <SelectItem key={plant.id} value={plant.id}>
//                         {plant.nickname}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.plantId && (
//                   <p className="text-sm text-red-500">Please select a plant</p>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="quantity">Quantity *</Label>
//                   <Input
//                     id="quantity"
//                     type="number"
//                     step="0.1"
//                     min="0"
//                     placeholder="2.5"
//                     {...register('quantity', { 
//                       required: 'Quantity is required',
//                       valueAsNumber: true,
//                       min: { value: 0, message: 'Quantity must be positive' }
//                     })}
//                   />
//                   {errors.quantity && (
//                     <p className="text-sm text-red-500">{errors.quantity.message}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="unit">Unit *</Label>
//                   <Select onValueChange={(value) => setValue('unit', value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select unit" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="lbs">Pounds (lbs)</SelectItem>
//                       <SelectItem value="oz">Ounces (oz)</SelectItem>
//                       <SelectItem value="kg">Kilograms (kg)</SelectItem>
//                       <SelectItem value="g">Grams (g)</SelectItem>
//                       <SelectItem value="pieces">Pieces</SelectItem>
//                       <SelectItem value="bunches">Bunches</SelectItem>
//                       <SelectItem value="cups">Cups</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="quality">Quality *</Label>
//                   <Select onValueChange={(value) => setValue('quality', value as 'excellent' | 'good' | 'fair' | 'poor')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Rate quality" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="excellent">Excellent</SelectItem>
//                       <SelectItem value="good">Good</SelectItem>
//                       <SelectItem value="fair">Fair</SelectItem>
//                       <SelectItem value="poor">Poor</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="harvestedAt">Harvest Date *</Label>
//                   <Input
//                     id="harvestedAt"
//                     type="date"
//                     defaultValue={format(new Date(), 'yyyy-MM-dd')}
//                     {...register('harvestedAt', { required: 'Harvest date is required' })}
//                   />
//                   {errors.harvestedAt && (
//                     <p className="text-sm text-red-500">{errors.harvestedAt.message}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="notes">Notes</Label>
//                 <Textarea
//                   id="notes"
//                   placeholder="Additional notes about this harvest..."
//                   {...register('notes')}
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingHarvest} className="flex-1">
//                   {isAddingHarvest ? 'Recording...' : 'Record Harvest'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Harvests</CardTitle>
//             <Apple className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalHarvests}</div>
//             <p className="text-xs text-muted-foreground">
//               Recorded this season
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
//             <Scale className="h-4 w-4 text-blue-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalQuantity.toFixed(1)}</div>
//             <p className="text-xs text-muted-foreground">
//               Combined units harvested
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Plants</CardTitle>
//             <TrendingUp className="h-4 w-4 text-orange-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{plants.length}</div>
//             <p className="text-xs text-muted-foreground">
//               Plants in your garden
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">This Month</CardTitle>
//             <Calendar className="h-4 w-4 text-purple-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {harvests.filter(h => 
//                 h.harvestedAt >= startOfMonth(new Date()) && 
//                 h.harvestedAt <= endOfMonth(new Date())
//               ).length}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Harvests this month
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Harvest Tabs */}
//       <Tabs value={selectedTab} onValueChange={setSelectedTab}>
//         <TabsList>
//           <TabsTrigger value="recent">Recent Harvests</TabsTrigger>
//           <TabsTrigger value="by-plant">By Plant</TabsTrigger>
//           <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
//         </TabsList>
//         <TabsContent value="recent" className="space-y-4">
//           {recentHarvests.length === 0 ? (
//             <div className="text-center py-12">
//               <Apple className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No harvests recorded yet</h3>
//               <p className="text-muted-foreground">
//                 Start recording your garden's productivity!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {recentHarvests.map((harvest) => (
//                 <Card key={harvest.id}>
//                   <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <CardTitle className="text-lg">{getPlantName(harvest.plantId)}</CardTitle>
//                         <CardDescription>
//                           {format(harvest.harvestedAt, 'MMM d, yyyy')}
//                         </CardDescription>
//                       </div>
//                       <div className="flex flex-col space-y-1">
//                         <Badge className={getQualityColor(harvest.quality)}>
//                           {harvest.quality}
//                         </Badge>
//                         <div className="flex">
//                           {Array.from({ length: 5 }).map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`h-3 w-3 ${
//                                 i < getQualityStars(harvest.quality)
//                                   ? 'text-yellow-400 fill-current'
//                                   : 'text-gray-300'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="text-2xl font-bold">
//                         {harvest.quantity} {harvest.unit}
//                       </div>
//                       <Scale className="h-5 w-5 text-muted-foreground" />
//                     </div>
//                     {harvest.notes && (
//                       <p className="text-sm text-muted-foreground mb-3">{harvest.notes}</p>
//                     )}
//                     <div className="flex justify-between items-center">
//                       <span className="text-xs text-muted-foreground">
//                         Recorded {format(harvest.createdAt, 'MMM d, yyyy')}
//                       </span>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => deleteHarvest(harvest.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//         <TabsContent value="by-plant" className="space-y-4">
//           {totalHarvestsByPlant.length === 0 ? (
//             <div className="text-center py-12">
//               <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No harvest data available</h3>
//               <p className="text-muted-foreground">
//                 Record some harvests to see plant productivity.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {totalHarvestsByPlant.map((total, index) => (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="text-lg">{total.plantName}</CardTitle>
//                     <CardDescription>Total yield</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-3xl font-bold text-green-600">
//                       {total.quantity.toFixed(1)} {total.unit}
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-2">
//                       From {harvests.filter(h => getPlantName(h.plantId) === total.plantName).length} harvests
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//         <TabsContent value="monthly" className="space-y-4">
//           {monthlyHarvests.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No monthly data available</h3>
//               <p className="text-muted-foreground">
//                 Record harvests to see monthly summaries.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {monthlyHarvests.map((month) => (
//                 <Card key={month.month}>
//                   <CardHeader>
//                     <CardTitle>
//                       {format(new Date(month.month + '-01'), 'MMMM yyyy')}
//                     </CardTitle>
//                     <CardDescription>
//                       {month.harvests.length} harvests • {month.harvests.reduce((sum, h) => sum + h.quantity, 0).toFixed(1)} total units
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {month.harvests.map((harvest) => (
//                         <div key={harvest.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                           <div>
//                             <p className="font-medium text-sm">{getPlantName(harvest.plantId)}</p>
//                             <p className="text-xs text-muted-foreground">
//                               {format(harvest.harvestedAt, 'MMM d')}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-medium text-sm">{harvest.quantity} {harvest.unit}</p>
//                             <Badge className={`${getQualityColor(harvest.quality)} text-xs`}>
//                               {harvest.quality}
//                             </Badge>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Plus, Apple, TrendingUp, Calendar, Scale, Star, Trash2 } from 'lucide-react';
export default function HarvestTracker() {
    const { currentUser } = useAuth();
    const [harvests, setHarvests] = useState([]);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingHarvest, setIsAddingHarvest] = useState(false);
    const [selectedTab, setSelectedTab] = useState('recent');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    // Sample plants data
    const samplePlants = [
        {
            id: 'plant-1',
            nickname: 'Cherry Tomato Champion',
            plantTypeId: 'tomato',
            potSize: 'large',
            healthStatus: 'excellent',
            createdAt: '2024-01-01'
        },
        {
            id: 'plant-2',
            nickname: 'Sweet Bell Pepper',
            plantTypeId: 'pepper',
            potSize: 'medium',
            healthStatus: 'good',
            createdAt: '2024-01-05'
        },
        {
            id: 'plant-3',
            nickname: 'Fresh Basil',
            plantTypeId: 'basil',
            potSize: 'small',
            healthStatus: 'excellent',
            createdAt: '2024-01-10'
        }
    ];
    // Sample harvest data
    const sampleHarvests = [
        {
            id: '1',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-1',
            quantity: 2.5,
            unit: 'lbs',
            quality: 'excellent',
            notes: 'Perfect ripeness, great flavor',
            harvestedAt: new Date(),
            createdAt: new Date()
        },
        {
            id: '2',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-2',
            quantity: 12,
            unit: 'pieces',
            quality: 'good',
            notes: 'Nice size peppers',
            harvestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            id: '3',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-3',
            quantity: 0.8,
            unit: 'lbs',
            quality: 'excellent',
            notes: 'Fresh basil for pesto',
            harvestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: '4',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-1',
            quantity: 3.2,
            unit: 'lbs',
            quality: 'good',
            notes: 'Second harvest from same plant',
            harvestedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        }
    ];
    useEffect(() => {
        setPlants(samplePlants);
        setHarvests(sampleHarvests);
        setLoading(false);
    }, [currentUser]);
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsAddingHarvest(true);
        try {
            const newHarvest = {
                id: Date.now().toString(),
                userId: currentUser.uid,
                plantId: data.plantId,
                quantity: data.quantity,
                unit: data.unit,
                quality: data.quality,
                notes: data.notes || '',
                harvestedAt: new Date(data.harvestedAt),
                createdAt: new Date()
            };
            setHarvests([newHarvest, ...harvests].sort((a, b) => b.harvestedAt.getTime() - a.harvestedAt.getTime()));
            reset();
            setIsDialogOpen(false);
            alert('🎉 Harvest recorded successfully!');
        }
        catch (error) {
            console.error('Error recording harvest:', error);
            alert('❌ Failed to record harvest');
        }
        finally {
            setIsAddingHarvest(false);
        }
    };
    const deleteHarvest = async (harvestId) => {
        try {
            setHarvests(harvests.filter(harvest => harvest.id !== harvestId));
            alert('🗑️ Harvest record deleted');
        }
        catch (error) {
            console.error('Error deleting harvest:', error);
            alert('❌ Failed to delete harvest record');
        }
    };
    const getQualityColor = (quality) => {
        switch (quality) {
            case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
            case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'poor': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getQualityStars = (quality) => {
        const stars = {
            'excellent': 5,
            'good': 4,
            'fair': 3,
            'poor': 2
        };
        return stars[quality] || 0;
    };
    const getPlantName = (plantId) => {
        const plant = plants.find(p => p.id === plantId);
        return plant?.nickname || 'Unknown Plant';
    };
    const getPlantEmoji = (plantId) => {
        const plant = plants.find(p => p.id === plantId);
        const emojiMap = {
            tomato: '🍅',
            pepper: '🌶️',
            basil: '🌿',
            lettuce: '🥬',
            carrot: '🥕',
            cucumber: '🥒'
        };
        return emojiMap[plant?.plantTypeId || ''] || '🌱';
    };
    const getTotalHarvestByPlant = () => {
        const totals = new Map();
        harvests.forEach(harvest => {
            const plantName = getPlantName(harvest.plantId);
            const key = `${plantName}-${harvest.unit}`;
            const current = totals.get(key) || { plantName, quantity: 0, unit: harvest.unit, plantId: harvest.plantId };
            current.quantity += harvest.quantity;
            totals.set(key, current);
        });
        return Array.from(totals.values());
    };
    const getMonthlyHarvests = () => {
        const monthly = new Map();
        harvests.forEach(harvest => {
            const monthKey = format(harvest.harvestedAt, 'yyyy-MM');
            const current = monthly.get(monthKey) || { month: monthKey, harvests: [] };
            current.harvests.push(harvest);
            monthly.set(monthKey, current);
        });
        return Array.from(monthly.values()).sort((a, b) => b.month.localeCompare(a.month));
    };
    const recentHarvests = harvests.slice(0, 10);
    const totalHarvestsByPlant = getTotalHarvestByPlant();
    const monthlyHarvests = getMonthlyHarvests();
    const totalHarvests = harvests.length;
    const totalQuantity = harvests.reduce((sum, h) => sum + h.quantity, 0);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading harvest tracker..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Apple, { className: "mr-3 h-10 w-10" }), "Harvest Tracker"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Record and track your garden's productivity and yields" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Record Harvest"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-green-700 flex items-center", children: [_jsx(Apple, { className: "mr-2 h-5 w-5" }), "Record New Harvest"] }), _jsx(DialogDescription, { className: "text-gray-600", children: "Log a new harvest from your garden to track productivity." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantId", className: "text-base font-medium text-gray-700", children: "Plant *" }), _jsxs(Select, { onValueChange: (value) => setValue('plantId', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Select plant to harvest from" }) }), _jsx(SelectContent, { className: 'bg-white', children: plants.map((plant) => (_jsx(SelectItem, { value: plant.id, children: _jsxs("span", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: getPlantEmoji(plant.id) }), plant.nickname] }) }, plant.id))) })] }), errors.plantId && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select a plant" }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "quantity", className: "text-base font-medium text-gray-700", children: "Quantity *" }), _jsx(Input, { id: "quantity", type: "number", step: "0.1", min: "0", placeholder: "2.5", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('quantity', {
                                                                        required: 'Quantity is required',
                                                                        valueAsNumber: true,
                                                                        min: { value: 0, message: 'Quantity must be positive' }
                                                                    }) }), errors.quantity && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.quantity.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "unit", className: "text-base font-medium text-gray-700", children: "Unit *" }), _jsxs(Select, { onValueChange: (value) => setValue('unit', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83D\uDCCF Select unit" }) }), _jsxs(SelectContent, { className: 'bg-white', children: [_jsx(SelectItem, { value: "lbs", children: "\uD83D\uDCE6 Pounds (lbs)" }), _jsx(SelectItem, { value: "oz", children: "\u2696\uFE0F Ounces (oz)" }), _jsx(SelectItem, { value: "kg", children: "\uD83D\uDCE6 Kilograms (kg)" }), _jsx(SelectItem, { value: "g", children: "\u2696\uFE0F Grams (g)" }), _jsx(SelectItem, { value: "pieces", children: "\uD83D\uDD22 Pieces" }), _jsx(SelectItem, { value: "bunches", children: "\uD83C\uDF3F Bunches" }), _jsx(SelectItem, { value: "cups", children: "\u2615 Cups" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "quality", className: "text-base font-medium text-gray-700", children: "Quality *" }), _jsxs(Select, { onValueChange: (value) => setValue('quality', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\u2B50 Rate quality" }) }), _jsxs(SelectContent, { className: 'bg-white', children: [_jsx(SelectItem, { value: "excellent", children: "\u2B50\u2B50\u2B50\u2B50\u2B50 Excellent" }), _jsx(SelectItem, { value: "good", children: "\u2B50\u2B50\u2B50\u2B50 Good" }), _jsx(SelectItem, { value: "fair", children: "\u2B50\u2B50\u2B50 Fair" }), _jsx(SelectItem, { value: "poor", children: "\u2B50\u2B50 Poor" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "harvestedAt", className: "text-base font-medium text-gray-700", children: "Harvest Date *" }), _jsx(Input, { id: "harvestedAt", type: "date", defaultValue: format(new Date(), 'yyyy-MM-dd'), className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('harvestedAt', { required: 'Harvest date is required' }) }), errors.harvestedAt && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.harvestedAt.message }))] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "notes", className: "text-base font-medium text-gray-700", children: "Notes" }), _jsx(Textarea, { id: "notes", placeholder: "Additional notes about this harvest... flavor, size, appearance, etc.", className: "min-h-[100px] bg-gray-50 border-2 border-gray-200", ...register('notes') })] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: isAddingHarvest, className: "flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold", children: isAddingHarvest ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Recording..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(Apple, { className: "mr-2 h-4 w-4" }), "Record Harvest"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), className: "h-12 px-6 border-2 border-gray-300", children: "Cancel" })] })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-3 bg-green-50", children: [_jsx(CardTitle, { className: "text-base font-medium text-green-700", children: "Total Harvests" }), _jsx(Apple, { className: "h-6 w-6 text-green-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-green-600", children: totalHarvests }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Recorded this season" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-3 bg-blue-50", children: [_jsx(CardTitle, { className: "text-base font-medium text-blue-700", children: "Total Yield" }), _jsx(Scale, { className: "h-6 w-6 text-blue-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-blue-600", children: totalQuantity.toFixed(1) }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Combined units harvested" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-3 bg-orange-50", children: [_jsx(CardTitle, { className: "text-base font-medium text-orange-700", children: "Active Plants" }), _jsx(TrendingUp, { className: "h-6 w-6 text-orange-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-orange-600", children: plants.length }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Plants in your garden" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-3 bg-purple-50", children: [_jsx(CardTitle, { className: "text-base font-medium text-purple-700", children: "This Month" }), _jsx(Calendar, { className: "h-6 w-6 text-purple-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-purple-600", children: harvests.filter(h => h.harvestedAt >= startOfMonth(new Date()) &&
                                                h.harvestedAt <= endOfMonth(new Date())).length }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Harvests this month" })] })] })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white shadow-md border-0 p-2", children: [_jsx(TabsTrigger, { value: "recent", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700", children: "\uD83D\uDCCB Recent Harvests" }), _jsx(TabsTrigger, { value: "by-plant", className: "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700", children: "\uD83C\uDF31 By Plant" }), _jsx(TabsTrigger, { value: "monthly", className: "data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700", children: "\uD83D\uDCC5 Monthly Summary" })] }), _jsx(TabsContent, { value: "recent", className: "space-y-6", children: recentHarvests.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(Apple, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No harvests recorded yet" }), _jsx("p", { className: "text-lg text-gray-500 mb-6", children: "Start recording your garden's productivity!" }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Record First Harvest"] })] }) })) : (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: recentHarvests.map((harvest) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden", children: [_jsx(CardHeader, { className: "pb-4 bg-gradient-to-r from-green-50 to-blue-50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-3xl", children: getPlantEmoji(harvest.plantId) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: getPlantName(harvest.plantId) }), _jsx(CardDescription, { className: "text-gray-600", children: format(harvest.harvestedAt, 'MMM d, yyyy') })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Badge, { className: `${getQualityColor(harvest.quality)} border font-medium`, children: harvest.quality }), _jsx("div", { className: "flex", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Star, { className: `h-4 w-4 ${i < getQualityStars(harvest.quality)
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'}` }, i))) })] })] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "text-3xl font-bold text-green-600", children: [harvest.quantity, " ", harvest.unit] }), _jsx(Scale, { className: "h-6 w-6 text-gray-400" })] }), harvest.notes && (_jsx("p", { className: "text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg", children: harvest.notes })), _jsxs("div", { className: "flex justify-between items-center pt-3 border-t border-gray-100", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["Recorded ", format(harvest.createdAt, 'MMM d, yyyy')] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteHarvest(harvest.id), className: "text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] }, harvest.id))) })) }), _jsx(TabsContent, { value: "by-plant", className: "space-y-6", children: totalHarvestsByPlant.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(TrendingUp, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No harvest data available" }), _jsx("p", { className: "text-lg text-gray-500", children: "Record some harvests to see plant productivity." })] }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: totalHarvestsByPlant.map((total, index) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-green-50 to-blue-50", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-3xl", children: getPlantEmoji(total.plantId) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: total.plantName }), _jsx(CardDescription, { className: "text-gray-600", children: "Total yield" })] })] }) }), _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "text-4xl font-bold text-green-600 mb-2", children: [total.quantity.toFixed(1), " ", total.unit] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["From ", harvests.filter(h => getPlantName(h.plantId) === total.plantName).length, " harvests"] })] })] }, index))) })) }), _jsx(TabsContent, { value: "monthly", className: "space-y-6", children: monthlyHarvests.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(Calendar, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No monthly data available" }), _jsx("p", { className: "text-lg text-gray-500", children: "Record harvests to see monthly summaries." })] }) })) : (_jsx("div", { className: "space-y-6", children: monthlyHarvests.map((month) => (_jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-purple-50 to-blue-50", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-purple-700", children: format(new Date(month.month + '-01'), 'MMMM yyyy') }), _jsxs(CardDescription, { className: "text-purple-600", children: [month.harvests.length, " harvests \u2022 ", month.harvests.reduce((sum, h) => sum + h.quantity, 0).toFixed(1), " total units"] })] }), _jsx(CardContent, { className: "pt-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: month.harvests.map((harvest) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-2xl", children: getPlantEmoji(harvest.plantId) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-800", children: getPlantName(harvest.plantId) }), _jsx("p", { className: "text-sm text-gray-600", children: format(harvest.harvestedAt, 'MMM d') })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-bold text-green-600", children: [harvest.quantity, " ", harvest.unit] }), _jsx(Badge, { className: `${getQualityColor(harvest.quality)} text-xs border`, children: harvest.quality })] })] }, harvest.id))) }) })] }, month.month))) })) })] })] }) }));
}
