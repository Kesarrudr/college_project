import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6, { message: "Should have atleast 6 char" }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, { message: "Should have at least 6 char" }),
  newPassword: z.string().min(6, { message: "Should have atles 6 char" }),
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, { message: "Should have atlest 6 char" }),
});

export type LoginDataType = z.infer<typeof loginSchema>;
export type RegisterDataType = z.infer<typeof registerSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export function RegisterDataValidator(data: any) {
  try {
    return registerSchema.parse(data);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      throw new Error("Invalid data provided. Please check your input.");
    } else {
      throw error;
    }
  }
}

export function LoginValidator(data: any) {
  try {
    const LoginData = loginSchema.safeParse(data);
    return LoginData;
  } catch (error) {
    throw Error("Login Validation Failed");
  }
}

export function changePasswordValidator(data: any) {
  try {
    return changePasswordSchema.safeParse(data);
  } catch (error) {
    throw Error("Change Password Validor failed");
  }
}

export function resetPasswordValidator(data: any) {
  try {
    return resetPasswordSchema.safeParse(data);
  } catch (error) {
    throw Error("Reset Password Validator Failed");
  }
}
