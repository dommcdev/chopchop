import Link from "next/link";
import {
  CameraIcon,
  FolderSimpleIcon,
  ScalesIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { RecipeScalerDemo } from "@/components/landing/RecipeScalerDemo";
import { framePadding, fullWidthRule } from "@/components/landing/frame";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Scan",
    description:
      "Upload a photo or a PDF. The ingredients and steps come out as editable fields.",
    icon: CameraIcon,
  },
  {
    title: "Scale",
    description: "Change the servings and every quantity updates with it.",
    icon: ScalesIcon,
  },
  {
    title: "Organize",
    description:
      "File recipes into categories you name, and search across all of them.",
    icon: FolderSimpleIcon,
  },
  {
    title: "Share",
    description: "Send a read-only link, or print a clean copy.",
    icon: ShareNetworkIcon,
  },
];

const ctaClassName = cn(
  buttonVariants(),
  "h-11 px-6 text-sm font-bold uppercase tracking-widest",
);

export default function HomePage() {
  return (
    <div className="selection:bg-primary selection:text-primary-foreground">
      <section
        className={cn(
          fullWidthRule,
          framePadding,
          "py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_29rem] lg:items-center lg:gap-14 lg:py-24",
        )}
      >
        <div>
          <h1 className="text-5xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            Your cookbook, digitized.
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
            Turn photos, printouts, and handwritten cards into recipes you can
            scale, sort, and share.
          </p>
          <div className="mt-10">
            <Link href="/dashboard" className={ctaClassName}>
              Open ChopChop
            </Link>
          </div>
        </div>

        <div className="mt-14 lg:mt-0">
          <RecipeScalerDemo />
          <p className="mt-3 text-xs text-muted-foreground">
            Live example. Try changing the servings.
          </p>
        </div>
      </section>

      <section aria-labelledby="features-heading" className={fullWidthRule}>
        <h2 id="features-heading" className="sr-only">
          What ChopChop does
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className={cn(
                framePadding,
                "border-t border-border/60 py-8 first:border-t-0 lg:border-t-0 lg:py-12",
                "sm:nth-[-n+2]:border-t-0 sm:even:border-l",
                "lg:border-l lg:first:border-l-0",
              )}
            >
              <Icon
                weight="duotone"
                className="size-6 text-primary"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-base font-semibold">{title}</h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={cn(
          framePadding,
          "flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:py-20",
        )}
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Start with one recipe.
        </h2>
        <Link href="/dashboard" className={cn(ctaClassName, "self-start")}>
          Open ChopChop
        </Link>
      </section>
    </div>
  );
}
