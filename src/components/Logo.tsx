import Image from "next/image";

export function Logo() {
  return (
    <>
      {/* Shown in Light Mode, hidden when .dark class is present */}
      <Image
        src="/logo-light.svg"
        alt="ChopChop Logo"
        width={150}
        height={31}
        priority
        className="block dark:hidden"
      />
      {/* Hidden by default, shown when .dark class is present */}
      <Image
        src="/logo-dark.svg"
        alt="ChopChop Logo"
        width={150}
        height={31}
        priority
        className="hidden dark:block"
      />
    </>
  );
}
