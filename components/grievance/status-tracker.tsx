"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Tag,
  FileText,
  CalendarDays,
  RefreshCcw,
  Building2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ComplaintStatus = "pending" | "inProgress" | "resolved" | "rejected";

interface Complaint {
  id: string;
  name: string;
  type: string;
  description: string;
  status: ComplaintStatus;
  submittedDate: string;
  lastUpdated: string;
  assignedTo: string;
}

type SearchState = "idle" | "searching" | "found" | "notFound" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ComplaintStatus,
  { icon: React.ElementType; bg: string; text: string; border: string; dot: string }
> = {
  pending:    { icon: Clock,         bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-400"  },
  inProgress: { icon: AlertCircle,   bg: "bg-blue-50",    text: "text-blue-700",   border: "border-blue-200",   dot: "bg-blue-400"   },
  resolved:   { icon: CheckCircle2,  bg: "bg-primary/5", text: "text-primary",border: "border-primary/20",dot: "bg-primary" },
  rejected:   { icon: XCircle,       bg: "bg-red-50",     text: "text-red-700",    border: "border-red-200",    dot: "bg-red-400"    },
};

// Mock — replace with real API call
const MOCK_COMPLAINT: Complaint = {
  id: "",
  name: "John Doe",
  type: "Water Supply",
  description: "Water supply has been interrupted for 3 days in our area.",
  status: "inProgress",
  submittedDate: "2023-06-15",
  lastUpdated: "2023-06-18",
  assignedTo: "Water Department",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status, t }: { status: ComplaintStatus; t: (k: string) => string }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <Badge
      className={`${cfg.bg} ${cfg.text} ${cfg.border} border text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0`} />
      <cfg.icon className="h-3 w-3 flex-shrink-0" />
      {t(status)}
    </Badge>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
      <div className="w-8 h-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide">
          {label}
        </p>
        <p className={`text-xs sm:text-sm text-gray-800 font-medium mt-0.5 leading-snug ${mono ? "font-mono" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const StatusTracker = () => {
  const { t } = useLanguage();

  const [referenceId, setReferenceId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [searchState, setSearchState] = useState<SearchState>("idle");

  const handleSearch = useCallback(async () => {
    const trimmed = referenceId.trim();
    if (!trimmed) return;

    setSearchState("searching");
    setComplaint(null);

    try {
      const res = await fetch(`/api/complaints/${trimmed}`);
      if (!res.ok) {
        if (res.status === 404) {
          setSearchState("notFound");
        } else {
          setSearchState("error");
        }
        return;
      }

      const data = await res.json();

      setComplaint({
        id: data.referenceId,
        name: data.fullName,
        type: data.complaintType,
        description: data.description,
        status: data.status,
        submittedDate: data.createdAt,
        lastUpdated: data.updatedAt,
        assignedTo: data.assignedTo,
      });
      setSearchState("found");
    } catch {
      setSearchState("error");
    }
  }, [referenceId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setReferenceId("");
    setComplaint(null);
    setSearchState("idle");
  };

  const isSearching = searchState === "searching";

  return (
    <Card className="border border-primary/10 shadow-lg overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />

      <CardHeader className="px-4 sm:px-6 pt-5 pb-3">
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
          {t("trackStatus")}
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
          {t("trackStatusSubtitle") || "Enter your reference ID to check complaint status."}
        </p>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-6 space-y-5">

        {/* ── Search ──────────────────────────────────────────────────── */}
        <div className="space-y-1.5">
          <Label htmlFor="referenceId" className="text-xs sm:text-sm font-semibold text-gray-700">
            {t("referenceId") || "Reference ID"}
          </Label>
          <div className="flex gap-2">
            <Input
              id="referenceId"
              type="text"
              value={referenceId}
              onChange={(e) => {
                setReferenceId(e.target.value.toUpperCase());
                if (searchState !== "idle") setSearchState("idle");
                if (complaint) setComplaint(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. GP123456"
              disabled={isSearching}
              maxLength={12}
              className="flex-1 h-10 sm:h-11 text-sm font-mono border-gray-200 focus:border-primary focus:ring-primary uppercase"
              aria-label={t("referenceId")}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !referenceId.trim()}
              className="h-10 sm:h-11 px-4 bg-primary hover:bg-primary text-white rounded-lg flex-shrink-0"
              aria-label={t("searchComplaint")}
            >
              {isSearching ? (
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-gray-400">
            {t("referenceIdHint") || "Reference ID was provided when you submitted your complaint."}
          </p>
        </div>

        {/* ── Not Found ───────────────────────────────────────────────── */}
        {searchState === "notFound" && (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">
              {t("noComplaintFound") || "No complaint found with this reference ID."}
            </p>
            <p className="text-xs text-gray-400">
              {t("checkIdHint") || "Please double-check the ID and try again."}
            </p>
          </div>
        )}

        {/* ── Error ───────────────────────────────────────────────────── */}
        {searchState === "error" && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {t("searchError") || "Something went wrong. Please try again."}
          </div>
        )}

        {/* ── Result ──────────────────────────────────────────────────── */}
        {complaint && searchState === "found" && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-800">
                  {t("complaintDetails") || "Complaint Details"}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
                  #{complaint.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={complaint.status} t={t} />
                <button
                  onClick={handleReset}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                  aria-label="Clear and search again"
                  title={t("searchAgain")}
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Detail rows */}
            <div className="space-y-2">
              <DetailRow icon={User}       label={t("name") || "Name"}          value={complaint.name} />
              <DetailRow icon={Tag}        label={t("complaintType") || "Type"}  value={complaint.type} />
              <DetailRow icon={FileText}   label={t("description") || "Description"} value={complaint.description} />
              <DetailRow icon={Building2}  label={t("assignedTo") || "Assigned To"} value={complaint.assignedTo} />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-2">
              <DetailRow
                icon={CalendarDays}
                label={t("submitted") || "Submitted"}
                value={formatDate(complaint.submittedDate)}
              />
              <DetailRow
                icon={CalendarDays}
                label={t("lastUpdated") || "Last Updated"}
                value={formatDate(complaint.lastUpdated)}
              />
            </div>

            {/* Status timeline hint */}
            <div className="flex items-center justify-between gap-1 mt-1">
              {(["pending", "inProgress", "resolved"] as ComplaintStatus[]).map((s, i, arr) => {
                const cfg = STATUS_CONFIG[s];
                const isActive =
                  complaint.status === s ||
                  (complaint.status === "resolved" && s !== "rejected") ||
                  (complaint.status === "inProgress" && i < arr.indexOf("inProgress") + 1) ||
                  (complaint.status === "pending" && i === 0);
                const isPast =
                  (complaint.status === "inProgress" && s === "pending") ||
                  complaint.status === "resolved";
                return (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                        complaint.status === s
                          ? `${cfg.bg} ${cfg.border} ${cfg.text}`
                          : isPast
                          ? "bg-primary/10 border-primary/40 text-primary"
                          : "bg-gray-100 border-gray-200 text-gray-300"
                      }`}
                    >
                      <cfg.icon className="h-3 w-3" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 text-center leading-tight capitalize">
                      {t(s)}
                    </span>
                    {i < arr.length - 1 && (
                      <div className={`absolute`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default StatusTracker;
