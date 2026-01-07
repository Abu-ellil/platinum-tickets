"use client";

import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Send,
  MessageCircle,
  MessageSquare
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const footerLinks = {
  about: {
    title: "About us",
    links: [
      { label: "About Platinumlist", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
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
      { label: "Ticketing System", href: "#" },
    ]
  },
  partners: {
    title: "For partners",
    links: [
      { label: "Affiliate Program", href: "#" },
      { label: "Partner Login", href: "#" },
    ]
  }
};

export function Footer() {
  return (
    <footer className="bg-white pt-10 pb-12 font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Top Tagline */}
        <p className="text-sm text-gray-600 mb-8">
          Entertainment discovery and monetisation platform.
        </p>

        {/* Contact Section */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Do you have any questions?
            <br />
            Please contact us
          </h3>
          <div className="flex items-center gap-3">
             <button className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm">
                <MessageCircle className="w-7 h-7 fill-current" />
             </button>
             <Button variant="outline" className="h-12 border-gray-300 text-gray-900 text-base font-bold px-6 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat online
             </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">We accept</h3>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-8 w-auto grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 w-auto grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto grayscale-0" />
          </div>
        </div>

        {/* Links Accordion */}
        <div className="border-t border-gray-100 mb-8">
          <Accordion type="single" collapsible className="w-full">
            {Object.values(footerLinks).map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-gray-100">
                <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline py-4">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 pb-3">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <Link href={link.href} className="text-gray-600 hover:text-black">
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
               <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline py-4">
                  EN English
               </AccordionTrigger>
               <AccordionContent>
                  <ul className="flex flex-col gap-3 pb-3">
                     <li><button className="text-gray-600 hover:text-black font-semibold">AR العربية</button></li>
                     <li><button className="text-black font-semibold">EN English</button></li>
                  </ul>
               </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Download App & Socials */}
        <div className="flex flex-col gap-6">
          
          {/* App Badges */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Download the app</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-full w-auto" />
              </Link>
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-full w-auto" />
              </Link>
              <Link href="#" className="h-9">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Huawei_AppGallery_Badge_Black_EN.svg" alt="AppGallery" className="h-full w-auto" />
              </Link>
            </div>
          </div>

          {/* Social Icons & Bottom Text */}
          <div className="mt-4 pt-4">
             <h3 className="text-gray-900 font-bold mb-3 text-sm">Do you have any questions?</h3>
             <div className="flex items-center gap-6 text-gray-400">
                 <Link href="#" className="hover:text-gray-600 transition-colors"><Send className="w-5 h-5" /></Link>
                 <Link href="#" className="hover:text-gray-600 transition-colors"><Twitter className="w-5 h-5" /></Link>
                 <Link href="#" className="hover:text-gray-600 transition-colors"><Facebook className="w-5 h-5" /></Link>
                 <Link href="#" className="hover:text-gray-600 transition-colors"><Instagram className="w-5 h-5" /></Link>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
