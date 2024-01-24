'use client'
import { motion } from "framer-motion";
import "./styles.scss"


export default function Loading() {
  const circleVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.5, 1],
      rotate: [0, 360],
      borderRadius: ["20%", "30%", "50%", "50%", "30%"],
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };
  const textVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };
  return (
    <>
      <main className="main">
        <motion.h1 variants={textVariants} initial="initial" animate="animate" style={{ fontSize: 24, textAlign: "center", marginBottom:"2rem" }}>
          Loading
        </motion.h1>
        <div className="motion">
          <div>
            <motion.div className="box" variants={circleVariants} initial="initial" animate="animate" />
          </div>
          <div>
            <motion.div className="box" variants={circleVariants} initial="initial" animate="animate" />
          </div>
          <div>
            <motion.div className="box" variants={circleVariants} initial="initial" animate="animate" />
          </div>
        </div>
      </main>
    </>
  );
}
