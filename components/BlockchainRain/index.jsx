import React, { useEffect, useRef } from 'react';

const BlockchainRain = () => {
  const canvasRef = useRef(null);
  const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const symbolSize = 20;
  const streamLength = 10; // Stream of symbols behind each raindrop
  const maxSpeed = 30; // Maximum speed of raindrops

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const createRaindrop = () => {
      const symbolStream = Array.from({ length: streamLength }, () => {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        return symbols[randomIndex];
      });
      return {
        x: Math.floor((Math.random() * canvas.width) / symbolSize) * symbolSize,
        y: Math.floor((Math.random() * canvas.height) / symbolSize) * symbolSize,
        symbolStream,
        speed: Math.random() * maxSpeed + 1,
      };
    };

    const raindrops = Array.from({ length: Math.floor(canvas.width / symbolSize) }, createRaindrop);

    const drawRaindrop = (raindrop, i) => {
      ctx.font = `${symbolSize}px monospace`;
      raindrop.symbolStream.forEach((symbol, j) => {
        ctx.fillStyle = `rgba(0,255,0,${0.5 + (0.5 - j / (2 * streamLength))})`; // Adjust opacity based on position in stream
        ctx.fillText(symbol, raindrop.x, raindrop.y - j * symbolSize);
      });
    };

    const updateRaindrop = (raindrop) => {
      ctx.clearRect(
        raindrop.x,
        raindrop.y - symbolSize * (streamLength - 1),
        symbolSize,
        symbolSize * streamLength,
      );
      raindrop.y += raindrop.speed;
      raindrop.symbolStream.pop();
      raindrop.symbolStream.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
      if (raindrop.y > canvas.height + symbolSize * streamLength) {
        raindrop.y = 0;
        raindrop.x = Math.floor((Math.random() * canvas.width) / symbolSize) * symbolSize;
        raindrop.symbolStream = Array.from({ length: streamLength }, () => {
          const randomIndex = Math.floor(Math.random() * symbols.length);
          return symbols[randomIndex];
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raindrops.forEach(drawRaindrop);
      raindrops.forEach(updateRaindrop);
      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const numRaindrops = Math.floor(canvas.width / symbolSize);
      if (numRaindrops > raindrops.length) {
        raindrops.push(...Array.from({ length: numRaindrops - raindrops.length }, createRaindrop));
      } else {
        raindrops.length = numRaindrops;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default BlockchainRain;
