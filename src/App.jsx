import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

export default function App() {
  const [lightningUrl, setLightningUrl] = useState("LN:");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const images = [
    "images/scratch-off/image0.png",
    "images/scratch-off/image1.png",
    "images/scratch-off/image2.png",
    "images/scratch-off/image3.png",
    "images/scratch-off/image4.png",
    "images/scratch-off/image5.png",
    "images/scratch-off/image6.png",
    "images/scratch-off/image7.png",
    "images/scratch-off/image8.png",
    "images/scratch-off/image9.png",
    "images/scratch-off/image10.png",
    "images/scratch-off/image11.png",
    "images/scratch-off/image12.png",
    "images/scratch-off/image13.png",
    "images/scratch-off/image14.png",
  ];

  useEffect(() => {
    if (intervalId) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < images.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [images.length, intervalId]);

  const handleClick = async () => {
    setCurrentIndex(0); // Reset to the first image
    setIntervalId(new Date().getTime()); // Start the image sequence

    try {
      const response = await fetch("http://bore.pub:12524/generate");
      const data = await response.json();
      setLightningUrl(data);
    } catch (error) {
      console.error("Error fetching the lightning URL:", error);
    }
  };

  return (
    <div className="flex flex-col gap-12 bg-black justify-center items-center h-screen">
      <h1 className="font-semibold text-4xl text-white">
        Scratch and win some SATs
      </h1>
      <div
        className="flex justify-around items-center shadow-lg h-96 px-3 bg-white rounded-lg"
        style={{ width: "700px" }}
      >
        <div className="flex items-center justify-center">
          <h2 className="uppercase text-orange-600 flex flex-col items-center justify-center">
            <span className="font-semibold text-3xl">Instant</span>
            <span className="font-semibold text-6xl">winner</span>
          </h2>
        </div>

        <div
          className="flex items-center justify-center relative"
          style={{ width: "256px", height: "256px" }}
        >
          {lightningUrl && currentIndex >= images.length - 1 ? (
            <QRCode value={lightningUrl} size={256} />
          ) : (
            images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index}`}
                className={index === currentIndex ? "active" : ""}
                style={{
                  display: index === currentIndex ? "block" : "none",
                  width: "256px",
                  height: "256px",
                  position: "absolute",
                  zIndex: 100,
                }}
              />
            ))
          )}
        </div>
      </div>
      <button
        className="text-white bg-orange-400 shadow-xl p-2 rounded-md"
        onClick={handleClick}
      >
        Click here to win
      </button>
    </div>
  );
}
