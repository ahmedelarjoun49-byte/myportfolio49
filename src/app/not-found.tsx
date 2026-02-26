import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-lg w-full rounded-2xl border p-6 bg-white text-gray-900 dark:bg-[#06140f] dark:text-gray-100 dark:border-emerald-900/40">
        <h2 className="text-2xl font-bold">404 — Page not found</h2>
        <p className="mt-2 text-sm opacity-80">
          This page doesn’t exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-5 px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
