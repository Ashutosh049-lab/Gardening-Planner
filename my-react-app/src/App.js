import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { Toaster } from '@/components/ui/sonner';
// import { TooltipProvider } from '@/components/ui/tooltip';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from '@/hooks/useAuth';
// import Layout from '@/components/layout/Layout';
// import Auth from '@/pages/Auth';
// import Dashboard from '@/pages/Dashboard';
// import PlantInventory from '@/pages/PlantInventory';
// import AddPlant from '@/pages/AddPlant';
// import GardenDesigner from '@/pages/GardenDesigner';
// import PlantJournal from '@/pages/PlantJournal';
// import Reminders from '@/pages/Reminders';
// import PlantLibrary from '@/pages/PlantLibrary';
// import PestTracker from '@/pages/PestTracker';
// import WeatherIntegration from '@/pages/WeatherIntegration';
// import SeasonalPlanner from '@/pages/SeasonalPlanner';
// import HarvestTracker from '@/pages/HarvestTracker';
// import GardeningTips from '@/pages/GardeningTips';
// import Community from '@/pages/Community';
// import NotFound from '@/pages/NotFound';
// const queryClient = new QueryClient();
// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { currentUser, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }
//   if (!currentUser) {
//     return <Navigate to="/auth" replace />;
//   }
//   return <Layout>{children}</Layout>;
// }
// function PublicRoute({ children }: { children: React.ReactNode }) {
//   const { currentUser, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-2 text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }
//   if (currentUser) {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return <>{children}</>;
// }
// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/auth" element={
//         <PublicRoute>
//           <Auth />
//         </PublicRoute>
//       } />
//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       } />
//       <Route path="/plants" element={
//         <ProtectedRoute>
//           <PlantInventory />
//         </ProtectedRoute>
//       } />
//       <Route path="/plants/add" element={
//         <ProtectedRoute>
//           <AddPlant />
//         </ProtectedRoute>
//       } />
//       <Route path="/garden" element={
//         <ProtectedRoute>
//           <GardenDesigner />
//         </ProtectedRoute>
//       } />
//       <Route path="/journal" element={
//         <ProtectedRoute>
//           <PlantJournal />
//         </ProtectedRoute>
//       } />
//       <Route path="/reminders" element={
//         <ProtectedRoute>
//           <Reminders />
//         </ProtectedRoute>
//       } />
//       <Route path="/library" element={
//         <ProtectedRoute>
//           <PlantLibrary />
//         </ProtectedRoute>
//       } />
//       <Route path="/pests" element={
//         <ProtectedRoute>
//           <PestTracker />
//         </ProtectedRoute>
//       } />
//       <Route path="/weather" element={
//         <ProtectedRoute>
//           <WeatherIntegration />
//         </ProtectedRoute>
//       } />
//       <Route path="/seasonal" element={
//         <ProtectedRoute>
//           <SeasonalPlanner />
//         </ProtectedRoute>
//       } />
//       <Route path="/harvest" element={
//         <ProtectedRoute>
//           <HarvestTracker />
//         </ProtectedRoute>
//       } />
//       <Route path="/tips" element={
//         <ProtectedRoute>
//           <GardeningTips />
//         </ProtectedRoute>
//       } />
//       <Route path="/community" element={
//         <ProtectedRoute>
//           <Community />
//         </ProtectedRoute>
//       } />
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <BrowserRouter>
//         <AuthProvider>
//           <AppRoutes />
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );
// export default App;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import PlantInventory from '@/pages/PlantInventory';
import AddPlant from '@/pages/AddPlant';
import GardenDesigner from '@/pages/GardenDesigner';
import PlantJournal from '@/pages/PlantJournal';
import Reminders from '@/pages/Reminders';
import PlantLibrary from '@/pages/PlantLibrary';
import PestTracker from '@/pages/PestTracker';
import WeatherIntegration from '@/pages/WeatherIntegration';
import SeasonalPlanner from '@/pages/SeasonalPlanner';
import HarvestTracker from '@/pages/HarvestTracker';
import GardeningTips from '@/pages/GardeningTips';
import Community from '@/pages/Community';
import NotFound from '@/pages/NotFound';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
function AppContent() {
    const { currentUser, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" }) }));
    }
    if (!currentUser) {
        return _jsx(Auth, {});
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Header, {}), _jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 p-6 ml-64", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/plants", element: _jsx(PlantInventory, {}) }), _jsx(Route, { path: "/plants/add", element: _jsx(AddPlant, {}) }), _jsx(Route, { path: "/garden", element: _jsx(GardenDesigner, {}) }), _jsx(Route, { path: "/journal", element: _jsx(PlantJournal, {}) }), _jsx(Route, { path: "/reminders", element: _jsx(Reminders, {}) }), _jsx(Route, { path: "/library", element: _jsx(PlantLibrary, {}) }), _jsx(Route, { path: "/pests", element: _jsx(PestTracker, {}) }), _jsx(Route, { path: "/weather", element: _jsx(WeatherIntegration, {}) }), _jsx(Route, { path: "/seasonal", element: _jsx(SeasonalPlanner, {}) }), _jsx(Route, { path: "/harvest", element: _jsx(HarvestTracker, {}) }), _jsx(Route, { path: "/tips", element: _jsx(GardeningTips, {}) }), _jsx(Route, { path: "/community", element: _jsx(Community, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] })] }));
}
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(AppContent, {}) }) }));
}
export default App;
