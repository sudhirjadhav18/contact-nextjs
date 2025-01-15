'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-red-500 text-xl">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}