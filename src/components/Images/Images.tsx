import React, { useEffect, useState } from "react";
import axios from "axios";
import _isEmpty from "lodash.isempty";
import Image from "../Image/Image";

export interface UnsplashImage {
  id: string;
  urls: {
    regular?: string;
  };
  alt_description: string | null;
  // Add any other properties you want to include
}

const API_URL =
  "https://api.unsplash.com/photos/random?count=9&client_id=yY1gFp2F0Cq2FK8bprtDWMkwIm7ZQ2b0Nxw4ZCFLdr4";

const Images: React.FC = () => {
  const [randomImages, setRandomImages] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    const cachedImages = localStorage.getItem("randomImages");
    if (cachedImages) {
      setRandomImages(JSON.parse(cachedImages));
    } else {
      fetchRandomImages();
    }
  }, []);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(API_URL);
      const fetchedImages = response?.data;
      setRandomImages(fetchedImages);
      localStorage.setItem("randomImages", JSON.stringify(fetchedImages));
    } catch (error) {
      console.error("Error fetching random images:", error);
    }
  };

  return (
    <div className="mt-10">
      <div>
        <div className="flex flex-wrap max-w-[600px] justify-center">
          {!_isEmpty(randomImages) ? (
            randomImages.map((image, index) => (
              <Image image={image} key={index} />
            ))
          ) : (
            <div>No images found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Images;
