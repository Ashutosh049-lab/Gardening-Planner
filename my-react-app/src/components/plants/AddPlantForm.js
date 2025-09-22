import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { PlantFormData } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Upload, X } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// export default function AddPlantForm() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PlantFormData>({
//     defaultValues: {
//       locationInGarden: { x: 0, y: 0 }
//     }
//   });
//   const onDrop = (acceptedFiles: File[]) => {
//     if (uploadedFiles.length + acceptedFiles.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }
//     const newFiles = [...uploadedFiles, ...acceptedFiles];
//     setUploadedFiles(newFiles);
//     // Create preview URLs
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
//   const removeImage = (index: number) => {
//     const newFiles = uploadedFiles.filter((_, i) => i !== index);
//     const newPreviews = previewUrls.filter((_, i) => i !== index);
//     // Revoke the URL to prevent memory leaks
//     URL.revokeObjectURL(previewUrls[index]);
//     setUploadedFiles(newFiles);
//     setPreviewUrls(newPreviews);
//   };
//   const uploadImages = async (): Promise<string[]> => {
//     const imageUrls: string[] = [];
//     for (const file of uploadedFiles) {
//       const imageRef = ref(storage, `plants/${currentUser!.id}/${Date.now()}_${file.name}`);
//       const snapshot = await uploadBytes(imageRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       imageUrls.push(downloadURL);
//     }
//     return imageUrls;
//   };
//   const onSubmit = async (data: PlantFormData) => {
//     if (!currentUser) return;
//     setIsLoading(true);
//     try {
//       // Upload images if any
//       const imageUrls = uploadedFiles.length > 0 ? await uploadImages() : [];
//       // Create plant document
//       const plantData = {
//         plantTypeId: data.plantTypeId || 'custom',
//         nickname: data.nickname,
//         potSize: data.potSize,
//         locationInGarden: data.locationInGarden,
//         notes: data.notes,
//         customCadence: data.customCadence,
//         images: imageUrls,
//         healthStatus: 'good',
//         plantedOn: serverTimestamp(),
//         createdAt: serverTimestamp()
//       };
//       await addDoc(collection(db, 'users', currentUser.id, 'plants'), plantData);
//       toast.success('Plant added successfully!');
//       navigate('/plants');
//     } catch (error) {
//       console.error('Error adding plant:', error);
//       toast.error('Failed to add plant. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Add New Plant</h1>
//         <p className="text-muted-foreground">
//           Add a new plant to your collection and start tracking its care.
//         </p>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Plant Information</CardTitle>
//           <CardDescription>
//             Fill in the details about your new plant
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Plant Type Selection */}
//             <div className="space-y-2">
//               <Label htmlFor="plantType">Plant Type</Label>
//               <Select onValueChange={(value) => setValue('plantTypeId', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a plant type or create custom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="custom">Custom Plant</SelectItem>
//                   <SelectItem value="tomato">Tomato</SelectItem>
//                   <SelectItem value="basil">Basil</SelectItem>
//                   <SelectItem value="rose">Rose</SelectItem>
//                   <SelectItem value="lavender">Lavender</SelectItem>
//                   <SelectItem value="mint">Mint</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Plant Nickname */}
//             <div className="space-y-2">
//               <Label htmlFor="nickname">Plant Nickname *</Label>
//               <Input
//                 id="nickname"
//                 placeholder="e.g., My Favorite Tomato"
//                 {...register('nickname', { 
//                   required: 'Plant nickname is required',
//                   minLength: {
//                     value: 2,
//                     message: 'Nickname must be at least 2 characters'
//                   }
//                 })}
//               />
//               {errors.nickname && (
//                 <p className="text-sm text-red-500">{errors.nickname.message}</p>
//               )}
//             </div>
//             {/* Pot Size */}
//             <div className="space-y-2">
//               <Label htmlFor="potSize">Pot Size</Label>
//               <Select onValueChange={(value) => setValue('potSize', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select pot size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="small">Small (4-6 inches)</SelectItem>
//                   <SelectItem value="medium">Medium (8-10 inches)</SelectItem>
//                   <SelectItem value="large">Large (12+ inches)</SelectItem>
//                   <SelectItem value="ground">Planted in ground</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Notes */}
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes</Label>
//               <Textarea
//                 id="notes"
//                 placeholder="Any special notes about this plant..."
//                 {...register('notes')}
//               />
//             </div>
//             {/* Custom Care Schedule */}
//             <div className="space-y-4">
//               <Label>Custom Care Schedule (optional)</Label>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="wateringDays">Watering (days)</Label>
//                   <Input
//                     id="wateringDays"
//                     type="number"
//                     placeholder="7"
//                     {...register('customCadence.watering', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="fertilizingDays">Fertilizing (days)</Label>
//                   <Input
//                     id="fertilizingDays"
//                     type="number"
//                     placeholder="14"
//                     {...register('customCadence.fertilizing', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="pruningDays">Pruning (days)</Label>
//                   <Input
//                     id="pruningDays"
//                     type="number"
//                     placeholder="30"
//                     {...register('customCadence.pruning', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Image Upload */}
//             <div className="space-y-4">
//               <Label>Plant Photos (up to 5)</Label>
//               <div
//                 {...getRootProps()}
//                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//                   isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//               >
//                 <input {...getInputProps()} />
//                 <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
//                 {isDragActive ? (
//                   <p>Drop the images here...</p>
//                 ) : (
//                   <div>
//                     <p>Drag & drop images here, or click to select</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       PNG, JPG, WEBP up to 10MB each
//                     </p>
//                   </div>
//                 )}
//               </div>
//               {/* Image Previews */}
//               {previewUrls.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {previewUrls.map((url, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={url}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* Submit Buttons */}
//             <div className="flex space-x-4">
//               <Button type="submit" disabled={isLoading} className="flex-1">
//                 {isLoading ? 'Adding Plant...' : 'Add Plant'}
//               </Button>
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => navigate('/plants')}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '@/lib/firebase';
// import { useAuth } from '@/hooks/useAuth';
// import { PlantFormData } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Upload, X } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// export default function AddPlantForm() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PlantFormData>({
//     defaultValues: {
//       locationInGarden: { x: 0, y: 0 }
//     }
//   });
//   const onDrop = (acceptedFiles: File[]) => {
//     if (uploadedFiles.length + acceptedFiles.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }
//     const newFiles = [...uploadedFiles, ...acceptedFiles];
//     setUploadedFiles(newFiles);
//     // Create preview URLs
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
//   const removeImage = (index: number) => {
//     const newFiles = uploadedFiles.filter((_, i) => i !== index);
//     const newPreviews = previewUrls.filter((_, i) => i !== index);
//     // Revoke the URL to prevent memory leaks
//     URL.revokeObjectURL(previewUrls[index]);
//     setUploadedFiles(newFiles);
//     setPreviewUrls(newPreviews);
//   };
//   const uploadImages = async (): Promise<string[]> => {
//     const imageUrls: string[] = [];
//     for (const file of uploadedFiles) {
//       const imageRef = ref(storage, `plants/${currentUser!.id}/${Date.now()}_${file.name}`);
//       const snapshot = await uploadBytes(imageRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       imageUrls.push(downloadURL);
//     }
//     return imageUrls;
//   };
//   const onSubmit = async (data: PlantFormData) => {
//     if (!currentUser) return;
//     setIsLoading(true);
//     try {
//       // Upload images if any
//       const imageUrls = uploadedFiles.length > 0 ? await uploadImages() : [];
//       // Create plant document
//       const plantData = {
//         plantTypeId: data.plantTypeId || 'custom',
//         nickname: data.nickname,
//         potSize: data.potSize,
//         locationInGarden: data.locationInGarden,
//         notes: data.notes,
//         customCadence: data.customCadence,
//         images: imageUrls,
//         healthStatus: 'good',
//         plantedOn: serverTimestamp(),
//         createdAt: serverTimestamp()
//       };
//       await addDoc(collection(db, 'users', currentUser.id, 'plants'), plantData);
//       toast.success('Plant added successfully!');
//       navigate('/plants');
//     } catch (error) {
//       console.error('Error adding plant:', error);
//       toast.error('Failed to add plant. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Add New Plant</h1>
//         <p className="text-muted-foreground">
//           Add a new plant to your collection and start tracking its care.
//         </p>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Plant Information</CardTitle>
//           <CardDescription>
//             Fill in the details about your new plant
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Plant Type Selection */}
//             <div className="space-y-2">
//               <Label htmlFor="plantType">Plant Type</Label>
//               <Select onValueChange={(value) => setValue('plantTypeId', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a plant type or create custom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="custom">Custom Plant</SelectItem>
//                   <SelectItem value="tomato">Tomato</SelectItem>
//                   <SelectItem value="basil">Basil</SelectItem>
//                   <SelectItem value="rose">Rose</SelectItem>
//                   <SelectItem value="lavender">Lavender</SelectItem>
//                   <SelectItem value="mint">Mint</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Plant Nickname */}
//             <div className="space-y-2">
//               <Label htmlFor="nickname">Plant Nickname *</Label>
//               <Input
//                 id="nickname"
//                 placeholder="e.g., My Favorite Tomato"
//                 {...register('nickname', { 
//                   required: 'Plant nickname is required',
//                   minLength: {
//                     value: 2,
//                     message: 'Nickname must be at least 2 characters'
//                   }
//                 })}
//               />
//               {errors.nickname && (
//                 <p className="text-sm text-red-500">{errors.nickname.message}</p>
//               )}
//             </div>
//             {/* Pot Size */}
//             <div className="space-y-2">
//               <Label htmlFor="potSize">Pot Size</Label>
//               <Select onValueChange={(value) => setValue('potSize', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select pot size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="small">Small (4-6 inches)</SelectItem>
//                   <SelectItem value="medium">Medium (8-10 inches)</SelectItem>
//                   <SelectItem value="large">Large (12+ inches)</SelectItem>
//                   <SelectItem value="ground">Planted in ground</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Notes */}
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes</Label>
//               <Textarea
//                 id="notes"
//                 placeholder="Any special notes about this plant..."
//                 {...register('notes')}
//               />
//             </div>
//             {/* Custom Care Schedule */}
//             <div className="space-y-4">
//               <Label>Custom Care Schedule (optional)</Label>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="wateringDays">Watering (days)</Label>
//                   <Input
//                     id="wateringDays"
//                     type="number"
//                     placeholder="7"
//                     {...register('customCadence.watering', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="fertilizingDays">Fertilizing (days)</Label>
//                   <Input
//                     id="fertilizingDays"
//                     type="number"
//                     placeholder="14"
//                     {...register('customCadence.fertilizing', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="pruningDays">Pruning (days)</Label>
//                   <Input
//                     id="pruningDays"
//                     type="number"
//                     placeholder="30"
//                     {...register('customCadence.pruning', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Image Upload */}
//             <div className="space-y-4">
//               <Label>Plant Photos (up to 5)</Label>
//               <div
//                 {...getRootProps()}
//                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//                   isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//               >
//                 <input {...getInputProps()} />
//                 <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
//                 {isDragActive ? (
//                   <p>Drop the images here...</p>
//                 ) : (
//                   <div>
//                     <p>Drag & drop images here, or click to select</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       PNG, JPG, WEBP up to 10MB each
//                     </p>
//                   </div>
//                 )}
//               </div>
//               {/* Image Previews */}
//               {previewUrls.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {previewUrls.map((url, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={url}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* Submit Buttons */}
//             <div className="flex space-x-4">
//               <Button type="submit" disabled={isLoading} className="flex-1">
//                 {isLoading ? 'Adding Plant...' : 'Add Plant'}
//               </Button>
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => navigate('/plants')}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';
// import { PlantFormData } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Upload, X } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// export default function AddPlantForm() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PlantFormData>({
//     defaultValues: {
//       locationInGarden: { x: 0, y: 0 }
//     }
//   });
//   const onDrop = (acceptedFiles: File[]) => {
//     if (uploadedFiles.length + acceptedFiles.length > 5) {
//       toast.error('Maximum 5 images allowed');
//       return;
//     }
//     const newFiles = [...uploadedFiles, ...acceptedFiles];
//     setUploadedFiles(newFiles);
//     // Create preview URLs
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
//   const removeImage = (index: number) => {
//     const newFiles = uploadedFiles.filter((_, i) => i !== index);
//     const newPreviews = previewUrls.filter((_, i) => i !== index);
//     // Revoke the URL to prevent memory leaks
//     URL.revokeObjectURL(previewUrls[index]);
//     setUploadedFiles(newFiles);
//     setPreviewUrls(newPreviews);
//   };
//   const onSubmit = async (data: PlantFormData) => {
//     if (!currentUser) return;
//     setIsLoading(true);
//     try {
//       // For demo purposes, we'll store plant data in localStorage
//       const existingPlants = JSON.parse(localStorage.getItem('userPlants') || '[]');
//       const plantData = {
//         id: Date.now().toString(),
//         userId: currentUser.id,
//         plantTypeId: data.plantTypeId || 'custom',
//         nickname: data.nickname,
//         species: data.species || 'Unknown',
//         variety: data.variety || '',
//         potSize: data.potSize,
//         location: data.location || 'Garden',
//         locationInGarden: data.locationInGarden,
//         notes: data.notes,
//         customCadence: data.customCadence,
//         images: previewUrls, // In demo, we'll use the preview URLs
//         healthStatus: 'healthy',
//         plantedOn: new Date(),
//         createdAt: new Date(),
//         lastWateredAt: null,
//         lastFertilizedAt: null,
//         lastPrunedAt: null
//       };
//       existingPlants.push(plantData);
//       localStorage.setItem('userPlants', JSON.stringify(existingPlants));
//       toast.success('Plant added successfully!');
//       navigate('/plants');
//     } catch (error) {
//       console.error('Error adding plant:', error);
//       toast.error('Failed to add plant. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Add New Plant</h1>
//         <p className="text-muted-foreground">
//           Add a new plant to your collection and start tracking its care.
//         </p>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Plant Information</CardTitle>
//           <CardDescription>
//             Fill in the details about your new plant
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Plant Type Selection */}
//             <div className="space-y-2">
//               <Label htmlFor="plantType">Plant Type</Label>
//               <Select onValueChange={(value) => setValue('plantTypeId', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a plant type or create custom" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="custom">Custom Plant</SelectItem>
//                   <SelectItem value="tomato">Tomato</SelectItem>
//                   <SelectItem value="basil">Basil</SelectItem>
//                   <SelectItem value="rose">Rose</SelectItem>
//                   <SelectItem value="lavender">Lavender</SelectItem>
//                   <SelectItem value="mint">Mint</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Plant Nickname */}
//             <div className="space-y-2">
//               <Label htmlFor="nickname">Plant Nickname *</Label>
//               <Input
//                 id="nickname"
//                 placeholder="e.g., My Favorite Tomato"
//                 {...register('nickname', { 
//                   required: 'Plant nickname is required',
//                   minLength: {
//                     value: 2,
//                     message: 'Nickname must be at least 2 characters'
//                   }
//                 })}
//               />
//               {errors.nickname && (
//                 <p className="text-sm text-red-500">{errors.nickname.message}</p>
//               )}
//             </div>
//             {/* Species */}
//             <div className="space-y-2">
//               <Label htmlFor="species">Species</Label>
//               <Input
//                 id="species"
//                 placeholder="e.g., Solanum lycopersicum"
//                 {...register('species')}
//               />
//             </div>
//             {/* Variety */}
//             <div className="space-y-2">
//               <Label htmlFor="variety">Variety</Label>
//               <Input
//                 id="variety"
//                 placeholder="e.g., Cherry, Beefsteak"
//                 {...register('variety')}
//               />
//             </div>
//             {/* Location */}
//             <div className="space-y-2">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 placeholder="e.g., Front yard, Kitchen windowsill"
//                 {...register('location')}
//               />
//             </div>
//             {/* Pot Size */}
//             <div className="space-y-2">
//               <Label htmlFor="potSize">Pot Size</Label>
//               <Select onValueChange={(value) => setValue('potSize', value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select pot size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="small">Small (4-6 inches)</SelectItem>
//                   <SelectItem value="medium">Medium (8-10 inches)</SelectItem>
//                   <SelectItem value="large">Large (12+ inches)</SelectItem>
//                   <SelectItem value="ground">Planted in ground</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Notes */}
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes</Label>
//               <Textarea
//                 id="notes"
//                 placeholder="Any special notes about this plant..."
//                 {...register('notes')}
//               />
//             </div>
//             {/* Custom Care Schedule */}
//             <div className="space-y-4">
//               <Label>Custom Care Schedule (optional)</Label>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="wateringDays">Watering (days)</Label>
//                   <Input
//                     id="wateringDays"
//                     type="number"
//                     placeholder="7"
//                     {...register('customCadence.watering', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="fertilizingDays">Fertilizing (days)</Label>
//                   <Input
//                     id="fertilizingDays"
//                     type="number"
//                     placeholder="14"
//                     {...register('customCadence.fertilizing', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="pruningDays">Pruning (days)</Label>
//                   <Input
//                     id="pruningDays"
//                     type="number"
//                     placeholder="30"
//                     {...register('customCadence.pruning', { 
//                       valueAsNumber: true,
//                       min: { value: 1, message: 'Must be at least 1 day' }
//                     })}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Image Upload */}
//             <div className="space-y-4">
//               <Label>Plant Photos (up to 5)</Label>
//               <div
//                 {...getRootProps()}
//                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//                   isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//               >
//                 <input {...getInputProps()} />
//                 <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
//                 {isDragActive ? (
//                   <p>Drop the images here...</p>
//                 ) : (
//                   <div>
//                     <p>Drag & drop images here, or click to select</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       PNG, JPG, WEBP up to 10MB each
//                     </p>
//                   </div>
//                 )}
//               </div>
//               {/* Image Previews */}
//               {previewUrls.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {previewUrls.map((url, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={url}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* Submit Buttons */}
//             <div className="flex space-x-4">
//               <Button type="submit" disabled={isLoading} className="flex-1">
//                 {isLoading ? 'Adding Plant...' : 'Add Plant'}
//               </Button>
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => navigate('/plants')}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
export default function AddPlantForm() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            locationInGarden: { x: 0, y: 0 }
        }
    });
    const onDrop = (acceptedFiles) => {
        if (uploadedFiles.length + acceptedFiles.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }
        const newFiles = [...uploadedFiles, ...acceptedFiles];
        setUploadedFiles(newFiles);
        // Create preview URLs
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
        const newPreviews = previewUrls.filter((_, i) => i !== index);
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(previewUrls[index]);
        setUploadedFiles(newFiles);
        setPreviewUrls(newPreviews);
    };
    const onSubmit = async (data) => {
        if (!currentUser)
            return;
        setIsLoading(true);
        try {
            // For demo purposes, we'll store plant data in localStorage
            const existingPlants = JSON.parse(localStorage.getItem('userPlants') || '[]');
            const plantData = {
                id: Date.now().toString(),
                userId: currentUser.id,
                plantTypeId: data.plantTypeId || 'custom',
                nickname: data.nickname,
                species: data.species || 'Unknown',
                variety: data.variety || '',
                potSize: data.potSize,
                location: data.location || 'Garden',
                locationInGarden: data.locationInGarden,
                notes: data.notes,
                customCadence: data.customCadence,
                images: previewUrls, // In demo, we'll use the preview URLs
                healthStatus: 'healthy',
                plantedOn: new Date(),
                createdAt: new Date(),
                lastWateredAt: null,
                lastFertilizedAt: null,
                lastPrunedAt: null
            };
            existingPlants.push(plantData);
            localStorage.setItem('userPlants', JSON.stringify(existingPlants));
            toast.success('Plant added successfully!');
            navigate('/plants');
        }
        catch (error) {
            console.error('Error adding plant:', error);
            toast.error('Failed to add plant. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Add New Plant" }), _jsx("p", { className: "text-muted-foreground", children: "Add a new plant to your collection and start tracking its care." })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Plant Information" }), _jsx(CardDescription, { children: "Fill in the details about your new plant" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "plantType", children: "Plant Type" }), _jsxs(Select, { onValueChange: (value) => setValue('plantTypeId', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a plant type or create custom" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "custom", children: "Custom Plant" }), _jsx(SelectItem, { value: "tomato", children: "Tomato" }), _jsx(SelectItem, { value: "basil", children: "Basil" }), _jsx(SelectItem, { value: "rose", children: "Rose" }), _jsx(SelectItem, { value: "lavender", children: "Lavender" }), _jsx(SelectItem, { value: "mint", children: "Mint" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "nickname", children: "Plant Nickname *" }), _jsx(Input, { id: "nickname", placeholder: "e.g., My Favorite Tomato", ...register('nickname', {
                                                required: 'Plant nickname is required',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Nickname must be at least 2 characters'
                                                }
                                            }) }), errors.nickname && (_jsx("p", { className: "text-sm text-red-500", children: errors.nickname.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "species", children: "Species" }), _jsx(Input, { id: "species", placeholder: "e.g., Solanum lycopersicum", ...register('species') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "variety", children: "Variety" }), _jsx(Input, { id: "variety", placeholder: "e.g., Cherry, Beefsteak", ...register('variety') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", children: "Location" }), _jsx(Input, { id: "location", placeholder: "e.g., Front yard, Kitchen windowsill", ...register('location') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "potSize", children: "Pot Size" }), _jsxs(Select, { onValueChange: (value) => setValue('potSize', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select pot size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "small", children: "Small (4-6 inches)" }), _jsx(SelectItem, { value: "medium", children: "Medium (8-10 inches)" }), _jsx(SelectItem, { value: "large", children: "Large (12+ inches)" }), _jsx(SelectItem, { value: "ground", children: "Planted in ground" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "notes", children: "Notes" }), _jsx(Textarea, { id: "notes", placeholder: "Any special notes about this plant...", ...register('notes') })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Custom Care Schedule (optional)" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "wateringDays", children: "Watering (days)" }), _jsx(Input, { id: "wateringDays", type: "number", placeholder: "7", ...register('customCadence.watering', {
                                                                valueAsNumber: true,
                                                                min: { value: 1, message: 'Must be at least 1 day' }
                                                            }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "fertilizingDays", children: "Fertilizing (days)" }), _jsx(Input, { id: "fertilizingDays", type: "number", placeholder: "14", ...register('customCadence.fertilizing', {
                                                                valueAsNumber: true,
                                                                min: { value: 1, message: 'Must be at least 1 day' }
                                                            }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "pruningDays", children: "Pruning (days)" }), _jsx(Input, { id: "pruningDays", type: "number", placeholder: "30", ...register('customCadence.pruning', {
                                                                valueAsNumber: true,
                                                                min: { value: 1, message: 'Must be at least 1 day' }
                                                            }) })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Plant Photos (up to 5)" }), _jsxs("div", { ...getRootProps(), className: `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`, children: [_jsx("input", { ...getInputProps() }), _jsx(Upload, { className: "mx-auto h-8 w-8 text-muted-foreground mb-2" }), isDragActive ? (_jsx("p", { children: "Drop the images here..." })) : (_jsxs("div", { children: [_jsx("p", { children: "Drag & drop images here, or click to select" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "PNG, JPG, WEBP up to 10MB each" })] }))] }), previewUrls.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: previewUrls.map((url, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: url, alt: `Preview ${index + 1}`, className: "w-full h-24 object-cover rounded-lg" }), _jsx("button", { type: "button", onClick: () => removeImage(index), className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }))] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { type: "submit", disabled: isLoading, className: "flex-1", children: isLoading ? 'Adding Plant...' : 'Add Plant' }), _jsx(Button, { type: "button", variant: "outline", onClick: () => navigate('/plants'), className: "flex-1", children: "Cancel" })] })] }) })] })] }));
}
