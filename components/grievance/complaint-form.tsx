"use client";

import type React from "react";
import { useState, useCallback, useId } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Send, CheckCircle2, X, AlertCircle, Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { complaintSchema, ComplaintFormValues } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const COMPLAINT_TYPE_KEYS = [
  "waterSupply",
  "roadMaintenance",
  "streetLights",
  "drainageCleaning",
  "other",
] as const;

const MAX_FILE_SIZE_MB = 5;

const ComplaintForm = () => {
  const { t } = useLanguage();
  const photoInputId = useId();

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState("");
  const [photoPreview, setPhotoPreview] = useState<{ file: File; name: string; size: number } | null>(null);

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      complaintType: "",
      description: "",
      photo: null,
    },
    mode: "onChange",
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (file) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          form.setError("photo", { type: "manual", message: t("fileTooLarge") || `File must be under ${MAX_FILE_SIZE_MB}MB.` });
          setPhotoPreview(null);
          form.setValue("photo", null);
        } else {
          form.clearErrors("photo");
          setPhotoPreview({ file, name: file.name, size: file.size });
          form.setValue("photo", file);
        }
      }
    },
    [form, t]
  );

  const clearPhoto = useCallback(() => {
    form.setValue("photo", null);
    form.clearErrors("photo");
    setPhotoPreview(null);
    const input = document.getElementById(photoInputId) as HTMLInputElement | null;
    if (input) input.value = "";
  }, [form, photoInputId]);

  const onSubmit = async (data: ComplaintFormValues) => {
    setStatus("submitting");
    try {
      let base64Photo = null;
      if (photoPreview?.file) {
        base64Photo = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(photoPreview.file);
        });
      }

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          complaintType: data.complaintType,
          description: data.description,
          photo: base64Photo,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit complaint");
      }

      const responseData = await res.json();
      setReferenceId(responseData.referenceId);
      setStatus("success");
      form.reset();
      setPhotoPreview(null);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Card className="border border-primary/10 shadow-lg overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {t("complaintSubmitted") || "Complaint Submitted!"}
          </h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {t("complaintSubmittedDesc") ||
              "Your complaint has been recorded. You can track it using the reference ID below."}
          </p>
          <div className="inline-block bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 mb-6">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
              {t("referenceId") || "Reference ID"}
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-primary font-mono tracking-wider">
              {referenceId}
            </p>
          </div>
          <Button
            onClick={() => setStatus("idle")}
            className="bg-primary hover:bg-primary text-white rounded-xl px-6"
          >
            {t("submitAnother") || "Submit Another Complaint"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <Card className="border border-primary/10 shadow-lg overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />

      <CardHeader className="px-4 sm:px-6 pt-5 pb-3">
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
          {t("submitComplaint")}
        </CardTitle>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
          {t("complaintFormSubtitle") || "All fields marked * are required."}
        </p>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-6">
        {status === "error" && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {t("submissionError") || "Something went wrong. Please try again."}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t("fullName")} <span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      autoComplete="name"
                      placeholder={t("fullNamePlaceholder") || "Enter your full name"}
                      className={`h-10 sm:h-11 text-sm ${form.formState.errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t("phoneNumber")} <span className="text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      disabled={isSubmitting}
                      autoComplete="tel"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className={`h-10 sm:h-11 text-sm ${form.formState.errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Complaint Type */}
            <FormField
              control={form.control}
              name="complaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t("complaintType")} <span className="text-red-400">*</span>
                  </FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={`h-10 sm:h-11 text-sm ${form.formState.errors.complaintType ? "border-red-500 focus-visible:ring-red-500" : ""}`}>
                        <SelectValue placeholder={t("selectComplaintType") || "Select complaint type"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMPLAINT_TYPE_KEYS.map((key) => (
                        <SelectItem key={key} value={key} className="text-sm">
                          {t(key)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs sm:text-sm font-semibold text-gray-700">
                      {t("description")} <span className="text-red-400">*</span>
                    </FormLabel>
                    <span className="text-[10px] text-gray-400">
                      {field.value.length}/500 chars
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      rows={4}
                      placeholder={t("descriptionPlaceholder") || "Describe your complaint in detail (min. 20 characters)…"}
                      className={`text-sm resize-none ${form.formState.errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t("uploadPhoto")} <span className="text-gray-400 font-normal text-[11px]">({t("optional") || "Optional"}, max {MAX_FILE_SIZE_MB}MB)</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      {photoPreview ? (
                        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Upload className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                              {photoPreview.name}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              {(photoPreview.size / 1024).toFixed(0)} KB
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
                          className={`w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-xl text-xs sm:text-sm transition-all duration-200 disabled:opacity-50 ${form.formState.errors.photo ? "border-red-300 text-red-400 bg-red-50" : "border-gray-200 text-gray-400 hover:border-primary/40 hover:text-primary hover:bg-primary/5"}`}
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
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 bg-primary hover:bg-primary active:bg-primary text-white font-semibold text-sm sm:text-base rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
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
        </Form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;
