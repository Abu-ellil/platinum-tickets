"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Send,
  MessageCircle,
  MessageSquare,
  Globe,
  X
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const translations = {
  en: {
    tagline: "Entertainment discovery and monetisation platform.",
    questions: "Do you have any questions?",
    contact_us: "Please contact us",
    support_team: "Support Team",
    we_accept: "We accept",
    download_app: "Download the app",
    social_questions: "Have any questions or suggestions? Please visit",
    support_center: "Support Center",
    add_event: "Add Event",
    about: "About us",
    organisers: "For organisers",
    services: "Services",
    partners: "For partners",
    language: "Language",
  },
  ar: {
    tagline: "منصة اكتشاف وتسويق المحتوى الترفيهي.",
    questions: "هل لديك أي أسئلة أو استفسارات أخرى؟",
    contact_us: "يسعدنا تواصلك معنا",
    support_team: "فريق الدعم",
    we_accept: "نقبل طرق الدفع التالية",
    download_app: "تحميل التطبيق",
    social_questions: "هل لديك أي أسئلة أو استفسارات أخرى؟ يرجى زيارة",
    support_center: "مركز الدعم",
    add_event: "إضافة فعالية",
    about: "من نحن",
    organisers: "للمنظمين",
    services: "الخدمات",
    partners: "للشركاء",
    language: "اللغة",
  }
};

const footerLinks = {
  en: {
    about: {
      title: "About us",
      links: [
        { label: "About Platinumlist", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact us", href: "#" },
      ]
    },
    organisers: {
      title: "For organisers",
      links: [
        { label: "List your event", href: "#" },
        { label: "Organiser Centre", href: "#" },
      ]
    },
    services: {
      title: "Services",
      links: [
        { label: "Platinumlist Live", href: "#" },
        { label: "Marketing", href: "#" },
      ]
    },
    partners: {
      title: "For partners",
      links: [
        { label: "Affiliate Program", href: "#" },
      ]
    }
  },
  ar: {
    about: {
      title: "من نحن",
      links: [
        { label: "حول بلاتينوم ليست", href: "#" },
        { label: "الوظائف", href: "#" },
        { label: "اتصل بنا", href: "#" },
      ]
    },
    organisers: {
      title: "للمنظمين",
      links: [
        { label: "أضف فعاليتك", href: "#" },
        { label: "مركز المنظمين", href: "#" },
      ]
    },
    services: {
      title: "الخدمات",
      links: [
        { label: "بلاتينوم ليست لايف", href: "#" },
        { label: "التسويق", href: "#" },
      ]
    },
    partners: {
      title: "للشركاء",
      links: [
        { label: "برنامج التسويق بالعمولة", href: "#" },
      ]
    }
  }
};

export function Footer() {
  const { language, setLanguage, dir } = useLanguage();
  const t = (key: keyof typeof translations["en"]) => translations[language][key];
  const pathname = usePathname();
  const isEventPage = pathname?.startsWith("/events/");
  const links = footerLinks[language];

  return (
    <footer className={cn(
      "bg-white pt-10 font-sans overflow-hidden border-t border-gray-100",
      isEventPage ? "pb-40" : "pb-12"
    )}>
      <div className="container mx-auto px-6 max-w-4xl text-right">
        
        {/* Top Tagline */}
        <p className="text-sm text-gray-600 mb-8 font-medium">
          {t("tagline")}
        </p>

        {/* Contact Section */}
        <div className="mb-10 flex flex-col items-center md:items-end">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center md:text-right">
            {t("questions")}
            <br />
            {t("contact_us")}
          </h3>
          <div className="flex items-center gap-3">
             <button className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
                <MessageCircle className="w-7 h-7 fill-white" />
             </button>
             <Button variant="outline" className="h-12 border-gray-900 text-gray-900 text-base font-black px-6 rounded-xl hover:bg-gray-50 flex items-center gap-2 border-2">
                <MessageSquare className="w-5 h-5" />
                {t("support_team")}
             </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-10 flex flex-col items-center md:items-end">
          <h3 className="text-sm font-bold text-gray-900 mb-4">{t("we_accept")}</h3>
          <div className="flex items-center gap-6 grayscale opacity-80">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-8 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 w-auto" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto" />
          </div>
        </div>

        {/* Links Accordion */}
        <div className="border-t border-gray-100 mb-8 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(links).map(([key, section]) => (
              <AccordionItem key={key} value={key} className="border-b-gray-100">
                <AccordionTrigger className="text-base font-black text-gray-900 hover:no-underline py-5 focus:no-underline text-right">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-right">
                  <ul className="flex flex-col gap-3 pb-3">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <Link href={link.href} className="text-gray-600 hover:text-black font-medium">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
            
            {/* Language Selector */}
            <AccordionItem value="language" className="border-b-gray-100">
               <AccordionTrigger className="text-base font-black text-gray-900 hover:no-underline py-5 text-right">
                  {language === "ar" ? "AR العربية" : "EN English"}
               </AccordionTrigger>
               <AccordionContent className="text-right">
                  <ul className="flex flex-col gap-3 pb-3">
                     <li>
                       <button 
                        onClick={() => setLanguage("ar")}
                        className={cn("text-gray-600 hover:text-black font-semibold", language === "ar" && "text-purple-600")}
                       >
                         AR العربية
                       </button>
                      </li>
                     <li>
                       <button 
                        onClick={() => setLanguage("en")}
                        className={cn("text-gray-600 hover:text-black font-semibold", language === "en" && "text-purple-600")}
                       >
                         EN English
                       </button>
                      </li>
                  </ul>
               </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Download App & Socials */}
        <div className="flex flex-col gap-8 md:items-end items-center">
          
          {/* App Badges */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-bold text-gray-900 mb-4">{t("download_app")}</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[34px] w-auto rounded-md" />
              </Link>
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-[34px] w-auto rounded-md" />
              </Link>
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Huawei_AppGallery_Badge_Black_EN.svg" alt="App Gallery" className="h-[34px] w-auto rounded-md" />
              </Link>
            </div>
          </div>

          {/* Social Icons & Bottom Text */}
          <div className="pt-4 w-full flex flex-col md:items-end items-center">
             <h3 className="text-gray-900 font-bold mb-4 text-sm text-center md:text-right">
               {t("social_questions")}
             </h3>
             <div className="flex items-center gap-6 mb-6">
                 <Link href="#" className="text-gray-400 hover:text-[#E1306C] transition-colors"><Instagram className="w-5 h-5" /></Link>
                 <Link href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook className="w-5 h-5" /></Link>
                 <Link href="#" className="text-gray-400 hover:text-black transition-colors"><X className="w-5 h-5" /></Link>
                 <Link href="#" className="text-gray-400 hover:text-[#0088cc] transition-colors"><Send className="w-5 h-5" /></Link>
             </div>
             
             <div className="flex gap-4 w-full justify-center md:justify-end">
               <Button variant="outline" className="flex-1 max-w-[180px] h-12 border-2 border-gray-900 text-gray-900 font-black rounded-xl">
                 {t("support_center")}
               </Button>
               <Button variant="outline" className="flex-1 max-w-[180px] h-12 border-2 border-gray-900 text-gray-900 font-black rounded-xl">
                 {t("add_event")}
               </Button>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
