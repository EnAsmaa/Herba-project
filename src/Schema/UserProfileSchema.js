import * as zod from "zod";

export const profileSchema = zod.object({
  firstName: zod
    .string()
    .nonempty("FirstName is required")
    .regex(/^[A-Za-z\s-]{3,}$/, "FirstName is invalid"), // تم تصحيح الـ Regex

  lastName: zod
    .string()
    .nonempty("LastName is required")
    .regex(/^[A-Za-z\s-]{3,}$/, "LastName is invalid"),

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
  idealWeight: zod.coerce
    .number()
    .positive("Weight must be greater than 0"),
});