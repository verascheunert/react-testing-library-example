import { useEffect, useState } from "react";
import axios from "axios";

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
  // Add any other properties you want to include
}

function App() {
  const [count, setCount] = useState(0);

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
      const response = await axios.get(
        "https://api.unsplash.com/photos/random?count=9&client_id=yY1gFp2F0Cq2FK8bprtDWMkwIm7ZQ2b0Nxw4ZCFLdr4"
      );
      const fetchedImages = response.data;
      setRandomImages(fetchedImages);
      localStorage.setItem("randomImages", JSON.stringify(fetchedImages));
    } catch (error) {
      console.error("Error fetching random images:", error);
    }
  };

  return (
    <>
      <div className="px-20 py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <div className="self-center text-center lg:text-left">
            <div className="hidden my-4 h-20 w-20 lg:flex">
              <img
                className="rounded-full h-full w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome!
            </h1>
            <p className="my-4 text-xl text-gray-500">
              Let us try out some unit testing with React Testing Library &
              Vitest
            </p>

            <button
              className="xs:mr-3 mb-6 w-48 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
            <button
              className="xs:mr-3 w-48 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
              onClick={() => setCount(0)}
            >
              Reset count
            </button>
          </div>
          <div className="mt-10">
            <div>
              <div className="flex flex-wrap max-w-[600px] justify-center">
                {randomImages.map((image, index) => (
                  <div
                    key={index}
                    className="h-44 w-44 overflow-hidden rounded-lg justify-self-center xs:mx-2 mb-8"
                  >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
