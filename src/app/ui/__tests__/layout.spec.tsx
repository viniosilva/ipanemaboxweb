import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "@/app/ui/layout";

describe("Layout Component", () => {
  it("renders header with correct title", () => {
    const { container } =  render(<Layout>Test Content</Layout>);
    const headerTag = container.getElementsByTagName("header")[0]
    expect(headerTag.textContent).toMatch(/Ipanema Box/i);
  });

  it("renders footer with correct text", () => {
    render(<Layout>Test Content</Layout>);
    const footerElement = screen.getByText(/© 2024 Ipanema Box/i);
    expect(footerElement).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Layout>
        <h2>Child Content</h2>
      </Layout>
    );
    const childElement = screen.getByText(/Child Content/i);
    expect(childElement).toBeInTheDocument();
  });

  it("toggles mobile menu open and close", () => {
    render(<Layout>Test Content</Layout>);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(screen.getByRole("navigation").classList).not.toContain("-translate-x-full");

    fireEvent.click(buttonElement);
    expect(screen.getByRole("navigation").classList).toContain("-translate-x-full");
  });
});
