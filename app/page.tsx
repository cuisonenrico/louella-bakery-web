import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-neutral-900">
            Louella Bakery Portal
          </h1>
          <p className="max-w-2xl text-lg text-neutral-600">
            A frontend-only Next.js client for the Louella Bakery backend. All
            authentication and business logic live in the NestJS API.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
            href="/login"
          >
            Sign in
          </Link>
          <Link
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700"
            href="/register"
          >
            Create account
          </Link>
        </div>
      </main>
    </div>
  );
}
