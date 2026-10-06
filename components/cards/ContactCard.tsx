import React from "react";
import { Mail, MapPin, Phone, UserCheck } from "lucide-react";
import { ContactInfo } from "@/lib/knowledgeBase";

interface ContactCardProps {
  contact?: ContactInfo;
  title?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  title = "Official Contact Information",
}) => {
  if (!contact) return null;

  return (
    <div className="mt-3 border-2 border-black bg-white shadow-brutal-sm">
      <div className="brutal-strip">
        <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest">
          <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{title}</span>
        </span>
      </div>

      <div className="space-y-2.5 p-3.5">
        {contact.name && (
          <div className="font-display text-base font-extrabold text-brand-charcoal">
            {contact.name}
          </div>
        )}
        {contact.role && (
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {contact.role}
          </div>
        )}

        <ul className="space-y-2 text-xs sm:text-sm">
          {contact.phone && (
            <li className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black bg-emerald-400">
                <Phone className="h-2.5 w-2.5 text-black" aria-hidden="true" />
              </span>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-mono font-bold text-brand-charcoal hover:underline">
                {contact.phone}
              </a>
            </li>
          )}

          {contact.email && (
            <li className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black bg-brand-yellow">
                <Mail className="h-2.5 w-2.5 text-black" aria-hidden="true" />
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="break-all font-semibold text-brand-charcoal underline decoration-2 underline-offset-2 hover:bg-brand-yellow"
              >
                {contact.email}
              </a>
            </li>
          )}

          {contact.address && (
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black bg-brand-sage">
                <MapPin className="h-2.5 w-2.5 text-black" aria-hidden="true" />
              </span>
              <span className="leading-snug text-slate-700">{contact.address}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
