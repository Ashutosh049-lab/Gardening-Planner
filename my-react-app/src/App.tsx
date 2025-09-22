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
    return (
    

      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          
       
        
      </div>
    );
  }

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plants" element={<PlantInventory />} />
            <Route path="/plants/add" element={<AddPlant />} />
            <Route path="/garden" element={<GardenDesigner />} />
            <Route path="/journal" element={<PlantJournal />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/library" element={<PlantLibrary />} />
            <Route path="/pests" element={<PestTracker />} />
            <Route path="/weather" element={<WeatherIntegration />} />
            <Route path="/seasonal" element={<SeasonalPlanner />} />
            <Route path="/harvest" element={<HarvestTracker />} />
            <Route path="/tips" element={<GardeningTips />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;