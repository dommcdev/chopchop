import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CameraIcon,
  CheckCircleIcon,
  ClockCountdownIcon,
  ScalesIcon,
  ShareNetworkIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

const foodImageSrc =
  "https://i3ae2rmmav.ufs.sh/f/jtfWTQ42KQLJtoPplgKLe0MEF7P4fKIaVj3Yrcl9nCpOLNqo";

const featureCards = [
  {
    title: "Scan recipes once",
    description:
      "Import cookbook pages, printed recipes, or PDFs and turn them into editable recipe data instead of another folder of screenshots.",
    icon: CameraIcon,
  },
  {
    title: "Adjust servings quickly",
    description:
      "Scale ingredient quantities up or down before you cook so weeknight dinners and holiday batches use the same source recipe.",
    icon: ScalesIcon,
  },
  {
    title: "Share without exporting",
    description:
      "Send a clean read-only link when someone asks for a recipe instead of pasting ingredients into a text thread.",
    icon: ShareNetworkIcon,
  },
];

const workflowSteps = [
  {
    eyebrow: "1. Capture",
    title: "Bring recipes in from wherever they already live",
    description:
      "Use photos for handwritten cards and cookbook pages, or upload a PDF when you already have a digital copy.",
  },
  {
    eyebrow: "2. Clean up",
    title: "Fix the small OCR mistakes once",
    description:
      "Edit ingredient names, quantities, and instructions so the saved version is the one you actually want to cook from next time.",
  },
  {
    eyebrow: "3. Cook and reuse",
    title: "Resize portions, print, or send a link",
    description:
      "The recipe becomes something you can work with: easier to read on your phone, easier to print, and easier to pass along.",
  },
];

const practicalReasons = [
  "Useful when you cook from a mix of screenshots, paper cards, PDFs, and books.",
  "Useful when the same recipe needs different serving sizes week to week.",
  "Useful when family recipes should stay easy to share without getting reformatted every time.",
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-screen-3xl items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-9 lg:py-16">
        <div className="relative grid w-full items-end gap-8 overflow-hidden border border-border/70 bg-muted/10 px-5 py-6 sm:px-7 sm:py-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:px-10 lg:py-10 xl:px-14 xl:py-12">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
            <Image
              src={foodImageSrc}
              alt="Prepared ingredients arranged for cooking"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1280px) 44rem, (min-width: 1024px) 52vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_14%,color-mix(in_oklab,var(--background)_72%,transparent)_42%,transparent_72%)] dark:bg-[linear-gradient(90deg,var(--background)_10%,color-mix(in_oklab,var(--background)_60%,transparent)_40%,transparent_72%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--background)_18%,transparent),transparent_34%)]" />
          </div>

          <div className="relative z-10 flex max-w-4xl flex-col justify-end gap-8 lg:gap-12 lg:self-stretch lg:py-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
              Digital cookbook for recipes worth keeping
            </p>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl md:text-7xl lg:text-[clamp(4.75rem,8vw,8rem)] lg:leading-[0.92]">
                Keep the recipe.
                <br />
                Lose the clutter.
              </h1>

              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:max-w-lg">
                Convert recipes from photos and PDFs into a format that is
                easier to edit, scale, cook from, and share.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open dashboard
                <ArrowRightIcon weight="bold" className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-none border border-border bg-background/70 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-background"
              >
                Sign in to save recipes
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6 justify-self-start lg:max-w-[18rem] lg:justify-self-end lg:self-end">
            <p className="max-w-xs text-sm leading-6 text-muted-foreground lg:text-right">
              For cookbook pages, screenshots, old printouts, and the recipes
              that keep getting lost in between.
            </p>
            <div className="h-px w-full bg-border/70" />
            <div className="grid gap-3 text-sm text-foreground lg:text-right">
              <p>Conversion that produces editable recipes.</p>
              <p>Serving-size adjustments without recalculating by hand.</p>
              <p>Read-only links for sharing a clean final version.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/20">
        <div className="mx-auto grid w-full max-w-screen-3xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-9 lg:py-14">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Why it exists
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              A better home for recipes that start out messy.
            </h2>
          </div>
          <div className="grid gap-3">
            {practicalReasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 border border-border bg-background px-4 py-4"
              >
                <CheckCircleIcon className="mt-0.5 size-5 text-primary" weight="fill" />
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-3xl px-4 py-12 sm:px-6 lg:px-9 lg:py-16">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Core features
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            The parts that make it useful.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex h-full flex-col gap-5 border border-border bg-card p-6 sm:p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon weight="bold" className="size-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-3xl px-4 pb-12 sm:px-6 lg:px-9 lg:pb-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="border border-border bg-card p-6 sm:p-8">
            <div className="max-w-lg space-y-4">
              <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                How it works
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Built around the steps you already take.
              </h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Most recipes do not start life in a clean app. They begin as a
                page, a file, a text message, or a photo. ChopChop is meant to
                shorten the path from that messy source to something reusable.
              </p>
            </div>
          </div>

          <div className="grid gap-px border border-border bg-border/60">
            {workflowSteps.map((step) => (
              <article key={step.eyebrow} className="bg-background p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 bg-card/40">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-9 lg:py-16">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              <SparkleIcon className="size-4" weight="fill" />
              Ready when you are
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
              Start building a recipe collection that is easier to cook from.
            </h2>
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              Upload the recipes you already have, clean them up once, and stop
              hunting through screenshots the next time you want to make dinner.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to dashboard
              <ArrowRightIcon weight="bold" className="size-4" />
            </Link>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ClockCountdownIcon className="size-4 text-primary" weight="bold" />
              No setup ceremony. Just start importing recipes.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
