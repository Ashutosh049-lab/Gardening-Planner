import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { PestIssue, Plant } from '@/types';
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
// import { format } from 'date-fns';
// import { Plus, Bug, AlertTriangle, CheckCircle, Clock, Trash2, Camera, Leaf, Shield } from 'lucide-react';
// interface PestIssueFormData {
//   plantId: string;
//   type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
//   name: string;
//   description: string;
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   symptoms: string;
//   treatment: string;
//   preventionTips: string;
//   notes?: string;
// }
// export default function PestTracker() {
//   const { currentUser } = useAuth();
//   const [issues, setIssues] = useState<PestIssue[]>([]);
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingIssue, setIsAddingIssue] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('active');
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<PestIssueFormData>();
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
//         // For now, we'll use sample pest issues data
//         const sampleIssues: PestIssue[] = [
//           {
//             id: '1',
//             userId: currentUser.id,
//             plantId: plantsData[0]?.id || 'sample-plant-1',
//             type: 'pest',
//             name: 'Aphids',
//             description: 'Small green insects clustering on new growth and undersides of leaves',
//             severity: 'medium',
//             symptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing foliage', 'Stunted growth'],
//             treatment: 'Spray with insecticidal soap or neem oil. Remove heavily infested leaves.',
//             preventionTips: ['Regular inspection', 'Encourage beneficial insects', 'Avoid over-fertilizing'],
//             status: 'treating',
//             identifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//             createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
//           },
//           {
//             id: '2',
//             userId: currentUser.id,
//             plantId: plantsData[1]?.id || 'sample-plant-2',
//             type: 'disease',
//             name: 'Powdery Mildew',
//             description: 'White powdery coating on leaves and stems',
//             severity: 'high',
//             symptoms: ['White powdery spots', 'Leaf distortion', 'Reduced vigor'],
//             treatment: 'Apply fungicidal spray. Improve air circulation around plants.',
//             preventionTips: ['Avoid overhead watering', 'Ensure good air circulation', 'Remove affected plant debris'],
//             status: 'resolved',
//             identifiedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
//             resolvedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
//             createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
//           }
//         ];
//         setPlants(plantsData);
//         setIssues(sampleIssues);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentUser]);
//   const onSubmit = async (data: PestIssueFormData) => {
//     if (!currentUser) return;
//     setIsAddingIssue(true);
//     try {
//       const symptomsArray = data.symptoms.split(',').map(s => s.trim()).filter(s => s);
//       const preventionArray = data.preventionTips.split(',').map(s => s.trim()).filter(s => s);
//       const issueData = {
//         userId: currentUser.id,
//         plantId: data.plantId,
//         type: data.type,
//         name: data.name,
//         description: data.description,
//         severity: data.severity,
//         symptoms: symptomsArray,
//         treatment: data.treatment,
//         preventionTips: preventionArray,
//         status: 'active' as const,
//         identifiedAt: new Date(),
//         notes: data.notes || '',
//         createdAt: serverTimestamp()
//       };
//       // In a real app, this would save to Firestore
//       const newIssue: PestIssue = {
//         id: Date.now().toString(),
//         ...issueData,
//         identifiedAt: new Date(),
//         createdAt: new Date()
//       } as PestIssue;
//       setIssues([newIssue, ...issues]);
//       reset();
//       toast.success('Pest issue recorded successfully!');
//     } catch (error) {
//       console.error('Error creating pest issue:', error);
//       toast.error('Failed to record pest issue');
//     } finally {
//       setIsAddingIssue(false);
//     }
//   };
//   const updateIssueStatus = async (issueId: string, status: 'active' | 'treating' | 'resolved') => {
//     try {
//       const updatedIssues = issues.map(issue => {
//         if (issue.id === issueId) {
//           return {
//             ...issue,
//             status,
//             resolvedAt: status === 'resolved' ? new Date() : undefined
//           };
//         }
//         return issue;
//       });
//       setIssues(updatedIssues);
//       toast.success(`Issue marked as ${status}`);
//     } catch (error) {
//       console.error('Error updating issue status:', error);
//       toast.error('Failed to update issue status');
//     }
//   };
//   const deleteIssue = async (issueId: string) => {
//     try {
//       setIssues(issues.filter(issue => issue.id !== issueId));
//       toast.success('Issue deleted');
//     } catch (error) {
//       console.error('Error deleting issue:', error);
//       toast.error('Failed to delete issue');
//     }
//   };
//   const getIssueIcon = (type: string) => {
//     switch (type) {
//       case 'pest': return <Bug className="h-4 w-4 text-red-500" />;
//       case 'disease': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
//       case 'nutrient-deficiency': return <Leaf className="h-4 w-4 text-yellow-500" />;
//       case 'environmental': return <Shield className="h-4 w-4 text-blue-500" />;
//       default: return <Bug className="h-4 w-4 text-gray-500" />;
//     }
//   };
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'low': return 'bg-green-100 text-green-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'high': return 'bg-orange-100 text-orange-800';
//       case 'critical': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-red-100 text-red-800';
//       case 'treating': return 'bg-yellow-100 text-yellow-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getPlantName = (plantId: string) => {
//     const plant = plants.find(p => p.id === plantId);
//     return plant?.nickname || 'Unknown Plant';
//   };
//   const activeIssues = issues.filter(issue => issue.status === 'active');
//   const treatingIssues = issues.filter(issue => issue.status === 'treating');
//   const resolvedIssues = issues.filter(issue => issue.status === 'resolved');
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading pest tracker...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Pest & Disease Tracker</h1>
//           <p className="text-muted-foreground">
//             Monitor and manage plant health issues in your garden.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Report Issue
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Report Plant Issue</DialogTitle>
//               <DialogDescription>
//                 Document a pest, disease, or other plant health concern.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="plantId">Affected Plant *</Label>
//                   <Select onValueChange={(value) => setValue('plantId', value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select plant" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {plants.map((plant) => (
//                         <SelectItem key={plant.id} value={plant.id}>
//                           {plant.nickname}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="type">Issue Type *</Label>
//                   <Select onValueChange={(value) => setValue('type', value as 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pest">Pest</SelectItem>
//                       <SelectItem value="disease">Disease</SelectItem>
//                       <SelectItem value="nutrient-deficiency">Nutrient Deficiency</SelectItem>
//                       <SelectItem value="environmental">Environmental</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Issue Name *</Label>
//                   <Input
//                     id="name"
//                     placeholder="e.g., Aphids, Powdery Mildew"
//                     {...register('name', { required: 'Issue name is required' })}
//                   />
//                   {errors.name && (
//                     <p className="text-sm text-red-500">{errors.name.message}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="severity">Severity *</Label>
//                   <Select onValueChange={(value) => setValue('severity', value as 'low' | 'medium' | 'high' | 'critical')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select severity" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="low">Low</SelectItem>
//                       <SelectItem value="medium">Medium</SelectItem>
//                       <SelectItem value="high">High</SelectItem>
//                       <SelectItem value="critical">Critical</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description *</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Describe what you observed..."
//                   {...register('description', { required: 'Description is required' })}
//                 />
//                 {errors.description && (
//                   <p className="text-sm text-red-500">{errors.description.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="symptoms">Symptoms (comma-separated) *</Label>
//                 <Input
//                   id="symptoms"
//                   placeholder="e.g., yellowing leaves, spots, wilting"
//                   {...register('symptoms', { required: 'Symptoms are required' })}
//                 />
//                 {errors.symptoms && (
//                   <p className="text-sm text-red-500">{errors.symptoms.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="treatment">Treatment Plan *</Label>
//                 <Textarea
//                   id="treatment"
//                   placeholder="Describe your treatment approach..."
//                   {...register('treatment', { required: 'Treatment plan is required' })}
//                 />
//                 {errors.treatment && (
//                   <p className="text-sm text-red-500">{errors.treatment.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="preventionTips">Prevention Tips (comma-separated)</Label>
//                 <Input
//                   id="preventionTips"
//                   placeholder="e.g., improve drainage, increase air circulation"
//                   {...register('preventionTips')}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="notes">Additional Notes</Label>
//                 <Textarea
//                   id="notes"
//                   placeholder="Any additional observations or notes..."
//                   {...register('notes')}
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingIssue} className="flex-1">
//                   {isAddingIssue ? 'Recording...' : 'Record Issue'}
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
//             <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
//             <AlertTriangle className="h-4 w-4 text-red-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">{activeIssues.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Under Treatment</CardTitle>
//             <Clock className="h-4 w-4 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">{treatingIssues.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Resolved</CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{resolvedIssues.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
//             <Bug className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{issues.length}</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Issues Tabs */}
//       <Tabs value={selectedTab} onValueChange={setSelectedTab}>
//         <TabsList>
//           <TabsTrigger value="active">Active Issues ({activeIssues.length})</TabsTrigger>
//           <TabsTrigger value="treating">Under Treatment ({treatingIssues.length})</TabsTrigger>
//           <TabsTrigger value="resolved">Resolved ({resolvedIssues.length})</TabsTrigger>
//         </TabsList>
//         <TabsContent value="active" className="space-y-4">
//           {activeIssues.length === 0 ? (
//             <div className="text-center py-12">
//               <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No active issues!</h3>
//               <p className="text-muted-foreground">Your plants are looking healthy.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {activeIssues.map((issue) => (
//                 <Card key={issue.id} className="border-l-4 border-l-red-500">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-2">
//                         {getIssueIcon(issue.type)}
//                         <div>
//                           <CardTitle className="text-lg">{issue.name}</CardTitle>
//                           <CardDescription>{getPlantName(issue.plantId)}</CardDescription>
//                         </div>
//                       </div>
//                       <div className="flex flex-col space-y-1">
//                         <Badge className={getSeverityColor(issue.severity)}>
//                           {issue.severity}
//                         </Badge>
//                         <Badge className={getStatusColor(issue.status)}>
//                           {issue.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
//                     <div className="space-y-2">
//                       <div>
//                         <p className="text-xs font-medium text-gray-600 mb-1">Symptoms:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {issue.symptoms.map((symptom, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {symptom}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-xs font-medium text-gray-600 mb-1">Treatment:</p>
//                         <p className="text-xs text-gray-700">{issue.treatment}</p>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center mt-4">
//                       <span className="text-xs text-muted-foreground">
//                         Identified {format(issue.identifiedAt, 'MMM d, yyyy')}
//                       </span>
//                       <div className="flex space-x-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => updateIssueStatus(issue.id, 'treating')}
//                         >
//                           Start Treatment
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => deleteIssue(issue.id)}
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//         <TabsContent value="treating" className="space-y-4">
//           {treatingIssues.length === 0 ? (
//             <div className="text-center py-12">
//               <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No issues under treatment</h3>
//               <p className="text-muted-foreground">Issues you're actively treating will appear here.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {treatingIssues.map((issue) => (
//                 <Card key={issue.id} className="border-l-4 border-l-yellow-500">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-2">
//                         {getIssueIcon(issue.type)}
//                         <div>
//                           <CardTitle className="text-lg">{issue.name}</CardTitle>
//                           <CardDescription>{getPlantName(issue.plantId)}</CardDescription>
//                         </div>
//                       </div>
//                       <div className="flex flex-col space-y-1">
//                         <Badge className={getSeverityColor(issue.severity)}>
//                           {issue.severity}
//                         </Badge>
//                         <Badge className={getStatusColor(issue.status)}>
//                           {issue.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
//                     <div className="space-y-2">
//                       <div>
//                         <p className="text-xs font-medium text-gray-600 mb-1">Treatment:</p>
//                         <p className="text-xs text-gray-700">{issue.treatment}</p>
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center mt-4">
//                       <span className="text-xs text-muted-foreground">
//                         Identified {format(issue.identifiedAt, 'MMM d, yyyy')}
//                       </span>
//                       <div className="flex space-x-2">
//                         <Button
//                           size="sm"
//                           onClick={() => updateIssueStatus(issue.id, 'resolved')}
//                           className="bg-green-600 hover:bg-green-700"
//                         >
//                           Mark Resolved
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => deleteIssue(issue.id)}
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//         <TabsContent value="resolved" className="space-y-4">
//           {resolvedIssues.length === 0 ? (
//             <div className="text-center py-12">
//               <Bug className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No resolved issues yet</h3>
//               <p className="text-muted-foreground">Successfully treated issues will appear here.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {resolvedIssues.map((issue) => (
//                 <Card key={issue.id} className="border-l-4 border-l-green-500">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-2">
//                         {getIssueIcon(issue.type)}
//                         <div>
//                           <CardTitle className="text-lg">{issue.name}</CardTitle>
//                           <CardDescription>{getPlantName(issue.plantId)}</CardDescription>
//                         </div>
//                       </div>
//                       <div className="flex flex-col space-y-1">
//                         <Badge className={getSeverityColor(issue.severity)}>
//                           {issue.severity}
//                         </Badge>
//                         <Badge className={getStatusColor(issue.status)}>
//                           {issue.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
//                     <div className="space-y-2">
//                       <div>
//                         <p className="text-xs font-medium text-gray-600 mb-1">Treatment Used:</p>
//                         <p className="text-xs text-gray-700">{issue.treatment}</p>
//                       </div>
//                       {issue.preventionTips.length > 0 && (
//                         <div>
//                           <p className="text-xs font-medium text-gray-600 mb-1">Prevention Tips:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {issue.preventionTips.map((tip, index) => (
//                               <Badge key={index} variant="outline" className="text-xs">
//                                 {tip}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center mt-4">
//                       <div className="text-xs text-muted-foreground">
//                         <div>Identified {format(issue.identifiedAt, 'MMM d, yyyy')}</div>
//                         {issue.resolvedAt && (
//                           <div>Resolved {format(issue.resolvedAt, 'MMM d, yyyy')}</div>
//                         )}
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => deleteIssue(issue.id)}
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
import { format } from 'date-fns';
import { Plus, Bug, AlertTriangle, CheckCircle, Clock, Trash2, Shield, Leaf, Activity } from 'lucide-react';
export default function PestTracker() {
    const { currentUser } = useAuth();
    const [issues, setIssues] = useState([]);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingIssue, setIsAddingIssue] = useState(false);
    const [selectedTab, setSelectedTab] = useState('active');
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
    // Sample pest issues data
    const sampleIssues = [
        {
            id: '1',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-1',
            type: 'pest',
            name: 'Aphids',
            description: 'Small green insects clustering on new growth and undersides of leaves',
            severity: 'medium',
            symptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing foliage', 'Stunted growth'],
            treatment: 'Spray with insecticidal soap or neem oil. Remove heavily infested leaves.',
            preventionTips: ['Regular inspection', 'Encourage beneficial insects', 'Avoid over-fertilizing'],
            status: 'treating',
            identifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: '2',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-2',
            type: 'disease',
            name: 'Powdery Mildew',
            description: 'White powdery coating on leaves and stems',
            severity: 'high',
            symptoms: ['White powdery spots', 'Leaf distortion', 'Reduced vigor'],
            treatment: 'Apply fungicidal spray. Improve air circulation around plants.',
            preventionTips: ['Avoid overhead watering', 'Ensure good air circulation', 'Remove affected plant debris'],
            status: 'resolved',
            identifiedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            resolvedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        },
        {
            id: '3',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-3',
            type: 'nutrient-deficiency',
            name: 'Nitrogen Deficiency',
            description: 'Lower leaves turning yellow and dropping off',
            severity: 'low',
            symptoms: ['Yellowing lower leaves', 'Slow growth', 'Pale green color'],
            treatment: 'Apply balanced fertilizer with higher nitrogen content.',
            preventionTips: ['Regular feeding schedule', 'Soil testing', 'Organic matter addition'],
            status: 'active',
            identifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
    ];
    useEffect(() => {
        setPlants(samplePlants);
        setIssues(sampleIssues);
        setLoading(false);
    }, [currentUser]);
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsAddingIssue(true);
        try {
            const symptomsArray = data.symptoms.split(',').map(s => s.trim()).filter(s => s);
            const preventionArray = data.preventionTips.split(',').map(s => s.trim()).filter(s => s);
            const newIssue = {
                id: Date.now().toString(),
                userId: currentUser.uid,
                plantId: data.plantId,
                type: data.type,
                name: data.name,
                description: data.description,
                severity: data.severity,
                symptoms: symptomsArray,
                treatment: data.treatment,
                preventionTips: preventionArray,
                status: 'active',
                identifiedAt: new Date(),
                notes: data.notes || '',
                createdAt: new Date()
            };
            setIssues([newIssue, ...issues]);
            reset();
            setIsDialogOpen(false);
            alert('🐛 Pest issue recorded successfully!');
        }
        catch (error) {
            console.error('Error creating pest issue:', error);
            alert('❌ Failed to record pest issue');
        }
        finally {
            setIsAddingIssue(false);
        }
    };
    const updateIssueStatus = async (issueId, status) => {
        try {
            const updatedIssues = issues.map(issue => {
                if (issue.id === issueId) {
                    return {
                        ...issue,
                        status,
                        resolvedAt: status === 'resolved' ? new Date() : undefined
                    };
                }
                return issue;
            });
            setIssues(updatedIssues);
            alert(`✅ Issue marked as ${status}`);
        }
        catch (error) {
            console.error('Error updating issue status:', error);
            alert('❌ Failed to update issue status');
        }
    };
    const deleteIssue = async (issueId) => {
        try {
            setIssues(issues.filter(issue => issue.id !== issueId));
            alert('🗑️ Issue deleted');
        }
        catch (error) {
            console.error('Error deleting issue:', error);
            alert('❌ Failed to delete issue');
        }
    };
    const getIssueIcon = (type) => {
        switch (type) {
            case 'pest': return _jsx(Bug, { className: "h-5 w-5 text-red-500" });
            case 'disease': return _jsx(AlertTriangle, { className: "h-5 w-5 text-orange-500" });
            case 'nutrient-deficiency': return _jsx(Leaf, { className: "h-5 w-5 text-yellow-500" });
            case 'environmental': return _jsx(Shield, { className: "h-5 w-5 text-blue-500" });
            default: return _jsx(Bug, { className: "h-5 w-5 text-gray-500" });
        }
    };
    const getIssueEmoji = (type) => {
        switch (type) {
            case 'pest': return '🐛';
            case 'disease': return '🦠';
            case 'nutrient-deficiency': return '🍃';
            case 'environmental': return '🌡️';
            default: return '⚠️';
        }
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-red-100 text-red-800 border-red-200';
            case 'treating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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
    const activeIssues = issues.filter(issue => issue.status === 'active');
    const treatingIssues = issues.filter(issue => issue.status === 'treating');
    const resolvedIssues = issues.filter(issue => issue.status === 'resolved');
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading pest tracker..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Shield, { className: "mr-3 h-10 w-10" }), "Pest & Disease Tracker"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Monitor and manage plant health issues in your garden" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Report Issue"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-red-700 flex items-center", children: [_jsx(Bug, { className: "mr-2 h-5 w-5" }), "Report Plant Issue"] }), _jsx(DialogDescription, { className: "text-gray-600", children: "Document a pest, disease, or other plant health concern." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantId", className: "text-base font-medium text-gray-700", children: "Affected Plant *" }), _jsxs(Select, { onValueChange: (value) => setValue('plantId', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Select plant" }) }), _jsx(SelectContent, { children: plants.map((plant) => (_jsx(SelectItem, { value: plant.id, children: _jsxs("span", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: getPlantEmoji(plant.id) }), plant.nickname] }) }, plant.id))) })] }), errors.plantId && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select a plant" }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "type", className: "text-base font-medium text-gray-700", children: "Issue Type *" }), _jsxs(Select, { onValueChange: (value) => setValue('type', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\u26A0\uFE0F Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "pest", children: "\uD83D\uDC1B Pest" }), _jsx(SelectItem, { value: "disease", children: "\uD83E\uDDA0 Disease" }), _jsx(SelectItem, { value: "nutrient-deficiency", children: "\uD83C\uDF43 Nutrient Deficiency" }), _jsx(SelectItem, { value: "environmental", children: "\uD83C\uDF21\uFE0F Environmental" })] })] }), errors.type && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select an issue type" }))] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "name", className: "text-base font-medium text-gray-700", children: "Issue Name *" }), _jsx(Input, { id: "name", placeholder: "e.g., Aphids, Powdery Mildew", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('name', { required: 'Issue name is required' }) }), errors.name && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.name.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "severity", className: "text-base font-medium text-gray-700", children: "Severity *" }), _jsxs(Select, { onValueChange: (value) => setValue('severity', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83D\uDCCA Select severity" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "\uD83D\uDFE2 Low" }), _jsx(SelectItem, { value: "medium", children: "\uD83D\uDFE1 Medium" }), _jsx(SelectItem, { value: "high", children: "\uD83D\uDFE0 High" }), _jsx(SelectItem, { value: "critical", children: "\uD83D\uDD34 Critical" })] })] }), errors.severity && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select severity level" }))] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "description", className: "text-base font-medium text-gray-700", children: "Description *" }), _jsx(Textarea, { id: "description", placeholder: "Describe what you observed in detail...", className: "min-h-[100px] bg-gray-50 border-2 border-gray-200", ...register('description', { required: 'Description is required' }) }), errors.description && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.description.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "symptoms", className: "text-base font-medium text-gray-700", children: "Symptoms (comma-separated) *" }), _jsx(Input, { id: "symptoms", placeholder: "e.g., yellowing leaves, spots, wilting", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('symptoms', { required: 'Symptoms are required' }) }), errors.symptoms && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.symptoms.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "treatment", className: "text-base font-medium text-gray-700", children: "Treatment Plan *" }), _jsx(Textarea, { id: "treatment", placeholder: "Describe your treatment approach and steps...", className: "min-h-[100px] bg-gray-50 border-2 border-gray-200", ...register('treatment', { required: 'Treatment plan is required' }) }), errors.treatment && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.treatment.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "preventionTips", className: "text-base font-medium text-gray-700", children: "Prevention Tips (comma-separated)" }), _jsx(Input, { id: "preventionTips", placeholder: "e.g., improve drainage, increase air circulation", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('preventionTips') })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "notes", className: "text-base font-medium text-gray-700", children: "Additional Notes" }), _jsx(Textarea, { id: "notes", placeholder: "Any additional observations or notes...", className: "min-h-[80px] bg-gray-50 border-2 border-gray-200", ...register('notes') })] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: isAddingIssue, className: "flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold", children: isAddingIssue ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Recording..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(Bug, { className: "mr-2 h-4 w-4" }), "Record Issue"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), className: "h-12 px-6 border-2 border-gray-300", children: "Cancel" })] })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2 bg-red-50", children: [_jsx(CardTitle, { className: "text-sm font-medium text-red-700", children: "Active Issues" }), _jsx(AlertTriangle, { className: "h-5 w-5 text-red-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-red-600", children: activeIssues.length }), _jsx("p", { className: "text-sm text-red-600 mt-1", children: "Need attention" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2 bg-yellow-50", children: [_jsx(CardTitle, { className: "text-sm font-medium text-yellow-700", children: "Under Treatment" }), _jsx(Clock, { className: "h-5 w-5 text-yellow-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-yellow-600", children: treatingIssues.length }), _jsx("p", { className: "text-sm text-yellow-600 mt-1", children: "In progress" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2 bg-green-50", children: [_jsx(CardTitle, { className: "text-sm font-medium text-green-700", children: "Resolved" }), _jsx(CheckCircle, { className: "h-5 w-5 text-green-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-green-600", children: resolvedIssues.length }), _jsx("p", { className: "text-sm text-green-600 mt-1", children: "Successfully treated" })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-700", children: "Total Issues" }), _jsx(Activity, { className: "h-5 w-5 text-gray-500" })] }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "text-3xl font-bold text-gray-800", children: issues.length }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "All time" })] })] })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white shadow-sm border-2 border-gray-100", children: [_jsxs(TabsTrigger, { value: "active", className: "data-[state=active]:bg-red-100 data-[state=active]:text-red-700", children: ["\uD83D\uDEA8 Active Issues (", activeIssues.length, ")"] }), _jsxs(TabsTrigger, { value: "treating", className: "data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700", children: ["\uD83D\uDD27 Under Treatment (", treatingIssues.length, ")"] }), _jsxs(TabsTrigger, { value: "resolved", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700", children: ["\u2705 Resolved (", resolvedIssues.length, ")"] })] }), _jsx(TabsContent, { value: "active", className: "space-y-6", children: activeIssues.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(CheckCircle, { className: "mx-auto h-20 w-20 text-green-500 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No active issues! \uD83C\uDF89" }), _jsx("p", { className: "text-lg text-gray-500", children: "Your plants are looking healthy." })] }) })) : (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: activeIssues.map((issue) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500", children: [_jsx(CardHeader, { className: "bg-red-50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-3xl", children: getIssueEmoji(issue.type) }), _jsx("span", { className: "text-2xl", children: getPlantEmoji(issue.plantId) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: issue.name }), _jsx(CardDescription, { className: "text-gray-600", children: getPlantName(issue.plantId) })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Badge, { className: `${getSeverityColor(issue.severity)} border font-medium`, children: issue.severity }), _jsx(Badge, { className: `${getStatusColor(issue.status)} border font-medium`, children: issue.status })] })] }) }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "bg-gray-50 p-3 rounded-lg mb-4", children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: issue.description }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "\uD83D\uDD0D Symptoms:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: issue.symptoms.map((symptom, index) => (_jsx(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: symptom }, index))) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "\uD83D\uDC8A Treatment:" }), _jsx("div", { className: "bg-green-50 p-3 rounded border-l-4 border-green-300", children: _jsx("p", { className: "text-sm text-gray-700", children: issue.treatment }) })] })] }), _jsxs("div", { className: "flex justify-between items-center mt-6", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["\uD83D\uDCC5 Identified ", format(issue.identifiedAt, 'MMM d, yyyy')] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", onClick: () => updateIssueStatus(issue.id, 'treating'), className: "bg-yellow-600 hover:bg-yellow-700 text-white", children: "Start Treatment" }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteIssue(issue.id), className: "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] })] }, issue.id))) })) }), _jsx(TabsContent, { value: "treating", className: "space-y-6", children: treatingIssues.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(Clock, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No issues under treatment" }), _jsx("p", { className: "text-lg text-gray-500", children: "Issues you're actively treating will appear here." })] }) })) : (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: treatingIssues.map((issue) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500", children: [_jsx(CardHeader, { className: "bg-yellow-50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-3xl", children: getIssueEmoji(issue.type) }), _jsx("span", { className: "text-2xl", children: getPlantEmoji(issue.plantId) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: issue.name }), _jsx(CardDescription, { className: "text-gray-600", children: getPlantName(issue.plantId) })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Badge, { className: `${getSeverityColor(issue.severity)} border font-medium`, children: issue.severity }), _jsx(Badge, { className: `${getStatusColor(issue.status)} border font-medium`, children: issue.status })] })] }) }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "bg-gray-50 p-3 rounded-lg mb-4", children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: issue.description }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "\uD83D\uDC8A Current Treatment:" }), _jsx("div", { className: "bg-yellow-50 p-3 rounded border-l-4 border-yellow-300", children: _jsx("p", { className: "text-sm text-gray-700", children: issue.treatment }) })] }), _jsxs("div", { className: "flex justify-between items-center mt-6", children: [_jsxs("span", { className: "text-sm text-gray-500", children: ["\uD83D\uDCC5 Identified ", format(issue.identifiedAt, 'MMM d, yyyy')] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", onClick: () => updateIssueStatus(issue.id, 'resolved'), className: "bg-green-600 hover:bg-green-700 text-white", children: "Mark Resolved" }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteIssue(issue.id), className: "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] })] }, issue.id))) })) }), _jsx(TabsContent, { value: "resolved", className: "space-y-6", children: resolvedIssues.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(Bug, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No resolved issues yet" }), _jsx("p", { className: "text-lg text-gray-500", children: "Successfully treated issues will appear here." })] }) })) : (_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: resolvedIssues.map((issue) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500", children: [_jsx(CardHeader, { className: "bg-green-50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-3xl", children: getIssueEmoji(issue.type) }), _jsx("span", { className: "text-2xl", children: getPlantEmoji(issue.plantId) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: issue.name }), _jsx(CardDescription, { className: "text-gray-600", children: getPlantName(issue.plantId) })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Badge, { className: `${getSeverityColor(issue.severity)} border font-medium`, children: issue.severity }), _jsxs(Badge, { className: `${getStatusColor(issue.status)} border font-medium`, children: ["\u2705 ", issue.status] })] })] }) }), _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "bg-gray-50 p-3 rounded-lg mb-4", children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: issue.description }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "\uD83D\uDC8A Treatment Used:" }), _jsx("div", { className: "bg-green-50 p-3 rounded border-l-4 border-green-300", children: _jsx("p", { className: "text-sm text-gray-700", children: issue.treatment }) })] }), issue.preventionTips.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "\uD83D\uDEE1\uFE0F Prevention Tips:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: issue.preventionTips.map((tip, index) => (_jsx(Badge, { variant: "outline", className: "bg-purple-50 text-purple-700 border-purple-200", children: tip }, index))) })] }))] }), _jsxs("div", { className: "flex justify-between items-center mt-6", children: [_jsxs("div", { className: "text-sm text-gray-500", children: [_jsxs("div", { children: ["\uD83D\uDCC5 Identified ", format(issue.identifiedAt, 'MMM d, yyyy')] }), issue.resolvedAt && (_jsxs("div", { children: ["\u2705 Resolved ", format(issue.resolvedAt, 'MMM d, yyyy')] }))] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteIssue(issue.id), className: "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] }, issue.id))) })) })] })] }) }));
}
