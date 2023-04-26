import { describe, it, expect, beforeEach, vi } from "vitest";
import React, { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", async () => {
  beforeEach(async () => {
    await render(<App />);
  });

  it("should render a heading and paragraph ", async () => {
    expect(
      screen.getByRole("heading", {
        name: /Welcome!/i,
        level: 1,
      })
    ).toBeVisible();

    expect(screen.getByText(/Let us try out some unit testing/i)).toBeVisible();
  });

  it("should render two buttons", async () => {
    expect(screen.getByRole("button", { name: /Count is /i })).toBeVisible();
    expect(screen.getByRole("button", { name: /Reset count/i })).toBeVisible();
  });

  it('should update the count when the "Count is" button is clicked', async () => {
    const user = userEvent.setup();
    const countButton = screen.getByRole("button", { name: /Count is /i });

    expect(countButton).toHaveTextContent(/Count is 0/i);
    await user.click(countButton);
    expect(countButton).toHaveTextContent(/Count is 1/i);
  });

  it('should reset the count if "Reset" button is clicked', async () => {
    const user = userEvent.setup();
    const countButton = screen.getByRole("button", { name: /Count is /i });
    const resetButton = screen.getByRole("button", { name: /Reset count/i });

    expect(countButton).toHaveTextContent(/Count is 0/i);
    await user.click(countButton);
    expect(countButton).toHaveTextContent(/Count is 1/i);
    await user.click(resetButton);
    expect(countButton).toHaveTextContent(/Count is 0/i);
  });
});
