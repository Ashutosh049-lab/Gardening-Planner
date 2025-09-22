import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { SeasonalTask } from '@/types';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import { format } from 'date-fns';
// import { Plus, Calendar, Leaf, Scissors, Sprout, Bug, Wrench, CheckCircle, Clock, Trash2 } from 'lucide-react';
// interface SeasonalTaskFormData {
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string;
// }
// export default function SeasonalPlanner() {
//   const { currentUser } = useAuth();
//   const [tasks, setTasks] = useState<SeasonalTask[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingTask, setIsAddingTask] = useState(false);
//   const [selectedSeason, setSelectedSeason] = useState<string>('spring');
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<SeasonalTaskFormData>();
//   const currentMonth = new Date().getMonth() + 1;
//   const currentSeason = getCurrentSeason(currentMonth);
//   function getCurrentSeason(month: number): string {
//     if (month >= 3 && month <= 5) return 'spring';
//     if (month >= 6 && month <= 8) return 'summer';
//     if (month >= 9 && month <= 11) return 'fall';
//     return 'winter';
//   }
//   const sampleTasks: SeasonalTask[] = [
//     {
//       id: '1',
//       userId: currentUser?.id || 'sample',
//       title: 'Start Tomato Seeds Indoors',
//       description: 'Begin starting tomato seeds indoors 6-8 weeks before last frost date',
//       category: 'planting',
//       season: 'spring',
//       month: 3,
//       priority: 'high',
//       plantTypes: ['Tomatoes', 'Peppers'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '2',
//       userId: currentUser?.id || 'sample',
//       title: 'Prepare Garden Beds',
//       description: 'Clear winter debris, add compost, and prepare soil for planting',
//       category: 'maintenance',
//       season: 'spring',
//       month: 4,
//       priority: 'high',
//       plantTypes: ['All Plants'],
//       completed: true,
//       completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
//       createdAt: new Date()
//     },
//     {
//       id: '3',
//       userId: currentUser?.id || 'sample',
//       title: 'Plant Cool Season Crops',
//       description: 'Plant lettuce, spinach, peas, and other cool weather vegetables',
//       category: 'planting',
//       season: 'spring',
//       month: 4,
//       priority: 'medium',
//       plantTypes: ['Lettuce', 'Spinach', 'Peas'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '4',
//       userId: currentUser?.id || 'sample',
//       title: 'Summer Watering Schedule',
//       description: 'Establish deep watering routine for hot summer months',
//       category: 'maintenance',
//       season: 'summer',
//       month: 6,
//       priority: 'high',
//       plantTypes: ['All Plants'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '5',
//       userId: currentUser?.id || 'sample',
//       title: 'Harvest Summer Vegetables',
//       description: 'Regular harvesting of tomatoes, peppers, zucchini, and herbs',
//       category: 'harvesting',
//       season: 'summer',
//       month: 7,
//       priority: 'medium',
//       plantTypes: ['Tomatoes', 'Peppers', 'Zucchini', 'Herbs'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '6',
//       userId: currentUser?.id || 'sample',
//       title: 'Fall Garden Cleanup',
//       description: 'Remove spent plants, collect seeds, and prepare beds for winter',
//       category: 'maintenance',
//       season: 'fall',
//       month: 10,
//       priority: 'high',
//       plantTypes: ['All Plants'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '7',
//       userId: currentUser?.id || 'sample',
//       title: 'Plant Garlic',
//       description: 'Plant garlic cloves for next year\'s harvest',
//       category: 'planting',
//       season: 'fall',
//       month: 10,
//       priority: 'medium',
//       plantTypes: ['Garlic'],
//       completed: false,
//       createdAt: new Date()
//     },
//     {
//       id: '8',
//       userId: currentUser?.id || 'sample',
//       title: 'Protect Plants from Frost',
//       description: 'Cover tender plants and bring containers indoors',
//       category: 'maintenance',
//       season: 'winter',
//       month: 12,
//       priority: 'high',
//       plantTypes: ['Tender Plants'],
//       completed: false,
//       createdAt: new Date()
//     }
//   ];
//   useEffect(() => {
//     if (!currentUser) return;
//     const fetchTasks = async () => {
//       try {
//         // In a real app, this would fetch from Firestore
//         // For now, we'll use sample data
//         setTasks(sampleTasks);
//       } catch (error) {
//         console.error('Error fetching seasonal tasks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [currentUser]);
//   const onSubmit = async (data: SeasonalTaskFormData) => {
//     if (!currentUser) return;
//     setIsAddingTask(true);
//     try {
//       const plantTypesArray = data.plantTypes.split(',').map(s => s.trim()).filter(s => s);
//       const taskData = {
//         userId: currentUser.id,
//         title: data.title,
//         description: data.description,
//         category: data.category,
//         season: data.season,
//         month: data.month,
//         priority: data.priority,
//         plantTypes: plantTypesArray,
//         completed: false,
//         createdAt: serverTimestamp()
//       };
//       // In a real app, this would save to Firestore
//       const newTask: SeasonalTask = {
//         id: Date.now().toString(),
//         ...taskData,
//         createdAt: new Date()
//       } as SeasonalTask;
//       setTasks([newTask, ...tasks]);
//       reset();
//       toast.success('Seasonal task added successfully!');
//     } catch (error) {
//       console.error('Error creating seasonal task:', error);
//       toast.error('Failed to add seasonal task');
//     } finally {
//       setIsAddingTask(false);
//     }
//   };
//   const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
//     try {
//       const updatedTasks = tasks.map(task => {
//         if (task.id === taskId) {
//           return {
//             ...task,
//             completed,
//             completedAt: completed ? new Date() : undefined
//           };
//         }
//         return task;
//       });
//       setTasks(updatedTasks);
//       toast.success(`Task marked as ${completed ? 'completed' : 'pending'}`);
//     } catch (error) {
//       console.error('Error updating task:', error);
//       toast.error('Failed to update task');
//     }
//   };
//   const deleteTask = async (taskId: string) => {
//     try {
//       setTasks(tasks.filter(task => task.id !== taskId));
//       toast.success('Task deleted');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       toast.error('Failed to delete task');
//     }
//   };
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'planting': return <Sprout className="h-4 w-4 text-green-500" />;
//       case 'harvesting': return <Leaf className="h-4 w-4 text-orange-500" />;
//       case 'pruning': return <Scissors className="h-4 w-4 text-blue-500" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4 text-purple-500" />;
//       case 'pest-control': return <Bug className="h-4 w-4 text-red-500" />;
//       case 'maintenance': return <Wrench className="h-4 w-4 text-gray-500" />;
//       default: return <Calendar className="h-4 w-4 text-gray-500" />;
//     }
//   };
//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'low': return 'bg-green-100 text-green-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'high': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getSeasonColor = (season: string) => {
//     switch (season) {
//       case 'spring': return 'bg-green-100 text-green-800';
//       case 'summer': return 'bg-yellow-100 text-yellow-800';
//       case 'fall': return 'bg-orange-100 text-orange-800';
//       case 'winter': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };
//   const getMonthName = (month: number) => {
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     return months[month - 1];
//   };
//   const filterTasksBySeason = (season: string) => {
//     return tasks.filter(task => task.season === season);
//   };
//   const getCurrentSeasonTasks = () => {
//     return tasks.filter(task => 
//       task.season === currentSeason && 
//       task.month === currentMonth &&
//       !task.completed
//     );
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading seasonal planner...</p>
//         </div>
//       </div>
//     );
//   }
//   const currentSeasonTasks = getCurrentSeasonTasks();
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Seasonal Garden Planner</h1>
//           <p className="text-muted-foreground">
//             Plan and track your gardening tasks throughout the year.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Task
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Add Seasonal Task</DialogTitle>
//               <DialogDescription>
//                 Create a new gardening task for your seasonal calendar.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Task Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="e.g., Start tomato seeds indoors"
//                   {...register('title', { required: 'Task title is required' })}
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description *</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Detailed description of the task..."
//                   {...register('description', { required: 'Description is required' })}
//                 />
//                 {errors.description && (
//                   <p className="text-sm text-red-500">{errors.description.message}</p>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="category">Category *</Label>
//                   <Select onValueChange={(value) => setValue('category', value as 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="planting">Planting</SelectItem>
//                       <SelectItem value="harvesting">Harvesting</SelectItem>
//                       <SelectItem value="pruning">Pruning</SelectItem>
//                       <SelectItem value="fertilizing">Fertilizing</SelectItem>
//                       <SelectItem value="pest-control">Pest Control</SelectItem>
//                       <SelectItem value="maintenance">Maintenance</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="priority">Priority *</Label>
//                   <Select onValueChange={(value) => setValue('priority', value as 'low' | 'medium' | 'high')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select priority" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="low">Low</SelectItem>
//                       <SelectItem value="medium">Medium</SelectItem>
//                       <SelectItem value="high">High</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="season">Season *</Label>
//                   <Select onValueChange={(value) => setValue('season', value as 'spring' | 'summer' | 'fall' | 'winter')}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select season" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="spring">Spring</SelectItem>
//                       <SelectItem value="summer">Summer</SelectItem>
//                       <SelectItem value="fall">Fall</SelectItem>
//                       <SelectItem value="winter">Winter</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="month">Month *</Label>
//                   <Select onValueChange={(value) => setValue('month', parseInt(value))}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select month" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                         <SelectItem key={month} value={month.toString()}>
//                           {getMonthName(month)}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="plantTypes">Plant Types (comma-separated)</Label>
//                 <Input
//                   id="plantTypes"
//                   placeholder="e.g., Tomatoes, Peppers, Herbs"
//                   {...register('plantTypes')}
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingTask} className="flex-1">
//                   {isAddingTask ? 'Adding...' : 'Add Task'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Current Season Tasks */}
//       {currentSeasonTasks.length > 0 && (
//         <Card className="bg-gradient-to-r from-green-50 to-blue-50">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Calendar className="mr-2 h-5 w-5" />
//               This Month's Tasks ({getMonthName(currentMonth)})
//             </CardTitle>
//             <CardDescription>
//               Tasks scheduled for the current month
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {currentSeasonTasks.map((task) => (
//                 <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
//                   <div className="flex items-center space-x-3">
//                     <Checkbox
//                       checked={task.completed}
//                       onCheckedChange={(checked) => toggleTaskCompletion(task.id, checked as boolean)}
//                     />
//                     {getCategoryIcon(task.category)}
//                     <div>
//                       <p className="font-medium">{task.title}</p>
//                       <p className="text-sm text-muted-foreground">{task.description}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Badge className={getPriorityColor(task.priority)}>
//                       {task.priority}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//       {/* Seasonal Tabs */}
//       <Tabs value={selectedSeason} onValueChange={setSelectedSeason}>
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="spring">Spring ({filterTasksBySeason('spring').length})</TabsTrigger>
//           <TabsTrigger value="summer">Summer ({filterTasksBySeason('summer').length})</TabsTrigger>
//           <TabsTrigger value="fall">Fall ({filterTasksBySeason('fall').length})</TabsTrigger>
//           <TabsTrigger value="winter">Winter ({filterTasksBySeason('winter').length})</TabsTrigger>
//         </TabsList>
//         {(['spring', 'summer', 'fall', 'winter'] as const).map((season) => (
//           <TabsContent key={season} value={season} className="space-y-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {filterTasksBySeason(season).map((task) => (
//                 <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
//                   <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           checked={task.completed}
//                           onCheckedChange={(checked) => toggleTaskCompletion(task.id, checked as boolean)}
//                         />
//                         {getCategoryIcon(task.category)}
//                         <div>
//                           <CardTitle className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
//                             {task.title}
//                           </CardTitle>
//                           <CardDescription>
//                             {getMonthName(task.month)} • {task.category}
//                           </CardDescription>
//                         </div>
//                       </div>
//                       <div className="flex flex-col space-y-1">
//                         <Badge className={getPriorityColor(task.priority)}>
//                           {task.priority}
//                         </Badge>
//                         <Badge className={getSeasonColor(task.season)}>
//                           {task.season}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <p className={`text-sm mb-3 ${task.completed ? 'text-muted-foreground' : ''}`}>
//                       {task.description}
//                     </p>
//                     {task.plantTypes.length > 0 && (
//                       <div className="mb-3">
//                         <p className="text-xs font-medium text-gray-600 mb-1">Plant Types:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {task.plantTypes.map((plantType, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {plantType}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     <div className="flex justify-between items-center">
//                       <div className="text-xs text-muted-foreground">
//                         {task.completed && task.completedAt ? (
//                           <span className="flex items-center text-green-600">
//                             <CheckCircle className="h-3 w-3 mr-1" />
//                             Completed {format(task.completedAt, 'MMM d, yyyy')}
//                           </span>
//                         ) : (
//                           <span className="flex items-center">
//                             <Clock className="h-3 w-3 mr-1" />
//                             Scheduled for {getMonthName(task.month)}
//                           </span>
//                         )}
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => deleteTask(task.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             {filterTasksBySeason(season).length === 0 && (
//               <div className="text-center py-12">
//                 <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No {season} tasks yet</h3>
//                 <p className="text-muted-foreground">
//                   Add tasks to plan your {season} gardening activities.
//                 </p>
//               </div>
//             )}
//           </TabsContent>
//         ))}
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
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Plus, Calendar, Leaf, Scissors, Sprout, Bug, Wrench, CheckCircle, Clock, Trash2, CalendarDays } from 'lucide-react';
export default function SeasonalPlanner() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('spring');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const currentMonth = new Date().getMonth() + 1;
    const currentSeason = getCurrentSeason(currentMonth);
    function getCurrentSeason(month) {
        if (month >= 3 && month <= 5)
            return 'spring';
        if (month >= 6 && month <= 8)
            return 'summer';
        if (month >= 9 && month <= 11)
            return 'fall';
        return 'winter';
    }
    const sampleTasks = [
        {
            id: '1',
            userId: currentUser?.uid || 'sample',
            title: 'Start Tomato Seeds Indoors',
            description: 'Begin starting tomato seeds indoors 6-8 weeks before last frost date',
            category: 'planting',
            season: 'spring',
            month: 3,
            priority: 'high',
            plantTypes: ['Tomatoes', 'Peppers'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '2',
            userId: currentUser?.uid || 'sample',
            title: 'Prepare Garden Beds',
            description: 'Clear winter debris, add compost, and prepare soil for planting',
            category: 'maintenance',
            season: 'spring',
            month: 4,
            priority: 'high',
            plantTypes: ['All Plants'],
            completed: true,
            completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            createdAt: new Date()
        },
        {
            id: '3',
            userId: currentUser?.uid || 'sample',
            title: 'Plant Cool Season Crops',
            description: 'Plant lettuce, spinach, peas, and other cool weather vegetables',
            category: 'planting',
            season: 'spring',
            month: 4,
            priority: 'medium',
            plantTypes: ['Lettuce', 'Spinach', 'Peas'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '4',
            userId: currentUser?.uid || 'sample',
            title: 'Summer Watering Schedule',
            description: 'Establish deep watering routine for hot summer months',
            category: 'maintenance',
            season: 'summer',
            month: 6,
            priority: 'high',
            plantTypes: ['All Plants'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '5',
            userId: currentUser?.uid || 'sample',
            title: 'Harvest Summer Vegetables',
            description: 'Regular harvesting of tomatoes, peppers, zucchini, and herbs',
            category: 'harvesting',
            season: 'summer',
            month: 7,
            priority: 'medium',
            plantTypes: ['Tomatoes', 'Peppers', 'Zucchini', 'Herbs'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '6',
            userId: currentUser?.uid || 'sample',
            title: 'Fall Garden Cleanup',
            description: 'Remove spent plants, collect seeds, and prepare beds for winter',
            category: 'maintenance',
            season: 'fall',
            month: 10,
            priority: 'high',
            plantTypes: ['All Plants'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '7',
            userId: currentUser?.uid || 'sample',
            title: 'Plant Garlic',
            description: 'Plant garlic cloves for next year\'s harvest',
            category: 'planting',
            season: 'fall',
            month: 10,
            priority: 'medium',
            plantTypes: ['Garlic'],
            completed: false,
            createdAt: new Date()
        },
        {
            id: '8',
            userId: currentUser?.uid || 'sample',
            title: 'Protect Plants from Frost',
            description: 'Cover tender plants and bring containers indoors',
            category: 'maintenance',
            season: 'winter',
            month: 12,
            priority: 'high',
            plantTypes: ['Tender Plants'],
            completed: false,
            createdAt: new Date()
        }
    ];
    useEffect(() => {
        setTasks(sampleTasks);
        setLoading(false);
    }, [currentUser]);
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsAddingTask(true);
        try {
            const plantTypesArray = data.plantTypes.split(',').map(s => s.trim()).filter(s => s);
            const newTask = {
                id: Date.now().toString(),
                userId: currentUser.uid,
                title: data.title,
                description: data.description,
                category: data.category,
                season: data.season,
                month: data.month,
                priority: data.priority,
                plantTypes: plantTypesArray,
                completed: false,
                createdAt: new Date()
            };
            setTasks([newTask, ...tasks]);
            reset();
            setIsDialogOpen(false);
            alert('✅ Seasonal task added successfully!');
        }
        catch (error) {
            console.error('Error creating seasonal task:', error);
            alert('❌ Failed to add seasonal task');
        }
        finally {
            setIsAddingTask(false);
        }
    };
    const toggleTaskCompletion = async (taskId, completed) => {
        try {
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        completed,
                        completedAt: completed ? new Date() : undefined
                    };
                }
                return task;
            });
            setTasks(updatedTasks);
            alert(`✅ Task marked as ${completed ? 'completed' : 'pending'}`);
        }
        catch (error) {
            console.error('Error updating task:', error);
            alert('❌ Failed to update task');
        }
    };
    const deleteTask = async (taskId) => {
        try {
            setTasks(tasks.filter(task => task.id !== taskId));
            alert('🗑️ Task deleted');
        }
        catch (error) {
            console.error('Error deleting task:', error);
            alert('❌ Failed to delete task');
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'planting': return _jsx(Sprout, { className: "h-5 w-5 text-green-500" });
            case 'harvesting': return _jsx(Leaf, { className: "h-5 w-5 text-orange-500" });
            case 'pruning': return _jsx(Scissors, { className: "h-5 w-5 text-blue-500" });
            case 'fertilizing': return _jsx(Sprout, { className: "h-5 w-5 text-purple-500" });
            case 'pest-control': return _jsx(Bug, { className: "h-5 w-5 text-red-500" });
            case 'maintenance': return _jsx(Wrench, { className: "h-5 w-5 text-gray-500" });
            default: return _jsx(Calendar, { className: "h-5 w-5 text-gray-500" });
        }
    };
    const getCategoryEmoji = (category) => {
        switch (category) {
            case 'planting': return '🌱';
            case 'harvesting': return '🍅';
            case 'pruning': return '✂️';
            case 'fertilizing': return '🌿';
            case 'pest-control': return '🐛';
            case 'maintenance': return '🔧';
            default: return '📅';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getSeasonColor = (season) => {
        switch (season) {
            case 'spring': return 'bg-green-100 text-green-800 border-green-200';
            case 'summer': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'fall': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'winter': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getSeasonEmoji = (season) => {
        switch (season) {
            case 'spring': return '🌸';
            case 'summer': return '☀️';
            case 'fall': return '🍂';
            case 'winter': return '❄️';
            default: return '📅';
        }
    };
    const getMonthName = (month) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1];
    };
    const filterTasksBySeason = (season) => {
        return tasks.filter(task => task.season === season);
    };
    const getCurrentSeasonTasks = () => {
        return tasks.filter(task => task.season === currentSeason &&
            task.month === currentMonth &&
            !task.completed);
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading seasonal planner..." })] }) }) }));
    }
    const currentSeasonTasks = getCurrentSeasonTasks();
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(CalendarDays, { className: "mr-3 h-10 w-10" }), "Seasonal Garden Planner"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Plan and track your gardening tasks throughout the year" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Add Task"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px] bg-white", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-green-700 flex items-center", children: [_jsx(Calendar, { className: "mr-2 h-5 w-5" }), "Add Seasonal Task"] }), _jsx(DialogDescription, { className: "text-gray-600", children: "Create a new gardening task for your seasonal calendar." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "title", className: "text-base font-medium text-gray-700", children: "Task Title *" }), _jsx(Input, { id: "title", placeholder: "e.g., Start tomato seeds indoors", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('title', { required: 'Task title is required' }) }), errors.title && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.title.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "description", className: "text-base font-medium text-gray-700", children: "Description *" }), _jsx(Textarea, { id: "description", placeholder: "Detailed description of the task...", className: "min-h-[100px] bg-gray-50 border-2 border-gray-200", ...register('description', { required: 'Description is required' }) }), errors.description && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.description.message }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "category", className: "text-base font-medium text-gray-700", children: "Category *" }), _jsxs(Select, { onValueChange: (value) => setValue('category', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Select category" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "planting", children: "\uD83C\uDF31 Planting" }), _jsx(SelectItem, { value: "harvesting", children: "\uD83C\uDF45 Harvesting" }), _jsx(SelectItem, { value: "pruning", children: "\u2702\uFE0F Pruning" }), _jsx(SelectItem, { value: "fertilizing", children: "\uD83C\uDF3F Fertilizing" }), _jsx(SelectItem, { value: "pest-control", children: "\uD83D\uDC1B Pest Control" }), _jsx(SelectItem, { value: "maintenance", children: "\uD83D\uDD27 Maintenance" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "priority", className: "text-base font-medium text-gray-700", children: "Priority *" }), _jsxs(Select, { onValueChange: (value) => setValue('priority', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\u26A1 Select priority" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "\uD83D\uDFE2 Low" }), _jsx(SelectItem, { value: "medium", children: "\uD83D\uDFE1 Medium" }), _jsx(SelectItem, { value: "high", children: "\uD83D\uDD34 High" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "season", className: "text-base font-medium text-gray-700", children: "Season *" }), _jsxs(Select, { onValueChange: (value) => setValue('season', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF38 Select season" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "spring", children: "\uD83C\uDF38 Spring" }), _jsx(SelectItem, { value: "summer", children: "\u2600\uFE0F Summer" }), _jsx(SelectItem, { value: "fall", children: "\uD83C\uDF42 Fall" }), _jsx(SelectItem, { value: "winter", children: "\u2744\uFE0F Winter" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "month", className: "text-base font-medium text-gray-700", children: "Month *" }), _jsxs(Select, { onValueChange: (value) => setValue('month', parseInt(value)), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83D\uDCC5 Select month" }) }), _jsx(SelectContent, { children: Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (_jsx(SelectItem, { value: month.toString(), children: getMonthName(month) }, month))) })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantTypes", className: "text-base font-medium text-gray-700", children: "Plant Types (comma-separated)" }), _jsx(Input, { id: "plantTypes", placeholder: "e.g., Tomatoes, Peppers, Herbs", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('plantTypes') })] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: isAddingTask, className: "flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold", children: isAddingTask ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Adding..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), "Add Task"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), className: "h-12 px-6 border-2 border-gray-300", children: "Cancel" })] })] })] })] })] }), currentSeasonTasks.length > 0 && (_jsxs(Card, { className: "bg-gradient-to-r from-green-100 to-blue-100 shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-green-50 to-blue-50 border-b", children: [_jsxs(CardTitle, { className: "flex items-center text-green-700", children: [_jsx(Calendar, { className: "mr-2 h-6 w-6" }), "This Month's Tasks (", getMonthName(currentMonth), ")"] }), _jsx(CardDescription, { className: "text-gray-600", children: "Tasks scheduled for the current month" })] }), _jsx(CardContent, { className: "pt-6", children: _jsx("div", { className: "space-y-4", children: currentSeasonTasks.map((task) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 transition-all shadow-sm", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Checkbox, { checked: task.completed, onCheckedChange: (checked) => toggleTaskCompletion(task.id, checked), className: "w-5 h-5" }), _jsx("span", { className: "text-2xl", children: getCategoryEmoji(task.category) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-800", children: task.title }), _jsx("p", { className: "text-sm text-gray-600", children: task.description })] })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx(Badge, { className: `${getPriorityColor(task.priority)} border font-medium`, children: task.priority }) })] }, task.id))) }) })] })), _jsxs(Tabs, { value: selectedSeason, onValueChange: setSelectedSeason, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-white shadow-md border-0 p-2", children: [_jsxs(TabsTrigger, { value: "spring", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700", children: ["\uD83C\uDF38 Spring (", filterTasksBySeason('spring').length, ")"] }), _jsxs(TabsTrigger, { value: "summer", className: "data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700", children: ["\u2600\uFE0F Summer (", filterTasksBySeason('summer').length, ")"] }), _jsxs(TabsTrigger, { value: "fall", className: "data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700", children: ["\uD83C\uDF42 Fall (", filterTasksBySeason('fall').length, ")"] }), _jsxs(TabsTrigger, { value: "winter", className: "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700", children: ["\u2744\uFE0F Winter (", filterTasksBySeason('winter').length, ")"] })] }), ['spring', 'summer', 'fall', 'winter'].map((season) => (_jsxs(TabsContent, { value: season, className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: filterTasksBySeason(season).map((task) => (_jsxs(Card, { className: `bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden ${task.completed ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-blue-500'}`, children: [_jsx(CardHeader, { className: "pb-4 bg-gradient-to-r from-gray-50 to-blue-50", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Checkbox, { checked: task.completed, onCheckedChange: (checked) => toggleTaskCompletion(task.id, checked), className: "w-5 h-5" }), _jsx("span", { className: "text-3xl", children: getCategoryEmoji(task.category) }), _jsxs("div", { children: [_jsx(CardTitle, { className: `text-xl font-bold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`, children: task.title }), _jsxs(CardDescription, { className: "text-gray-600", children: [getMonthName(task.month), " \u2022 ", task.category] })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Badge, { className: `${getPriorityColor(task.priority)} border font-medium`, children: task.priority }), _jsxs(Badge, { className: `${getSeasonColor(task.season)} border font-medium`, children: [_jsx("span", { className: "mr-1", children: getSeasonEmoji(task.season) }), task.season] })] })] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsx("p", { className: `text-gray-600 mb-4 ${task.completed ? 'text-gray-500' : ''}`, children: task.description }), task.plantTypes.length > 0 && (_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "\uD83C\uDF31 Plant Types:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: task.plantTypes.map((plantType, index) => (_jsx(Badge, { variant: "outline", className: "bg-gray-50 border-gray-300", children: plantType }, index))) })] })), _jsxs("div", { className: "flex justify-between items-center pt-3 border-t border-gray-100", children: [_jsx("div", { className: "text-sm text-gray-600", children: task.completed && task.completedAt ? (_jsxs("span", { className: "flex items-center text-green-600 font-medium", children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Completed ", format(task.completedAt, 'MMM d, yyyy')] })) : (_jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), "Scheduled for ", getMonthName(task.month)] })) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => deleteTask(task.id), className: "text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] }, task.id))) }), filterTasksBySeason(season).length === 0 && (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx("span", { className: "text-6xl mb-4 block", children: getSeasonEmoji(season) }), _jsxs("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: ["No ", season, " tasks yet"] }), _jsxs("p", { className: "text-lg text-gray-500 mb-6", children: ["Add tasks to plan your ", season, " gardening activities."] }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add ", season.charAt(0).toUpperCase() + season.slice(1), " Task"] })] }) }))] }, season)))] })] }) }));
}
