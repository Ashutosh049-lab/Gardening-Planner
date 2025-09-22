import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useState, useRef, useCallback } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Save, Download, Upload, RotateCcw } from 'lucide-react';
// import { toast } from 'sonner';
// interface PlantToken {
//   id: string;
//   name: string;
//   x: number;
//   y: number;
//   size: number;
//   color: string;
// }
// export default function GardenDesigner() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [plants, setPlants] = useState<PlantToken[]>([]);
//   const [selectedPlant, setSelectedPlant] = useState<PlantToken | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [layoutName, setLayoutName] = useState('My Garden Layout');
//   const plantTypes = [
//     { name: 'Tomato', color: '#ef4444', size: 40 },
//     { name: 'Basil', color: '#22c55e', size: 25 },
//     { name: 'Rose', color: '#ec4899', size: 35 },
//     { name: 'Lavender', color: '#8b5cf6', size: 30 },
//     { name: 'Mint', color: '#06b6d4', size: 20 },
//   ];
//   const addPlant = (plantType: typeof plantTypes[0]) => {
//     const newPlant: PlantToken = {
//       id: `plant_${Date.now()}`,
//       name: plantType.name,
//       x: 100 + Math.random() * 200,
//       y: 100 + Math.random() * 200,
//       size: plantType.size,
//       color: plantType.color,
//     };
//     setPlants([...plants, newPlant]);
//   };
//   const handleMouseDown = useCallback((e: React.MouseEvent, plant: PlantToken) => {
//     e.preventDefault();
//     setSelectedPlant(plant);
//     setIsDragging(true);
//     const rect = canvasRef.current?.getBoundingClientRect();
//     if (rect) {
//       setDragOffset({
//         x: e.clientX - rect.left - plant.x,
//         y: e.clientY - rect.top - plant.y,
//       });
//     }
//   }, []);
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     if (!isDragging || !selectedPlant || !canvasRef.current) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const newX = e.clientX - rect.left - dragOffset.x;
//     const newY = e.clientY - rect.top - dragOffset.y;
//     setPlants(plants.map(plant =>
//       plant.id === selectedPlant.id
//         ? { ...plant, x: Math.max(0, Math.min(newX, rect.width - plant.size)), y: Math.max(0, Math.min(newY, rect.height - plant.size)) }
//         : plant
//     ));
//   }, [isDragging, selectedPlant, dragOffset, plants]);
//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//     setSelectedPlant(null);
//   }, []);
//   const clearCanvas = () => {
//     setPlants([]);
//     setSelectedPlant(null);
//   };
//   const saveLayout = async () => {
//     try {
//       // In a real app, this would save to Firestore
//       const layoutData = {
//         name: layoutName,
//         plants: plants,
//         createdAt: new Date().toISOString(),
//       };
//       // For demo, save to localStorage
//       const savedLayouts = JSON.parse(localStorage.getItem('gardenLayouts') || '[]');
//       savedLayouts.push(layoutData);
//       localStorage.setItem('gardenLayouts', JSON.stringify(savedLayouts));
//       toast.success('Garden layout saved successfully!');
//     } catch (error) {
//       toast.error('Failed to save layout');
//     }
//   };
//   const exportLayout = () => {
//     const layoutData = {
//       name: layoutName,
//       plants: plants,
//       exportedAt: new Date().toISOString(),
//     };
//     const dataStr = JSON.stringify(layoutData, null, 2);
//     const dataBlob = new Blob([dataStr], { type: 'application/json' });
//     const url = URL.createObjectURL(dataBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${layoutName.replace(/\s+/g, '_')}.json`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     toast.success('Layout exported successfully!');
//   };
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Garden Designer</h1>
//           <p className="text-muted-foreground">
//             Design your garden layout by dragging and dropping plants.
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline" onClick={clearCanvas}>
//             <RotateCcw className="mr-2 h-4 w-4" />
//             Clear
//           </Button>
//           <Button variant="outline" onClick={exportLayout}>
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button onClick={saveLayout}>
//             <Save className="mr-2 h-4 w-4" />
//             Save Layout
//           </Button>
//         </div>
//       </div>
//       <div className="grid gap-6 lg:grid-cols-4">
//         {/* Plant Palette */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Plant Palette</CardTitle>
//             <CardDescription>
//               Click to add plants to your garden
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             {plantTypes.map((plantType) => (
//               <Button
//                 key={plantType.name}
//                 variant="outline"
//                 className="w-full justify-start"
//                 onClick={() => addPlant(plantType)}
//               >
//                 <div
//                   className="w-4 h-4 rounded-full mr-2"
//                   style={{ backgroundColor: plantType.color }}
//                 />
//                 {plantType.name}
//               </Button>
//             ))}
//           </CardContent>
//         </Card>
//         {/* Garden Canvas */}
//         <Card className="lg:col-span-3">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>Garden Canvas</CardTitle>
//                 <CardDescription>
//                   Drag plants to arrange your garden layout
//                 </CardDescription>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Label htmlFor="layoutName" className="text-sm">Layout Name:</Label>
//                 <Input
//                   id="layoutName"
//                   value={layoutName}
//                   onChange={(e) => setLayoutName(e.target.value)}
//                   className="w-40"
//                 />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div
//               ref={canvasRef}
//               className="relative w-full h-96 bg-green-50 border-2 border-dashed border-green-200 rounded-lg overflow-hidden"
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseUp}
//             >
//               {/* Grid Pattern */}
//               <div className="absolute inset-0 opacity-20">
//                 <svg width="100%" height="100%">
//                   <defs>
//                     <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
//                       <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22c55e" strokeWidth="0.5"/>
//                     </pattern>
//                   </defs>
//                   <rect width="100%" height="100%" fill="url(#grid)" />
//                 </svg>
//               </div>
//               {/* Plants */}
//               {plants.map((plant) => (
//                 <div
//                   key={plant.id}
//                   className={`absolute cursor-move select-none transition-shadow ${
//                     selectedPlant?.id === plant.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
//                   }`}
//                   style={{
//                     left: plant.x,
//                     top: plant.y,
//                     width: plant.size,
//                     height: plant.size,
//                   }}
//                   onMouseDown={(e) => handleMouseDown(e, plant)}
//                 >
//                   <div
//                     className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-medium shadow-md"
//                     style={{ backgroundColor: plant.color }}
//                   >
//                     {plant.name.charAt(0)}
//                   </div>
//                   <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
//                     {plant.name}
//                   </div>
//                 </div>
//               ))}
//               {/* Empty State */}
//               {plants.length === 0 && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center text-muted-foreground">
//                     <div className="mb-2">🌱</div>
//                     <p>Click plants from the palette to start designing</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* Plant Count */}
//             {plants.length > 0 && (
//               <div className="mt-4 flex items-center justify-between">
//                 <div className="flex flex-wrap gap-2">
//                   {plantTypes.map((type) => {
//                     const count = plants.filter(p => p.name === type.name).length;
//                     return count > 0 ? (
//                       <Badge key={type.name} variant="secondary">
//                         {type.name}: {count}
//                       </Badge>
//                     ) : null;
//                   })}
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Total plants: {plants.length}
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, Download, RotateCcw, Palette, Move } from 'lucide-react';
export default function GardenDesigner() {
    const canvasRef = useRef(null);
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [layoutName, setLayoutName] = useState('My Garden Layout');
    const plantTypes = [
        { name: 'Tomato', color: '#ef4444', size: 50, emoji: '🍅' },
        { name: 'Basil', color: '#22c55e', size: 35, emoji: '🌿' },
        { name: 'Rose', color: '#ec4899', size: 45, emoji: '🌹' },
        { name: 'Lavender', color: '#8b5cf6', size: 40, emoji: '💜' },
        { name: 'Mint', color: '#06b6d4', size: 30, emoji: '🌱' },
        { name: 'Sunflower', color: '#f59e0b', size: 60, emoji: '🌻' },
        { name: 'Pepper', color: '#dc2626', size: 35, emoji: '🌶️' },
        { name: 'Cactus', color: '#059669', size: 40, emoji: '🌵' },
    ];
    const addPlant = (plantType) => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const rect = canvas.getBoundingClientRect();
        const newPlant = {
            id: `plant_${Date.now()}`,
            name: plantType.name,
            x: 50 + Math.random() * (rect.width - 150),
            y: 50 + Math.random() * (rect.height - 150),
            size: plantType.size,
            color: plantType.color,
            emoji: plantType.emoji,
        };
        setPlants([...plants, newPlant]);
    };
    const handleMouseDown = useCallback((e, plant) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedPlant(plant);
        setIsDragging(true);
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left - plant.x,
                y: e.clientY - rect.top - plant.y,
            });
        }
    }, []);
    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !selectedPlant || !canvasRef.current)
            return;
        const rect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;
        setPlants(plants.map(plant => plant.id === selectedPlant.id
            ? {
                ...plant,
                x: Math.max(0, Math.min(newX, rect.width - plant.size)),
                y: Math.max(0, Math.min(newY, rect.height - plant.size))
            }
            : plant));
    }, [isDragging, selectedPlant, dragOffset, plants]);
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setSelectedPlant(null);
    }, []);
    const clearCanvas = () => {
        setPlants([]);
        setSelectedPlant(null);
    };
    const saveLayout = async () => {
        try {
            const layoutData = {
                name: layoutName,
                plants: plants,
                createdAt: new Date().toISOString(),
            };
            const savedLayouts = JSON.parse(localStorage.getItem('gardenLayouts') || '[]');
            savedLayouts.push(layoutData);
            localStorage.setItem('gardenLayouts', JSON.stringify(savedLayouts));
            alert('🌱 Garden layout saved successfully!');
        }
        catch (error) {
            alert('❌ Failed to save layout');
        }
    };
    const exportLayout = () => {
        const layoutData = {
            name: layoutName,
            plants: plants,
            exportedAt: new Date().toISOString(),
        };
        const dataStr = JSON.stringify(layoutData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${layoutName.replace(/\s+/g, '_')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('📁 Layout exported successfully!');
    };
    const deletePlant = (plantId) => {
        setPlants(plants.filter(p => p.id !== plantId));
        setSelectedPlant(null);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Palette, { className: "mr-3 h-10 w-10" }), "Garden Designer"] }), _jsx("p", { className: "text-lg text-gray-600 mt-2", children: "Design your perfect garden layout with drag-and-drop simplicity" })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(Button, { variant: "outline", onClick: clearCanvas, className: "bg-white hover:bg-gray-50", children: [_jsx(RotateCcw, { className: "mr-2 h-4 w-4" }), "Clear All"] }), _jsxs(Button, { variant: "outline", onClick: exportLayout, className: "bg-white hover:bg-gray-50", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export JSON"] }), _jsxs(Button, { onClick: saveLayout, className: "bg-green-600 hover:bg-green-700 text-white", children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Layout"] })] })] }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-4", children: [_jsxs(Card, { className: "bg-white shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-green-50 border-b", children: [_jsxs(CardTitle, { className: "text-green-700 flex items-center", children: [_jsx(Palette, { className: "mr-2 h-5 w-5" }), "Plant Palette"] }), _jsx(CardDescription, { className: "text-gray-600", children: "Click to add plants to your garden canvas" })] }), _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "space-y-3", children: plantTypes.map((plantType) => (_jsxs(Button, { variant: "outline", className: "w-full justify-start h-12 text-left bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 transition-all", onClick: () => addPlant(plantType), children: [_jsx("span", { className: "text-2xl mr-3", children: plantType.emoji }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-800", children: plantType.name }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Size: ", plantType.size, "px"] })] }), _jsx("div", { className: "w-4 h-4 rounded-full border-2 border-white shadow-sm", style: { backgroundColor: plantType.color } })] }, plantType.name))) }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [_jsx("h4", { className: "font-medium text-blue-800 mb-2", children: "\uD83D\uDCA1 How to Use:" }), _jsxs("ul", { className: "text-sm text-blue-700 space-y-1", children: [_jsx("li", { children: "\u2022 Click plants above to add them" }), _jsx("li", { children: "\u2022 Drag plants to move them around" }), _jsx("li", { children: "\u2022 Double-click plants to delete them" }), _jsx("li", { children: "\u2022 Save your layout when done" })] })] })] })] }), _jsxs(Card, { className: "lg:col-span-3 bg-white shadow-lg border-0", children: [_jsx(CardHeader, { className: "bg-green-50 border-b", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-green-700 flex items-center", children: [_jsx(Move, { className: "mr-2 h-5 w-5" }), "Garden Canvas"] }), _jsx(CardDescription, { className: "text-gray-600", children: "Drag plants to arrange your perfect garden layout" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Label, { htmlFor: "layoutName", className: "text-sm font-medium text-gray-700", children: "Layout Name:" }), _jsx(Input, { id: "layoutName", value: layoutName, onChange: (e) => setLayoutName(e.target.value), className: "w-48 bg-white border-gray-300 focus:border-green-500", placeholder: "Enter layout name..." })] })] }) }), _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { ref: canvasRef, className: "relative w-full h-[500px] bg-gradient-to-br from-green-100 to-green-50 border-2 border-dashed border-green-300 rounded-xl overflow-hidden cursor-crosshair shadow-inner", onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, style: {
                                                backgroundImage: `
                    radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0),
                    radial-gradient(circle at 75px 75px, rgba(34, 197, 94, 0.05) 1px, transparent 0)
                  `,
                                                backgroundSize: '50px 50px'
                                            }, children: [_jsx("div", { className: "absolute inset-0 opacity-20", children: _jsxs("svg", { width: "100%", height: "100%", className: "pointer-events-none", children: [_jsx("defs", { children: _jsx("pattern", { id: "grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: _jsx("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "#22c55e", strokeWidth: "0.5" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })] }) }), plants.map((plant) => (_jsxs("div", { className: `absolute cursor-grab active:cursor-grabbing select-none transition-all duration-200 hover:scale-110 ${selectedPlant?.id === plant.id
                                                        ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-2xl scale-110 z-10'
                                                        : 'hover:shadow-xl hover:z-10'}`, style: {
                                                        left: plant.x,
                                                        top: plant.y,
                                                        width: plant.size,
                                                        height: plant.size,
                                                    }, onMouseDown: (e) => handleMouseDown(e, plant), onDoubleClick: () => deletePlant(plant.id), title: `${plant.name} - Double-click to delete`, children: [_jsxs("div", { className: "w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white relative overflow-hidden", style: { backgroundColor: plant.color }, children: [_jsx("span", { className: "text-2xl", children: plant.emoji }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full" })] }), _jsx("div", { className: "absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded-full shadow-sm border", children: plant.name })] }, plant.id))), plants.length === 0 && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center text-gray-500 bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-gray-300", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDF31" }), _jsx("h3", { className: "text-xl font-semibold text-gray-700 mb-2", children: "Start Your Garden Design" }), _jsx("p", { className: "text-gray-600", children: "Click plants from the palette on the left to begin designing your garden layout" })] }) })), selectedPlant && (_jsx("div", { className: "absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-lg", children: selectedPlant.emoji }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-800", children: selectedPlant.name }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Position: (", Math.round(selectedPlant.x), ", ", Math.round(selectedPlant.y), ")"] })] })] }) }))] }), plants.length > 0 && (_jsxs("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h4", { className: "font-medium text-gray-800", children: "Garden Statistics" }), _jsxs(Badge, { variant: "secondary", className: "bg-green-100 text-green-800", children: ["Total: ", plants.length, " plants"] })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: plantTypes.map((type) => {
                                                        const count = plants.filter(p => p.name === type.name).length;
                                                        return count > 0 ? (_jsxs(Badge, { variant: "outline", className: "bg-white border-gray-300", children: [_jsx("span", { className: "mr-1", children: type.emoji }), type.name, ": ", count] }, type.name)) : null;
                                                    }) })] }))] })] })] })] }) }));
}
