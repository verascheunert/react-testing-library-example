import { describe, it, expect } from "vitest";
import React, { render, screen } from "@testing-library/react";
import Image from "./Image";

describe("Image", async () => {
  const mockImage = {
    id: "1",
    urls: {
      regular: "example.com",
    },
    alt_description: "Image 1",
  };

  const mockImageWithoutUrl = {
    id: "1",
    urls: {},
    alt_description: "Image 1",
  };
  it("should render an image", async () => {
    render(<Image image={mockImage} />);
    const image = await screen.findByRole("img");
    expect(image).toBeVisible();
    expect(image).toHaveAttribute("src", "example.com");
  });

  it("should render 'Error: Image URL not available' when image URL is missing", async () => {
    render(<Image image={mockImageWithoutUrl} />);

    expect(
      screen.getByText("Error: Image URL not available")
    ).toBeInTheDocument();
  });
});
