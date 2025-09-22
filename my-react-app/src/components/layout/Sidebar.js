import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { 
//   LayoutDashboard, 
//   Leaf, 
//   Plus, 
//   PenTool, 
//   BookOpen, 
//   Bell,
//   Library,
//   Bug,
//   Cloud,
//   Calendar,
//   Apple,
//   Lightbulb,
//   Users,
//   Menu,
//   ChevronDown,
//   ChevronRight,
//   Sprout
// } from 'lucide-react';
// const navigation = [
//   {
//     name: 'Dashboard',
//     href: '/dashboard',
//     icon: LayoutDashboard,
//   },
//   {
//     name: 'My Plants',
//     icon: Leaf,
//     children: [
//       { name: 'Plant Inventory', href: '/plants', icon: Leaf },
//       { name: 'Add Plant', href: '/plants/add', icon: Plus },
//     ]
//   },
//   {
//     name: 'Garden Tools',
//     icon: PenTool,
//     children: [
//       { name: 'Garden Designer', href: '/garden', icon: PenTool },
//       { name: 'Plant Journal', href: '/journal', icon: BookOpen },
//       { name: 'Care Reminders', href: '/reminders', icon: Bell },
//     ]
//   },
//   {
//     name: 'Plant Care',
//     icon: Sprout,
//     children: [
//       { name: 'Plant Library', href: '/library', icon: Library },
//       { name: 'Pest & Disease Tracker', href: '/pests', icon: Bug },
//       { name: 'Weather & Care', href: '/weather', icon: Cloud },
//     ]
//   },
//   {
//     name: 'Planning',
//     icon: Calendar,
//     children: [
//       { name: 'Seasonal Planner', href: '/seasonal', icon: Calendar },
//       { name: 'Harvest Tracker', href: '/harvest', icon: Apple },
//     ]
//   },
//   {
//     name: 'Learn & Share',
//     icon: Lightbulb,
//     children: [
//       { name: 'Gardening Tips', href: '/tips', icon: Lightbulb },
//       { name: 'Community', href: '/community', icon: Users },
//     ]
//   },
// ];
// interface SidebarProps {
//   className?: string;
// }
// export default function Sidebar({ className }: SidebarProps) {
//   const location = useLocation();
//   const [expandedSections, setExpandedSections] = useState<string[]>(['My Plants', 'Garden Tools']);
//   const toggleSection = (sectionName: string) => {
//     setExpandedSections(prev => 
//       prev.includes(sectionName) 
//         ? prev.filter(name => name !== sectionName)
//         : [...prev, sectionName]
//     );
//   };
//   const SidebarContent = () => (
//     <div className="flex h-full flex-col">
//       <div className="flex h-14 items-center border-b px-4">
//         <Link to="/dashboard" className="flex items-center space-x-2">
//           <Leaf className="h-6 w-6 text-green-600" />
//           <span className="font-bold text-xl">Garden Planner</span>
//         </Link>
//       </div>
//       <ScrollArea className="flex-1 px-3">
//         <div className="space-y-2 py-4">
//           {navigation.map((item) => {
//             if (item.children) {
//               const isExpanded = expandedSections.includes(item.name);
//               const hasActiveChild = item.children.some(child => location.pathname === child.href);
//               return (
//                 <div key={item.name}>
//                   <Button
//                     variant="ghost"
//                     className={cn(
//                       "w-full justify-between font-medium",
//                       (isExpanded || hasActiveChild) && "bg-accent"
//                     )}
//                     onClick={() => toggleSection(item.name)}
//                   >
//                     <div className="flex items-center">
//                       <item.icon className="mr-2 h-4 w-4" />
//                       {item.name}
//                     </div>
//                     {isExpanded ? (
//                       <ChevronDown className="h-4 w-4" />
//                     ) : (
//                       <ChevronRight className="h-4 w-4" />
//                     )}
//                   </Button>
//                   {isExpanded && (
//                     <div className="ml-4 mt-1 space-y-1">
//                       {item.children.map((child) => (
//                         <Button
//                           key={child.name}
//                           variant={location.pathname === child.href ? "secondary" : "ghost"}
//                           className="w-full justify-start text-sm"
//                           asChild
//                         >
//                           <Link to={child.href}>
//                             <child.icon className="mr-2 h-3 w-3" />
//                             {child.name}
//                           </Link>
//                         </Button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             }
//             return (
//               <Button
//                 key={item.name}
//                 variant={location.pathname === item.href ? "secondary" : "ghost"}
//                 className="w-full justify-start"
//                 asChild
//               >
//                 <Link to={item.href}>
//                   <item.icon className="mr-2 h-4 w-4" />
//                   {item.name}
//                 </Link>
//               </Button>
//             );
//           })}
//         </div>
//       </ScrollArea>
//     </div>
//   );
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className={cn("hidden border-r bg-gray-50/40 lg:block", className)}>
//         <SidebarContent />
//       </div>
//       {/* Mobile Sidebar */}
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//           >
//             <Menu className="h-5 w-5" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="p-0 w-64">
//           <SidebarContent />
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LayoutDashboard, Leaf, Plus, PenTool, BookOpen, Bell, Library, Bug, Cloud, Calendar, Apple, Lightbulb, Users, Menu, ChevronDown, ChevronRight, Sprout } from 'lucide-react';
const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'My Plants',
        icon: Leaf,
        children: [
            { name: 'Plant Inventory', href: '/plants', icon: Leaf },
            { name: 'Add Plant', href: '/plants/add', icon: Plus },
        ]
    },
    {
        name: 'Garden Tools',
        icon: PenTool,
        children: [
            { name: 'Garden Designer', href: '/garden', icon: PenTool },
            { name: 'Plant Journal', href: '/journal', icon: BookOpen },
            { name: 'Care Reminders', href: '/reminders', icon: Bell },
        ]
    },
    {
        name: 'Plant Care',
        icon: Sprout,
        children: [
            { name: 'Plant Library', href: '/library', icon: Library },
            { name: 'Pest & Disease Tracker', href: '/pests', icon: Bug },
            { name: 'Weather & Care', href: '/weather', icon: Cloud },
        ]
    },
    {
        name: 'Planning',
        icon: Calendar,
        children: [
            { name: 'Seasonal Planner', href: '/seasonal', icon: Calendar },
            { name: 'Harvest Tracker', href: '/harvest', icon: Apple },
        ]
    },
    {
        name: 'Learn & Share',
        icon: Lightbulb,
        children: [
            { name: 'Gardening Tips', href: '/tips', icon: Lightbulb },
            { name: 'Community', href: '/community', icon: Users },
        ]
    },
];
export default function Sidebar({ className }) {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState(['My Plants', 'Garden Tools']);
    const toggleSection = (sectionName) => {
        setExpandedSections(prev => prev.includes(sectionName)
            ? prev.filter(name => name !== sectionName)
            : [...prev, sectionName]);
    };
    const SidebarContent = () => (_jsxs("div", { className: "flex h-full flex-col bg-white", children: [_jsx("div", { className: "flex h-16 items-center border-b border-gray-200 px-6", children: _jsxs(Link, { to: "/dashboard", className: "flex items-center space-x-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-green-600", children: _jsx(Leaf, { className: "h-5 w-5 text-white" }) }), _jsx("span", { className: "font-bold text-xl text-gray-900", children: "Garden Planner" })] }) }), _jsx(ScrollArea, { className: "flex-1 px-4", children: _jsx("div", { className: "space-y-1 py-6", children: navigation.map((item) => {
                        if (item.children) {
                            const isExpanded = expandedSections.includes(item.name);
                            const hasActiveChild = item.children.some(child => location.pathname === child.href);
                            return (_jsxs("div", { className: "space-y-1", children: [_jsxs(Button, { variant: "ghost", className: cn("w-full justify-between font-medium h-10 px-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900", (isExpanded || hasActiveChild) && "bg-gray-100 text-gray-900"), onClick: () => toggleSection(item.name), children: [_jsxs("div", { className: "flex items-center", children: [_jsx(item.icon, { className: "mr-3 h-4 w-4" }), _jsx("span", { className: "text-sm font-medium", children: item.name })] }), isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4 text-gray-500" })) : (_jsx(ChevronRight, { className: "h-4 w-4 text-gray-500" }))] }), isExpanded && (_jsx("div", { className: "ml-6 space-y-1", children: item.children.map((child) => (_jsx(Button, { variant: "ghost", className: cn("w-full justify-start text-sm h-9 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900", location.pathname === child.href && "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700 font-medium"), asChild: true, children: _jsxs(Link, { to: child.href, children: [_jsx(child.icon, { className: "mr-3 h-3 w-3" }), _jsx("span", { children: child.name })] }) }, child.name))) }))] }, item.name));
                        }
                        return (_jsx(Button, { variant: "ghost", className: cn("w-full justify-start font-medium h-10 px-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900", location.pathname === item.href && "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"), asChild: true, children: _jsxs(Link, { to: item.href, children: [_jsx(item.icon, { className: "mr-3 h-4 w-4" }), _jsx("span", { className: "text-sm font-medium", children: item.name })] }) }, item.name));
                    }) }) })] }));
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: cn("hidden border-r border-gray-200 bg-white lg:block lg:w-64 lg:fixed lg:inset-y-0", className), children: _jsx(SidebarContent, {}) }), _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md hover:bg-gray-100", children: _jsx(Menu, { className: "h-5 w-5" }) }) }), _jsx(SheetContent, { side: "left", className: "p-0 w-64 bg-white", children: _jsx(SidebarContent, {}) })] })] }));
}
