import React from "react";
import { Phone, Mail, MapPin, UserCheck, ExternalLink } from "lucide-react";
import { ContactInfo } from "@/lib/knowledgeBase";

interface ContactCardProps {
  contact?: ContactInfo;
  title?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, title = "Official Contact Information" }) => {
  if (!contact) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="mb-2 flex items-center gap-1.5 font-semibold text-dsc-navy">
        <UserCheck className="h-4 w-4 text-dsc-blue" />
        <span className="text-sm">{title}</span>
      </div>

      <div className="space-y-2 text-xs">
        {contact.name && (
          <div className="font-bold text-slate-800 text-sm">{contact.name}</div>
        )}
        {contact.role && (
          <div className="text-slate-600 font-medium">{contact.role}</div>
        )}

        {contact.phone && (
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
            <span className="font-mono">{contact.phone}</span>
          </div>
        )}

        {contact.email && (
          <div className="flex items-center gap-2 text-slate-700">
            <Mail className="h-3.5 w-3.5 flex-shrink-0 text-blue-600" />
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 hover:underline hover:text-blue-800 font-medium"
            >
              {contact.email}
            </a>
          </div>
        )}

        {contact.address && (
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-rose-500" />
            <span className="leading-snug">{contact.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};
