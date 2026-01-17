'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsCard = ({ title, value, color, icon, delay }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (inView) {
      const animation = () => {
        const duration = 2000; // 2 seconds
        const start = 0;
        const end = value;
        const range = end - start;
        let startTime = null;

        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * range + start));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      };
      animation();
    }
  }, [value, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={`card bg-gradient-to-br ${color} rounded-2xl border-2 border-yellow-400 shadow-lg p-4`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 text-yellow-900">{icon}</div>
        <div className="flex-1">
          <div className="stat-title text-yellow-800">{title}</div>
          <div className="stat-value text-yellow-900 font-bold text-3xl">{count}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
