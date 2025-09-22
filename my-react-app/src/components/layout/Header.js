import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("header", { className: "border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60", children: _jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Leaf, { className: "h-8 w-8 text-green-600" }), _jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Garden Planner" })] }), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: _jsx(Avatar, { className: "h-8 w-8", children: _jsx(AvatarFallback, { children: currentUser?.name?.charAt(0)?.toUpperCase() || 'U' }) }) }) }), _jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [_jsx("div", { className: "flex items-center justify-start gap-2 p-2", children: _jsxs("div", { className: "flex flex-col space-y-1 leading-none", children: [_jsx("p", { className: "font-medium", children: currentUser?.name }), _jsx("p", { className: "w-[200px] truncate text-sm text-muted-foreground", children: currentUser?.email })] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(User, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Profile" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: handleLogout, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Log out" })] })] })] }) })] }) }));
}
