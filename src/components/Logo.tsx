export function Logo() {
  return (
    <>
      {/* Shown in Light Mode, hidden when .dark class is present */}
      <img
        src="/logo-light.svg"
        alt="ChopChop Logo"
        width={150}
        height={40}
        className="block dark:hidden"
      />
      {/* Hidden by default, shown when .dark class is present */}
      <img
        src="/logo-dark.svg"
        alt="ChopChop Logo"
        width={150}
        height={40}
        className="hidden dark:block"
      />
    </>
  );
}
