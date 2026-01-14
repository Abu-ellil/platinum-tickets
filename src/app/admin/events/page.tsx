"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Calendar,
    MapPin,
    Home,
    Eye,
    Upload,
    X,
    Clock,
    Tag,
    DollarSign,
    Image as ImageIcon,
    Check,
    Loader2
} from "lucide-react";

import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface ShowTime {
    id: string;
    date: string;
    time: string;
}

interface CategoryPrice {
    categoryId: string;
    label: string;
    price: number;
    color: string;
}

interface IEvent {
    _id: string;
    title: string;
    date: string;
    venueId?: { _id: string; name: any };
    venueName?: string;
    description?: string;
    cityId: { _id: string; name: any };
    image: string;
    pricing: { price: number }[];
    currency: string;
    status: string;
    type: string;
    showTimes: { date: string }[];
}

export default function EventsManagement() {
    const { language, dir } = useLanguage();
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // Data for dropdowns
    const [cities, setCities] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");

    // Form state
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedVenue, setSelectedVenue] = useState("");
    const [venueInput, setVenueInput] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("concert");
    const [eventTitle, setEventTitle] = useState("");
    const [showTimes, setShowTimes] = useState<ShowTime[]>([{ id: "1", date: "", time: "" }]);
    const [categoryPrices, setCategoryPrices] = useState<CategoryPrice[]>([]);
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [currency, setCurrency] = useState("EGP");
    const [isSaving, setIsSaving] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial Fetch
    useEffect(() => {
        fetchEvents();
        fetchCities();
        fetchCategories();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/events?limit=1000&status=all');
            const json = await res.json();
            if (json.success) {
                setEvents(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const json = await res.json();
            if (json.success) {
                setCategories(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    // When city changes
    const handleCityChange = async (cityId: string) => {
        setSelectedCity(cityId);
        setSelectedVenue("");
        setVenueInput("");
        setEventDescription("");
        setVenues([]);
        setCategoryPrices([]);

        if (!cityId) return;

        // Fetch venues for this city
        try {
            const res = await fetch(`/api/venues?cityId=${cityId}`);
            const json = await res.json();
            if (json.success) {
                setVenues(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch venues:", error);
        }
    };

    // When venue changes
    const handleVenueChange = (venueId: string) => {
        setSelectedVenue(venueId);
        const venue = venues.find(v => v._id === venueId);
        
        if (venue && venue.categories) {
            setCategoryPrices(venue.categories.map((cat: any) => ({
                categoryId: cat.id,
                label: cat.label,
                price: cat.defaultPrice || 0,
                color: cat.color || '#3b82f6'
            })));
        } else {
            setCategoryPrices([]);
        }
    };

    // Add show time
    const addShowTime = () => {
        setShowTimes([...showTimes, { id: Date.now().toString(), date: "", time: "" }]);
    };

    // Remove show time
    const removeShowTime = (id: string) => {
        if (showTimes.length > 1) {
            setShowTimes(showTimes.filter(st => st.id !== id));
        }
    };

    // Update show time
    const updateShowTime = (id: string, field: "date" | "time", value: string) => {
        setShowTimes(showTimes.map(st => st.id === id ? { ...st, [field]: value } : st));
    };

    // Update category price
    const updateCategoryPrice = (categoryId: string, price: number) => {
        setCategoryPrices(categoryPrices.map(cp =>
            cp.categoryId === categoryId ? { ...cp, price } : cp
        ));
    };

    // Handle image selection
    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        // Create local preview URL
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

    // Reset form
    const resetForm = () => {
        setSelectedCity("");
        setSelectedVenue("");
        setVenueInput("");
        setEventDescription("");
        setVenues([]);
        setEventType("concert");
        setEventTitle("");
        setShowTimes([{ id: "1", date: "", time: "" }]);
        setCategoryPrices([]);
        setImageUrl("");
        setImageFile(null);
        setCurrency("EGP");
    };

    // Save event
    const handleSaveEvent = async () => {
        if (!imageUrl) {
            alert(language === 'ar' ? "يرجى رفع صورة للفعالية" : "Please upload an event image");
            return;
        }

        if (!venueInput && !selectedVenue) {
            alert(language === 'ar' ? "يرجى ادخال مكان الفعالية" : "Please enter an event venue");
            return;
        }

        if (isUploading) {
            alert(language === 'ar' ? "يرجى الانتظار حتى ينتهي رفع الصورة" : "Please wait for the image to finish uploading");
            return;
        }

        setIsSaving(true);
        try {
            // Construct payload 
            const payload = {
                title: eventTitle,
                cityId: selectedCity,
                venueId: selectedVenue || undefined,
                venueName: !selectedVenue ? venueInput : undefined,
                description: eventDescription,
                showTimes: showTimes.map(st => ({
                    date: new Date(`${st.date}T${st.time}`),
                    time: st.time
                })),
                pricing: categoryPrices.filter(cp => cp.price > 0).map(cp => ({
                    categoryId: cp.categoryId,
                    price: cp.price
                })),
                image: imageUrl || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
                currency: currency,
                status: 'active',
                type: eventType,
                featured: false,
            };

            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                setEvents([data.data, ...events]);
                resetForm();
                setIsAddOpen(false);
            } else {
                alert("Failed to save event: " + (data.error || "Unknown error"));
            }

        } catch (error) {
            console.error("Error saving event:", error);
            alert("Error saving event");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفعالية؟" : "Are you sure you want to delete this event?")) {
            const oldEvents = events;
            setEvents(events.filter(e => e._id !== id));

            try {
                console.warn("DELETE not persisted to DB yet (endpoint missing)");
                // Placeholder for delete API call
                // await fetch(`/api/events/${id}`, { method: 'DELETE' });
            } catch (e) {
                setEvents(oldEvents);
                alert("Failed to delete");
            }
        }
    };

    const filteredEvents = events.filter(event => {
        const titleMatch = (event.title || "").toLowerCase().includes(searchTerm.toLowerCase());
        const venueNameStr = event.venueId?.name?.[language] || event.venueName || "";
        const cityNameStr = event.cityId?.name?.[language] || "";
        const locationMatch = venueNameStr.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             cityNameStr.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || locationMatch;
    });

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                        {language === "ar" ? "إدارة الفعاليات" : "Events Management"}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">
                        {language === "ar" ? `إجمالي ${events.length} فعالية نشطة.` : `${events.length} active events.`}
                    </p>
                </div>

                <Sheet open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
                    <SheetTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 md:h-12 px-5 md:px-6 rounded-2xl gap-2 shadow-lg shadow-blue-100 w-full sm:w-auto">
                            <Plus className="h-5 w-5" />
                            {language === "ar" ? "إضافة فعالية" : "Add Event"}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 border-none w-full sm:max-w-lg overflow-hidden">
                        <div className="flex flex-col h-full bg-white">
                            <SheetHeader className="p-6 border-b flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white space-y-0">
                                <SheetTitle className="text-xl font-black text-white">{language === 'ar' ? 'إضافة فعالية جديدة' : 'Add New Event'}</SheetTitle>
                                <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full text-white hover:bg-white/20">
                                    <X className="h-5 w-5" />
                                </Button>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4" />
                                        {language === 'ar' ? 'صورة الفعالية' : 'Event Image'}
                                    </label>
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
                                            <span className="text-xs font-bold">{language === 'ar' ? 'اضغط لرفع الصورة' : 'Click to upload image'}</span>
                                        </div>
                                    )}
                                </div>

                                {/* City Selection */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {language === 'ar' ? 'المدينة' : 'City'}
                                        </label>
                                        <select
                                            value={selectedCity}
                                            onChange={(e) => handleCityChange(e.target.value)}
                                            className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-none"
                                        >
                                            <option value="">{language === 'ar' ? 'اختر المدينة...' : 'Select city...'}</option>
                                            {cities.map(city => (
                                                <option key={city._id} value={city._id}>
                                                    {language === 'ar' ? (city.name?.ar || '---') : (city.name?.en || '---')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Home className="h-4 w-4" />
                                            {language === 'ar' ? 'المكان' : 'Venue'}
                                        </label>
                                        <input
                                            list="venues-list"
                                            value={venueInput}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setVenueInput(val);
                                                const venue = venues.find(v => v.name.en === val || v.name.ar === val);
                                                if (venue) {
                                                    setSelectedVenue(venue._id);
                                                    if (venue.categories) {
                                                        setCategoryPrices(venue.categories.map((cat: any) => ({
                                                            categoryId: cat.id,
                                                            label: cat.label,
                                                            price: cat.defaultPrice || 0,
                                                            color: cat.color || '#3b82f6'
                                                        })));
                                                    }
                                                } else {
                                                    setSelectedVenue("");
                                                }
                                            }}
                                            disabled={!selectedCity}
                                            placeholder={language === 'ar' ? 'اكتب اسم المكان...' : 'Type venue name...'}
                                            className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-none disabled:opacity-50"
                                        />
                                        <datalist id="venues-list">
                                            {venues.map(venue => (
                                                <option key={venue._id} value={language === 'ar' ? venue.name.ar : venue.name.en} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            {language === 'ar' ? 'نوع الفعالية' : 'Event Type'}
                                        </label>
                                        <select
                                            value={eventType}
                                            onChange={(e) => setEventType(e.target.value)}
                                            className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-none"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat._id} value={cat.slug}>
                                                    {language === 'ar' ? cat.label?.ar : cat.label?.en}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Event Title */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم الفعالية' : 'Event Title'}</label>
                                        <Input
                                            value={eventTitle}
                                            onChange={(e) => setEventTitle(e.target.value)}
                                            placeholder={language === 'ar' ? 'اسم الفعالية...' : 'Event Title...'}
                                            className="h-12 bg-gray-50 border-none rounded-xl"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'وصف الفعالية' : 'Event Description'}</label>
                                        <textarea
                                            value={eventDescription}
                                            onChange={(e) => setEventDescription(e.target.value)}
                                            placeholder={language === 'ar' ? 'وصف الفعالية هنا...' : 'Event description here...'}
                                            className="w-full min-h-[120px] p-4 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                {/* Show Times */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            {language === 'ar' ? 'أوقات العرض' : 'Show Times'}
                                        </label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={addShowTime}
                                            className="text-blue-600 hover:text-blue-700 text-xs"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            {language === 'ar' ? 'إضافة وقت' : 'Add Time'}
                                        </Button>
                                    </div>
                                    {showTimes.map((st, index) => (
                                        <div key={st.id} className="flex gap-2 items-center">
                                            <Input
                                                type="date"
                                                value={st.date}
                                                onChange={(e) => updateShowTime(st.id, "date", e.target.value)}
                                                className="h-11 bg-gray-50 border-none rounded-xl flex-1"
                                            />
                                            <Input
                                                type="time"
                                                value={st.time}
                                                onChange={(e) => updateShowTime(st.id, "time", e.target.value)}
                                                className="h-11 bg-gray-50 border-none rounded-xl w-28"
                                            />
                                            {showTimes.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeShowTime(st.id)}
                                                    className="h-11 w-11 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Category Pricing */}
                                {categoryPrices.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <DollarSign className="h-4 w-4" />
                                                {language === 'ar' ? 'أسعار التذاكر' : 'Ticket Prices'}
                                            </label>
                                            <select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                className="h-9 px-3 rounded-lg bg-gray-100 text-sm font-medium"
                                            >
                                                <option value="EGP">EGP</option>
                                                <option value="SAR">SAR</option>
                                                <option value="AED">AED</option>
                                                <option value="QAR">QAR</option>
                                                <option value="BHD">BHD</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            {categoryPrices.map(cp => (
                                                <div key={cp.categoryId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                    <span
                                                        className="w-4 h-4 rounded-sm shrink-0"
                                                        style={{ backgroundColor: cp.color }}
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 flex-1">{cp.label}</span>
                                                    <Input
                                                        type="number"
                                                        value={cp.price}
                                                        onChange={(e) => updateCategoryPrice(cp.categoryId, parseFloat(e.target.value) || 0)}
                                                        className="h-9 w-28 bg-white border border-gray-200 rounded-lg text-right"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t bg-gray-50/50 space-y-3">
                                <Button
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 gap-2"
                                    onClick={handleSaveEvent}
                                    disabled={!selectedCity || !eventTitle || isUploading || isSaving}
                                >
                                    {isUploading || isSaving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                                        </>
                                    ) : (
                                        <>
                                            <Check className="h-5 w-5" />
                                            {language === 'ar' ? 'حفظ الفعالية' : 'Save Event'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-3 md:p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3 md:space-y-0 md:flex md:gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder={language === "ar" ? "البحث بالاسم أو المكان..." : "Search..."}
                        className="pl-10 h-11 md:h-12 bg-gray-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-400 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 px-4 rounded-2xl gap-2 border-gray-200 text-sm">
                        <Filter className="h-4 w-4" />
                        {language === "ar" ? "تصفية" : "Filter"}
                    </Button>
                </div>
            </div>

            {/* Events Table / Card View for Mobile */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center p-12 text-gray-400">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse" dir={dir}>
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                                    <th className="px-6 py-4">{language === "ar" ? "الفعالية" : "Event"}</th>
                                    <th className="px-6 py-4">{language === "ar" ? "التاريخ" : "Date"}</th>
                                    <th className="px-6 py-4">{language === "ar" ? "المكان" : "Venue"}</th>
                                    <th className="px-6 py-4">{language === "ar" ? "السعر" : "Price"}</th>
                                    <th className="px-6 py-4">{language === "ar" ? "الحالة" : "Status"}</th>
                                    <th className="px-6 py-4 text-right">{language === "ar" ? "إجراءات" : "Actions"}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredEvents.map((event) => (
                                    <tr key={event._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={event.image} alt="" className="h-10 w-16 object-cover rounded-xl shadow-sm" />
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 truncate max-w-[200px]">{event.title || '---'}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase font-black">{event.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="h-4 w-4" />
                                                <span className="text-sm">
                                                    {event.showTimes?.[0]?.date
                                                        ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')
                                                        : '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm truncate max-w-[150px]">
                                                    {event.venueId?.name?.[language] || event.venueName || '---'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {event.pricing?.[0]?.price} {event.currency}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${event.status === 'soldOut' ? 'bg-red-50 text-red-600' :
                                                event.status === 'draft' ? 'bg-gray-50 text-gray-600' :
                                                    'bg-green-50 text-green-600'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => handleDelete(event._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Mobile List View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {loading ? (
                        <div className="flex items-center justify-center p-12 text-gray-400">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        filteredEvents.map((event) => (
                            <div key={event._id} className="p-4 space-y-4">
                                <div className="flex gap-4">
                                    <img src={event.image} alt="" className="h-16 w-16 object-cover rounded-2xl shadow-sm" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-900 truncate leading-tight mb-1">{event.title || '---'}</h3>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">{event.type}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg -mt-1 text-gray-400">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl border-gray-100 p-2 min-w-[160px]">
                                                    <DropdownMenuItem className="gap-3 py-3 rounded-xl focus:bg-gray-50 cursor-pointer text-sm font-medium">
                                                        <Edit2 className="h-4 w-4 text-gray-400" />
                                                        {language === 'ar' ? 'تعديل' : 'Edit'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-3 py-3 rounded-xl focus:bg-gray-50 cursor-pointer text-sm font-medium">
                                                        <Eye className="h-4 w-4 text-gray-400" />
                                                        {language === 'ar' ? 'مشاهدة' : 'View'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-3 py-3 rounded-xl focus:bg-red-50 focus:text-red-600 cursor-pointer text-sm font-medium text-red-600"
                                                        onClick={() => handleDelete(event._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        {language === 'ar' ? 'حذف' : 'Delete'}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-xl">
                                        <Calendar className="h-3 w-3" />
                                        <span className="truncate">
                                            {event.showTimes?.[0]?.date
                                                ? new Date(event.showTimes[0].date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-xl">
                                        <MapPin className="h-3 w-3" />
                                        <span className="truncate">
                                            {event.venueId?.name?.[language] || event.venueName || '---'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <p className="font-black text-gray-900">{event.pricing?.[0]?.price} {event.currency}</p>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${event.status === 'soldOut' ? 'bg-red-50 text-red-600' :
                                        event.status === 'draft' ? 'bg-gray-50 text-gray-600' :
                                            'bg-green-50 text-green-600'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap- gap-4 text-sm text-gray-500">
                    <p className="text-xs md:text-sm">{language === 'ar' ? `عرض 1-${events.length} من ${events.length}` : `Showing 1-${events.length} of ${events.length}`}</p>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9 rounded-xl" disabled>{language === 'ar' ? 'السابق' : 'Prev'}</Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9 rounded-xl">{language === 'ar' ? 'التالي' : 'Next'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
