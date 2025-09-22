import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { Reminder, Plant } from '@/types';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Switch } from '@/components/ui/switch';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { format, addDays, isToday, isTomorrow, isPast } from 'date-fns';
// import { Plus, Bell, BellOff, Droplets, Scissors, Sprout, Calendar, Trash2, Edit } from 'lucide-react';
// interface ReminderFormData {
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning';
//   ruleDays: number;
// }
// export default function Reminders() {
//   const { currentUser } = useAuth();
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingReminder, setIsAddingReminder] = useState(false);
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ReminderFormData>();
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
//         // Fetch reminders
//         const remindersQuery = query(
//           collection(db, 'reminders'),
//           where('userId', '==', currentUser.id),
//           orderBy('nextRunAt', 'asc')
//         );
//         const remindersSnapshot = await getDocs(remindersQuery);
//         const remindersData = remindersSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           nextRunAt: doc.data().nextRunAt?.toDate() || new Date(),
//           lastRunAt: doc.data().lastRunAt?.toDate(),
//           createdAt: doc.data().createdAt?.toDate() || new Date()
//         })) as Reminder[];
//         setPlants(plantsData);
//         setReminders(remindersData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentUser]);
//   const onSubmit = async (data: ReminderFormData) => {
//     if (!currentUser) return;
//     setIsAddingReminder(true);
//     try {
//       const nextRunAt = addDays(new Date(), data.ruleDays);
//       const reminderData = {
//         userId: currentUser.id,
//         plantId: data.plantId,
//         type: data.type,
//         ruleDays: data.ruleDays,
//         nextRunAt: nextRunAt,
//         enabled: true,
//         createdAt: serverTimestamp()
//       };
//       const docRef = await addDoc(collection(db, 'reminders'), reminderData);
//       // Add to local state
//       const newReminder: Reminder = {
//         id: docRef.id,
//         ...reminderData,
//         nextRunAt: nextRunAt,
//         createdAt: new Date()
//       } as Reminder;
//       setReminders([...reminders, newReminder].sort((a, b) => a.nextRunAt.getTime() - b.nextRunAt.getTime()));
//       reset();
//       toast.success('Reminder created successfully!');
//     } catch (error) {
//       console.error('Error creating reminder:', error);
//       toast.error('Failed to create reminder');
//     } finally {
//       setIsAddingReminder(false);
//     }
//   };
//   const toggleReminder = async (reminderId: string, enabled: boolean) => {
//     try {
//       await updateDoc(doc(db, 'reminders', reminderId), { enabled });
//       setReminders(reminders.map(reminder =>
//         reminder.id === reminderId ? { ...reminder, enabled } : reminder
//       ));
//       toast.success(`Reminder ${enabled ? 'enabled' : 'disabled'}`);
//     } catch (error) {
//       console.error('Error updating reminder:', error);
//       toast.error('Failed to update reminder');
//     }
//   };
//   const deleteReminder = async (reminderId: string) => {
//     try {
//       await deleteDoc(doc(db, 'reminders', reminderId));
//       setReminders(reminders.filter(reminder => reminder.id !== reminderId));
//       toast.success('Reminder deleted');
//     } catch (error) {
//       console.error('Error deleting reminder:', error);
//       toast.error('Failed to delete reminder');
//     }
//   };
//   const markAsCompleted = async (reminderId: string) => {
//     try {
//       const reminder = reminders.find(r => r.id === reminderId);
//       if (!reminder) return;
//       const nextRunAt = addDays(new Date(), reminder.ruleDays);
//       await updateDoc(doc(db, 'reminders', reminderId), {
//         lastRunAt: new Date(),
//         nextRunAt: nextRunAt
//       });
//       setReminders(reminders.map(r =>
//         r.id === reminderId 
//           ? { ...r, lastRunAt: new Date(), nextRunAt: nextRunAt }
//           : r
//       ).sort((a, b) => a.nextRunAt.getTime() - b.nextRunAt.getTime()));
//       toast.success('Care task completed!');
//     } catch (error) {
//       console.error('Error marking reminder as completed:', error);
//       toast.error('Failed to update reminder');
//     }
//   };
//   const getCareIcon = (type: string) => {
//     switch (type) {
//       case 'watering': return <Droplets className="h-4 w-4 text-blue-500" />;
//       case 'fertilizing': return <Sprout className="h-4 w-4 text-green-500" />;
//       case 'pruning': return <Scissors className="h-4 w-4 text-orange-500" />;
//       default: return <Calendar className="h-4 w-4 text-gray-500" />;
//     }
//   };
//   const getPlantName = (plantId: string) => {
//     const plant = plants.find(p => p.id === plantId);
//     return plant?.nickname || 'Unknown Plant';
//   };
//   const getReminderStatus = (reminder: Reminder) => {
//     if (!reminder.enabled) return { text: 'Disabled', color: 'bg-gray-100 text-gray-800' };
//     if (isPast(reminder.nextRunAt) && !isToday(reminder.nextRunAt)) return { text: 'Overdue', color: 'bg-red-100 text-red-800' };
//     if (isToday(reminder.nextRunAt)) return { text: 'Due Today', color: 'bg-yellow-100 text-yellow-800' };
//     if (isTomorrow(reminder.nextRunAt)) return { text: 'Due Tomorrow', color: 'bg-blue-100 text-blue-800' };
//     return { text: 'Upcoming', color: 'bg-green-100 text-green-800' };
//   };
//   const upcomingReminders = reminders.filter(r => r.enabled && (isToday(r.nextRunAt) || isPast(r.nextRunAt)));
//   const allReminders = reminders;
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading reminders...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Care Reminders</h1>
//           <p className="text-muted-foreground">
//             Manage your plant care schedule and never miss a watering again.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Reminder
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Create Care Reminder</DialogTitle>
//               <DialogDescription>
//                 Set up automated reminders for your plant care tasks.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="plantId">Select Plant *</Label>
//                 <Select onValueChange={(value) => setValue('plantId', value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose a plant" />
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
//               <div className="space-y-2">
//                 <Label htmlFor="type">Care Type *</Label>
//                 <Select onValueChange={(value) => setValue('type', value as 'watering' | 'fertilizing' | 'pruning')}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select care type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="watering">Watering</SelectItem>
//                     <SelectItem value="fertilizing">Fertilizing</SelectItem>
//                     <SelectItem value="pruning">Pruning</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.type && (
//                   <p className="text-sm text-red-500">Please select a care type</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="ruleDays">Repeat Every (days) *</Label>
//                 <Input
//                   id="ruleDays"
//                   type="number"
//                   min="1"
//                   max="365"
//                   placeholder="7"
//                   {...register('ruleDays', { 
//                     required: 'Frequency is required',
//                     valueAsNumber: true,
//                     min: { value: 1, message: 'Must be at least 1 day' },
//                     max: { value: 365, message: 'Must be less than 365 days' }
//                   })}
//                 />
//                 {errors.ruleDays && (
//                   <p className="text-sm text-red-500">{errors.ruleDays.message}</p>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingReminder} className="flex-1">
//                   {isAddingReminder ? 'Creating...' : 'Create Reminder'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Upcoming Tasks */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Bell className="mr-2 h-5 w-5" />
//             Tasks Due Today & Overdue
//           </CardTitle>
//           <CardDescription>
//             Complete these care tasks to keep your plants healthy
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {upcomingReminders.length === 0 ? (
//             <div className="text-center py-6">
//               <p className="text-muted-foreground">No tasks due today! 🎉</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {upcomingReminders.map((reminder) => {
//                 const status = getReminderStatus(reminder);
//                 return (
//                   <div key={reminder.id} className="flex items-center justify-between p-4 rounded-lg border bg-white">
//                     <div className="flex items-center space-x-3">
//                       {getCareIcon(reminder.type)}
//                       <div>
//                         <p className="font-medium">{getPlantName(reminder.plantId)}</p>
//                         <p className="text-sm text-muted-foreground capitalize">
//                           {reminder.type} • Every {reminder.ruleDays} days
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Badge className={status.color}>
//                         {status.text}
//                       </Badge>
//                       <Button 
//                         size="sm" 
//                         onClick={() => markAsCompleted(reminder.id)}
//                         className="bg-green-600 hover:bg-green-700"
//                       >
//                         Mark Done
//                       </Button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//       {/* All Reminders */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Reminders</CardTitle>
//           <CardDescription>
//             Manage all your plant care reminders
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {allReminders.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
//                 <BellOff className="w-full h-full" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders set</h3>
//               <p className="text-muted-foreground mb-6">
//                 Create your first reminder to start tracking plant care!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {allReminders.map((reminder) => {
//                 const status = getReminderStatus(reminder);
//                 return (
//                   <div key={reminder.id} className="flex items-center justify-between p-4 rounded-lg border">
//                     <div className="flex items-center space-x-3">
//                       {getCareIcon(reminder.type)}
//                       <div>
//                         <p className="font-medium">{getPlantName(reminder.plantId)}</p>
//                         <p className="text-sm text-muted-foreground capitalize">
//                           {reminder.type} • Every {reminder.ruleDays} days
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           Next: {format(reminder.nextRunAt, 'MMM d, yyyy')}
//                           {reminder.lastRunAt && ` • Last: ${format(reminder.lastRunAt, 'MMM d, yyyy')}`}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <Badge className={status.color}>
//                         {status.text}
//                       </Badge>
//                       <Switch
//                         checked={reminder.enabled}
//                         onCheckedChange={(enabled) => toggleReminder(reminder.id, enabled)}
//                       />
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => deleteReminder(reminder.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format, addDays, isToday, isTomorrow, isPast } from 'date-fns';
import { Plus, Bell, BellOff, Droplets, Scissors, Sprout, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
export default function Reminders() {
    const { currentUser } = useAuth();
    const [reminders, setReminders] = useState([]);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingReminder, setIsAddingReminder] = useState(false);
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
    // Sample reminders data
    const sampleReminders = [
        {
            id: '1',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-1',
            type: 'watering',
            ruleDays: 3,
            nextRunAt: new Date(), // Due today
            lastRunAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            enabled: true,
            createdAt: new Date()
        },
        {
            id: '2',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-2',
            type: 'fertilizing',
            ruleDays: 14,
            nextRunAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Overdue
            enabled: true,
            createdAt: new Date()
        },
        {
            id: '3',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-3',
            type: 'pruning',
            ruleDays: 21,
            nextRunAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
            enabled: true,
            createdAt: new Date()
        },
        {
            id: '4',
            userId: currentUser?.uid || 'sample',
            plantId: 'plant-1',
            type: 'fertilizing',
            ruleDays: 30,
            nextRunAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
            enabled: false,
            createdAt: new Date()
        }
    ];
    useEffect(() => {
        setPlants(samplePlants);
        setReminders(sampleReminders);
        setLoading(false);
    }, [currentUser]);
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsAddingReminder(true);
        try {
            const nextRunAt = addDays(new Date(), data.ruleDays);
            const newReminder = {
                id: Date.now().toString(),
                userId: currentUser.uid,
                plantId: data.plantId,
                type: data.type,
                ruleDays: data.ruleDays,
                nextRunAt: nextRunAt,
                enabled: true,
                createdAt: new Date()
            };
            setReminders([...reminders, newReminder].sort((a, b) => a.nextRunAt.getTime() - b.nextRunAt.getTime()));
            reset();
            setIsDialogOpen(false);
            alert('🔔 Reminder created successfully!');
        }
        catch (error) {
            console.error('Error creating reminder:', error);
            alert('❌ Failed to create reminder');
        }
        finally {
            setIsAddingReminder(false);
        }
    };
    const toggleReminder = async (reminderId, enabled) => {
        try {
            setReminders(reminders.map(reminder => reminder.id === reminderId ? { ...reminder, enabled } : reminder));
            alert(`🔔 Reminder ${enabled ? 'enabled' : 'disabled'}`);
        }
        catch (error) {
            console.error('Error updating reminder:', error);
            alert('❌ Failed to update reminder');
        }
    };
    const deleteReminder = async (reminderId) => {
        try {
            setReminders(reminders.filter(reminder => reminder.id !== reminderId));
            alert('🗑️ Reminder deleted');
        }
        catch (error) {
            console.error('Error deleting reminder:', error);
            alert('❌ Failed to delete reminder');
        }
    };
    const markAsCompleted = async (reminderId) => {
        try {
            const reminder = reminders.find(r => r.id === reminderId);
            if (!reminder)
                return;
            const nextRunAt = addDays(new Date(), reminder.ruleDays);
            setReminders(reminders.map(r => r.id === reminderId
                ? { ...r, lastRunAt: new Date(), nextRunAt: nextRunAt }
                : r).sort((a, b) => a.nextRunAt.getTime() - b.nextRunAt.getTime()));
            alert('✅ Care task completed!');
        }
        catch (error) {
            console.error('Error marking reminder as completed:', error);
            alert('❌ Failed to update reminder');
        }
    };
    const getCareIcon = (type) => {
        switch (type) {
            case 'watering': return _jsx(Droplets, { className: "h-5 w-5 text-blue-500" });
            case 'fertilizing': return _jsx(Sprout, { className: "h-5 w-5 text-green-500" });
            case 'pruning': return _jsx(Scissors, { className: "h-5 w-5 text-orange-500" });
            default: return _jsx(Calendar, { className: "h-5 w-5 text-gray-500" });
        }
    };
    const getCareEmoji = (type) => {
        switch (type) {
            case 'watering': return '💧';
            case 'fertilizing': return '🌱';
            case 'pruning': return '✂️';
            default: return '📅';
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
    const getReminderStatus = (reminder) => {
        if (!reminder.enabled)
            return { text: 'Disabled', color: 'bg-gray-100 text-gray-800 border-gray-200' };
        if (isPast(reminder.nextRunAt) && !isToday(reminder.nextRunAt))
            return { text: 'Overdue', color: 'bg-red-100 text-red-800 border-red-200' };
        if (isToday(reminder.nextRunAt))
            return { text: 'Due Today', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
        if (isTomorrow(reminder.nextRunAt))
            return { text: 'Due Tomorrow', color: 'bg-blue-100 text-blue-800 border-blue-200' };
        return { text: 'Upcoming', color: 'bg-green-100 text-green-800 border-green-200' };
    };
    const upcomingReminders = reminders.filter(r => r.enabled && (isToday(r.nextRunAt) || isPast(r.nextRunAt)));
    const allReminders = reminders;
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading reminders..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Bell, { className: "mr-3 h-10 w-10" }), "Care Reminders"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Manage your plant care schedule and never miss a watering again" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Add Reminder"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-green-700 flex items-center", children: [_jsx(Bell, { className: "mr-2 h-5 w-5" }), "Create Care Reminder"] }), _jsx(DialogDescription, { className: "text-gray-600", children: "Set up automated reminders for your plant care tasks." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantId", className: "text-base font-medium text-gray-700", children: "Select Plant *" }), _jsxs(Select, { onValueChange: (value) => setValue('plantId', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Choose a plant" }) }), _jsx(SelectContent, { children: plants.map((plant) => (_jsx(SelectItem, { value: plant.id, children: _jsxs("span", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: getPlantEmoji(plant.id) }), plant.nickname] }) }, plant.id))) })] }), errors.plantId && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select a plant" }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "type", className: "text-base font-medium text-gray-700", children: "Care Type *" }), _jsxs(Select, { onValueChange: (value) => setValue('type', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83D\uDD27 Select care type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "watering", children: "\uD83D\uDCA7 Watering" }), _jsx(SelectItem, { value: "fertilizing", children: "\uD83C\uDF31 Fertilizing" }), _jsx(SelectItem, { value: "pruning", children: "\u2702\uFE0F Pruning" })] })] }), errors.type && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select a care type" }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "ruleDays", className: "text-base font-medium text-gray-700", children: "Repeat Every (days) *" }), _jsx(Input, { id: "ruleDays", type: "number", min: "1", max: "365", placeholder: "7", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('ruleDays', {
                                                                required: 'Frequency is required',
                                                                valueAsNumber: true,
                                                                min: { value: 1, message: 'Must be at least 1 day' },
                                                                max: { value: 365, message: 'Must be less than 365 days' }
                                                            }) }), errors.ruleDays && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.ruleDays.message })), _jsx("p", { className: "text-sm text-gray-500", children: "Common schedules: Watering (2-3 days), Fertilizing (14-30 days), Pruning (30-60 days)" })] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: isAddingReminder, className: "flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold", children: isAddingReminder ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Creating..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(Bell, { className: "mr-2 h-4 w-4" }), "Create Reminder"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), className: "h-12 px-6 border-2 border-gray-300", children: "Cancel" })] })] })] })] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-yellow-50 to-orange-50 border-b", children: [_jsxs(CardTitle, { className: "flex items-center text-orange-700", children: [_jsx(Bell, { className: "mr-2 h-6 w-6" }), "Tasks Due Today & Overdue"] }), _jsx(CardDescription, { className: "text-orange-600", children: "Complete these care tasks to keep your plants healthy" })] }), _jsx(CardContent, { className: "pt-6", children: upcomingReminders.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "mx-auto h-16 w-16 text-green-500 mb-4" }), _jsx("p", { className: "text-lg font-medium text-gray-700 mb-2", children: "No tasks due today! \uD83C\uDF89" }), _jsx("p", { className: "text-gray-500", children: "Your plants are all caught up on their care schedule." })] })) : (_jsx("div", { className: "space-y-4", children: upcomingReminders.map((reminder) => {
                                    const status = getReminderStatus(reminder);
                                    return (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-green-300 transition-all shadow-sm", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: "text-3xl", children: getCareEmoji(reminder.type) }), _jsx("span", { className: "text-2xl", children: getPlantEmoji(reminder.plantId) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-gray-800", children: getPlantName(reminder.plantId) }), _jsxs("p", { className: "text-sm text-gray-600 capitalize", children: [reminder.type, " \u2022 Every ", reminder.ruleDays, " days"] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: `${status.color} border font-medium`, children: status.text }), _jsxs(Button, { size: "sm", onClick: () => markAsCompleted(reminder.id), className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2", children: [_jsx(CheckCircle, { className: "mr-1 h-4 w-4" }), "Mark Done"] })] })] }, reminder.id));
                                }) })) })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-green-50 to-blue-50 border-b", children: [_jsx(CardTitle, { className: "text-green-700", children: "All Reminders" }), _jsx(CardDescription, { className: "text-gray-600", children: "Manage all your plant care reminders" })] }), _jsx(CardContent, { className: "pt-6", children: allReminders.length === 0 ? (_jsxs("div", { className: "text-center py-16", children: [_jsx(BellOff, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No reminders set" }), _jsx("p", { className: "text-lg text-gray-500 mb-6", children: "Create your first reminder to start tracking plant care!" }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create First Reminder"] })] })) : (_jsx("div", { className: "space-y-4", children: allReminders.map((reminder) => {
                                    const status = getReminderStatus(reminder);
                                    return (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 transition-all", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: "text-2xl", children: getCareEmoji(reminder.type) }), _jsx("span", { className: "text-2xl", children: getPlantEmoji(reminder.plantId) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-gray-800", children: getPlantName(reminder.plantId) }), _jsxs("p", { className: "text-sm text-gray-600 capitalize", children: [reminder.type, " \u2022 Every ", reminder.ruleDays, " days"] }), _jsxs("p", { className: "text-xs text-gray-500 flex items-center", children: [_jsx(Clock, { className: "mr-1 h-3 w-3" }), "Next: ", format(reminder.nextRunAt, 'MMM d, yyyy'), reminder.lastRunAt && ` • Last: ${format(reminder.lastRunAt, 'MMM d, yyyy')}`] })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Badge, { className: `${status.color} border font-medium`, children: status.text }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { checked: reminder.enabled, onCheckedChange: (enabled) => toggleReminder(reminder.id, enabled) }), _jsx("span", { className: "text-sm text-gray-600", children: reminder.enabled ? 'On' : 'Off' })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => deleteReminder(reminder.id), className: "text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }, reminder.id));
                                }) })) })] })] }) }));
}
