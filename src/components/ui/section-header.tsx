import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionLink?: string;
}

export function SectionHeader({ title, subtitle, actionLabel, actionLink }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4 px-1">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionLink && (
        <Link 
          href={actionLink} 
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline transition-all"
        >
          {actionLabel}
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
