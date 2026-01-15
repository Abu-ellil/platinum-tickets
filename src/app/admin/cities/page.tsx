"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    MapPin,
    Upload,
    X,
    Building2,
    Calendar,
    Globe,
    Loader2,
    Image as ImageIcon
} from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface Category {
    id: string;
    label: string;
    color: string;
    defaultPrice: number;
}

interface City {
    _id: string;
    name: {
        ar: string;
        en: string;
    };
    country: {
        ar: string;
        en: string;
    };
    image: string;
    slug: string;
    flag: string;
}

interface Venue {
    _id: string;
    name: {
        ar: string;
        en: string;
    };
    cityId: {
        _id: string;
        name: {
            ar: string;
            en: string;
        };
    };
    image: string;
    categories?: Category[];
    locationLink?: string;
}

function CitiesManagementContent() {
    const { language } = useLanguage();
    const searchParams = useSearchParams();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");
    const [viewType, setViewType] = useState<"venues" | "cities">("venues");
    const [editingItem, setEditingItem] = useState<City | Venue | null>(null);

    // Data for dropdowns
    const [cities, setCities] = useState<City[]>([]);

    // Form state
    const [addType, setAddType] = useState<"city" | "venue">("venue");
    
    // Venue fields
    const [venueName, setVenueName] = useState("");
    const [venueNameAr, setVenueNameAr] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [locationLink, setLocationLink] = useState("");
    const [venueCategories, setVenueCategories] = useState<Category[]>([]);
    
    // City fields
    const [cityName, setCityName] = useState("");
    const [cityNameAr, setCityNameAr] = useState("");
    const [countryName, setCountryName] = useState("");
    const [countryNameAr, setCountryNameAr] = useState("");
    const [citySlug, setCitySlug] = useState("");
    const [cityFlag, setCityFlag] = useState("");

    // Shared fields
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchVenues();
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const res = await fetch('/api/cities');
            const json = await res.json();
            if (json.success) {
                setCities(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch cities:", error);
        }
    };

    const fetchVenues = async () => {
        try {
            const res = await fetch('/api/venues?limit=1000');
            const json = await res.json();
            if (json.success) {
                setVenues(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch venues:", error);
        } finally {
            setLoading(false);
        }
    };

    const addVenueCategory = () => {
        const newId = `cat-${Date.now()}`;
        setVenueCategories([...venueCategories, { id: newId, label: "", color: "#3b82f6", defaultPrice: 0 }]);
    };

    const removeVenueCategory = (id: string) => {
        setVenueCategories(venueCategories.filter(cat => cat.id !== id));
    };

    const updateVenueCategory = (id: string, field: keyof Category, value: any) => {
        setVenueCategories(venueCategories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
    };

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        // Set local preview first
        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);

        // Immediately upload to Cloudinary
        setIsUploading(true);
        try {
            const result = await uploadToCloudinary(file);
            if (result.secure_url) {
                setImageUrl(result.secure_url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert(language === 'ar' ? "فشل رفع الصورة" : "Image upload failed");
            setImageUrl(""); // Clear preview on failure
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (item: City | Venue, type: "city" | "venue") => {
        setEditingItem(item);
        setAddType(type);
        if (type === "venue") {
            const venue = item as Venue;
            setVenueName(venue.name.en);
            setVenueNameAr(venue.name.ar);
            setSelectedCityId(venue.cityId?._id);
            setLocationLink(venue.locationLink || "");
            setVenueCategories(venue.categories || []);
        } else {
            const city = item as City;
            setCityName(city.name.en);
            setCityNameAr(city.name.ar);
            setCountryName(city.country.en);
            setCountryNameAr(city.country.ar);
            setCitySlug(city.slug);
            setCityFlag(city.flag);
        }
        setImageUrl(item.image);
        setIsAddOpen(true);
    };

    const resetForm = () => {
        setVenueName("");
        setVenueNameAr("");
        setSelectedCityId("");
        setLocationLink("");
        setCityName("");
        setCityNameAr("");
        setCountryName("");
        setCountryNameAr("");
        setCitySlug("");
        setCityFlag("");
        setImageUrl("");
        setImageFile(null);
        setVenueCategories([]);
        setEditingItem(null);
    };

    const handleSave = async () => {
        if (addType === "venue") {
            if (!venueName || !venueNameAr || !selectedCityId || !imageUrl) {
                alert(language === 'ar' ? "يرجى ملء جميع الحقول ورفع صورة" : "Please fill all fields and upload an image");
                return;
            }
        } else {
            if (!cityName || !cityNameAr || !countryName || !countryNameAr || !citySlug || !cityFlag || !imageUrl) {
                alert(language === 'ar' ? "يرجى ملء جميع حقول المدينة ورفع صورة" : "Please fill all city fields and upload an image");
                return;
            }
        }

        if (isUploading) {
            alert(language === 'ar' ? "يرجى الانتظار حتى ينتهي رفع الصورة" : "Please wait for the image to finish uploading");
            return;
        }

        setIsSaving(true);
        try {
            if (addType === "venue") {
                const payload = {
                    name: { ar: venueNameAr, en: venueName },
                    cityId: selectedCityId,
                    image: imageUrl,
                    locationLink: locationLink,
                    theaterId: "platinum-stage",
                    categories: venueCategories.length > 0 ? venueCategories : [
                        { id: "vip", label: "VIP", color: "#FFD700", defaultPrice: 1000 },
                        { id: "gold", label: "Gold", color: "#C0C0C0", defaultPrice: 750 },
                        { id: "silver", label: "Silver", color: "#CD7F32", defaultPrice: 500 }
                    ]
                };
                
                const url = editingItem ? `/api/venues/${editingItem._id}` : '/api/venues';
                const method = editingItem ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const json = await res.json();
                if (json.success) {
                    if (editingItem) {
                        setVenues(venues.map(v => v._id === editingItem._id ? json.data : v));
                    } else {
                        setVenues([json.data, ...venues]);
                    }
                    setIsAddOpen(false);
                    resetForm();
                } else {
                    alert(json.error || "Failed to save venue");
                }
            } else {
                const payload = {
                    name: { ar: cityNameAr, en: cityName },
                    country: { ar: countryNameAr, en: countryName },
                    image: imageUrl,
                    slug: citySlug,
                    flag: cityFlag
                };
                
                const url = (editingItem && 'slug' in editingItem) ? `/api/cities/${editingItem.slug}` : '/api/cities';
                const method = editingItem ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const json = await res.json();
                if (json.success) {
                    await fetchCities(); // Refresh cities list
                    setIsAddOpen(false);
                    resetForm();
                    alert(language === 'ar' ? "تم حفظ البيانات بنجاح" : "Data saved successfully");
                } else {
                    alert(json.error || "Failed to save city");
                }
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    const filteredVenues = venues.filter(venue =>
        (venue.name?.en || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.name?.ar || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.cityId?.name?.en || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (venue.cityId?.name?.ar || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCities = cities.filter(city =>
        (city.name?.en || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (city.name?.ar || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (city.country?.en || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (city.country?.ar || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string, type: "city" | "venue", slug?: string) => {
        const confirmMsg = language === "ar" 
            ? `هل أنت متأكد من حذف ${type === 'city' ? 'هذه المدينة' : 'هذا المكان'}؟` 
            : `Are you sure you want to delete this ${type === 'city' ? 'city' : 'venue'}?`;

        if (confirm(confirmMsg)) {
            try {
                const url = type === 'city' ? `/api/cities/${slug}` : `/api/venues/${id}`;
                const res = await fetch(url, { method: 'DELETE' });
                const json = await res.json();
                if (json.success) {
                    if (type === 'venue') {
                        setVenues(venues.filter(v => v._id !== id));
                    } else {
                        await fetchCities();
                    }
                } else {
                    alert(json.error || "Delete failed");
                }
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Delete failed");
            }
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة المدن والأماكن" : "Cities & Venues Management"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                        {language === "ar" ? `لديك ${venues.length} موقع مسجل.` : `You have ${venues.length} registered locations.`}
                    </p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 md:h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100 w-full sm:w-auto"
                    onClick={() => setIsAddOpen(true)}
                >
                    <Plus className="h-5 w-5" />
                    {language === "ar" ? "إضافة جديد" : "Add New"}
                </Button>
            </div>

            <Sheet open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-full sm:max-w-md">
                    <div className="flex flex-col h-full bg-white">
                        <SheetHeader className="p-6 border-b flex flex-row items-center justify-between space-y-0">
                            <div className="flex flex-col gap-1">
                                <SheetTitle className="text-xl font-black">
                                    {editingItem 
                                        ? (language === 'ar' ? 'تعديل' : 'Edit') 
                                        : (language === 'ar' ? 'إضافة جديد' : 'Add New')}
                                </SheetTitle>
                                {!editingItem && (
                                    <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
                                        <button
                                            onClick={() => setAddType("venue")}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${addType === "venue" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            {language === 'ar' ? 'إضافة مكان' : 'Add Venue'}
                                        </button>
                                        <button
                                            onClick={() => setAddType("city")}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${addType === "city" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            {language === 'ar' ? 'إضافة مدينة' : 'Add City'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">{addType === 'venue' ? (language === 'ar' ? 'صورة المكان' : 'Venue Image') : (language === 'ar' ? 'صورة المدينة' : 'City Image')}</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {imageUrl ? (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden group">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="rounded-xl"
                                            >
                                                {language === 'ar' ? 'تغيير' : 'Change'}
                                            </Button>
                                            {isUploading && (
                                                <div className="flex items-center gap-2 text-white">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="text-sm">Uploading...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer"
                                    >
                                        <Upload className="h-8 w-8 mb-2" />
                                        <span className="text-xs font-bold">{language === 'ar' ? 'رفع صورة بجودة عالية' : 'Upload HD image'}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {addType === "venue" ? (
                                    <>
                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم المكان (عربي)' : 'Venue Name (Arabic)'}</label>
                                            <Input
                                                value={venueNameAr}
                                                onChange={(e) => setVenueNameAr(e.target.value)}
                                                placeholder={language === 'ar' ? 'مثال: أرينا كوكا كولا' : 'e.g. Coca-Cola Arena'}
                                                className="h-12 bg-gray-50 border-none rounded-xl"
                                                dir="rtl"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم المكان (إنجليزي)' : 'Venue Name (English)'}</label>
                                            <Input
                                                value={venueName}
                                                onChange={(e) => setVenueName(e.target.value)}
                                                placeholder="e.g. Coca-Cola Arena"
                                                className="h-12 bg-gray-50 border-none rounded-xl"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'المدينة' : 'City'}</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                                                <select
                                                    value={selectedCityId}
                                                    onChange={(e) => setSelectedCityId(e.target.value)}
                                                    className="w-full h-12 bg-gray-50 border-none rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                                >
                                                    <option value="">{language === 'ar' ? 'اختر المدينة' : 'Select City'}</option>
                                                    {cities.map(city => (
                                                        <option key={city._id} value={city._id}>
                                                            {language === 'ar' ? city.name.ar : city.name.en}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 px-1">
                                                {language === 'ar' ? 'إذا لم تجد المدينة، اضغط على "إضافة مدينة" في الأعلى' : 'If city not found, click "Add City" above'}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'الموقع الجغرافي (Google Maps)' : 'Location Link'}</label>
                                            <Input
                                                value={locationLink}
                                                onChange={(e) => setLocationLink(e.target.value)}
                                                placeholder="https://maps.google.com/..."
                                                className="h-12 bg-gray-50 border-none rounded-xl"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-sm font-black text-gray-900">{language === 'ar' ? 'فئات التذاكر' : 'Ticket Categories'}</label>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={addVenueCategory}
                                                    className="text-blue-600 hover:text-blue-700 text-xs font-bold gap-1"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    {language === 'ar' ? 'إضافة فئة' : 'Add Category'}
                                                </Button>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                {venueCategories.length === 0 && (
                                                    <div className="text-center py-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                                        <p className="text-xs text-gray-400 font-medium">
                                                            {language === 'ar' ? 'لا يوجد فئات مضافة بعد' : 'No categories added yet'}
                                                        </p>
                                                    </div>
                                                )}
                                                {venueCategories.map((cat) => (
                                                    <div key={cat.id} className="bg-gray-50 p-3 rounded-2xl space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative flex-1">
                                                                <Input
                                                                    value={cat.label}
                                                                    onChange={(e) => updateVenueCategory(cat.id, "label", e.target.value)}
                                                                    placeholder={language === 'ar' ? 'اسم الفئة (مثلاً: VIP)' : 'Label (e.g. VIP)'}
                                                                    className="h-10 bg-white border-none rounded-xl text-sm pr-10"
                                                                />
                                                                <div 
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-gray-100 shadow-sm"
                                                                    style={{ backgroundColor: cat.color }}
                                                                />
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeVenueCategory(cat.id)}
                                                                className="h-10 w-10 text-red-500 hover:bg-red-50 rounded-xl shrink-0"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1">
                                                                <Input
                                                                    type="number"
                                                                    value={cat.defaultPrice}
                                                                    onChange={(e) => updateVenueCategory(cat.id, "defaultPrice", parseFloat(e.target.value) || 0)}
                                                                    placeholder={language === 'ar' ? 'السعر الافتراضي' : 'Default Price'}
                                                                    className="h-10 bg-white border-none rounded-xl text-sm"
                                                                />
                                                            </div>
                                                            <div className="w-24">
                                                                <Input
                                                                    type="color"
                                                                    value={cat.color}
                                                                    onChange={(e) => updateVenueCategory(cat.id, "color", e.target.value)}
                                                                    className="h-10 w-full p-1 bg-white border-none rounded-xl cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم المدينة (عربي)' : 'City Name (Arabic)'}</label>
                                                <Input
                                                    value={cityNameAr}
                                                    onChange={(e) => setCityNameAr(e.target.value)}
                                                    placeholder="دبي"
                                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                                    dir="rtl"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم المدينة (إنجليزي)' : 'City Name (English)'}</label>
                                                <Input
                                                    value={cityName}
                                                    onChange={(e) => setCityName(e.target.value)}
                                                    placeholder="Dubai"
                                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'الدولة (عربي)' : 'Country (Arabic)'}</label>
                                                <Input
                                                    value={countryNameAr}
                                                    onChange={(e) => setCountryNameAr(e.target.value)}
                                                    placeholder="الإمارات"
                                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                                    dir="rtl"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'الدولة (إنجليزي)' : 'Country (English)'}</label>
                                                <Input
                                                    value={countryName}
                                                    onChange={(e) => setCountryName(e.target.value)}
                                                    placeholder="UAE"
                                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'المعرف (Slug)' : 'Slug'}</label>
                                                <Input
                                                    value={citySlug}
                                                    onChange={(e) => setCitySlug(e.target.value)}
                                                    placeholder="dubai"
                                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'العلم (Emoji)' : 'Flag (Emoji)'}</label>
                                                <Input
                                                    value={cityFlag}
                                                    onChange={(e) => setCityFlag(e.target.value)}
                                                    placeholder="🇦🇪"
                                                    className="h-12 bg-gray-50 border-none rounded-xl text-center text-xl"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50/50">
                            <Button
                                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 disabled:opacity-50"
                                onClick={handleSave}
                                disabled={isSaving || isUploading}
                            >
                                {isSaving ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    language === 'ar' ? 'حفظ البيانات' : 'Save Details'
                                )}
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="bg-white p-3 md:p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "البحث بالاسم..." : "Search..."}
                        className="pl-10 h-11 md:h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-fit">
                    <button
                        onClick={() => setViewType("venues")}
                        className={`flex-1 md:px-6 py-2 text-sm font-bold rounded-xl transition-all ${viewType === "venues" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {language === 'ar' ? 'الأماكن' : 'Venues'}
                    </button>
                    <button
                        onClick={() => setViewType("cities")}
                        className={`flex-1 md:px-6 py-2 text-sm font-bold rounded-xl transition-all ${viewType === "cities" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {language === 'ar' ? 'المدن' : 'Cities'}
                    </button>
                </div>
            </div>

            {/* Content List */}
            {viewType === "venues" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredVenues.map((venue) => (
                        <div key={venue._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300">
                            <div className="relative aspect-video overflow-hidden">
                                <img 
                                    src={venue.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"} 
                                    alt={venue.name?.en}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        {language === 'ar' ? venue.name?.ar : venue.name?.en}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-white/80 text-xs mt-1">
                                        <MapPin className="w-3 h-3" />
                                        {language === 'ar' ? (venue.cityId?.name?.ar || "---") : (venue.cityId?.name?.en || "---")}
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {venue.categories?.slice(0, 3).map((cat: Category) => (
                                        <div 
                                            key={cat.id} 
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white"
                                            style={{ backgroundColor: cat.color }}
                                            title={cat.label}
                                        >
                                            {cat.label[0]}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600" onClick={() => handleEdit(venue, "venue")}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(venue._id, "venue")}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCities.map((city) => (
                        <div key={city._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img 
                                    src={city.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"} 
                                    alt={city.name?.en}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
                                    {city.flag} {language === 'ar' ? city.country?.ar : city.country?.en}
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-white font-black text-2xl leading-tight">
                                        {language === 'ar' ? city.name?.ar : city.name?.en}
                                    </h3>
                                    <p className="text-white/70 text-sm mt-1 font-medium">
                                        {city.slug}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between border-t border-gray-50">
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {venues.filter(v => (v.cityId?._id || v.cityId) === city._id).length} {language === 'ar' ? 'مكان' : 'Venues'}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-600" onClick={() => handleEdit(city, "city")}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(city._id, "city", city.slug)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function CitiesManagement() {
    return (
        <Suspense fallback={
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        }>
            <CitiesManagementContent />
        </Suspense>
    );
}
