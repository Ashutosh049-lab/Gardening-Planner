import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { collection, query, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { JournalEntry, Plant } from '@/types';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { format } from 'date-fns';
// import { Plus, Camera, Droplets, Scissors, Sprout, Calendar } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// interface JournalFormData {
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string;
// }
// export default function PlantJournal() {
//   const { currentUser } = useAuth();
//   const [entries, setEntries] = useState<JournalEntry[]>([]);
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddingEntry, setIsAddingEntry] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<JournalFormData>();
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
//         // Fetch journal entries
//         const journalQuery = query(
//           collection(db, 'users', currentUser.id, 'journals'),
//           orderBy('createdAt', 'desc')
//         );
//         const journalSnapshot = await getDocs(journalQuery);
//         const journalData = journalSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//           createdAt: doc.data().createdAt?.toDate() || new Date()
//         })) as JournalEntry[];
//         setPlants(plantsData);
//         setEntries(journalData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [currentUser]);
//   const onDrop = (acceptedFiles: File[]) => {
//     if (uploadedFiles.length + acceptedFiles.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }
//     const newFiles = [...uploadedFiles, ...acceptedFiles];
//     setUploadedFiles(newFiles);
//     const newPreviewUrls = acceptedFiles.map(file => URL.createObjectURL(file));
//     setPreviewUrls([...previewUrls, ...newPreviewUrls]);
//   };
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.jpeg', '.jpg', '.png', '.webp']
//     },
//     maxFiles: 5
//   });
//   const uploadImages = async (): Promise<string[]> => {
//     const imageUrls: string[] = [];
//     for (const file of uploadedFiles) {
//       const imageRef = ref(storage, `journal/${currentUser!.id}/${Date.now()}_${file.name}`);
//       const snapshot = await uploadBytes(imageRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       imageUrls.push(downloadURL);
//     }
//     return imageUrls;
//   };
//   const onSubmit = async (data: JournalFormData) => {
//     if (!currentUser) return;
//     setIsAddingEntry(true);
//     try {
//       const imageUrls = uploadedFiles.length > 0 ? await uploadImages() : [];
//       const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
//       const entryData = {
//         plantId: data.plantId,
//         text: data.text,
//         careAction: data.careAction || undefined,
//         tags,
//         images: imageUrls,
//         createdAt: serverTimestamp()
//       };
//       const docRef = await addDoc(collection(db, 'users', currentUser.id, 'journals'), entryData);
//       // Add to local state
//       const newEntry: JournalEntry = {
//         id: docRef.id,
//         ...entryData,
//         createdAt: new Date()
//       } as JournalEntry;
//       setEntries([newEntry, ...entries]);
//       // Reset form
//       reset();
//       setUploadedFiles([]);
//       setPreviewUrls([]);
//       toast.success('Journal entry added successfully!');
//     } catch (error) {
//       console.error('Error adding journal entry:', error);
//       toast.error('Failed to add journal entry');
//     } finally {
//       setIsAddingEntry(false);
//     }
//   };
//   const getCareIcon = (action: string) => {
//     switch (action) {
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
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading journal...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Plant Journal</h1>
//           <p className="text-muted-foreground">
//             Document your plant care activities and track their progress.
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Entry
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Add Journal Entry</DialogTitle>
//               <DialogDescription>
//                 Record your plant care activities and observations.
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
//                 <Label htmlFor="careAction">Care Action</Label>
//                 <Select onValueChange={(value) => setValue('careAction', value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select care action (optional)" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="watering">Watering</SelectItem>
//                     <SelectItem value="fertilizing">Fertilizing</SelectItem>
//                     <SelectItem value="pruning">Pruning</SelectItem>
//                     <SelectItem value="repotting">Repotting</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="text">Notes *</Label>
//                 <Textarea
//                   id="text"
//                   placeholder="What did you observe or do with your plant today?"
//                   {...register('text', { required: 'Notes are required' })}
//                 />
//                 {errors.text && (
//                   <p className="text-sm text-red-500">{errors.text.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="tags">Tags</Label>
//                 <Input
//                   id="tags"
//                   placeholder="growth, flowering, pest-control (comma separated)"
//                   {...register('tags')}
//                 />
//               </div>
//               {/* Image Upload */}
//               <div className="space-y-2">
//                 <Label>Photos</Label>
//                 <div
//                   {...getRootProps()}
//                   className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
//                     isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
//                   }`}
//                 >
//                   <input {...getInputProps()} />
//                   <Camera className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
//                   <p className="text-sm">Add photos to your entry</p>
//                 </div>
//                 {previewUrls.length > 0 && (
//                   <div className="grid grid-cols-3 gap-2">
//                     {previewUrls.map((url, index) => (
//                       <img
//                         key={index}
//                         src={url}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-20 object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={isAddingEntry} className="flex-1">
//                   {isAddingEntry ? 'Adding...' : 'Add Entry'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//       {/* Journal Entries */}
//       {entries.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
//           <p className="text-muted-foreground mb-6">
//             Start documenting your plant care journey!
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {entries.map((entry) => (
//             <Card key={entry.id}>
//               <CardContent className="pt-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     {entry.careAction && getCareIcon(entry.careAction)}
//                     <div>
//                       <h3 className="font-medium">{getPlantName(entry.plantId)}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {format(entry.createdAt, 'MMM d, yyyy • h:mm a')}
//                       </p>
//                     </div>
//                   </div>
//                   {entry.careAction && (
//                     <Badge variant="secondary" className="capitalize">
//                       {entry.careAction}
//                     </Badge>
//                   )}
//                 </div>
//                 <p className="text-gray-700 mb-4">{entry.text}</p>
//                 {entry.images.length > 0 && (
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
//                     {entry.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`Entry image ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                     ))}
//                   </div>
//                 )}
//                 {entry.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-1">
//                     {entry.tags.map((tag, index) => (
//                       <Badge key={index} variant="outline" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Plus, Droplets, Scissors, Sprout, Calendar, BookOpen, Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
export default function PlantJournal() {
    const { currentUser } = useAuth();
    const [entries, setEntries] = useState([]);
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
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
    // Sample journal entries
    const sampleEntries = [
        {
            id: '1',
            plantId: 'plant-1',
            text: 'Noticed new flower clusters forming! The plant is responding well to the increased watering schedule. The leaves are a vibrant green and no signs of pests.',
            careAction: 'watering',
            tags: ['flowering', 'growth', 'healthy'],
            images: [],
            createdAt: new Date()
        },
        {
            id: '2',
            plantId: 'plant-2',
            text: 'Applied organic fertilizer today. The peppers are starting to develop good size and color. Removed a few yellowing lower leaves.',
            careAction: 'fertilizing',
            tags: ['fertilizing', 'pruning', 'fruit-development'],
            images: [],
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            id: '3',
            plantId: 'plant-3',
            text: 'Harvested fresh basil leaves for cooking. The plant is bushy and healthy. Pinched off flower buds to encourage more leaf growth.',
            careAction: 'pruning',
            tags: ['harvest', 'pinching', 'cooking'],
            images: [],
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: '4',
            plantId: 'plant-1',
            text: 'First tomatoes are starting to turn red! Very excited to see the progress. The plant has grown significantly since last month.',
            tags: ['ripening', 'progress', 'excitement'],
            images: [],
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
    ];
    useEffect(() => {
        setPlants(samplePlants);
        setEntries(sampleEntries);
        setLoading(false);
    }, [currentUser]);
    const onDrop = (acceptedFiles) => {
        if (uploadedFiles.length + acceptedFiles.length > 5) {
            alert('⚠️ Maximum 5 images allowed');
            return;
        }
        const newFiles = [...uploadedFiles, ...acceptedFiles];
        setUploadedFiles(newFiles);
        const newPreviewUrls = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 5
    });
    const removeImage = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        setPreviewUrls(newUrls);
    };
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsAddingEntry(true);
        try {
            const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];
            const newEntry = {
                id: Date.now().toString(),
                plantId: data.plantId,
                text: data.text,
                careAction: data.careAction || undefined,
                tags,
                images: [], // In a real app, these would be uploaded to storage
                createdAt: new Date()
            };
            setEntries([newEntry, ...entries]);
            // Reset form
            reset();
            setUploadedFiles([]);
            setPreviewUrls([]);
            setIsDialogOpen(false);
            alert('📝 Journal entry added successfully!');
        }
        catch (error) {
            console.error('Error adding journal entry:', error);
            alert('❌ Failed to add journal entry');
        }
        finally {
            setIsAddingEntry(false);
        }
    };
    const getCareIcon = (action) => {
        switch (action) {
            case 'watering': return _jsx(Droplets, { className: "h-5 w-5 text-blue-500" });
            case 'fertilizing': return _jsx(Sprout, { className: "h-5 w-5 text-green-500" });
            case 'pruning': return _jsx(Scissors, { className: "h-5 w-5 text-orange-500" });
            case 'repotting': return _jsx(Calendar, { className: "h-5 w-5 text-purple-500" });
            default: return _jsx(Calendar, { className: "h-5 w-5 text-gray-500" });
        }
    };
    const getCareActionEmoji = (action) => {
        switch (action) {
            case 'watering': return '💧';
            case 'fertilizing': return '🌱';
            case 'pruning': return '✂️';
            case 'repotting': return '🪴';
            case 'other': return '🔧';
            default: return '📝';
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
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading journal..." })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(BookOpen, { className: "mr-3 h-10 w-10" }), "Plant Journal"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Document your plant care activities and track their progress" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all", children: [_jsx(Plus, { className: "mr-2 h-5 w-5" }), "Add Entry"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-green-700 flex items-center", children: [_jsx(BookOpen, { className: "mr-2 h-5 w-5" }), "Add Journal Entry"] }), _jsx(DialogDescription, { className: "text-gray-600", children: "Record your plant care activities and observations." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantId", className: "text-base font-medium text-gray-700", children: "Select Plant *" }), _jsxs(Select, { onValueChange: (value) => setValue('plantId', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Choose a plant" }) }), _jsx(SelectContent, { className: 'bg-white', children: plants.map((plant) => (_jsx(SelectItem, { value: plant.id, children: _jsxs("span", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: getPlantEmoji(plant.id) }), plant.nickname] }) }, plant.id))) })] }), errors.plantId && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: "Please select a plant" }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "careAction", className: "text-base font-medium text-gray-700", children: "Care Action" }), _jsxs(Select, { onValueChange: (value) => setValue('careAction', value), children: [_jsx(SelectTrigger, { className: "h-12 bg-gray-50 border-2 border-gray-200", children: _jsx(SelectValue, { placeholder: "\uD83D\uDD27 Select care action (optional)" }) }), _jsxs(SelectContent, { className: 'bg-white', children: [_jsx(SelectItem, { value: "watering", children: "\uD83D\uDCA7 Watering" }), _jsx(SelectItem, { value: "fertilizing", children: "\uD83C\uDF31 Fertilizing" }), _jsx(SelectItem, { value: "pruning", children: "\u2702\uFE0F Pruning" }), _jsx(SelectItem, { value: "repotting", children: "\uD83E\uDEB4 Repotting" }), _jsx(SelectItem, { value: "other", children: "\uD83D\uDD27 Other" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "text", className: "text-base font-medium text-gray-700", children: "Notes *" }), _jsx(Textarea, { id: "text", placeholder: "What did you observe or do with your plant today? Describe growth, health, care activities...", className: "min-h-[120px] bg-gray-50 border-2 border-gray-200", ...register('text', { required: 'Notes are required' }) }), errors.text && (_jsx("p", { className: "text-sm text-red-500 bg-red-50 p-2 rounded", children: errors.text.message }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "tags", className: "text-base font-medium text-gray-700", children: "Tags" }), _jsx(Input, { id: "tags", placeholder: "growth, flowering, pest-control (comma separated)", className: "h-12 bg-gray-50 border-2 border-gray-200", ...register('tags') })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-base font-medium text-gray-700", children: "Photos" }), _jsxs("div", { ...getRootProps(), className: `border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'}`, children: [_jsx("input", { ...getInputProps() }), _jsx(Upload, { className: "mx-auto h-8 w-8 text-gray-400 mb-3" }), _jsx("p", { className: "text-base font-medium text-gray-700 mb-1", children: isDragActive ? 'Drop photos here...' : 'Add photos to your entry' }), _jsx("p", { className: "text-sm text-gray-500", children: "Drag & drop or click to select (max 5 images)" })] }), previewUrls.length > 0 && (_jsx("div", { className: "grid grid-cols-3 gap-3", children: previewUrls.map((url, index) => (_jsxs("div", { className: "relative group", children: [_jsx("img", { src: url, alt: `Preview ${index + 1}`, className: "w-full h-24 object-cover rounded-lg border-2 border-gray-200" }), _jsx("button", { type: "button", onClick: () => removeImage(index), className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }))] }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(Button, { type: "submit", disabled: isAddingEntry, className: "flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold", children: isAddingEntry ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Adding..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(BookOpen, { className: "mr-2 h-4 w-4" }), "Add Entry"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsDialogOpen(false), className: "h-12 px-6 border-2 border-gray-300", children: "Cancel" })] })] })] })] })] }), entries.length === 0 ? (_jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(BookOpen, { className: "mx-auto h-20 w-20 text-gray-400 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "No journal entries yet" }), _jsx("p", { className: "text-lg text-gray-500 mb-6", children: "Start documenting your plant care journey!" }), _jsxs(Button, { onClick: () => setIsDialogOpen(true), className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add First Entry"] })] }) })) : (_jsx("div", { className: "space-y-6", children: entries.map((entry) => (_jsx(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: "text-3xl", children: getPlantEmoji(entry.plantId) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-gray-800", children: getPlantName(entry.plantId) }), _jsx("p", { className: "text-sm text-gray-500", children: format(entry.createdAt, 'MMM d, yyyy • h:mm a') })] })] }), entry.careAction && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-2xl", children: getCareActionEmoji(entry.careAction) }), _jsx(Badge, { variant: "secondary", className: "capitalize bg-green-100 text-green-800 border-green-200", children: entry.careAction })] }))] }), _jsx("div", { className: "bg-gray-50 p-4 rounded-xl mb-4", children: _jsx("p", { className: "text-gray-700 leading-relaxed", children: entry.text }) }), entry.images.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-4", children: entry.images.map((image, index) => (_jsx("img", { src: image, alt: `Entry image ${index + 1}`, className: "w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors" }, index))) })), entry.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: entry.tags.map((tag, index) => (_jsxs(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: ["#", tag] }, index))) }))] }) }, entry.id))) }))] }) }));
}
