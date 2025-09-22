
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
import { Save, Download, Upload, RotateCcw, Palette, Move } from 'lucide-react';

interface PlantToken {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji: string;
}

export default function GardenDesigner() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [plants, setPlants] = useState<PlantToken[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantToken | null>(null);
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

  const addPlant = (plantType: typeof plantTypes[0]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const newPlant: PlantToken = {
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

  const handleMouseDown = useCallback((e: React.MouseEvent, plant: PlantToken) => {
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedPlant || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setPlants(plants.map(plant =>
      plant.id === selectedPlant.id
        ? { 
            ...plant, 
            x: Math.max(0, Math.min(newX, rect.width - plant.size)), 
            y: Math.max(0, Math.min(newY, rect.height - plant.size)) 
          }
        : plant
    ));
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
    } catch (error) {
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

  const deletePlant = (plantId: string) => {
    setPlants(plants.filter(p => p.id !== plantId));
    setSelectedPlant(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-green-600 flex items-center">
              <Palette className="mr-3 h-10 w-10" />
              Garden Designer
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Design your perfect garden layout with drag-and-drop simplicity
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={clearCanvas} className="bg-white hover:bg-gray-50">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear All
            </Button>
            <Button variant="outline" onClick={exportLayout} className="bg-white hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <Button onClick={saveLayout} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Layout
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Plant Palette */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="bg-green-50 border-b">
              <CardTitle className="text-green-700 flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Plant Palette
              </CardTitle>
              <CardDescription className="text-gray-600">
                Click to add plants to your garden canvas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {plantTypes.map((plantType) => (
                  <Button
                    key={plantType.name}
                    variant="outline"
                    className="w-full justify-start h-12 text-left bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 transition-all"
                    onClick={() => addPlant(plantType)}
                  >
                    <span className="text-2xl mr-3">{plantType.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{plantType.name}</div>
                      <div className="text-xs text-gray-500">Size: {plantType.size}px</div>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: plantType.color }}
                    />
                  </Button>
                ))}
              </div>
              
              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">💡 How to Use:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Click plants above to add them</li>
                  <li>• Drag plants to move them around</li>
                  <li>• Double-click plants to delete them</li>
                  <li>• Save your layout when done</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Garden Canvas */}
          <Card className="lg:col-span-3 bg-white shadow-lg border-0">
            <CardHeader className="bg-green-50 border-b">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="text-green-700 flex items-center">
                    <Move className="mr-2 h-5 w-5" />
                    Garden Canvas
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Drag plants to arrange your perfect garden layout
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <Label htmlFor="layoutName" className="text-sm font-medium text-gray-700">
                    Layout Name:
                  </Label>
                  <Input
                    id="layoutName"
                    value={layoutName}
                    onChange={(e) => setLayoutName(e.target.value)}
                    className="w-48 bg-white border-gray-300 focus:border-green-500"
                    placeholder="Enter layout name..."
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div
                ref={canvasRef}
                className="relative w-full h-[500px] bg-gradient-to-br from-green-100 to-green-50 border-2 border-dashed border-green-300 rounded-xl overflow-hidden cursor-crosshair shadow-inner"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25px 25px, rgba(34, 197, 94, 0.1) 2px, transparent 0),
                    radial-gradient(circle at 75px 75px, rgba(34, 197, 94, 0.05) 1px, transparent 0)
                  `,
                  backgroundSize: '50px 50px'
                }}
              >
                {/* Garden Grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" className="pointer-events-none">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Plants */}
                {plants.map((plant) => (
                  <div
                    key={plant.id}
                    className={`absolute cursor-grab active:cursor-grabbing select-none transition-all duration-200 hover:scale-110 ${
                      selectedPlant?.id === plant.id 
                        ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-2xl scale-110 z-10' 
                        : 'hover:shadow-xl hover:z-10'
                    }`}
                    style={{
                      left: plant.x,
                      top: plant.y,
                      width: plant.size,
                      height: plant.size,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, plant)}
                    onDoubleClick={() => deletePlant(plant.id)}
                    title={`${plant.name} - Double-click to delete`}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white relative overflow-hidden"
                      style={{ backgroundColor: plant.color }}
                    >
                      <span className="text-2xl">{plant.emoji}</span>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full"></div>
                    </div>
                    
                    {/* Plant label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded-full shadow-sm border">
                      {plant.name}
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {plants.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500 bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-gray-300">
                      <div className="text-6xl mb-4">🌱</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Garden Design</h3>
                      <p className="text-gray-600">
                        Click plants from the palette on the left to begin designing your garden layout
                      </p>
                    </div>
                  </div>
                )}

                {/* Selected plant info */}
                {selectedPlant && (
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{selectedPlant.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">{selectedPlant.name}</div>
                        <div className="text-xs text-gray-500">
                          Position: ({Math.round(selectedPlant.x)}, {Math.round(selectedPlant.y)})
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Plant Statistics */}
              {plants.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Garden Statistics</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Total: {plants.length} plants
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {plantTypes.map((type) => {
                      const count = plants.filter(p => p.name === type.name).length;
                      return count > 0 ? (
                        <Badge 
                          key={type.name} 
                          variant="outline" 
                          className="bg-white border-gray-300"
                        >
                          <span className="mr-1">{type.emoji}</span>
                          {type.name}: {count}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}







// import { useEffect, useState } from 'react';
// import { GardeningTip } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Search, Lightbulb, Droplets, Scissors, Sprout, Bug, Calendar, BookOpen, Star, Leaf, Filter } from 'lucide-react';

// export default function GardeningTips() {
//   const [tips, setTips] = useState<GardeningTip[]>([]);
//   const [filteredTips, setFilteredTips] = useState<GardeningTip[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
//   const [loading, setLoading] = useState(true);

//   // Sample gardening tips data
//   const sampleTips: GardeningTip[] = [
//     {
//       id: '1',
//       title: 'Deep Watering vs. Frequent Shallow Watering',
//       content: 'Water your plants deeply but less frequently to encourage deep root growth. This makes plants more drought-resistant and healthier overall. Aim to water until you see water coming out of drainage holes, then wait until the top inch of soil is dry before watering again.',
//       category: 'watering',
//       difficulty: 'beginner',
//       season: 'summer',
//       plantTypes: ['All Plants'],
//       author: 'Garden Expert',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '2',
//       title: 'Companion Planting for Natural Pest Control',
//       content: 'Plant marigolds near tomatoes and peppers to repel aphids and whiteflies. Basil planted near tomatoes not only repels pests but can improve the flavor of your tomatoes. Nasturtiums act as trap crops for aphids and cucumber beetles.',
//       category: 'pest-control',
//       difficulty: 'intermediate',
//       plantTypes: ['Tomatoes', 'Peppers', 'Herbs'],
//       author: 'Organic Gardener',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '3',
//       title: 'Proper Pruning Techniques for Tomatoes',
//       content: 'Remove suckers (shoots that grow between the main stem and branches) to direct energy to fruit production. Prune lower leaves that touch the ground to prevent disease. Always use clean, sharp tools and prune in dry conditions to avoid spreading disease.',
//       category: 'pruning',
//       difficulty: 'intermediate',
//       season: 'summer',
//       plantTypes: ['Tomatoes'],
//       author: 'Vegetable Specialist',
//       createdAt: new Date(),
//       rating: 4
//     },
//     {
//       id: '4',
//       title: 'Starting Seeds Indoors Successfully',
//       content: 'Use a seed starting mix, not regular potting soil. Keep soil consistently moist but not waterlogged. Provide 14-16 hours of light daily using grow lights placed 2-3 inches above seedlings. Maintain temperature between 65-75°F for most vegetables.',
//       category: 'planting',
//       difficulty: 'beginner',
//       season: 'spring',
//       plantTypes: ['Vegetables', 'Herbs', 'Flowers'],
//       author: 'Seed Starting Pro',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '5',
//       title: 'Organic Fertilizing with Compost Tea',
//       content: 'Make nutrient-rich compost tea by steeping finished compost in water for 24-48 hours. Strain and dilute 1:10 with water. Apply every 2-3 weeks during growing season. This provides slow-release nutrients and beneficial microorganisms to your plants.',
//       category: 'fertilizing',
//       difficulty: 'intermediate',
//       plantTypes: ['All Plants'],
//       author: 'Organic Expert',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '6',
//       title: 'Succession Planting for Continuous Harvest',
//       content: 'Plant small amounts of fast-growing crops like lettuce, radishes, and beans every 2-3 weeks throughout the growing season. This ensures a continuous harvest rather than having everything ready at once.',
//       category: 'planting',
//       difficulty: 'intermediate',
//       season: 'spring',
//       plantTypes: ['Lettuce', 'Radishes', 'Beans'],
//       author: 'Harvest Master',
//       createdAt: new Date(),
//       rating: 4
//     },
//     {
//       id: '7',
//       title: 'Natural Pest Deterrents You Can Make at Home',
//       content: 'Mix 1 tablespoon of mild dish soap with 1 quart of water to create an effective aphid spray. For slugs, place shallow dishes of beer around plants. Sprinkle crushed eggshells around plants to deter soft-bodied pests.',
//       category: 'pest-control',
//       difficulty: 'beginner',
//       plantTypes: ['All Plants'],
//       author: 'Natural Gardener',
//       createdAt: new Date(),
//       rating: 4
//     },
//     {
//       id: '8',
//       title: 'Fall Garden Preparation Tips',
//       content: 'Clean up fallen leaves and diseased plant material to prevent overwintering pests and diseases. Plant cover crops like winter rye or clover to improve soil. Mulch tender perennials after the first hard frost.',
//       category: 'seasonal',
//       difficulty: 'intermediate',
//       season: 'fall',
//       plantTypes: ['Perennials', 'Cover Crops'],
//       author: 'Seasonal Expert',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '9',
//       title: 'Harvesting at Peak Ripeness',
//       content: 'Harvest tomatoes when they start to turn color and let them ripen indoors for best flavor. Pick herbs in the morning after dew dries but before heat of day. Harvest leafy greens in cool morning or evening hours.',
//       category: 'harvesting',
//       difficulty: 'beginner',
//       season: 'summer',
//       plantTypes: ['Tomatoes', 'Herbs', 'Leafy Greens'],
//       author: 'Harvest Timing Expert',
//       createdAt: new Date(),
//       rating: 5
//     },
//     {
//       id: '10',
//       title: 'Soil Testing and Amendment Guide',
//       content: 'Test your soil pH annually using a digital meter or test strips. Most vegetables prefer pH 6.0-7.0. Add lime to raise pH or sulfur to lower it. Incorporate 2-3 inches of compost annually to improve soil structure and fertility.',
//       category: 'seasonal',
//       difficulty: 'advanced',
//       plantTypes: ['All Plants'],
//       author: 'Soil Scientist',
//       createdAt: new Date(),
//       rating: 4
//     }
//   ];

//   useEffect(() => {
//     setTips(sampleTips);
//     setFilteredTips(sampleTips);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     let filtered = tips;

//     if (searchTerm) {
//       filtered = filtered.filter(tip =>
//         tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         tip.plantTypes.some(plant => plant.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//     }

//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(tip => tip.category === selectedCategory);
//     }

//     if (selectedDifficulty !== 'all') {
//       filtered = filtered.filter(tip => tip.difficulty === selectedDifficulty);
//     }

//     setFilteredTips(filtered);
//   }, [searchTerm, selectedCategory, selectedDifficulty, tips]);

//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'watering': return <Droplets className="h-5 w-5 text-blue-500" />;
//       case 'fertilizing': return <Sprout className="h-5 w-5 text-green-500" />;
//       case 'pruning': return <Scissors className="h-5 w-5 text-purple-500" />;
//       case 'pest-control': return <Bug className="h-5 w-5 text-red-500" />;
//       case 'planting': return <Sprout className="h-5 w-5 text-emerald-500" />;
//       case 'harvesting': return <Calendar className="h-5 w-5 text-orange-500" />;
//       case 'seasonal': return <Calendar className="h-5 w-5 text-indigo-500" />;
//       default: return <Lightbulb className="h-5 w-5 text-yellow-500" />;
//     }
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
//       case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     const colors = {
//       watering: 'bg-blue-100 text-blue-800 border-blue-200',
//       fertilizing: 'bg-green-100 text-green-800 border-green-200',
//       pruning: 'bg-purple-100 text-purple-800 border-purple-200',
//       'pest-control': 'bg-red-100 text-red-800 border-red-200',
//       planting: 'bg-emerald-100 text-emerald-800 border-emerald-200',
//       harvesting: 'bg-orange-100 text-orange-800 border-orange-200',
//       seasonal: 'bg-indigo-100 text-indigo-800 border-indigo-200'
//     };
//     return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getSeasonColor = (season?: string) => {
//     if (!season) return 'bg-gray-100 text-gray-800 border-gray-200';
//     const colors = {
//       spring: 'bg-green-100 text-green-800 border-green-200',
//       summer: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       fall: 'bg-orange-100 text-orange-800 border-orange-200',
//       winter: 'bg-blue-100 text-blue-800 border-blue-200'
//     };
//     return colors[season as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const renderStars = (rating?: number) => {
//     if (!rating) return null;
//     return (
//       <div className="flex items-center space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star 
//             key={star} 
//             className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
//           />
//         ))}
//       </div>
//     );
//   };

//   const tipsByCategory = {
//     watering: filteredTips.filter(tip => tip.category === 'watering'),
//     fertilizing: filteredTips.filter(tip => tip.category === 'fertilizing'),
//     pruning: filteredTips.filter(tip => tip.category === 'pruning'),
//     'pest-control': filteredTips.filter(tip => tip.category === 'pest-control'),
//     planting: filteredTips.filter(tip => tip.category === 'planting'),
//     harvesting: filteredTips.filter(tip => tip.category === 'harvesting'),
//     seasonal: filteredTips.filter(tip => tip.category === 'seasonal')
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//             <p className="mt-4 text-lg text-gray-600">Loading gardening tips...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
//           <div>
//             <h1 className="text-4xl font-bold text-green-600 flex items-center">
//               <Lightbulb className="mr-3 h-10 w-10" />
//               Gardening Tips & Resources
//             </h1>
//             <p className="text-lg text-gray-600 mt-2">
//               Expert advice and proven techniques to improve your gardening success
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-4 py-2">
//               {filteredTips.length} Tips Available
//             </Badge>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <Card className="bg-white shadow-lg border-0">
//           <CardHeader className="bg-green-50 border-b">
//             <CardTitle className="text-green-700 flex items-center">
//               <Filter className="mr-2 h-5 w-5" />
//               Search & Filter Tips
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Find the perfect gardening advice for your needs
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   placeholder="Search tips by title, content, or plant type..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 h-12 text-lg bg-white border-2 border-gray-200 focus:border-green-500"
//                 />
//               </div>
//               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                 <SelectTrigger className="w-full lg:w-48 h-12 bg-white border-2 border-gray-200">
//                   <SelectValue placeholder="Filter by category" />
//                 </SelectTrigger>
//                 <SelectContent className='bg-white'>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   <SelectItem value="watering">💧 Watering</SelectItem>
//                   <SelectItem value="fertilizing">🌱 Fertilizing</SelectItem>
//                   <SelectItem value="pruning">✂️ Pruning</SelectItem>
//                   <SelectItem value="pest-control">🐛 Pest Control</SelectItem>
//                   <SelectItem value="planting">🌿 Planting</SelectItem>
//                   <SelectItem value="harvesting">🗓️ Harvesting</SelectItem>
//                   <SelectItem value="seasonal">📅 Seasonal</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
//                 <SelectTrigger className="w-full lg:w-48 h-12 bg-white border-2 border-gray-200">
//                   <SelectValue placeholder="Filter by difficulty" />
//                 </SelectTrigger>
//                 <SelectContent className='bg-white'>
//                   <SelectItem value="all">All Levels</SelectItem>
//                   <SelectItem value="beginner">🌱 Beginner</SelectItem>
//                   <SelectItem value="intermediate">🌿 Intermediate</SelectItem>
//                   <SelectItem value="advanced">🌳 Advanced</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Tips Display */}
//         <Tabs defaultValue="all" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-white shadow-md border-0 p-2">
//             <TabsTrigger value="all" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
//               All ({filteredTips.length})
//             </TabsTrigger>
//             <TabsTrigger value="watering" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
//               💧 Water ({tipsByCategory.watering.length})
//             </TabsTrigger>
//             <TabsTrigger value="planting" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
//               🌿 Plant ({tipsByCategory.planting.length})
//             </TabsTrigger>
//             <TabsTrigger value="pest-control" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
//               🐛 Pest ({tipsByCategory['pest-control'].length})
//             </TabsTrigger>
//             <TabsTrigger value="fertilizing" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 hidden lg:flex">
//               🌱 Fertilize ({tipsByCategory.fertilizing.length})
//             </TabsTrigger>
//             <TabsTrigger value="pruning" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 hidden lg:flex">
//               ✂️ Prune ({tipsByCategory.pruning.length})
//             </TabsTrigger>
//             <TabsTrigger value="seasonal" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 hidden lg:flex">
//               📅 Season ({tipsByCategory.seasonal.length})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredTips.map((tip) => (
//                 <Card key={tip.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
//                   <CardHeader className="pb-4">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex items-center space-x-3">
//                         {getCategoryIcon(tip.category)}
//                         <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
//                           {tip.title}
//                         </CardTitle>
//                       </div>
//                       <Badge className={`${getDifficultyColor(tip.difficulty)} border font-medium`}>
//                         {tip.difficulty}
//                       </Badge>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <Badge className={`${getCategoryColor(tip.category)} border font-medium`}>
//                         {tip.category.replace('-', ' ')}
//                       </Badge>
//                       {tip.season && (
//                         <Badge className={`${getSeasonColor(tip.season)} border font-medium`}>
//                           {tip.season}
//                         </Badge>
//                       )}
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <p className="text-gray-600 mb-4 leading-relaxed line-clamp-4">
//                       {tip.content}
//                     </p>
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-sm font-medium text-gray-700 mb-2">🌱 Applies to:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {tip.plantTypes.map((plantType, index) => (
//                             <Badge key={index} variant="outline" className="text-xs bg-gray-50 border-gray-300">
//                               {plantType}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                         <span className="text-sm text-gray-500 font-medium">
//                           By {tip.author}
//                         </span>
//                         {renderStars(tip.rating)}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {Object.entries(tipsByCategory).map(([category, categoryTips]) => (
//             <TabsContent key={category} value={category} className="space-y-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {categoryTips.map((tip) => (
//                   <Card key={tip.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
//                     <CardHeader className="pb-4">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center space-x-3">
//                           {getCategoryIcon(tip.category)}
//                           <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
//                             {tip.title}
//                           </CardTitle>
//                         </div>
//                         <Badge className={`${getDifficultyColor(tip.difficulty)} border font-medium`}>
//                           {tip.difficulty}
//                         </Badge>
//                       </div>
//                       {tip.season && (
//                         <Badge className={`${getSeasonColor(tip.season)} border font-medium`}>
//                           {tip.season}
//                         </Badge>
//                       )}
//                     </CardHeader>
//                     <CardContent className="pt-0">
//                       <p className="text-gray-600 mb-4 leading-relaxed">
//                         {tip.content}
//                       </p>
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm font-medium text-gray-700 mb-2">🌱 Applies to:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {tip.plantTypes.map((plantType, index) => (
//                               <Badge key={index} variant="outline" className="text-xs bg-gray-50 border-gray-300">
//                                 {plantType}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                           <span className="text-sm text-gray-500 font-medium">
//                             By {tip.author}
//                           </span>
//                           {renderStars(tip.rating)}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//               {categoryTips.length === 0 && (
//                 <Card className="bg-white shadow-lg border-0">
//                   <CardContent className="text-center py-12">
//                     <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
//                     <h3 className="text-xl font-semibold text-gray-700 mb-2">No tips found in this category</h3>
//                     <p className="text-gray-500">
//                       Try adjusting your search terms or check other categories.
//                     </p>
//                   </CardContent>
//                 </Card>
//               )}
//             </TabsContent>
//           ))}
//         </Tabs>

//         {filteredTips.length === 0 && (
//           <Card className="bg-white shadow-lg border-0">
//             <CardContent className="text-center py-16">
//               <Search className="mx-auto h-20 w-20 text-gray-400 mb-6" />
//               <h3 className="text-2xl font-semibold text-gray-700 mb-3">No gardening tips found</h3>
//               <p className="text-lg text-gray-500 mb-6">
//                 Try adjusting your search terms or filters to find relevant gardening advice.
//               </p>
//               <Button 
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedCategory('all');
//                   setSelectedDifficulty('all');
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white"
//               >
//                 <Leaf className="mr-2 h-4 w-4" />
//                 Clear Filters
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }