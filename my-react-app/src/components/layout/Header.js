import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger,
//   DropdownMenuSeparator
// } from '@/components/ui/dropdown-menu';
// import { useAuth } from '@/hooks/useAuth';
// import { Leaf, User, Settings, LogOut } from 'lucide-react';
// export default function Header() {
//   const { currentUser, logout } = useAuth();
//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };
//   return (
//     <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Leaf className="h-8 w-8 text-green-600" />
//           <h1 className="text-xl font-bold text-gray-900">Garden Planner</h1>
//         </div>
//         <div className="flex items-center space-x-4 bg-white">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback>
//                     {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <div className="flex items-center justify-start gap-2 p-2">
//                 <div className="flex flex-col space-y-1 leading-none">
//                   <p className="font-medium">{currentUser?.name}</p>
//                   <p className="w-[200px] truncate text-sm text-muted-foreground">
//                     {currentUser?.email}
//                   </p>
//                 </div>
//               </div>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger,
//   DropdownMenuSeparator
// } from '@/components/ui/dropdown-menu';
// import { useAuth } from '@/hooks/useAuth';
// import { Leaf, User, Settings, LogOut, Bell, Search } from 'lucide-react';
// export default function Header() {
//   const { currentUser, logout } = useAuth();
//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };
//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-green-200/50 bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-green-50/90 supports-[backdrop-filter]:to-blue-50/90 shadow-sm">
//       <div className="container mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
//             <Leaf className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//               Garden Planner
//             </h1>
//             <p className="text-xs text-gray-500 -mt-1">Your Digital Garden Assistant</p>
//           </div>
//         </div>
//         {/* Center Actions */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 hover:bg-green-50">
//             <Search className="h-4 w-4 mr-2" />
//             Search Plants
//           </Button>
//           <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 hover:bg-green-50 relative">
//             <Bell className="h-4 w-4" />
//             <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
//               2
//             </span>
//           </Button>
//         </div>
//         {/* User Profile Section */}
//         <div className="flex items-center space-x-4">
//           {currentUser ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-green-100 transition-colors">
//                   <Avatar className="h-10 w-10 border-2 border-green-200 shadow-md">
//                     <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold">
//                       {currentUser?.name?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-64 bg-white shadow-xl border-green-200" align="end" forceMount>
//                 <div className="flex items-center justify-start gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50">
//                   <Avatar className="h-12 w-12 border-2 border-green-200">
//                     <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold text-lg">
//                       {currentUser?.name?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col space-y-1 leading-none">
//                     <p className="font-semibold text-gray-800">
//                       {currentUser?.name || currentUser?.displayName || 'Garden Enthusiast'}
//                     </p>
//                     <p className="w-[180px] truncate text-sm text-gray-600">
//                       {currentUser?.email}
//                     </p>
//                     <div className="flex items-center space-x-1 mt-1">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <span className="text-xs text-green-600 font-medium">Active Gardener</span>
//                     </div>
//                   </div>
//                 </div>
//                 <DropdownMenuSeparator className="bg-green-100" />
//                 <div className="bg-white p-1">
//                   <DropdownMenuItem className="hover:bg-green-50 hover:text-green-700 cursor-pointer rounded-md">
//                     <User className="mr-3 h-4 w-4 text-green-600" />
//                     <span className="font-medium">My Profile</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-green-50 hover:text-green-700 cursor-pointer rounded-md">
//                     <Settings className="mr-3 h-4 w-4 text-green-600" />
//                     <span className="font-medium">Settings</span>
//                   </DropdownMenuItem>
//                 </div>
//                 <DropdownMenuSeparator className="bg-green-100" />
//                 <div className="p-1">
//                   <DropdownMenuItem 
//                     onClick={handleLogout}
//                     className="hover:bg-red-50 hover:text-red-700 cursor-pointer rounded-md text-red-600"
//                   >
//                     <LogOut className="mr-3 h-4 w-4" />
//                     <span className="font-medium">Log out</span>
//                   </DropdownMenuItem>
//                 </div>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center space-x-2">
//               <Button variant="ghost" className="text-green-600 hover:bg-green-50">
//                 Sign In
//               </Button>
//               <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
//                 Get Started
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger,
//   DropdownMenuSeparator
// } from '@/components/ui/dropdown-menu';
// import { useAuth } from '@/hooks/useAuth';
// import { Leaf, User, Settings, LogOut, Bell, Search } from 'lucide-react';
// export default function Header() {
//   const { currentUser, logout } = useAuth();
//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };
//   return (
//     <header className=" bg-white sticky top-0 z-50 w-full border-b border-green-200/50 bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-green-50/90 supports-[backdrop-filter]:to-blue-50/90 shadow-sm">
//       <div className="container mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
//             <Leaf className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//               Garden Planner 
//             </h1>
//             <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Your Digital Garden Assistant</p>
//           </div>
//         </div>
//         {/* Center Actions */}
//         <div className="hidden md:flex items-center space-x-4">
//           <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors">
//             <Search className="h-4 w-4 mr-2" />
//             Search Plants
//           </Button>
//           <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 hover:bg-green-50 relative transition-colors">
//             <Bell className="h-4 w-4" />
//             <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
//               2
//             </span>
//           </Button>
//         </div>
//         {/* User Profile Section */}
//         <div className="flex items-center space-x-4">
//           {currentUser ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-green-100 transition-colors border-2 border-transparent hover:border-green-200">
//                   <Avatar className="h-10 w-10 shadow-md">
//                     <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold text-lg">
//                       {currentUser?.name?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent 
//                 className="w-80 bg-white/95 backdrop-blur-md shadow-2xl border border-green-200/50 rounded-2xl p-2" 
//                 align="end" 
//                 forceMount
//                 sideOffset={8}
//               >
//                 {/* User Info Header */}
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-2">
//                   <Avatar className="h-16 w-16 shadow-lg border-2 border-white">
//                     <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-2xl">
//                       {currentUser?.name?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col space-y-1 flex-1">
//                     <p className="font-bold text-lg text-gray-800 leading-tight">
//                       {currentUser?.name || currentUser?.displayName || 'Garden Enthusiast'}
//                     </p>
//                     <p className="text-sm text-gray-600 truncate max-w-[200px]">
//                       {currentUser?.email}
//                     </p>
//                     <div className="flex items-center space-x-2 mt-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-xs text-green-600 font-semibold">Active Gardener</span>
//                     </div>
//                   </div>
//                 </div>
//                 <DropdownMenuSeparator className="bg-green-100 my-2" />
//                 {/* Menu Items */}
//                  <div className="space-y-1">
//                    <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50 cursor-pointer rounded-lg p-3 transition-colors group">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
//                         <User className="h-4 w-4 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-800">My Profile</p>
//                         <p className="text-xs text-gray-500">Manage your account settings</p>
//                       </div>
//                     </div>
//                   </DropdownMenuItem>  
//                   <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50 cursor-pointer rounded-lg p-3 transition-colors group">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                         <Settings className="h-4 w-4 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-800">Settings</p>
//                         <p className="text-xs text-gray-500">Customize your garden preferences</p>
//                       </div>
//                     </div>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="hover:bg-green-50 focus:bg-green-50 cursor-pointer rounded-lg p-3 transition-colors group">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
//                         <Bell className="h-4 w-4 text-purple-600" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-800">Notifications</p>
//                         <p className="text-xs text-gray-500">Care reminders and updates</p>
//                       </div>
//                     </div>
//                   </DropdownMenuItem>
//                 </div>
//                 <DropdownMenuSeparator className="bg-red-100 my-2" />
//                 {/* Logout */}
//                 <DropdownMenuItem 
//                   onClick={handleLogout}
//                   className="hover:bg-red-50 focus:bg-red-50 cursor-pointer rounded-lg p-3 transition-colors group"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
//                       <LogOut className="h-4 w-4 text-red-600" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-red-700">Sign Out</p>
//                       <p className="text-xs text-red-500">Log out of your account</p>
//                     </div>
//                   </div>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center space-x-2">
//               <Button variant="ghost" className="text-green-600 hover:bg-green-50">
//                 Sign In
//               </Button>
//               <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md">
//                 Get Started
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Leaf, User, Settings, LogOut } from 'lucide-react';
export default function Header() {
    const { currentUser, logout } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (error) {
            console.error('Failed to logout:', error);
        }
    };
    return (_jsx("header", { className: "border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60", children: _jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Leaf, { className: "h-8 w-8 text-green-600" }), _jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Garden Planner" })] }), _jsx("div", { className: "flex items-center space-x-4 ", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "bg-green relative h-8 w-8 rounded-full", children: _jsx(Avatar, { className: "bg-green-500 h-8 w-8", children: _jsx(AvatarFallback, { children: currentUser?.name?.charAt(0)?.toUpperCase() || 'U' }) }) }) }), _jsxs(DropdownMenuContent, { className: "bg-white w-56", align: "end", forceMount: true, children: [_jsx("div", { className: "flex items-center justify-start gap-2 p-2", children: _jsxs("div", { className: "flex flex-col space-y-1 leading-none", children: [_jsx("p", { className: "font-medium", children: currentUser?.name }), _jsx("p", { className: "w-[200px] truncate text-sm text-muted-foreground", children: currentUser?.email })] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(User, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Profile" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: handleLogout, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Log out" })] })] })] }) })] }) }));
}
