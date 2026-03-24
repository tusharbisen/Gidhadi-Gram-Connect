"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (!data.password) errors.password = "Password is required.";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

const AdminLogin = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/admin/dashboard");
    } catch {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md">

        {/* Logo + Branding above card */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-4 border-emerald-100 mb-4">
            <Image
              src="/logo.png"
              alt="Gidhadi Gram Connect"
              width={56}
              height={56}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">
            Gidhadi Gram Connect
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Administrative Portal
          </p>
        </div>

        {/* Card */}
        <Card className="border border-emerald-100 shadow-xl overflow-hidden">
          {/* Gradient header strip */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

          <CardHeader className="text-center pt-6 sm:pt-8 pb-2 px-5 sm:px-8">
            <div className="mx-auto mb-4 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
              <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
              {t("adminLogin")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Access the administrative dashboard
            </p>
          </CardHeader>

          <CardContent className="px-5 sm:px-8 pb-7 sm:pb-9 pt-4">
            {/* General error */}
            {errors.general && (
              <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs sm:text-sm text-red-600 text-center">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-semibold text-gray-700"
                >
                  {t("email")} <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-9 h-10 sm:h-11 text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 transition-colors ${
                      errors.email ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""
                    }`}
                    placeholder="admin@gpgidhadi.gov.in"
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] sm:text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-semibold text-gray-700"
                >
                  {t("password")} <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-9 pr-10 h-10 sm:h-11 text-sm border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 transition-colors ${
                      errors.password ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""
                    }`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] sm:text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 sm:h-11 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm sm:text-base rounded-lg transition-colors mt-1 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    {t("loading")}
                  </span>
                ) : (
                  t("login")
                )}
              </Button>
            </form>

            {/* Demo hint */}
            <p className="mt-5 text-center text-[11px] sm:text-xs text-gray-400">
              Demo: use any valid email &amp; password (6+ chars)
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-[11px] sm:text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} Gidhadi Gram Connect. Community Platform.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;