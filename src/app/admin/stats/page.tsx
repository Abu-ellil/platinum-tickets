"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
    BarChart3,
    TrendingUp,
    Users,
    Ticket,
    Percent,
    Save,
    RotateCcw,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StatsManagement() {
    const { language } = useLanguage();

    const [stats, setStats] = useState({
        totalUsers: "15,240",
        totalSales: "284,500",
        activeEvents: "42",
        soldTickets: "12,840"
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة الأرقام والإحصائيات" : "Numbers & Stats Management"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {language === "ar" ? "تحكم في الأرقام التي تظهر للمستخدمين في الموقع." : "Control the numbers that appear to users on the site."}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-2xl gap-2 font-bold border-gray-200">
                        <RotateCcw className="h-5 w-5" />
                        {language === "ar" ? "إعادة تعيين" : "Reset Changes"}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100">
                        <Save className="h-5 w-5" />
                        {language === "ar" ? "حفظ التعديلات" : "Save Stats"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">{language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}</h3>
                    </div>
                    <Input
                        value={stats.totalUsers}
                        onChange={(e) => setStats({ ...stats, totalUsers: e.target.value })}
                        className="h-12 bg-gray-50 border-none rounded-xl text-xl font-black text-gray-900"
                    />
                    <p className="text-xs text-gray-400 mt-2">يظهر في الصفحة الرئيسية كـ +15k</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                            <Ticket className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">{language === 'ar' ? 'التذاكر المباعة' : 'Tickets Sold'}</h3>
                    </div>
                    <Input
                        value={stats.soldTickets}
                        onChange={(e) => setStats({ ...stats, soldTickets: e.target.value })}
                        className="h-12 bg-gray-50 border-none rounded-xl text-xl font-black text-gray-900"
                    />
                    <p className="text-xs text-gray-400 mt-2">محدث تلقائيا من النظام</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">{language === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}</h3>
                    </div>
                    <Input
                        value={stats.totalSales}
                        onChange={(e) => setStats({ ...stats, totalSales: e.target.value })}
                        className="h-12 bg-gray-50 border-none rounded-xl text-xl font-black text-gray-900"
                    />
                    <p className="text-xs text-gray-400 mt-2">بالعملة المحلية</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                            <Percent className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">{language === 'ar' ? 'نسبة التحويل' : 'Conversion Rate'}</h3>
                    </div>
                    <Input
                        value="3.2%"
                        readOnly
                        className="h-12 bg-gray-50 border-none rounded-xl text-xl font-black text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-2">يتم حسابه برمجيا</p>
                </div>
            </div>

            {/* Manual Counts Overlay Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                    <h2 className="text-2xl font-black text-gray-900">{language === 'ar' ? 'تعديل الأرقام المعروضة (Marketing)' : 'Marketing Numbers Overlay'}</h2>
                    <p className="text-gray-500 mt-1">هذه الأرقام تظهر للمستخدمين لأغراض تسويقية.</p>
                </div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-2">{language === 'ar' ? 'عدد الحفلات المقامة' : 'Events Conducted'}</label>
                            <div className="flex gap-2">
                                <Input defaultValue="5000+" className="h-12 bg-gray-50 border-none rounded-xl" />
                                <Button variant="outline" className="h-12 w-12 rounded-xl p-0"><RotateCcw className="h-4 w-4 text-gray-400" /></Button>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-2">{language === 'ar' ? 'عدد العملاء السعداء' : 'Happy Customers'}</label>
                            <div className="flex gap-2">
                                <Input defaultValue="1M+" className="h-12 bg-gray-50 border-none rounded-xl" />
                                <Button variant="outline" className="h-12 w-12 rounded-xl p-0"><RotateCcw className="h-4 w-4 text-gray-400" /></Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">معلومة سريعة</h3>
                            <p className="text-blue-100 opacity-90 leading-relaxed">الأرقام التي تقوم بتعديلها هنا تظهر فوراً في قسم "عن الشركة" و "الأرقام القياسية" في الصفحة الرئيسية.</p>
                            <Button variant="secondary" className="mt-6 font-bold text-blue-600 bg-white hover:bg-blue-50 border-none h-11 px-8 rounded-xl shadow-lg">
                                {language === 'ar' ? 'معاينة الموقع' : 'Preview Site'}
                            </Button>
                        </div>
                        <BarChart3 className="absolute -bottom-4 -right-4 h-40 w-40 text-blue-500 opacity-20 rotate-12" />
                    </div>
                </div>
            </div>
        </div>
    );
}
