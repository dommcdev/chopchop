export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Your Main Header */}
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          ChopChop
        </h1>

        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          The Digital Cookbook.
        </p>
      </main>
    </div>
  );
}
