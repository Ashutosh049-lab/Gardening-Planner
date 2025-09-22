import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export default function AddPlant() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [formData, setFormData] = useState({
        plantTypeId: '',
        nickname: '',
        potSize: '',
        notes: '',
        customCadence: {}
    });
    const [errors, setErrors] = useState({});
    const handleFileUpload = (event) => {
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
    const removeImage = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        const newPreviews = previewUrls.filter((_, i) => i !== index);
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(previewUrls[index]);
        setUploadedFiles(newFiles);
        setPreviewUrls(newPreviews);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.nickname.trim()) {
            newErrors.nickname = 'Plant nickname is required';
        }
        else if (formData.nickname.length < 2) {
            newErrors.nickname = 'Nickname must be at least 2 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        if (!currentUser)
            return;
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
        }
        catch (error) {
            console.error('Error adding plant:', error);
            alert('Failed to add plant. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleInputChange = (field, value) => {
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
    const handleCadenceChange = (type, value) => {
        const numValue = parseInt(value) || undefined;
        setFormData(prev => ({
            ...prev,
            customCadence: {
                ...prev.customCadence,
                [type]: numValue
            }
        }));
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-8", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/plants'), className: "hover:bg-white/50 rounded-full shadow-md", children: _jsx(ArrowLeft, { className: "h-6 w-6 text-green-700" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-green-700 flex items-center", children: [_jsx(Leaf, { className: "mr-4 h-10 w-10 md:h-12 md:w-12" }), "Add New Plant"] }), _jsx("p", { className: "text-xl text-green-600 mt-2", children: "Add a new plant to your collection and start tracking its care journey" })] })] }), _jsxs(Card, { className: "shadow-2xl border-0 bg-white/95 backdrop-blur-sm", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg", children: [_jsxs(CardTitle, { className: "text-2xl md:text-3xl flex items-center", children: [_jsx(Camera, { className: "mr-3 h-8 w-8" }), "Plant Information"] }), _jsx(CardDescription, { className: "text-green-100 text-lg", children: "Fill in the details about your new green friend" })] }), _jsx(CardContent, { className: "p-6 md:p-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "plantType", className: "text-lg font-semibold text-gray-700", children: "Plant Type" }), _jsxs(Select, { onValueChange: (value) => handleInputChange('plantTypeId', value), children: [_jsx(SelectTrigger, { className: "h-14 text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors", children: _jsx(SelectValue, { placeholder: "\uD83C\uDF31 Select a plant type or create custom" }) }), _jsxs(SelectContent, { className: "text-lg bg-white", children: [_jsx(SelectItem, { value: "custom", children: "\uD83C\uDF3F Custom Plant" }), _jsx(SelectItem, { value: "tomato", children: "\uD83C\uDF45 Tomato" }), _jsx(SelectItem, { value: "basil", children: "\uD83C\uDF3F Basil" }), _jsx(SelectItem, { value: "rose", children: "\uD83C\uDF39 Rose" }), _jsx(SelectItem, { value: "lavender", children: "\uD83D\uDC9C Lavender" }), _jsx(SelectItem, { value: "mint", children: "\uD83C\uDF31 Mint" }), _jsx(SelectItem, { value: "sunflower", children: "\uD83C\uDF3B Sunflower" }), _jsx(SelectItem, { value: "pepper", children: "\uD83C\uDF36\uFE0F Pepper" }), _jsx(SelectItem, { value: "orchid", children: "\uD83C\uDF3A Orchid" }), _jsx(SelectItem, { value: "cactus", children: "\uD83C\uDF35 Cactus" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Label, { htmlFor: "nickname", className: "text-lg font-semibold text-gray-700", children: ["Plant Nickname ", _jsx("span", { className: "text-red-500 text-xl", children: "*" })] }), _jsx(Input, { id: "nickname", placeholder: "e.g., Sunny the Sunflower, My Favorite Tomato, Little Green Friend", value: formData.nickname, onChange: (e) => handleInputChange('nickname', e.target.value), className: `h-14 text-lg bg-white border-2 transition-colors ${errors.nickname
                                                    ? 'border-red-400 focus:border-red-500'
                                                    : 'border-gray-200 hover:border-green-400 focus:border-green-500'}` }), errors.nickname && (_jsxs("p", { className: "text-red-500 flex items-center text-lg", children: [_jsx("span", { className: "mr-2", children: "\u26A0\uFE0F" }), errors.nickname] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "potSize", className: "text-lg font-semibold text-gray-700", children: "Container Size" }), _jsxs(Select, { onValueChange: (value) => handleInputChange('potSize', value), children: [_jsx(SelectTrigger, { className: "h-14 text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors", children: _jsx(SelectValue, { placeholder: "\uD83E\uDEB4 Select container size" }) }), _jsxs(SelectContent, { className: "text-lg bg-white", children: [_jsx(SelectItem, { value: "small", children: "Small Pot (4-6 inches)" }), _jsx(SelectItem, { value: "medium", children: "Medium Pot (8-10 inches)" }), _jsx(SelectItem, { value: "large", children: "Large Pot (12-14 inches)" }), _jsx(SelectItem, { value: "extra-large", children: "Extra Large Pot (16+ inches)" }), _jsx(SelectItem, { value: "ground", children: "Planted in Ground" }), _jsx(SelectItem, { value: "raised-bed", children: "Raised Garden Bed" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "notes", className: "text-lg font-semibold text-gray-700", children: "Special Notes" }), _jsx(Textarea, { id: "notes", placeholder: "Tell us about your plant... Where did you get it? Any special care instructions? What makes it unique?", value: formData.notes, onChange: (e) => handleInputChange('notes', e.target.value), className: "min-h-[140px] text-lg bg-white border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors resize-none" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-lg font-semibold text-gray-700", children: "Custom Care Schedule" }), _jsx("p", { className: "text-gray-500 mt-2 text-base", children: "Set how often you want to be reminded for each care activity (leave blank for defaults)" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "wateringDays", className: "text-base font-medium text-blue-600 flex items-center", children: "\uD83D\uDCA7 Watering Frequency" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "wateringDays", type: "number", placeholder: "7", min: "1", max: "365", onChange: (e) => handleCadenceChange('watering', e.target.value), className: "h-12 text-lg bg-blue-50 border-2 border-blue-200 focus:border-blue-500 pr-16" }), _jsx("span", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500", children: "days" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "fertilizingDays", className: "text-base font-medium text-green-600 flex items-center", children: "\uD83C\uDF31 Fertilizing Frequency" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "fertilizingDays", type: "number", placeholder: "14", min: "1", max: "365", onChange: (e) => handleCadenceChange('fertilizing', e.target.value), className: "h-12 text-lg bg-green-50 border-2 border-green-200 focus:border-green-500 pr-16" }), _jsx("span", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500", children: "days" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { htmlFor: "pruningDays", className: "text-base font-medium text-orange-600 flex items-center", children: "\u2702\uFE0F Pruning Frequency" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "pruningDays", type: "number", placeholder: "30", min: "1", max: "365", onChange: (e) => handleCadenceChange('pruning', e.target.value), className: "h-12 text-lg bg-orange-50 border-2 border-orange-200 focus:border-orange-500 pr-16" }), _jsx("span", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500", children: "days" })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-lg font-semibold text-gray-700", children: "Plant Photos" }), _jsx("p", { className: "text-gray-500 mt-2 text-base", children: "Upload up to 5 beautiful photos of your plant" })] }), _jsxs("div", { className: "border-3 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300 bg-gradient-to-br from-green-50 to-blue-50", children: [_jsx("input", { type: "file", multiple: true, accept: "image/*", onChange: handleFileUpload, className: "hidden", id: "file-upload" }), _jsxs("label", { htmlFor: "file-upload", className: "cursor-pointer", children: [_jsx(Upload, { className: "mx-auto h-16 w-16 text-green-400 mb-4" }), _jsx("div", { className: "text-xl font-medium text-gray-700 mb-2", children: "\uD83D\uDCF8 Click to upload or drag and drop" }), _jsx("p", { className: "text-base text-gray-500", children: "PNG, JPG, WEBP up to 10MB each \u2022 Maximum 5 photos" })] })] }), previewUrls.length > 0 && (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: previewUrls.map((url, index) => (_jsxs("div", { className: "relative group", children: [_jsx("img", { src: url, alt: `Plant photo ${index + 1}`, className: "w-full h-32 object-cover rounded-xl border-3 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow" }), _jsx("button", { type: "button", onClick: () => removeImage(index), className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-colors opacity-0 group-hover:opacity-100", children: _jsx(X, { className: "h-4 w-4" }) })] }, index))) }))] }), _jsxs("div", { className: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-8 border-t-2 border-gray-100", children: [_jsx(Button, { type: "submit", disabled: isLoading, className: "flex-1 h-16 text-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300", children: isLoading ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" }), "Adding Your Plant..."] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(Leaf, { className: "mr-3 h-6 w-6" }), "Add Plant to Collection"] })) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => navigate('/plants'), className: "flex-1 h-16 text-xl border-2 border-gray-300 hover:bg-gray-50 font-bold transition-all duration-300", disabled: isLoading, children: "Cancel" })] })] }) })] })] }) }));
}
