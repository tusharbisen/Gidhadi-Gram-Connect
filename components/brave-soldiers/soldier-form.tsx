"use client";

import { useState, useCallback, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { soldierSchema, SoldierFormValues } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function SoldierForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputId = useId();

  const form = useForm<SoldierFormValues>({
    resolver: zodResolver(soldierSchema),
    defaultValues: {
      name: "",
      village: "",
      force: "",
      rank: "",
      serviceStatus: undefined,
      phone: "",
      photo: null,
      message: "",
      isPublic: true,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SoldierFormValues) => {
    console.log("Submitting formData:", data);
    setLoading(true);
    setError(null);

    let base64Photo = undefined;

    if (data.photo instanceof File) {
      if (data.photo.size > 5 * 1024 * 1024) {
        setError("Photo must be less than 5MB");
        setLoading(false);
        return;
      }
      try {
        base64Photo = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(data.photo as File);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      } catch (err) {
        setError("Failed to process photo");
        setLoading(false);
        return;
      }
    }

    const payload = { ...data, photo: base64Photo };

    try {
      const res = await fetch("/api/soldiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (file) {
        form.setValue("photo", file, { shouldValidate: true });
      }
    },
    [form]
  );

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border-2 border-green-200">
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-bold mb-2">Submission Received</h3>
        <p>Thank you for your submission. Our admins will review and approve it shortly.</p>
        <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white" onClick={() => setSuccess(false)}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 text-left max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-primary" />
        Submit brave soldier details
      </h3>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Nikhil Thakare"
                      className={`h-11 rounded-xl ${form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Village/City *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Gidhadi"
                      className={`h-11 rounded-xl ${form.formState.errors.village ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="force"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Force/Regiment *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Indian Army"
                      className={`h-11 rounded-xl ${form.formState.errors.force ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Rank (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="e.g. Havildar"
                      className={`h-11 rounded-xl ${form.formState.errors.rank ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="serviceStatus"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Service Status *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={loading}
                      className={`w-full h-11 px-3 rounded-xl border bg-white text-sm ${form.formState.errors.serviceStatus ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"} focus:outline-none transition-all`}
                    >
                      <option value="" disabled selected>Select status</option>
                      <option value="Currently Serving">Currently Serving</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      disabled={loading}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className={`h-11 rounded-xl ${form.formState.errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-slate-700">Upload Photo (Optional, max 5MB)</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        id={fileInputId}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-slate-700">Short Message/Story (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    rows={3}
                    placeholder="Share a few words of respect..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-slate-600 font-normal cursor-pointer">
                    Make this profile visible to the public once approved.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg mt-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
