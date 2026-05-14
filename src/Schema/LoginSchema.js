import * as zod from "zod"
export  const schema = zod.object({
    email: zod
      .string()
      .nonempty("email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email is in valid",
      ),
    // password validation
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password is in valid",
      ),
  });