"use client";

import { useState, useRef, useCallback } from "react";
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
    Eye,
    Upload,
    X,
    Clock,
    DollarSign,
    Image as ImageIcon,
    Check,
    Loader2
} from "lucide-react";
import { EVENTS, Event } from "@/lib/data";
import { CITIES, VENUES_REGISTRY, getVenuesByCity, getCategoryConfig, VenueInfo } from "@/lib/venues-registry";
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

export default function EventsManagement() {
    const { language, dir } = useLanguage();
    const [events, setEvents] = useState<Event[]>(EVENTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Form state
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedVenue, setSelectedVenue] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [eventTitleAr, setEventTitleAr] = useState("");
    const [showTimes, setShowTimes] = useState<ShowTime[]>([{ id: "1", date: "", time: "" }]);
    const [categoryPrices, setCategoryPrices] = useState<CategoryPrice[]>([]);
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [currency, setCurrency] = useState("EGP");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get venues filtered by selected city
    const availableVenues = selectedCity ? getVenuesByCity(selectedCity) : [];

    // Update category prices when venue changes
    const handleVenueChange = (venueId: string) => {
        setSelectedVenue(venueId);
        const venue = VENUES_REGISTRY.find(v => v.id === venueId);
        if (venue) {
            const categories = getCategoryConfig(venue.theaterId);
            const prices: CategoryPrice[] = Object.entries(categories).map(([id, config]) => ({
                categoryId: id,
                label: config.label,
                price: config.price,
                color: config.color,
            }));
            setCategoryPrices(prices);
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
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);
    };

    // Upload image to Cloudinary
    const handleImageUpload = async () => {
        if (!imageFile) return;

        setIsUploading(true);
        try {
            const result = await uploadToCloudinary(imageFile);
            if (result.secure_url) {
                setImageUrl(result.secure_url);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setSelectedCity("");
        setSelectedVenue("");
        setEventTitle("");
        setEventTitleAr("");
        setShowTimes([{ id: "1", date: "", time: "" }]);
        setCategoryPrices([]);
        setImageUrl("");
        setImageFile(null);
        setCurrency("EGP");
    };

    // Save event
    const handleSaveEvent = async () => {
        // Upload image first if not already uploaded
        if (imageFile && !imageUrl.startsWith("https://res.cloudinary")) {
            await handleImageUpload();
        }

        // Create new event
        const venue = VENUES_REGISTRY.find(v => v.id === selectedVenue);
        const newEvent: Event = {
            id: Date.now().toString(),
            title: eventTitleAr || eventTitle,
            date: showTimes[0]?.date || "",
            venue: venue?.name.ar || venue?.name.en || "",
            price: categoryPrices[0]?.price || 0,
            currency: currency as Event["currency"],
            image: imageUrl || "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
            category: "New",
            type: "concert",
        };

        setEvents([newEvent, ...events]);
        resetForm();
        setIsAddOpen(false);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفعالية؟" : "Are you sure you want to delete this event?")) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

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
                            <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                <h2 className="text-xl font-black">{language === 'ar' ? 'إضافة فعالية جديدة' : 'Add New Event'}</h2>
                                <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="rounded-full text-white hover:bg-white/20">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

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
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {language === 'ar' ? 'المدينة' : 'City'}
                                    </label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => { setSelectedCity(e.target.value); setSelectedVenue(""); setCategoryPrices([]); }}
                                        className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-none"
                                    >
                                        <option value="">{language === 'ar' ? 'اختر المدينة...' : 'Select city...'}</option>
                                        {CITIES.map(city => (
                                            <option key={city.id} value={city.id}>
                                                {language === 'ar' ? city.name.ar : city.name.en}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Venue Selection */}
                                {selectedCity && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {language === 'ar' ? 'المسرح / القاعة' : 'Venue / Theater'}
                                        </label>
                                        <select
                                            value={selectedVenue}
                                            onChange={(e) => handleVenueChange(e.target.value)}
                                            className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-none"
                                        >
                                            <option value="">{language === 'ar' ? 'اختر المسرح...' : 'Select venue...'}</option>
                                            {availableVenues.map(venue => (
                                                <option key={venue.id} value={venue.id}>
                                                    {language === 'ar' ? venue.name.ar : venue.name.en}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Event Title */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم الفعالية (عربي)' : 'Event Title (Arabic)'}</label>
                                        <Input
                                            value={eventTitleAr}
                                            onChange={(e) => setEventTitleAr(e.target.value)}
                                            placeholder="حفلة تامر حسني"
                                            className="h-12 bg-gray-50 border-none rounded-xl"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 block mb-1.5">{language === 'ar' ? 'اسم الفعالية (إنجليزي)' : 'Event Title (English)'}</label>
                                        <Input
                                            value={eventTitle}
                                            onChange={(e) => setEventTitle(e.target.value)}
                                            placeholder="Tamer Hosny Concert"
                                            className="h-12 bg-gray-50 border-none rounded-xl"
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
                                    disabled={!selectedVenue || !eventTitleAr || isUploading}
                                >
                                    {isUploading ? (
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
                                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={event.image} alt="" className="h-10 w-16 object-cover rounded-xl shadow-sm" />
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 truncate max-w-[200px]">{event.title}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-black">{event.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">{event.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm truncate max-w-[150px]">{event.venue}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {event.price} {event.currency}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${event.category === 'Sold Out' ? 'bg-red-50 text-red-600' :
                                            event.category === 'Popular' ? 'bg-orange-50 text-orange-600' :
                                                'bg-green-50 text-green-600'
                                            }`}>
                                            {event.category || (language === 'ar' ? 'نشط' : 'Active')}
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
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="p-4 space-y-4">
                            <div className="flex gap-4">
                                <img src={event.image} alt="" className="h-16 w-16 object-cover rounded-2xl shadow-sm" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 truncate leading-tight mb-1">{event.title}</h3>
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
                                                    onClick={() => handleDelete(event.id)}
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
                                    <span className="truncate">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-2 rounded-xl">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate">{event.venue}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <p className="font-black text-gray-900">{event.price} {event.currency}</p>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${event.category === 'Sold Out' ? 'bg-red-50 text-red-600' :
                                    event.category === 'Popular' ? 'bg-orange-50 text-orange-600' :
                                        'bg-green-50 text-green-600'
                                    }`}>
                                    {event.category || (language === 'ar' ? 'نشط' : 'Active')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap- gap-4 text-sm text-gray-500">
                    <p className="text-xs md:text-sm">{language === 'ar' ? 'عرض 1-10 من 24' : 'Showing 1-10 of 24'}</p>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9 rounded-xl" disabled>{language === 'ar' ? 'السابق' : 'Prev'}</Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-9 rounded-xl">{language === 'ar' ? 'التالي' : 'Next'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
