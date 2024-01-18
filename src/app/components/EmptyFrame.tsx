import {  useTransform, motion } from 'framer-motion';

const EmptyFrame = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        border: '1px solid #000',
        opacity: opacity,
        height: '200px', // adjust as needed
        width: '100%',
      }}
    />
  );
};