"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Rig from "../../components/Carousel";
import { motion } from "framer-motion";
import NavigationTips from "../../components/navigation/Navigation";
import { fetchAlbum } from "@/app/lib/fetchAlbum";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const ThreeDContent = ({ images }: { images: any[] }) => (
  <Canvas dpr={[1, 2]} gl={{ antialias: false }}>
    <ScrollControls>
      <ambientLight intensity={1.4} />
      <Scroll>
        <group position={[0, 0, 11.8]}>
          <Rig images={images} />
        </group>
      </Scroll>
    </ScrollControls>
  </Canvas>
);

const ProjectContent = ({ images }: any) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="w-full h-full lg:flex hidden"
    >
      <ThreeDContent images={images} />
    </motion.div>
    <div className="lg:hidden flex text-2xl w-full h-full p-20 justify-center items-center">
      This page is not currently supported on mobile. Please view the page on a
      desktop
    </div>
    <NavigationTips />
  </>
);

export default function Page({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getAlbumImages = async () => {
      try {
        const albumImages = await fetchAlbum(albumName);
        if (albumImages && albumImages.resources) {
          const allImages = albumImages.resources.map(
            (resource: any) => resource.secure_url
          );

          const randomIndices = getRandomImageIndices(
            Math.min(40, allImages.length),
            allImages.length
          );
          const selectedImages = randomIndices.map((index) => allImages[index]);

          setImages(selectedImages);
        }
      } catch (error) {
        console.error("Error fetching album images:", error);
      } 
    };
    getAlbumImages();
  }, [albumName]);

  const getRandomImageIndices = (count: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  };

  return (
    <Suspense fallback={<LoadingSpinner albumName={albumName} />}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-full h-full lg:flex hidden"
      >
        <ThreeDContent images={images} />
      </motion.div>
      <div className="lg:hidden flex text-2xl w-full h-full p-20 justify-center items-center">
        This page is not currently supported on mobile. Please view the page on
        a desktop
      </div>
      <NavigationTips />
    </Suspense>
  );
}
