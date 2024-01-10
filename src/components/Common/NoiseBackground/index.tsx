import React, { useRef, useEffect } from 'react';

const NoiseBackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas.getContext('2d');

    const generateNoiseTexture = () => {
      const imageData = context.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value;  // Red channel
        data[i + 1] = value;  // Green channel
        data[i + 2] = value;  // Blue channel
        data[i + 3] = Math.floor(Math.random() * 50);  // Alpha channel (transparency)
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
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NoiseBackgroundCanvas;
