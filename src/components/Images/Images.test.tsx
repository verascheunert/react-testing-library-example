import { describe, it, expect, vi } from "vitest";
import React, { act, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Images from "./Images";
import { mockImages } from "../mockData";

vi.mock("axios");

describe("Images", async () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  const axiosSpy = vi.spyOn(axios, "get");

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    axiosSpy.mockClear();
  });

  it("should render a list of images", async () => {
    axiosSpy.mockResolvedValueOnce({ data: mockImages });
    render(<Images />);
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(9);
  });

  it("should not find images without mocked localstorage", async () => {
    axiosSpy.mockResolvedValueOnce({ data: [] });
    await act(async () => {
      render(<Images />);
    });

    expect(screen.getByText(/No images found/i)).toBeVisible();
  });

  it("should fetch random images from API and caches them in localStorage", async () => {
    axiosSpy.mockResolvedValueOnce({ data: mockImages });

    await act(async () => {
      render(<Images />);
    });

    await waitFor(() => {
      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/photos/random?count=9&client_id=yY1gFp2F0Cq2FK8bprtDWMkwIm7ZQ2b0Nxw4ZCFLdr4"
      );
      expect(localStorage.getItem("randomImages")).toEqual(
        JSON.stringify(mockImages)
      );
    });
  });

  it("handles error when fetching random images", async () => {
    const mockError = "Failed to fetch images";
    axiosSpy.mockRejectedValueOnce(new Error(mockError));
    const consoleErrorSpy = vi.spyOn(console, "error");

    await act(async () => {
      render(<Images />);
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching random images:",
        new Error(mockError)
      );
    });
  });
});
