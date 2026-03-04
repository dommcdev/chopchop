import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import LoginPage from "./page";

// 1. Mock the LoginForm component
// We mock it because we want to test the PAGE, not the form itself.
// This is like testing a garage—we just check if the car is inside,
// we don't need to start the car's engine.
vi.mock("@/components/login-form", () => ({
  LoginForm: () => <div data-testid="mock-login-form">Login Form Loaded</div>,
}));

test("LoginPage renders the login form container", () => {
  render(<LoginPage />);

  // 2. Check if the mocked form is in the document
  const form = screen.getByTestId("mock-login-form");
  expect(form).toBeInTheDocument();

  // 3. Verify the text inside our mock is visible
  expect(screen.getByText(/login form loaded/i)).toBeInTheDocument();
});
