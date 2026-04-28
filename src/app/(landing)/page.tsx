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
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center gap-8 lg:py-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1">
                Digital cookbook
              </span>
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1">
                OCR import
              </span>
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1">
                Free to use
              </span>
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
                Turn scattered recipes into a cookbook you can actually use.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                ChopChop helps you pull recipes out of photos, cookbook pages,
                and PDFs, then save them in a format that is easier to edit,
                scale, print, and share.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open dashboard
                <ArrowRightIcon weight="bold" className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-none border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Sign in to save recipes
              </Link>
            </div>

            <div className="grid gap-4 border-y border-border/70 py-6 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Built for real recipe clutter
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Cookbook pages, PDFs, screenshots, and old note cards.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Keeps recipes editable
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Fix wording, update amounts, and keep one clean version.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Ready on phone or desktop
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Designed to be readable at the counter or on a wide screen.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[26rem] flex-col overflow-hidden border border-border bg-card lg:min-h-[42rem]">
            <div className="relative min-h-[18rem] flex-1">
              <Image
                src={foodImageSrc}
                alt="Prepared ingredients arranged for cooking"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 42vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="max-w-md space-y-3 border border-white/15 bg-background/80 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                    Typical workflow
                  </p>
                  <p className="text-lg font-medium leading-7 text-foreground">
                    Import a recipe, correct the details once, then keep coming
                    back to the clean version.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-px border-t border-border bg-border/60 sm:grid-cols-3">
              <div className="bg-card p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Import
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Photos and PDFs become editable recipes.
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Scale
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Ingredient amounts update with the serving size.
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Share
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  Send a simple link instead of reformatting recipes by hand.
                </p>
              </div>
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
            Useful features, not landing-page filler.
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
