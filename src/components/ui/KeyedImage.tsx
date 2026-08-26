"use client";

import { useEffect, useState } from "react";

interface KeyedImageProps {
  src: string;
  alt: string;
  className?: string;
  threshold?: number; // 0-255
}

export function KeyedImage({ src, alt, className, threshold = 30 }: KeyedImageProps) {
  const [keyedSrc, setKeyedSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Soft black chroma-key
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate average brightness
          const brightness = (r + g + b) / 3;

          if (brightness < threshold) {
            // Soft alpha edge transition
            const minBright = Math.max(0, threshold - 20);
            const alphaRange = Math.max(1, threshold - minBright);
            const factor = (brightness - minBright) / alphaRange;
            const alpha = Math.max(0, Math.min(1, factor)) * 255;
            data[i + 3] = alpha;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (isMounted) {
          setKeyedSrc(canvas.toDataURL());
        }
      } catch (err) {
        // Fallback to original image if cross-origin canvas security prevents reading data
        console.warn("Canvas chroma-key fallback due to security restrictions:", err);
      }
    };

    img.onerror = () => {
      // Gracefully handle image load failures
      if (isMounted) {
        setKeyedSrc(src);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src, threshold]);

  return (
    <img 
      src={keyedSrc || src} 
      alt={alt} 
      className={className} 
      loading="lazy"
    />
  );
}
