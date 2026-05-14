import * as zod from "zod"

export const schema = zod.object({
  firstName: zod
    .string()
    .nonempty("FirstName is required")
    .regex(/^[A-Za-z\s-]{3,}$/, "FirstName is invalid"), // تم تصحيح الـ Regex

  lastName: zod
    .string()
    .nonempty("LastName is required")
    .regex(/^[A-Za-z\s-]{3,}$/, "LastName is invalid"),

  email: zod
    .string()
    .nonempty("Email is required")
    .email("Email is invalid"), 

  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain uppercase, lowercase, and numbers"
    ),

  birthDate: zod.coerce.date({
    required_error: "BirthDate is required",
    invalid_type_error: "Invalid date format",
  }),

  address: zod
    .string()
    .nonempty("Address is required")
    .min(5, "Address is too short"),

  userType: zod.preprocess(
    (val) => Number(val),
    zod.number({ required_error: "UserType is required" }).min(0).max(1)
  ),

  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Phone is invalid"),

  specialty: zod.string().optional(),

  gender: zod.string().nonempty("Gender is required"),
}).refine((data) => {

  if (data.userType === 1) {
    return data.specialty && data.specialty.trim().length >= 3;
  }
  return true; 
}, {
  message: "Specialty is required for Doctors and must be at least 3 characters",
  path: ["specialty"], 
});