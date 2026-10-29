import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Spotlight({ className, size = 200, springOptions = { bounce: 0 } }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);
  const spotlightLeft = useTransform(mouseX, x => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, y => `${y - size / 2}px`);

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    setParentElement(el);
    return undefined;
  }, []);

  const handleMouseMove = useCallback(event => {
    if (!parentElement) return;
    const rect = parentElement.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }, [mouseX, mouseY, parentElement]);

  useEffect(() => {
    if (!parentElement) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', enter);
    parentElement.addEventListener('mouseleave', leave);
    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', enter);
      parentElement.removeEventListener('mouseleave', leave);
    };
  }, [parentElement, handleMouseMove]);

  return <motion.div ref={containerRef} className={cn('spotlight-effect', isHovered ? 'is-visible' : '', className)}
    style={{ width: size, height: size, left: spotlightLeft, top: spotlightTop }} />;
}
