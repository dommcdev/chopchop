import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";
import Page from "./page";

// Mock Clerk components since they require ClerkProvider context
vi.mock("@clerk/nextjs", () => ({
  SignIn: () => <div data-testid="clerk-sign-in">SignIn Component</div>,
}));

afterEach(() => {
  cleanup();
});

test("renders the Clerk SignIn component", () => {
  render(<Page />);
  expect(screen.getByTestId("clerk-sign-in")).toBeInTheDocument();
});

test("renders the promotional image with correct alt text", () => {
  render(<Page />);
  expect(screen.getByAltText("Prepared food on a table")).toBeInTheDocument();
});

test("renders links to Terms of Service and Privacy Policy", () => {
  render(<Page />);

  const termsLink = screen.getByRole("link", { name: /terms of service/i });
  expect(termsLink).toBeInTheDocument();
  expect(termsLink).toHaveAttribute("href", "/tos");

  const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
  expect(privacyLink).toBeInTheDocument();
  expect(privacyLink).toHaveAttribute("href", "/privacy");
});
