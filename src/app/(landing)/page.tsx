import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CameraIcon,
  ScalesIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    title: "Scan & digitize",
    description:
      "Point your camera at a cookbook page, handwritten card, or printed recipe. Every ingredient and step gets converted into structured, editable data.",
    icon: CameraIcon,
  },
  {
    title: "Scale portions",
    description:
      "Adjust serving sizes with a single input. Quantities recalculate automatically, so there's no mental math and no conversion mistakes.",
    icon: ScalesIcon,
  },
  {
    title: "Share instantly",
    description:
      "Generate a clean read-only link for any recipe. No reformatting, no screenshots, no copy-paste threads.",
    icon: ShareNetworkIcon,
  },
];

const steps = [
  {
    number: "01",
    title: "Capture",
    description:
      "Photograph a cookbook page, handwritten card, or upload a PDF you already have. ChopChop reads it and extracts the recipe.",
  },
  {
    number: "02",
    title: "Refine",
    description:
      "Fix any small quirks like a misspelled ingredient or a missing quantity. Save the clean version once and never redo it.",
  },
  {
    number: "03",
    title: "Use",
    description:
      "Scale servings up or down, print a clean copy, or share a read-only link. The recipe is yours to work with.",
  },
];

const stats = [
  { value: "< 30s", label: "to import a recipe" },
  { value: "1\u2011tap", label: "serving adjustment" },
  { value: "Unlimited", label: "shareable links" },
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto min-h-[calc(100svh-4rem)] w-full max-w-screen-3xl overflow-hidden px-4 sm:px-6 lg:px-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(var(--foreground) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] bg-primary/[0.05] blur-[120px] dark:bg-primary/[0.08]" />

        <div className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-28 lg:pb-32">
          <div className="lg:flex lg:items-stretch lg:justify-center lg:gap-12 xl:gap-16">
            <div className="max-w-4xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
              <p className="font-mono text-[0.7rem] tracking-[0.25em] text-primary">
                {"// chopchop"}
              </p>

              <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                Your recipes, <span className="text-primary">digitized.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
                Convert recipes from photos, PDFs, and handwritten cards into a
                format you can edit, scale, cook from, and share.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2.5 bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all hover:bg-primary/90"
                >
                  Get started
                  <ArrowRightIcon
                    weight="bold"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            <div className="relative hidden overflow-hidden lg:block lg:w-64 xl:w-80 2xl:w-96">
              <Image
                src="https://i3ae2rmmav.ufs.sh/f/jtfWTQ42KQLJtoPplgKLe0MEF7P4fKIaVj3Yrcl9nCpOLNqo"
                alt="Chef chopping vegetables"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 border-t border-border/60">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-5 sm:px-6 lg:px-9">
                <p className="font-mono text-lg font-semibold tracking-tight sm:text-xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="border-t border-border/60">
        <div className="mx-auto w-full max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-9 lg:py-24">
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] tracking-[0.25em] text-primary">
                {"// features"}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for how recipes
                <br className="hidden sm:block" /> actually exist.
              </h2>
            </div>
          </div>

          <div className="grid gap-px border border-border bg-border/50 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex flex-col gap-6 bg-background p-7 transition-colors hover:bg-muted/20 sm:p-9"
              >
                <div className="flex size-11 items-center justify-center border border-primary/20 bg-primary/5 text-primary">
                  <Icon weight="duotone" className="size-5" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto w-full max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-9 lg:py-24">
          <div className="mb-12 space-y-3 lg:mb-16">
            <p className="font-mono text-[0.7rem] tracking-[0.25em] text-primary">
              {"// workflow"}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps. That&apos;s it.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative lg:px-9 lg:first:pl-0 lg:last:pr-0"
              >
                {i < steps.length - 1 && (
                  <div className="absolute top-0 right-0 hidden h-full w-px bg-border/60 lg:block" />
                )}
                <span className="font-mono text-6xl font-bold text-primary/45 select-none">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="border-t border-border/60">
        <div className="mx-auto w-full max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-9 lg:py-24">
          <div className="relative overflow-hidden border border-border bg-card/30 p-8 sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(var(--foreground) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="font-mono text-[0.7rem] tracking-[0.25em] text-primary">
                {"// get started"}
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:tracking-[-0.03em]">
                Stop losing recipes to
                <br className="hidden sm:block" /> screenshots and clutter.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
                Upload the recipes you already have, clean them up once, and
                build a collection you can actually cook from.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center gap-2.5 bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-all hover:bg-primary/90"
                >
                  Open dashboard
                  <ArrowRightIcon
                    weight="bold"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <span className="font-mono text-xs tracking-wide text-muted-foreground">
                  No setup required.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
