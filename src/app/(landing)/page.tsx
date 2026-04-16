import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CameraIcon,
  ScalesIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
  const foodImageSrc =
    "https://i3ae2rmmav.ufs.sh/f/jtfWTQ42KQLJp4vyx8e14MkAviEcgdIYupqoh2XDK6yTmbaw";

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-background text-foreground flex flex-col pb-12 selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Main Grid Container */}
      <div className="flex-grow w-full max-w-[90rem] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* Outer border for the main hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-[3px] border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] bg-card overflow-hidden">
          {/* Hero Left */}
          <div className="lg:col-span-8 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-foreground relative bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem]">
            <div className="relative z-10 flex flex-col justify-center items-start h-full py-12 w-full">
              <h1 className="text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[8.75vw] xl:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter text-foreground drop-shadow-[6px_6px_0px_var(--primary)] mb-8 max-w-full">
                ChopChop
              </h1>

              <div className="inline-flex items-center border-[3px] border-foreground px-6 py-3 bg-primary text-primary-foreground font-black uppercase tracking-widest text-lg leading-none sm:text-xl md:text-3xl shadow-[6px_6px_0px_0px_var(--foreground)] -rotate-1 transform-gpu [backface-visibility:hidden] [will-change:transform] hover:rotate-0 transition-transform duration-300">
                The Digital Cookbook
              </div>
            </div>
          </div>

          {/* Hero Right */}
          <div className="lg:col-span-4 flex flex-col bg-background">
            {/* Image Block */}
            <div className="relative flex-grow min-h-[300px] lg:min-h-0 border-b-[3px] border-foreground overflow-hidden group">
              <Image
                src={foodImageSrc}
                alt="Culinary prep"
                fill
                className="object-cover object-[center_40%] lg:object-center transition-all duration-700 scale-105 group-hover:scale-100"
                priority
              />
            </div>

            {/* Custom CTA Block */}
            <Link
              href="/dashboard"
              className="group flex items-center justify-between p-8 bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col relative z-10">
                <span className="text-3xl font-black uppercase tracking-tight group-hover:text-background transition-colors">
                  Start Now
                </span>
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1 group-hover:text-background transition-colors">
                  100% Free Forever
                </span>
              </div>
              <ArrowRightIcon
                weight="bold"
                className="w-10 h-10 group-hover:translate-x-2 transition-transform duration-300 relative z-10 group-hover:text-background"
              />

              {/* Hover sweep effect */}
              <div className="absolute inset-0 bg-foreground translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 lg:mt-12 gap-6 lg:gap-8">
          <div className="border-[3px] border-foreground bg-card p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--foreground)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_var(--primary)] transition-all duration-300 group">
            <div className="bg-primary/10 text-foreground w-fit p-4 border-[3px] border-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <CameraIcon weight="bold" className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-foreground pb-4">
              Easy Uploads
            </h3>
            <p className="font-bold text-base text-muted-foreground leading-relaxed">
              Snap a picture of a cookbook or upload a PDF. We parse
              ingredients, amounts, and instructions into editable data.
            </p>
          </div>

          <div className="border-[3px] border-foreground bg-card p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--foreground)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_var(--primary)] transition-all duration-300 group">
            <div className="bg-primary/10 text-foreground w-fit p-4 border-[3px] border-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ScalesIcon weight="bold" className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-foreground pb-4">
              Smart Quantities
            </h3>
            <p className="font-bold text-base text-muted-foreground leading-relaxed">
              Cooking for 2 instead of 6? Change the serving size and all
              ingredient quantities update automatically. Zero math required.
            </p>
          </div>

          <div className="border-[3px] border-foreground bg-card p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--foreground)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_var(--primary)] transition-all duration-300 group">
            <div className="bg-primary/10 text-foreground w-fit p-4 border-[3px] border-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ShareNetworkIcon weight="bold" className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 border-b-[3px] border-foreground pb-4">
              Simple Sharing
            </h3>
            <p className="font-bold text-base text-muted-foreground leading-relaxed">
              Generate read-only links for any recipe in your collection.
              Perfect for sharing with friends and family.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
