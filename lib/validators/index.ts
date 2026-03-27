import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const complaintSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain alphabets and spaces" }),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number" }),
  complaintType: z.string().min(1, { message: "Please select a complaint type" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  photo: z.any().optional().nullable(),
});

export type ComplaintFormValues = z.infer<typeof complaintSchema>;

export const soldierSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain alphabets and spaces" }),
  village: z.string().min(2, { message: "Village must be at least 2 characters" }),
  force: z.string().min(2, { message: "Force/Regiment is required" }),
  rank: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[6-9]\d{9}$/.test(val), {
      message: "Enter a valid 10-digit mobile number",
    }),
  photo: z.any().optional().nullable(),
  message: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export type SoldierFormValues = z.infer<typeof soldierSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const complaintStatusSchema = z
  .object({
    status: z.enum(["pending", "inProgress", "resolved", "rejected"]),
    remarks: z.string().optional(),
    assignedTo: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.status === "resolved") {
        return !!data.remarks && data.remarks.trim().length > 0;
      }
      return true;
    },
    {
      message: "Remarks are required when resolving a complaint",
      path: ["remarks"],
    }
  );

export type ComplaintStatusValues = z.infer<typeof complaintStatusSchema>;
