import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { useEffect, useState } from 'react';
// import { WeatherData } from '@/types';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, AlertTriangle, Calendar } from 'lucide-react';
// import { format, addDays } from 'date-fns';
// export default function WeatherIntegration() {
//   const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
//   const [forecast, setForecast] = useState<WeatherData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState('Your Garden');
//   // Sample weather data (in a real app, this would come from a weather API)
//   const sampleWeatherData: WeatherData[] = [
//     {
//       temperature: 72,
//       humidity: 65,
//       precipitation: 0,
//       windSpeed: 8,
//       condition: 'Partly Cloudy',
//       uvIndex: 6,
//       date: new Date()
//     },
//     {
//       temperature: 75,
//       humidity: 70,
//       precipitation: 20,
//       windSpeed: 12,
//       condition: 'Light Rain',
//       uvIndex: 4,
//       date: addDays(new Date(), 1)
//     },
//     {
//       temperature: 68,
//       humidity: 80,
//       precipitation: 60,
//       windSpeed: 15,
//       condition: 'Heavy Rain',
//       uvIndex: 2,
//       date: addDays(new Date(), 2)
//     },
//     {
//       temperature: 78,
//       humidity: 55,
//       precipitation: 0,
//       windSpeed: 6,
//       condition: 'Sunny',
//       uvIndex: 8,
//       date: addDays(new Date(), 3)
//     },
//     {
//       temperature: 80,
//       humidity: 50,
//       precipitation: 0,
//       windSpeed: 5,
//       condition: 'Sunny',
//       uvIndex: 9,
//       date: addDays(new Date(), 4)
//     }
//   ];
//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setCurrentWeather(sampleWeatherData[0]);
//       setForecast(sampleWeatherData.slice(1));
//       setLoading(false);
//     }, 1000);
//   }, []);
//   const getWeatherIcon = (condition: string) => {
//     switch (condition.toLowerCase()) {
//       case 'sunny':
//       case 'clear':
//         return <Sun className="h-8 w-8 text-yellow-500" />;
//       case 'partly cloudy':
//       case 'cloudy':
//         return <Cloud className="h-8 w-8 text-gray-500" />;
//       case 'light rain':
//       case 'heavy rain':
//       case 'rain':
//         return <CloudRain className="h-8 w-8 text-blue-500" />;
//       default:
//         return <Cloud className="h-8 w-8 text-gray-500" />;
//     }
//   };
//   const getGardeningRecommendations = (weather: WeatherData) => {
//     const recommendations = [];
//     if (weather.precipitation > 50) {
//       recommendations.push({
//         type: 'warning',
//         message: 'Heavy rain expected - avoid watering and protect delicate plants',
//         icon: <CloudRain className="h-4 w-4" />
//       });
//     } else if (weather.precipitation > 20) {
//       recommendations.push({
//         type: 'info',
//         message: 'Light rain expected - good time to skip watering',
//         icon: <Droplets className="h-4 w-4" />
//       });
//     }
//     if (weather.temperature > 85) {
//       recommendations.push({
//         type: 'warning',
//         message: 'High temperature - provide shade for sensitive plants and increase watering',
//         icon: <Thermometer className="h-4 w-4" />
//       });
//     } else if (weather.temperature < 50) {
//       recommendations.push({
//         type: 'warning',
//         message: 'Cold weather - protect tender plants and reduce watering',
//         icon: <Thermometer className="h-4 w-4" />
//       });
//     }
//     if (weather.uvIndex > 7) {
//       recommendations.push({
//         type: 'info',
//         message: 'High UV index - good for sun-loving plants, provide shade for others',
//         icon: <Sun className="h-4 w-4" />
//       });
//     }
//     if (weather.windSpeed > 20) {
//       recommendations.push({
//         type: 'warning',
//         message: 'Strong winds - stake tall plants and protect containers',
//         icon: <Wind className="h-4 w-4" />
//       });
//     }
//     if (weather.humidity < 30) {
//       recommendations.push({
//         type: 'info',
//         message: 'Low humidity - increase watering frequency and consider misting',
//         icon: <Droplets className="h-4 w-4" />
//       });
//     }
//     return recommendations;
//   };
//   const getOptimalGardeningTimes = (weather: WeatherData) => {
//     const times = [];
//     if (weather.condition.toLowerCase().includes('sunny') && weather.temperature < 80) {
//       times.push('Early morning (6-9 AM) - Perfect for planting and transplanting');
//       times.push('Late afternoon (4-6 PM) - Good for watering and maintenance');
//     } else if (weather.condition.toLowerCase().includes('cloudy')) {
//       times.push('Anytime - Cloudy conditions are ideal for most garden work');
//     } else if (weather.precipitation > 0) {
//       times.push('Indoor tasks only - Focus on planning and seed starting');
//     }
//     return times;
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading weather data...</p>
//         </div>
//       </div>
//     );
//   }
//   if (!currentWeather) {
//     return (
//       <div className="text-center py-12">
//         <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 mb-2">Weather data unavailable</h3>
//         <p className="text-muted-foreground">Unable to load current weather conditions.</p>
//       </div>
//     );
//   }
//   const recommendations = getGardeningRecommendations(currentWeather);
//   const optimalTimes = getOptimalGardeningTimes(currentWeather);
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Weather & Garden Care</h1>
//           <p className="text-muted-foreground">
//             Weather-informed gardening recommendations for {location}.
//           </p>
//         </div>
//         <Button variant="outline">
//           Change Location
//         </Button>
//       </div>
//       {/* Current Weather */}
//       <Card className="bg-gradient-to-r from-blue-50 to-green-50">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             <span>Current Conditions</span>
//             {getWeatherIcon(currentWeather.condition)}
//           </CardTitle>
//           <CardDescription>
//             {format(currentWeather.date, 'EEEE, MMMM d, yyyy • h:mm a')}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center">
//               <div className="text-3xl font-bold">{currentWeather.temperature}°F</div>
//               <p className="text-sm text-muted-foreground">Temperature</p>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold flex items-center justify-center">
//                 <Droplets className="h-5 w-5 mr-1 text-blue-500" />
//                 {currentWeather.humidity}%
//               </div>
//               <p className="text-sm text-muted-foreground">Humidity</p>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold flex items-center justify-center">
//                 <Wind className="h-5 w-5 mr-1 text-gray-500" />
//                 {currentWeather.windSpeed} mph
//               </div>
//               <p className="text-sm text-muted-foreground">Wind Speed</p>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold flex items-center justify-center">
//                 <Eye className="h-5 w-5 mr-1 text-orange-500" />
//                 {currentWeather.uvIndex}
//               </div>
//               <p className="text-sm text-muted-foreground">UV Index</p>
//             </div>
//           </div>
//           <div className="mt-4 text-center">
//             <Badge variant="secondary" className="text-lg px-4 py-2">
//               {currentWeather.condition}
//             </Badge>
//             {currentWeather.precipitation > 0 && (
//               <Badge className="ml-2 bg-blue-100 text-blue-800">
//                 {currentWeather.precipitation}% chance of rain
//               </Badge>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//       <Tabs defaultValue="recommendations" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="recommendations">Garden Recommendations</TabsTrigger>
//           <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
//           <TabsTrigger value="optimal-times">Optimal Garden Times</TabsTrigger>
//         </TabsList>
//         <TabsContent value="recommendations" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Today's Garden Recommendations</CardTitle>
//               <CardDescription>
//                 Weather-based suggestions for your garden care
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {recommendations.length === 0 ? (
//                 <div className="text-center py-8">
//                   <Sun className="mx-auto h-12 w-12 text-green-500 mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Perfect gardening weather!</h3>
//                   <p className="text-muted-foreground">
//                     Current conditions are ideal for most garden activities.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {recommendations.map((rec, index) => (
//                     <Alert key={index} className={rec.type === 'warning' ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}>
//                       <div className="flex items-center">
//                         {rec.icon}
//                         <AlertDescription className="ml-2">
//                           {rec.message}
//                         </AlertDescription>
//                       </div>
//                     </Alert>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="forecast" className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {forecast.map((day, index) => (
//               <Card key={index}>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     {format(day.date, 'EEE, MMM d')}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between mb-3">
//                     {getWeatherIcon(day.condition)}
//                     <div className="text-right">
//                       <div className="text-2xl font-bold">{day.temperature}°F</div>
//                       <div className="text-sm text-muted-foreground">{day.condition}</div>
//                     </div>
//                   </div>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Humidity:</span>
//                       <span>{day.humidity}%</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Wind:</span>
//                       <span>{day.windSpeed} mph</span>
//                     </div>
//                     {day.precipitation > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Rain:</span>
//                         <span>{day.precipitation}%</span>
//                       </div>
//                     )}
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">UV Index:</span>
//                       <span>{day.uvIndex}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         <TabsContent value="optimal-times" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Calendar className="mr-2 h-5 w-5" />
//                 Best Times for Garden Work Today
//               </CardTitle>
//               <CardDescription>
//                 Recommended time windows based on current weather conditions
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {optimalTimes.length === 0 ? (
//                 <div className="text-center py-8">
//                   <AlertTriangle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Limited garden time today</h3>
//                   <p className="text-muted-foreground">
//                     Weather conditions may not be ideal for outdoor garden work.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {optimalTimes.map((time, index) => (
//                     <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg border border-green-200">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                       <p className="text-sm text-green-800">{time}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//           {/* Garden Task Suggestions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Weather-Appropriate Tasks</CardTitle>
//               <CardDescription>
//                 Suggested garden activities based on today's conditions
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h4 className="font-medium text-green-800 mb-2">Recommended Today:</h4>
//                   <ul className="space-y-1 text-sm">
//                     {currentWeather.precipitation === 0 && currentWeather.temperature < 80 && (
//                       <>
//                         <li>• Watering plants</li>
//                         <li>• Planting seeds or transplants</li>
//                         <li>• Weeding garden beds</li>
//                         <li>• Harvesting vegetables</li>
//                       </>
//                     )}
//                     {currentWeather.condition.toLowerCase().includes('cloudy') && (
//                       <>
//                         <li>• Transplanting seedlings</li>
//                         <li>• Pruning plants</li>
//                         <li>• Applying mulch</li>
//                       </>
//                     )}
//                     {currentWeather.precipitation > 0 && (
//                       <>
//                         <li>• Indoor seed starting</li>
//                         <li>• Planning garden layout</li>
//                         <li>• Cleaning garden tools</li>
//                         <li>• Reading plant care guides</li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-orange-800 mb-2">Avoid Today:</h4>
//                   <ul className="space-y-1 text-sm">
//                     {currentWeather.precipitation > 30 && (
//                       <>
//                         <li>• Watering plants</li>
//                         <li>• Working in muddy soil</li>
//                         <li>• Applying fertilizers</li>
//                       </>
//                     )}
//                     {currentWeather.temperature > 85 && (
//                       <>
//                         <li>• Transplanting in midday</li>
//                         <li>• Heavy physical work</li>
//                         <li>• Working without shade</li>
//                       </>
//                     )}
//                     {currentWeather.windSpeed > 15 && (
//                       <>
//                         <li>• Spraying treatments</li>
//                         <li>• Working with tall plants</li>
//                         <li>• Seed sowing outdoors</li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, AlertTriangle, Calendar, MapPin, RefreshCw } from 'lucide-react';
import { format, addDays } from 'date-fns';
export default function WeatherIntegration() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('Your Garden');
    // Sample weather data (in a real app, this would come from a weather API)
    const sampleWeatherData = [
        {
            temperature: 72,
            humidity: 65,
            precipitation: 0,
            windSpeed: 8,
            condition: 'Partly Cloudy',
            uvIndex: 6,
            date: new Date()
        },
        {
            temperature: 75,
            humidity: 70,
            precipitation: 20,
            windSpeed: 12,
            condition: 'Light Rain',
            uvIndex: 4,
            date: addDays(new Date(), 1)
        },
        {
            temperature: 68,
            humidity: 80,
            precipitation: 60,
            windSpeed: 15,
            condition: 'Heavy Rain',
            uvIndex: 2,
            date: addDays(new Date(), 2)
        },
        {
            temperature: 78,
            humidity: 55,
            precipitation: 0,
            windSpeed: 6,
            condition: 'Sunny',
            uvIndex: 8,
            date: addDays(new Date(), 3)
        },
        {
            temperature: 80,
            humidity: 50,
            precipitation: 0,
            windSpeed: 5,
            condition: 'Sunny',
            uvIndex: 9,
            date: addDays(new Date(), 4)
        }
    ];
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCurrentWeather(sampleWeatherData[0]);
            setForecast(sampleWeatherData.slice(1));
            setLoading(false);
        }, 1000);
    }, []);
    const getWeatherIcon = (condition, size = 'md') => {
        const sizeClasses = {
            sm: 'h-5 w-5',
            md: 'h-8 w-8',
            lg: 'h-12 w-12'
        };
        switch (condition.toLowerCase()) {
            case 'sunny':
            case 'clear':
                return _jsx(Sun, { className: `${sizeClasses[size]} text-yellow-500` });
            case 'partly cloudy':
            case 'cloudy':
                return _jsx(Cloud, { className: `${sizeClasses[size]} text-gray-500` });
            case 'light rain':
            case 'heavy rain':
            case 'rain':
                return _jsx(CloudRain, { className: `${sizeClasses[size]} text-blue-500` });
            default:
                return _jsx(Cloud, { className: `${sizeClasses[size]} text-gray-500` });
        }
    };
    const getWeatherEmoji = (condition) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
            case 'clear':
                return '☀️';
            case 'partly cloudy':
                return '⛅';
            case 'cloudy':
                return '☁️';
            case 'light rain':
                return '🌦️';
            case 'heavy rain':
            case 'rain':
                return '🌧️';
            default:
                return '☁️';
        }
    };
    const getGardeningRecommendations = (weather) => {
        const recommendations = [];
        if (weather.precipitation > 50) {
            recommendations.push({
                type: 'warning',
                message: 'Heavy rain expected - avoid watering and protect delicate plants',
                icon: _jsx(CloudRain, { className: "h-4 w-4" }),
                emoji: '🌧️'
            });
        }
        else if (weather.precipitation > 20) {
            recommendations.push({
                type: 'info',
                message: 'Light rain expected - good time to skip watering',
                icon: _jsx(Droplets, { className: "h-4 w-4" }),
                emoji: '💧'
            });
        }
        if (weather.temperature > 85) {
            recommendations.push({
                type: 'warning',
                message: 'High temperature - provide shade for sensitive plants and increase watering',
                icon: _jsx(Thermometer, { className: "h-4 w-4" }),
                emoji: '🌡️'
            });
        }
        else if (weather.temperature < 50) {
            recommendations.push({
                type: 'warning',
                message: 'Cold weather - protect tender plants and reduce watering',
                icon: _jsx(Thermometer, { className: "h-4 w-4" }),
                emoji: '❄️'
            });
        }
        if (weather.uvIndex > 7) {
            recommendations.push({
                type: 'info',
                message: 'High UV index - good for sun-loving plants, provide shade for others',
                icon: _jsx(Sun, { className: "h-4 w-4" }),
                emoji: '☀️'
            });
        }
        if (weather.windSpeed > 20) {
            recommendations.push({
                type: 'warning',
                message: 'Strong winds - stake tall plants and protect containers',
                icon: _jsx(Wind, { className: "h-4 w-4" }),
                emoji: '💨'
            });
        }
        if (weather.humidity < 30) {
            recommendations.push({
                type: 'info',
                message: 'Low humidity - increase watering frequency and consider misting',
                icon: _jsx(Droplets, { className: "h-4 w-4" }),
                emoji: '💦'
            });
        }
        return recommendations;
    };
    const getOptimalGardeningTimes = (weather) => {
        const times = [];
        if (weather.condition.toLowerCase().includes('sunny') && weather.temperature < 80) {
            times.push('🌅 Early morning (6-9 AM) - Perfect for planting and transplanting');
            times.push('🌇 Late afternoon (4-6 PM) - Good for watering and maintenance');
        }
        else if (weather.condition.toLowerCase().includes('cloudy')) {
            times.push('☁️ Anytime - Cloudy conditions are ideal for most garden work');
        }
        else if (weather.precipitation > 0) {
            times.push('🏠 Indoor tasks only - Focus on planning and seed starting');
        }
        return times;
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Loading weather data..." })] }) }) }));
    }
    if (!currentWeather) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsx(Card, { className: "bg-white shadow-lg border-0", children: _jsxs(CardContent, { className: "text-center py-16", children: [_jsx(AlertTriangle, { className: "mx-auto h-20 w-20 text-red-500 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "Weather data unavailable" }), _jsx("p", { className: "text-lg text-gray-500", children: "Unable to load current weather conditions." })] }) }) }) }));
    }
    const recommendations = getGardeningRecommendations(currentWeather);
    const optimalTimes = getOptimalGardeningTimes(currentWeather);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-green-600 flex items-center", children: [_jsx(Cloud, { className: "mr-3 h-10 w-10" }), "Weather & Garden Care"] }), _jsxs("p", { className: "text-lg text-gray-600 mt-2 flex items-center", children: [_jsx(MapPin, { className: "mr-2 h-5 w-5" }), "Weather-informed gardening recommendations for ", location] })] }), _jsxs(Button, { variant: "outline", className: "border-2 border-green-200 hover:bg-green-50", children: [_jsx(MapPin, { className: "mr-2 h-4 w-4" }), "Change Location"] })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0 overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-blue-50 to-green-50 border-b", children: [_jsxs(CardTitle, { className: "flex items-center justify-between text-blue-700", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-3xl mr-3", children: getWeatherEmoji(currentWeather.condition) }), _jsx("span", { children: "Current Conditions" })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-blue-600 hover:bg-blue-100", children: _jsx(RefreshCw, { className: "h-4 w-4" }) })] }), _jsx(CardDescription, { className: "text-blue-600", children: format(currentWeather.date, 'EEEE, MMMM d, yyyy • h:mm a') })] }), _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center p-4 bg-orange-50 rounded-xl border-2 border-orange-100", children: [_jsxs("div", { className: "text-4xl font-bold text-orange-600 mb-2", children: [currentWeather.temperature, "\u00B0F"] }), _jsx("p", { className: "text-sm font-medium text-orange-700", children: "Temperature" })] }), _jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-100", children: [_jsxs("div", { className: "text-3xl font-bold flex items-center justify-center text-blue-600 mb-2", children: [_jsx(Droplets, { className: "h-6 w-6 mr-2" }), currentWeather.humidity, "%"] }), _jsx("p", { className: "text-sm font-medium text-blue-700", children: "Humidity" })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl border-2 border-gray-100", children: [_jsxs("div", { className: "text-3xl font-bold flex items-center justify-center text-gray-600 mb-2", children: [_jsx(Wind, { className: "h-6 w-6 mr-2" }), currentWeather.windSpeed] }), _jsx("p", { className: "text-sm font-medium text-gray-700", children: "Wind (mph)" })] }), _jsxs("div", { className: "text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-100", children: [_jsxs("div", { className: "text-3xl font-bold flex items-center justify-center text-yellow-600 mb-2", children: [_jsx(Eye, { className: "h-6 w-6 mr-2" }), currentWeather.uvIndex] }), _jsx("p", { className: "text-sm font-medium text-yellow-700", children: "UV Index" })] })] }), _jsxs("div", { className: "mt-6 text-center", children: [_jsxs(Badge, { variant: "secondary", className: "text-lg px-6 py-3 bg-green-100 text-green-800 border-green-200", children: [getWeatherEmoji(currentWeather.condition), " ", currentWeather.condition] }), currentWeather.precipitation > 0 && (_jsxs(Badge, { className: "ml-3 bg-blue-100 text-blue-800 border-blue-200 text-lg px-4 py-2", children: ["\uD83D\uDCA7 ", currentWeather.precipitation, "% chance of rain"] }))] })] })] }), _jsxs(Tabs, { defaultValue: "recommendations", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white shadow-sm border-2 border-gray-100", children: [_jsx(TabsTrigger, { value: "recommendations", className: "data-[state=active]:bg-green-100 data-[state=active]:text-green-700", children: "\uD83C\uDF31 Garden Recommendations" }), _jsx(TabsTrigger, { value: "forecast", className: "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700", children: "\uD83D\uDCC5 5-Day Forecast" }), _jsx(TabsTrigger, { value: "optimal-times", className: "data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700", children: "\u23F0 Optimal Garden Times" })] }), _jsx(TabsContent, { value: "recommendations", className: "space-y-6", children: _jsxs(Card, { className: "bg-white shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-green-50 border-b", children: [_jsx(CardTitle, { className: "text-green-700", children: "Today's Garden Recommendations" }), _jsx(CardDescription, { className: "text-gray-600", children: "Weather-based suggestions for your garden care" })] }), _jsx(CardContent, { className: "pt-6", children: recommendations.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Sun, { className: "mx-auto h-16 w-16 text-green-500 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "Perfect gardening weather! \u2600\uFE0F" }), _jsx("p", { className: "text-lg text-gray-500", children: "Current conditions are ideal for most garden activities." })] })) : (_jsx("div", { className: "space-y-4", children: recommendations.map((rec, index) => (_jsx(Alert, { className: `border-2 ${rec.type === 'warning' ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`, children: _jsxs("div", { className: "flex items-start", children: [_jsx("span", { className: "text-2xl mr-3", children: rec.emoji }), _jsx(AlertDescription, { className: "text-base leading-relaxed", children: rec.message })] }) }, index))) })) })] }) }), _jsx(TabsContent, { value: "forecast", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: forecast.map((day, index) => (_jsxs(Card, { className: "bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0", children: [_jsx(CardHeader, { className: "pb-3 bg-gradient-to-r from-blue-50 to-green-50 border-b", children: _jsx(CardTitle, { className: "text-base font-semibold text-center text-gray-800", children: format(day.date, 'EEE, MMM d') }) }), _jsxs(CardContent, { className: "pt-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-4xl", children: getWeatherEmoji(day.condition) }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-3xl font-bold text-gray-800", children: [day.temperature, "\u00B0F"] }), _jsx("div", { className: "text-sm text-gray-600 font-medium", children: day.condition })] })] }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex justify-between items-center p-2 bg-blue-50 rounded", children: [_jsx("span", { className: "text-blue-700 font-medium", children: "\uD83D\uDCA7 Humidity:" }), _jsxs("span", { className: "font-semibold", children: [day.humidity, "%"] })] }), _jsxs("div", { className: "flex justify-between items-center p-2 bg-gray-50 rounded", children: [_jsx("span", { className: "text-gray-700 font-medium", children: "\uD83D\uDCA8 Wind:" }), _jsxs("span", { className: "font-semibold", children: [day.windSpeed, " mph"] })] }), day.precipitation > 0 && (_jsxs("div", { className: "flex justify-between items-center p-2 bg-blue-50 rounded", children: [_jsx("span", { className: "text-blue-700 font-medium", children: "\uD83C\uDF27\uFE0F Rain:" }), _jsxs("span", { className: "font-semibold", children: [day.precipitation, "%"] })] })), _jsxs("div", { className: "flex justify-between items-center p-2 bg-yellow-50 rounded", children: [_jsx("span", { className: "text-yellow-700 font-medium", children: "\u2600\uFE0F UV Index:" }), _jsx("span", { className: "font-semibold", children: day.uvIndex })] })] })] })] }, index))) }) }), _jsxs(TabsContent, { value: "optimal-times", className: "space-y-6", children: [_jsxs(Card, { className: "bg-white shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-orange-50 border-b", children: [_jsxs(CardTitle, { className: "flex items-center text-orange-700", children: [_jsx(Calendar, { className: "mr-2 h-6 w-6" }), "Best Times for Garden Work Today"] }), _jsx(CardDescription, { className: "text-gray-600", children: "Recommended time windows based on current weather conditions" })] }), _jsx(CardContent, { className: "pt-6", children: optimalTimes.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(AlertTriangle, { className: "mx-auto h-16 w-16 text-orange-500 mb-6" }), _jsx("h3", { className: "text-2xl font-semibold text-gray-700 mb-3", children: "Limited garden time today \u26A0\uFE0F" }), _jsx("p", { className: "text-lg text-gray-500", children: "Weather conditions may not be ideal for outdoor garden work." })] })) : (_jsx("div", { className: "space-y-4", children: optimalTimes.map((time, index) => (_jsxs("div", { className: "flex items-start p-4 bg-green-50 rounded-xl border-2 border-green-200 hover:bg-green-100 transition-colors", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0" }), _jsx("p", { className: "text-base text-green-800 font-medium", children: time })] }, index))) })) })] }), _jsxs(Card, { className: "bg-white shadow-lg border-0", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-green-50 to-blue-50 border-b", children: [_jsx(CardTitle, { className: "text-green-700", children: "Weather-Appropriate Tasks" }), _jsx(CardDescription, { className: "text-gray-600", children: "Suggested garden activities based on today's conditions" })] }), _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-4 bg-green-50 rounded-xl border-2 border-green-200", children: [_jsxs("h4", { className: "font-semibold text-green-800 mb-4 flex items-center", children: [_jsx("span", { className: "mr-2", children: "\u2705" }), "Recommended Today:"] }), _jsxs("ul", { className: "space-y-2 text-sm", children: [currentWeather.precipitation === 0 && currentWeather.temperature < 80 && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCA7" }), "Watering plants"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF31" }), "Planting seeds or transplants"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF3F" }), "Weeding garden beds"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83E\uDD55" }), "Harvesting vegetables"] })] })), currentWeather.condition.toLowerCase().includes('cloudy') && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF31" }), "Transplanting seedlings"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\u2702\uFE0F" }), "Pruning plants"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF42" }), "Applying mulch"] })] })), currentWeather.precipitation > 0 && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDFE0" }), "Indoor seed starting"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCCB" }), "Planning garden layout"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDD27" }), "Cleaning garden tools"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCDA" }), "Reading plant care guides"] })] }))] })] }), _jsxs("div", { className: "p-4 bg-orange-50 rounded-xl border-2 border-orange-200", children: [_jsxs("h4", { className: "font-semibold text-orange-800 mb-4 flex items-center", children: [_jsx("span", { className: "mr-2", children: "\u26A0\uFE0F" }), "Avoid Today:"] }), _jsxs("ul", { className: "space-y-2 text-sm", children: [currentWeather.precipitation > 30 && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCA7" }), "Watering plants"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83E\uDDB6" }), "Working in muddy soil"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF31" }), "Applying fertilizers"] })] })), currentWeather.temperature > 85 && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF21\uFE0F" }), "Transplanting in midday"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCAA" }), "Heavy physical work"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\u2600\uFE0F" }), "Working without shade"] })] })), currentWeather.windSpeed > 15 && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83D\uDCA8" }), "Spraying treatments"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF3F" }), "Working with tall plants"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("span", { className: "mr-2", children: "\uD83C\uDF31" }), "Seed sowing outdoors"] })] }))] })] })] }) })] })] })] })] }) }));
}
