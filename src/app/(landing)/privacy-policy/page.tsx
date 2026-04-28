import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | ChopChop",
  description: "Privacy Policy for the ChopChop academic project.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" effectiveDate="April 27, 2026">
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">1. Introduction</h2>
        <p className="text-muted-foreground">
          ChopChop is a recipe management application developed solely for
          academic purposes. This Privacy Policy explains how data is handled
          within the scope of this school project.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          2. Information We Collect
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">
              Account Information:
            </span>{" "}
            We utilize third-party authentication (Clerk) to manage sign-ins.
            We may store your name and email address as provided by your chosen
            auth provider.
          </p>
          <p>
            <span className="font-semibold text-foreground">User Content:</span>{" "}
            Any recipes, images, or culinary notes you input are stored in our
            database (Turso) to provide the app&apos;s core functionality.
          </p>
          <p>
            <span className="font-semibold text-foreground">Usage Data:</span>{" "}
            We may collect basic technical information, such as browser type and
            timestamps, to help debug and improve the project.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          3. Third-Party Services
        </h2>
        <p className="text-muted-foreground">
          ChopChop integrates with several third-party providers. Their use of
          your data is governed by their respective privacy policies.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
          <li>Clerk (Authentication)</li>
          <li>Turso (Database Hosting)</li>
          <li>Google Gemini API (AI Recipe Processing/Generation)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          4. Data Retention &amp; Security
        </h2>
        <p className="text-muted-foreground">
          As this is a student project, data security is implemented to the
          best of our ability but is not guaranteed. Users should not store
          sensitive personal information or proprietary data on this platform.
          This project and its data may be deleted at the conclusion of the
          academic term.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">5. Contact</h2>
        <p className="text-muted-foreground">
          For questions regarding this project, please contact the development
          team via the university project repository.
        </p>
      </section>
    </LegalDocument>
  );
}
