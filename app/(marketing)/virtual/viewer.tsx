"use client";
import React, { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';


const PhotoSphereViewer = ({ imageUrl }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
      if (viewerRef.current) {
        const viewer = new Viewer({
          container: viewerRef.current,
          panorama: imageUrl,
          plugins: [GyroscopePlugin]
        });

        return () => {
          viewer.destroy();
        };
      }

  }, [imageUrl]);

  return (
    <div
      ref={viewerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default PhotoSphereViewer;
