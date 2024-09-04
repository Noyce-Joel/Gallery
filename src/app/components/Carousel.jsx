import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import "./util";
import { easing } from "maath";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function Rig({ images }) {
  const ref = useRef();
  const [selectedIndex, setSelectedIndex] = useState([3, 0]);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const rotation = (2 * Math.PI) / 8;
  const carousels = Math.ceil(images.length / 8);
  const imageMatrix = Array.from({ length: carousels }, (_, i) =>
    images.slice(i * 8, i * 8 + 8)
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      let [cIndex, iIndex] = selectedIndex;

      if (event.key === "ArrowLeft") {
        iIndex = (iIndex + 1) % 8;
      } else if (event.key === "ArrowRight") {
        iIndex = (iIndex - 1 + 8) % 8;
      } else if (event.key === "ArrowUp") {
        if (cIndex > 0) {
          cIndex = cIndex - 1;
        }
      } else if (event.key === "ArrowDown") {
        if (cIndex < carousels - 1) {
          cIndex = cIndex + 1;
        }
      }

      if (event.key === "w") {
        setZoomed(true);
        setZoomLevel((prevZoom) => Math.min(prevZoom + 22, 1));
      }
      if (event.key === "s") {
        event.preventDefault();
        setZoomed(false);
        setZoomLevel((prevZoom) => Math.max(prevZoom - 22, -1));
      }

      setSelectedIndex([cIndex, iIndex]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, carousels]);

  useFrame((state, delta) => {
    if (ref.current) {
      const [cIndex, iIndex] = selectedIndex;
      const currentRotation = ref.current.rotation.y;
      const targetRotation = -iIndex * rotation;
      const diff = targetRotation - currentRotation;
      const adjustedRotation =
        currentRotation + Math.atan2(Math.sin(diff), Math.cos(diff));
      const targetY = -cIndex * 6;
      const zoomZ = 6 - zoomLevel * 2;

      easing.damp(ref.current.rotation, "y", adjustedRotation, 0.28, delta);
      easing.damp3(state.camera.position, [0, targetY, zoomZ], 0.28, delta);

      const direction = new THREE.Vector3();
      state.camera.getWorldDirection(direction);
      state.camera.lookAt(
        state.camera.position.x + direction.x,
        state.camera.position.y + direction.y,
        state.camera.position.z + direction.z
      );
    }
  });

  return (
    <group ref={ref}>
      {imageMatrix.map((carouselImages, i) => (
        <Carousel
          key={i}
          radius={2.5}
          count={8}
          images={carouselImages}
          position={[0, -i * 6, 0]}
          selectedIndex={selectedIndex[0] === i ? selectedIndex[1] : null}
          zoomed={zoomed}
        />
      ))}
    </group>
  );
}

function Carousel({
  radius = 2.5,
  count = 8,
  images,
  position,
  selectedIndex,
  zoomed,
}) {
  return (
    <group position={position}>
      {images.map((image, i) => (
        <Card
          key={i}
          url={image}
          position={[
            Math.sin((i / count) * Math.PI * 2) * radius * 4.5,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius * 4.5,
          ]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
          isSelected={selectedIndex === i}
          zoomed={zoomed}
        />
      ))}
    </group>
  );
}

function Card({ url, story, isSelected, zoomed, ...props }) {
  const ref = useRef();
  const textRef = useRef();
  const [bend, setBend] = useState(0.6);
  const scale = isSelected ? [1.6, 1, 1] : [1.4, 0.88, 1];
  const windowWidth = window.innerWidth;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1150;

  useFrame((state, delta) => {
    easing.damp(ref.current.scale, scale, 0.1, delta);
    const targetBend = zoomed ? 0.0002 : isMobile ? 0.2 : isTablet ? 0.4 : 0.6;
    setBend(THREE.MathUtils.lerp(bend, targetBend, 0.06));

    if (textRef.current) {
      textRef.current.material.opacity = zoomed ? 1 : 0;
    }
  });

  return (
    <group {...props}>
      <motion.group
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image ref={ref} scale={[1.6, 1, 1]} url={url} alt="gallery-image">
          <bentPlaneGeometry args={[bend, 5, 5, 20, 20]} />
        </Image>
      </motion.group>
    </group>
  );
}
