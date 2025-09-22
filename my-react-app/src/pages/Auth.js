import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6", children: _jsx("div", { className: "w-full max-w-md", children: isLogin ? (_jsx(LoginForm, { onSwitchToSignup: () => setIsLogin(false) })) : (_jsx(SignupForm, { onSwitchToLogin: () => setIsLogin(true) })) }) }));
}
