import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
export default function SignupForm({ onSwitchToLogin }) {
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await signup(data.email, data.password, data.name);
            toast.success('Account created successfully!');
        }
        catch (error) {
            toast.error('Failed to create account. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Create Account" }), _jsx(CardDescription, { children: "Join the gardening community and start planning your garden" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name" }), _jsx(Input, { id: "name", type: "text", placeholder: "Enter your full name", ...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        }
                                    }) }), errors.name && (_jsx("p", { className: "text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "Enter your email", ...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address'
                                        }
                                    }) }), errors.email && (_jsx("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Create a password", ...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    }) }), errors.password && (_jsx("p", { className: "text-sm text-red-500", children: errors.password.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", placeholder: "Confirm your password", ...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value => value === password || 'Passwords do not match'
                                    }) }), errors.confirmPassword && (_jsx("p", { className: "text-sm text-red-500", children: errors.confirmPassword.message }))] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Creating Account...' : 'Create Account' }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Already have an account?", ' ', _jsx("button", { type: "button", onClick: onSwitchToLogin, className: "text-primary hover:underline", children: "Sign in" })] }) })] }) })] }));
}
