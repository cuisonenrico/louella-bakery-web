"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api/auth";

const forgotSchema = z.object({
  email: z.string().email(),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (values: ForgotFormValues) => {
    await requestPasswordReset(values);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Reset password
          </h1>
          <p className="text-sm text-neutral-500">
            We will send a reset link if the account exists.
          </p>
        </div>
        <form
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <button
            className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
          {isSubmitSuccessful ? (
            <p className="text-xs text-emerald-600">
              Check your email for the reset instructions.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
