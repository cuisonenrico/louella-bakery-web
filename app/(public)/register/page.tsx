"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Register</h1>
          <p className="text-sm text-neutral-500">
            Create your Louella Bakery account.
          </p>
        </div>
        <form
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Name</label>
            <input
              className="w-full rounded-lg border border-neutral-200 px-3 py-2"
              placeholder="Jane Doe"
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Email</label>
            <input
              className="w-full rounded-lg border border-neutral-200 px-3 py-2"
              type="email"
              placeholder="you@company.com"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Password</label>
            <input
              className="w-full rounded-lg border border-neutral-200 px-3 py-2"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Confirm password
            </label>
            <input
              className="w-full rounded-lg border border-neutral-200 px-3 py-2"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <button
            className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
