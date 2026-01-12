"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
    const { dir, language } = useLanguage();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.message || (language === "ar" ? "خطأ في تسجيل الدخول" : "Login failed"));
            }
        } catch (err) {
            setError(language === "ar" ? "حدث خطأ ما. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const labels = {
        title: language === "ar" ? "تسجيل دخول المشرف" : "Admin Login",
        description: language === "ar" ? "أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم" : "Enter your credentials to access the dashboard",
        username: language === "ar" ? "اسم المستخدم" : "Username",
        password: language === "ar" ? "كلمة المرور" : "Password",
        login: language === "ar" ? "تسجيل الدخول" : "Login",
        loggingIn: language === "ar" ? "جاري تسجيل الدخول..." : "Logging in...",
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir={dir}>
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{labels.title}</CardTitle>
                    <CardDescription>{labels.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">{labels.username}</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="focus-visible:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{labels.password}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="focus-visible:ring-primary"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {labels.loggingIn}
                                </>
                            ) : (
                                labels.login
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t py-4">
                    <p className="text-sm text-gray-500">
                        {language === "ar" ? "بلاتينيوم تيكتس - لوحة التحكم" : "Platinum Tickets - Admin Dashboard"}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
