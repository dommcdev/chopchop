import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service | ChopChop",
  description: "Terms of Service for the ChopChop academic project.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument title="Terms of Service" effectiveDate="April 27, 2026">
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          1. Acceptance of Terms
        </h2>
        <p className="text-muted-foreground">
          By accessing ChopChop, you agree to these terms. This application is
          a non-commercial academic project and is provided for demonstration
          purposes only.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">2. Use of Service</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
          <li>You agree to use ChopChop only for lawful purposes.</li>
          <li>You are responsible for any content you upload.</li>
          <li>
            The developers reserve the right to reset databases or terminate
            access at any time without notice.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          3. Intellectual Property
        </h2>
        <p className="text-muted-foreground">
          Users retain ownership of the original recipes they upload. However,
          by using this app, you grant the project team a license to host and
          display that content for the purpose of academic evaluation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          4. Disclaimer of Warranty
        </h2>
        <p className="text-muted-foreground">
          ChopChop is provided &quot;AS IS.&quot; We make no guarantees regarding the
          uptime, reliability, or accuracy of the data provided by the app or
          the Gemini AI integration. Use of the application is at your own risk.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          5. Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          To the maximum extent permitted by law, the developers shall not be
          liable for any data loss, culinary mishaps, or damages resulting from
          the use of this software.
        </p>
      </section>
    </LegalDocument>
  );
}
