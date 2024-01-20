import React, { useState } from "react";
import html2canvas from "html2canvas";

export default function ScreenShot() {
  const [imgData, setImgData] = useState<string>('');

  const captureScreenshot = () => {
    const galleryEl = document.getElementById("body");

    if (galleryEl) {
      html2canvas(galleryEl).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setImgData(imgData);
      });
    }
  };

  const downloadImage = () => {
    if (imgData) {
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    }
  };

  return (
    <div className="absolute p-10 w-1/2 h-1/2 top-10 z-20">
      <button onClick={captureScreenshot}>Create Collage</button>
      <div>
      {imgData && <img src={imgData} alt="Screenshot" className="absolute w-full h-full"/>}
      </div>
      <button onClick={downloadImage}>Download Screenshot</button>
    </div>
  );
}