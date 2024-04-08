import React, { useRef, useEffect } from 'react';

const NoiseBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const generateNoiseTexture = () => {
      const imageData = context.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value; // Red channel
        data[i + 1] = value; // Green channel
        data[i + 2] = value; // Blue channel
        data[i + 3] = Math.floor(Math.random() * 20); // Decreased alpha channel
      }

      context.putImageData(imageData, 0, 0);
    };

    const animateNoise = () => {
      generateNoiseTexture();
      requestAnimationFrame(animateNoise);
    };

    animateNoise();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NoiseBackgroundCanvas;
