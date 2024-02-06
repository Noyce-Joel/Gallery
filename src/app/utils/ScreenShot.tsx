import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";

export default function ScreenShot({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const [image, setImage] = useState<any>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const getImage = () => {
    if (ref.current) {
      html2canvas(ref.current, {
        useCORS: true,
        proxy: 'https://res.cloudinary.com/dhkbmh13s/image/upload/q_auto:low/v1705067761/',
      
        windowWidth: width,
        windowHeight: height,
        allowTaint: false,
      }).then((canvas) => {
        setImage(canvas.toDataURL());
      });
    }
    
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={ref}>
      <button onClick={getImage}>Collage</button>
      <button className="ml-7" onClick={downloadImage}>
        Download
      </button>
      {image ? (
          <Image
            src={image}
            width={2000}
            height={400}
            alt="screen-shot"
            className="w-full h-auto"
            
          />
        ) : null}
      <div  className="grid grid-cols-5 gap-2 p-4 scale-75">
        
        {children}
      </div>
    </div>
  );
}
