import React from "react";
import { UnsplashImage } from "../Images/Images";

const Image: React.FC<{ image: UnsplashImage }> = ({ image }) => {
  return (
    <div className="h-44 w-44 overflow-hidden rounded-lg justify-self-center xs:mx-2 mb-8">
      {image.urls && image.urls.regular ? (
        <img
          src={image.urls.regular}
          alt=""
          className="h-full w-full bg-indigo-100 object-cover object-center"
        />
      ) : (
        <div>Error: Image URL not available</div>
      )}
    </div>
  );
};
export default Image;
