
// import AddPlantForm from '@/components/plants/AddPlantForm';

// export default function AddPlant() {
//   return <AddPlantForm />;
// }







import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, ArrowLeft, Leaf, Camera } from 'lucide-react';

interface PlantFormData {
  plantTypeId: string;
  nickname: string;
  potSize: string;
  notes: string;
  customCadence: {
    watering?: number;
    fertilizing?: number;
    pruning?: number;
  };
}

export default function AddPlant() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<PlantFormData>({
    plantTypeId: '',
    nickname: '',
    potSize: '',
    notes: '',
    customCadence: {}
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedFiles.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newFiles);

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setUploadedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Plant nickname is required';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = 'Nickname must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!currentUser) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would save to database
      console.log('Plant data to save:', {
        ...formData,
        images: uploadedFiles.map(f => f.name),
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      
      alert('🌱 Plant added successfully to your collection!');
      navigate('/plants');
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PlantFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCadenceChange = (type: 'watering' | 'fertilizing' | 'pruning', value: string) => {
    const numValue = parseInt(value) || undefined;
    setFormData(prev => ({
      ...prev,
      customCadence: {
        ...prev.customCadence,
        [type]: numValue
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/plants')}
            className="hover:bg-white/50 rounded-full shadow-md"
          >
            <ArrowLeft className="h-6 w-6 text-green-700" />
          </Button>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 flex items-center">
              <Leaf className="mr-4 h-10 w-10 md:h-12 md:w-12" />
              Add New Plant
            </h1>
            <p className="text-xl text-green-600 mt-2">
              Add a new plant to your collection and start tracking its care journey
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl md:text-3xl flex items-center">
              <Camera className="mr-3 h-8 w-8" />
              Plant Information
            </CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Fill in the details about your new green friend
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Plant Type Selection */}
              <div className="space-y-3">
                <Label htmlFor="plantType" className="text-lg font-semibold text-gray-700">
                  Plant Type
                </Label>
                <Select onValueChange={(value) => handleInputChange('plantTypeId', value)}>
                  <SelectTrigger className="h-14 text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors">
                    <SelectValue placeholder="🌱 Select a plant type or create custom" />
                  </SelectTrigger>
                  <SelectContent className="text-lg bg-white">
                    <SelectItem value="custom">🌿 Custom Plant</SelectItem>
                    <SelectItem value="tomato">🍅 Tomato</SelectItem>
                    <SelectItem value="basil">🌿 Basil</SelectItem>
                    <SelectItem value="rose">🌹 Rose</SelectItem>
                    <SelectItem value="lavender">💜 Lavender</SelectItem>
                    <SelectItem value="mint">🌱 Mint</SelectItem>
                    <SelectItem value="sunflower">🌻 Sunflower</SelectItem>
                    <SelectItem value="pepper">🌶️ Pepper</SelectItem>
                    <SelectItem value="orchid">🌺 Orchid</SelectItem>
                    <SelectItem value="cactus">🌵 Cactus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plant Nickname */}
              <div className="space-y-3">
                <Label htmlFor="nickname" className="text-lg font-semibold text-gray-700">
                  Plant Nickname <span className="text-red-500 text-xl">*</span>
                </Label>
                <Input
                  id="nickname"
                  placeholder="e.g., Sunny the Sunflower, My Favorite Tomato, Little Green Friend"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className={`h-14 text-lg bg-white border-2 transition-colors ${
                    errors.nickname 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-gray-200 hover:border-green-400 focus:border-green-500'
                  }`}
                />
                {errors.nickname && (
                  <p className="text-red-500 flex items-center text-lg">
                    <span className="mr-2">⚠️</span>
                    {errors.nickname}
                  </p>
                )}
              </div>

              {/* Pot Size */}
              <div className="space-y-3">
                <Label htmlFor="potSize" className="text-lg font-semibold text-gray-700">
                  Container Size
                </Label>
                <Select onValueChange={(value) => handleInputChange('potSize', value)}>
                  <SelectTrigger className="h-14 text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors">
                    <SelectValue placeholder="🪴 Select container size" />
                  </SelectTrigger>
                  <SelectContent className="text-lg bg-white">
                    <SelectItem value="small">Small Pot (4-6 inches)</SelectItem>
                    <SelectItem value="medium">Medium Pot (8-10 inches)</SelectItem>
                    <SelectItem value="large">Large Pot (12-14 inches)</SelectItem>
                    <SelectItem value="extra-large">Extra Large Pot (16+ inches)</SelectItem>
                    <SelectItem value="ground">Planted in Ground</SelectItem>
                    <SelectItem value="raised-bed">Raised Garden Bed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-lg font-semibold text-gray-700">
                  Special Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Tell us about your plant... Where did you get it? Any special care instructions? What makes it unique?"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="min-h-[140px] text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors resize-none"
                />
              </div>

              {/* Custom Care Schedule */}
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold text-gray-700">Custom Care Schedule</Label>
                  <p className="text-gray-500 mt-2 text-base">
                    Set how often you want to be reminded for each care activity (leave blank for defaults)
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="wateringDays" className="text-base font-medium text-blue-600 flex items-center">
                      💧 Watering Frequency
                    </Label>
                    <div className="relative">
                      <Input
                        id="wateringDays"
                        type="number"
                        placeholder="7"
                        min="1"
                        max="365"
                        onChange={(e) => handleCadenceChange('watering', e.target.value)}
                        className="h-12 text-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">days</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="fertilizingDays" className="text-base font-medium text-green-600 flex items-center">
                      🌱 Fertilizing Frequency
                    </Label>
                    <div className="relative">
                      <Input
                        id="fertilizingDays"
                        type="number"
                        placeholder="14"
                        min="1"
                        max="365"
                        onChange={(e) => handleCadenceChange('fertilizing', e.target.value)}
                        className="h-12 text-lg bg-green-50 border-2 border-green-200 focus:border-green-500 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">days</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="pruningDays" className="text-base font-medium text-orange-600 flex items-center">
                      ✂️ Pruning Frequency
                    </Label>
                    <div className="relative">
                      <Input
                        id="pruningDays"
                        type="number"
                        placeholder="30"
                        min="1"
                        max="365"
                        onChange={(e) => handleCadenceChange('pruning', e.target.value)}
                        className="h-12 text-lg bg-orange-50 border-2 border-orange-200 focus:border-orange-500 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold text-gray-700">Plant Photos</Label>
                  <p className="text-gray-500 mt-2 text-base">
                    Upload up to 5 beautiful photos of your plant
                  </p>
                </div>
                
                <div className="border-3 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300 bg-gradient-to-br from-green-50 to-blue-50">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-16 w-16 text-green-400 mb-4" />
                    <div className="text-xl font-medium text-gray-700 mb-2">
                      📸 Click to upload or drag and drop
                    </div>
                    <p className="text-base text-gray-500">
                      PNG, JPG, WEBP up to 10MB each • Maximum 5 photos
                    </p>
                  </label>
                </div>

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Plant photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border-3 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-8 border-t-2 border-gray-100">
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="flex-1 h-16 text-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Adding Your Plant...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Leaf className="mr-3 h-6 w-6" />
                      Add Plant to Collection
                    </div>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/plants')}
                  className="flex-1 h-16 text-xl border-2 border-gray-300 hover:bg-gray-50 font-bold transition-all duration-300"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
