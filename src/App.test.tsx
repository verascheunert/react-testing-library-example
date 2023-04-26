import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", async () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render a heading and paragraph ", async () => {
    expect(
      screen.getByRole("heading", {
        name: /Welcome!/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });
});
