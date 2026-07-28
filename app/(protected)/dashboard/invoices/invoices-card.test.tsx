import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { InvoicesCard } from "./invoices-card";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
  }),
}));

describe("InvoicesCard", () => {
  const emptyProps = {
    invoices: null as null,
    customers: [] as { id: string; name: string }[],
  };

  it("enables the create button when the free limit is not reached", () => {
    render(<InvoicesCard {...emptyProps} limitReached={false} />);

    const createButton = screen.getAllByRole("button", { name: /create invoice/i });
    createButton.forEach((button) => {
      expect(button).toBeEnabled();
    });
  });

  it("disables the create button when the free limit is reached", () => {
    render(<InvoicesCard {...emptyProps} limitReached={true} />);

    const createButton = screen.getByRole("button", { name: /create invoice/i });
    expect(createButton).toBeDisabled();
  });
});
