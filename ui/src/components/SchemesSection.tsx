import React from "react";

/**
 * ── SCHEMES SECTION ──────────────────────────────────────────────
 * Matches the reference image: dark cards in a grid, each with an
 * icon, scheme name, short description, an eligibility/status tag,
 * and a primary action button.
 *
 * Drop this into src/components/SchemesSection.tsx and render it
 * wherever your existing "Schemes" tab currently lives.
 * ------------------------------------------------------------------
 */

export type SchemeStatus = "eligible" | "check" | "not-eligible";

export interface Scheme {
  id: string;
  name: string;
  description: string;
  status: SchemeStatus;
  amount: string;
  icon: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  status: "available" | "missing";
}

const defaultSchemes: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-Kisan Samman Nidhi",
    description: "Income support of ₹6,000/year for eligible farmer families.",
    status: "eligible",
    amount: "₹6,000/yr",
    icon: "🌾",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PMJAY)",
    description: "Health cover up to ₹5 lakh per family per year.",
    status: "check",
    amount: "₹5,00,000",
    icon: "🏥",
  },
  {
    id: "ujjwala",
    name: "PM Ujjwala Yojana",
    description: "Free LPG connection for women from BPL households.",
    status: "eligible",
    amount: "Free connection",
    icon: "🔥",
  },
];

const statusConfig: Record<SchemeStatus, { label: string; bg: string; text: string; dot: string }> = {
  eligible: { label: "Eligible", bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  check: { label: "Check Eligibility", bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
  "not-eligible": { label: "Not Eligible", bg: "bg-rose-500/15", text: "text-rose-400", dot: "bg-rose-400" },
};

interface SchemeCardProps {
  scheme: Scheme;
}

function SchemeCard({ scheme }: SchemeCardProps) {
  const cfg = statusConfig[scheme.status] ?? statusConfig.check;

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#141420] p-5 transition hover:border-white/20 hover:bg-[#181826]">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl">
          {scheme.icon}
        </div>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">{scheme.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/50">{scheme.description}</p>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <p className="text-xs text-white/40">Benefit</p>
          <p className="text-sm font-medium text-white">{scheme.amount}</p>
        </div>
        <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90">
          View Details
        </button>
      </div>
    </div>
  );
}

interface SchemesSectionProps {
  schemes?: Scheme[];
}

export function SchemesSection({ schemes = defaultSchemes }: SchemesSectionProps) {
  return (
    <section className="w-full bg-[#0a0a0f] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Government Schemes</h2>
            <p className="mt-1 text-sm text-white/40">Based on the documents you've uploaded</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ── AVAILABLE DOCUMENTS (not "missing documents") ────────────────
 * Only render documents that ARE present. Do not enumerate every
 * possible missing document — with a long master list that gets
 * noisy and discouraging. Just filter to what's actually available.
 * ------------------------------------------------------------------
 */

interface AvailableDocumentsProps {
  documents?: DocumentItem[];
}

export function AvailableDocuments({ documents = [] }: AvailableDocumentsProps) {
  const available = documents.filter((d) => d.status === "available");

  if (available.length === 0) {
    return <p className="text-sm text-white/40">No documents uploaded yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {available.map((doc) => (
        <span
          key={doc.id}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {doc.name}
        </span>
      ))}
    </div>
  );
}

export default SchemesSection;
