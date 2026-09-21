// Shared layout classes for pages inside the (landing) frame.

// Horizontal padding shared by every section so text lines up with the logo.
export const framePadding = "px-4 sm:px-6 lg:px-8";

// A section rule that runs the full viewport width, past the frame's edges.
export const fullWidthRule =
  "relative after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-border/60";
