"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen grid place-items-center p-6 bg-white text-gray-900">
        <div className="max-w-lg w-full rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">App crashed</h2>
          <p className="mt-2 text-sm opacity-80">
            {error?.message || "Unknown error"}
          </p>
          <button
            onClick={() => reset()}
            className="mt-5 px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}

