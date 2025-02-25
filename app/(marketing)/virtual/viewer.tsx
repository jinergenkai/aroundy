"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';


const PhotoSphereViewer = ({ imageUrl }) => {
  const viewerRef = useRef(null);
  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new Viewer({
        container: viewerRef.current,
        panorama: imageUrl,
        loadingImg: 'https://webartdevelopers.com/blog/wp-content/uploads/2021/01/text-ring-loading-animation.gif',
        // navbar: [
        //   'zoomIn',
        //   'zoomOut',
        //   'autorotate',
        //   'fullscreen',
        //   {
        //     id: 'custom-gyroscope-btn',
        //     content: `<span>${gyroscopeEnabled ? '🔄 Disable Gyro' : '🧭 Enable Gyro'}</span>`,
        //     title: 'Toggle Gyroscope',
        //     className: 'custom-gyroscope-btn',
        //     onClick: () => {
        //       const gyroscopePlugin = viewer.getPlugin(GyroscopePlugin);
        //       if (gyroscopePlugin) {
        //         if (gyroscopeEnabled) {
        //           gyroscopePlugin.stop(); // Disable gyroscope
        //           setGyroscopeEnabled(false);
        //         } else {
        //           gyroscopePlugin.start(); // Enable gyroscope
        //           setGyroscopeEnabled(true);
        //         }
        //       }
        //     },
        //   },
        // ],
        plugins: [[GyroscopePlugin, {
          // touchmove: false,
          // roll: false,
          // absolutePosition: true,
          // moveMode: 'fast',
        }],
        ],
      });

      return () => viewer.destroy();
    }
  }, [imageUrl, gyroscopeEnabled]);

  return (
    <div ref={viewerRef} style={{ width: '100vw', height: '80vh' }}></div>
  );
};

export default PhotoSphereViewer;
