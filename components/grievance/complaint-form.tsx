"use client";

import type React from "react";
import { useState, useCallback, useId } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Send, CheckCircle2, X, AlertCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
  phoneNumber: string;
  complaintType: string;
  description: string;
  photo: File | null;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  complaintType?: string;
  description?: string;
  photo?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  fullName: "",
  phoneNumber: "",
  complaintType: "",
  description: "",
  photo: null,
};

const COMPLAINT_TYPE_KEYS = [
  "waterSupply",
  "roadMaintenance",
  "streetLights",
  "drainageCleaning",
  "other",
] as const;

const MAX_FILE_SIZE_MB = 5;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian mobile number

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(data: FormData, t: (k: string) => string): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = t("fieldRequired") || "This field is required.";
  if (!data.phoneNumber) {
    errors.phoneNumber = t("fieldRequired") || "This field is required.";
  } else if (!PHONE_REGEX.test(data.phoneNumber)) {
    errors.phoneNumber = t("invalidPhone") || "Enter a valid 10-digit Indian mobile number.";
  }
  if (!data.complaintType) errors.complaintType = t("fieldRequired") || "Please select a type.";
  if (!data.description.trim()) {
    errors.description = t("fieldRequired") || "This field is required.";
  } else if (data.description.trim().length < 20) {
    errors.description = t("descriptionTooShort") || "Please provide at least 20 characters.";
  }
  if (data.photo && data.photo.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    errors.photo = t("fileTooLarge") || `File must be under ${MAX_FILE_SIZE_MB}MB.`;
  }
  return errors;
}

function generateReferenceId(): string {
  return `GP${Date.now().toString().slice(-6)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-[11px] sm:text-xs text-red-500 flex items-center gap-1">
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      {message}
    </p>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const ComplaintForm = () => {
  const { t } = useLanguage();
  const photoInputId = useId();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [referenceId, setReferenceId] = useState("");

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const handleSelectChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, complaintType: value }));
    setErrors((prev) => ({ ...prev, complaintType: undefined }));
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setFormData((prev) => ({ ...prev, photo: file }));
      if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: t("fileTooLarge") || `File must be under ${MAX_FILE_SIZE_MB}MB.`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, photo: undefined }));
      }
    },
    [t]
  );

  const clearPhoto = useCallback(() => {
    setFormData((prev) => ({ ...prev, photo: null }));
    setErrors((prev) => ({ ...prev, photo: undefined }));
    // Reset the file input
    const input = document.getElementById(photoInputId) as HTMLInputElement | null;
    if (input) input.value = "";
  }, [photoInputId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1800));
      const id = generateReferenceId();
      setReferenceId(id);
      setStatus("success");
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  // ── Success State ────────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <Card className="border border-emerald-100 shadow-lg overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {t("complaintSubmitted") || "Complaint Submitted!"}
          </h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {t("complaintSubmittedDesc") ||
              "Your complaint has been recorded. You can track it using the reference ID below."}
          </p>
          <div className="inline-block bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 mb-6">
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-1">
              {t("referenceId") || "Reference ID"}
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono tracking-wider">
              {referenceId}
            </p>
          </div>
          <Button
            onClick={() => setStatus("idle")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6"
          >
            {t("submitAnother") || "Submit Another Complaint"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  const isSubmitting = status === "submitting";

  return (
    <Card className="border border-emerald-100 shadow-lg overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

      <CardHeader className="px-4 sm:px-6 pt-5 pb-3">
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
          {t("submitComplaint")}
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
          {t("complaintFormSubtitle") || "All fields marked * are required."}
        </p>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-6">
        {/* General error */}
        {status === "error" && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {t("submissionError") || "Something went wrong. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("fullName")} <span className="text-red-400">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="name"
              placeholder={t("fullNamePlaceholder") || "Enter your full name"}
              className={`h-10 sm:h-11 text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 ${
                errors.fullName ? "border-red-300" : ""
              }`}
            />
            <FieldError message={errors.fullName} />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("phoneNumber")} <span className="text-red-400">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="tel"
              placeholder="e.g. 9876543210"
              maxLength={10}
              className={`h-10 sm:h-11 text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 ${
                errors.phoneNumber ? "border-red-300" : ""
              }`}
            />
            <FieldError message={errors.phoneNumber} />
          </div>

          {/* Complaint Type */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("complaintType")} <span className="text-red-400">*</span>
            </Label>
            <Select
              value={formData.complaintType}
              onValueChange={handleSelectChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                className={`h-10 sm:h-11 text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 ${
                  errors.complaintType ? "border-red-300" : ""
                }`}
              >
                <SelectValue placeholder={t("selectComplaintType") || "Select complaint type"} />
              </SelectTrigger>
              <SelectContent>
                {COMPLAINT_TYPE_KEYS.map((key) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {t(key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.complaintType} />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("description")} <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={4}
              placeholder={t("descriptionPlaceholder") || "Describe your complaint in detail (min. 20 characters)…"}
              className={`text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 resize-none ${
                errors.description ? "border-red-300" : ""
              }`}
            />
            <div className="flex items-start justify-between">
              <FieldError message={errors.description} />
              <span className="text-[10px] text-gray-300 ml-auto">
                {formData.description.length} chars
              </span>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-semibold text-gray-700">
              {t("uploadPhoto")}{" "}
              <span className="text-gray-400 font-normal text-[11px]">
                ({t("optional") || "Optional"}, max {MAX_FILE_SIZE_MB}MB)
              </span>
            </Label>

            {formData.photo ? (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {formData.photo.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {(formData.photo.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors flex-shrink-0"
                  aria-label={t("removePhoto")}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById(photoInputId)?.click()}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-xs sm:text-sm text-gray-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                {t("chooseFile") || "Click to choose a photo"}
              </button>
            )}
            <input
              id={photoInputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isSubmitting}
            />
            <FieldError message={errors.photo} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 sm:h-11 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                {t("loading")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {t("submit")}
              </span>
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
