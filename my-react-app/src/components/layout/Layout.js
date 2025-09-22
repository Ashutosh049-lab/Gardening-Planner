import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './Header';
import Sidebar from './Sidebar';
export default function Layout({ children }) {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(Header, {}), _jsxs("div", { className: "flex h-[calc(100vh-4rem)]", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 overflow-auto", children: _jsx("div", { className: "container mx-auto px-6 py-8", children: children }) })] })] }));
}
