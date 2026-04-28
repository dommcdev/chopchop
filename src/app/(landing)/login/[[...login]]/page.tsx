import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FieldDescription } from "@/components/ui/field";

const authImageSrc =
  "https://i3ae2rmmav.ufs.sh/f/jtfWTQ42KQLJS5OWcy2LcawQM80GOvKklW4bnzEAIFBe2Jh7";

export default function Page() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex w-full max-w-[400px] md:max-w-[800px] flex-col overflow-hidden border bg-background shadow-sm md:flex-row items-stretch">
            <div className="w-full md:w-[400px] flex justify-center flex-shrink-0">
              <SignIn />
            </div>
            <div className="relative hidden md:block w-full md:w-[400px] flex-shrink-0">
              <Image
                src={authImageSrc}
                alt="Prepared food on a table"
                fill
                sizes="(min-width: 768px) 400px, 100vw"
                className="object-cover dark:brightness-[0.7]"
                loading="eager"
              />
            </div>
          </div>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <Link href="/terms-of-service" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
