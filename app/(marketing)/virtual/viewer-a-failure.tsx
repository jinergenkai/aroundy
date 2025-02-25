"use client";
import React, { useEffect, useRef, useState } from 'react';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

import { Viewer } from '@photo-sphere-viewer/core';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

import './sphere.css';
import { Button } from '@/components/ui/button';
import CustomMarkerButton from './custom-point';


const PhotoSphereViewer = ({ src }) => {
  const viewerRef = useRef(null);
  const viewer = useRef<Viewer | null>(null);
  const [clickPosition, setClickPosition] = useState({ longitude: 0, latitude: 0 });


  const gyroCustom = {
    id: 'custom-gyroscope-btn',
    content: `<span>${'Cảm Biến'}</span>`,
    title: 'Cảm biến xoay',
    className: `gyroscope-btn`,
    onClick: () => {
      const gyroscopePlugin = viewer.current?.getPlugin(GyroscopePlugin) as GyroscopePlugin;
      if (gyroscopePlugin.isEnabled()) {
        gyroscopePlugin.stop();
        viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.remove('enabled');
      }
      else {
        gyroscopePlugin.start();
        viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.add('enabled');
      }
    },
  };

  useEffect(() => {
    if (viewerRef.current) {


      viewer.current = new Viewer({
        container: viewerRef.current,
        panorama: src,
        loadingImg: '/images/banner/logo.svg',
        loadingTxt: 'Loading...',
        // navbar: [
        //   'zoom',
        //   'autorotate',
        //   'fullscreen',
        // ],
        plugins: [
          [GyroscopePlugin, {
            // touchmove: false,
            // roll: false,
            // absolutePosition: true,
            // moveMode: 'fast',
          }],
          [MarkersPlugin, {
            markers: [
            //   {
            //   id: 'custom-tooltip',
            //   tooltip: {
            //     content: (document.querySelector('#tooltip-content') as HTMLElement)?.innerText,
            //     className: 'custom-tooltip',
            //     position: 'top',
            //     trigger: 'click',
            //   },
            //   element: document.getElementById('djtmem') as HTMLElement,
            //   position: { pitch: 0.11, yaw: -0.35 },
            //   image: '/images/brick.svg',

            //   size: { width: 32, height: 32 },
            //   anchor: 'bottom center',
            // },

            
            // {
            //   // image marker that opens the panel when clicked
            //   id: "image11",
            //   position: { pitch: 0.11, yaw: -0.35 },
            //   image: "image/banner/logo.jpg",
            //   width: 100,
            //   height: 100,
            //   anchor: "bottom center",
            //   tooltip: "Aqui mora Xango"
            // },



            // {
            //   // image marker that opens the panel when clicked
            //   id: "image123",
            //   longitude: 2.1,
            //   latitude: 0.2,
            //   image: "https://photo-sphere-viewer-data.netlify.app/assets/pictos/pin-blue.png",
            //   width: 100,
            //   height: 100,
            //   anchor: "bottom center",
            //   tooltip: "Aqui mora Xango"
            // },
            {
              id: 'custom-marker-element',
              // element: document.querySelector('#custom-marker-element'),
              element: document.getElementById('custom-marker-element') as HTMLElement,
              listContent: 'Custom element',
              position: { yaw: 0, pitch: -0.3 },
              zIndex: 10,
            }
            ],
          }],
        ],
      });

      const markersPlugin = viewer.current.getPlugin(MarkersPlugin) as MarkersPlugin;

      if (markersPlugin) {
        markersPlugin.addMarker({
          id: 'custom-tooltip11',
          position: { pitch: 0.11, yaw: -0.35 },
          image: '/images/brick.svg',
          size: { width: 32, height: 32 },
          anchor: 'bottom center',
          tooltip: {
            content: 'Đây là marker',
            position: 'top',
            trigger: 'click',
          },
        });
      }


      viewer.current.addEventListener('ready', () => {
        viewer.current?.animate({
          yaw: 0,
          pitch: 0.5,
          speed: 1000,
        })
          .then(() => {
            markersPlugin.showMarkerTooltip('custom-tooltip');
          });
      }, { once: true });


      //* Click event
      if (viewer.current) {
        viewer.current.addEventListener('click', ({ data }) => {
          console.log(`${data.rightclick ? 'right ' : ''}clicked at yaw: ${data.yaw} pitch: ${data.pitch}`);
          setClickPosition({ longitude: data.yaw, latitude: data.pitch });
        });
      }

      return () => viewer.current?.destroy();
    }
  }, [src, viewerRef]);

  // useEffect(() => {
  //   const tooltipContent = document.querySelector('#tooltip-content') as HTMLElement;
  //   if (tooltipContent) {
  //     const img = tooltipContent.querySelector('img') as HTMLImageElement;
  //     const article = tooltipContent.querySelector('article') as HTMLElement;
  //     const markersPlugin = viewer.current?.getPlugin(MarkersPlugin) as MarkersPlugin;

  //     markersPlugin?.updateMarker('custom-tooltip', {
  //       tooltip: {
  //         content: tooltipContent.innerHTML,
  //       },
  //     });
  //   }
  // }
  //   , [clickPosition]);

  function handleGyroscope(e): void {
    const gyroscopePlugin = viewer.current?.getPlugin(GyroscopePlugin) as GyroscopePlugin;
    if (gyroscopePlugin.isEnabled()) {
      gyroscopePlugin.stop();
      // viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.remove('enabled');
    }
    else {
      gyroscopePlugin.start();
      // viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.add('enabled');
    }

  }

  return (
    <>
      <div ref={viewerRef} style={{ width: '100vw', height: '100vh' }}></div>
      <Button onClick={handleGyroscope} className='fixed bottom-0 left-1/2 mb-4 -translate-x-1/2'>Cảm biến {clickPosition.longitude} {clickPosition.latitude}</Button>


      <div id="tooltip-content">
        <img src="https://photo-sphere-viewer-data.netlify.app/assets/sphere-small.jpg" />
        <article>
          <h2>Lorem ipsum</h2>
          <p>
            Vivamus magna. Cras in mi at felis aliquet
            congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
            tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
          </p>
        </article>
      </div>


      <div id='djtmem'>
        <article>
          <h2>Lorem ipsum</h2>
          <p>
            Vivamus magna. Cras in mi at felis aliquet
            congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
            tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
          </p>
        </article>
      </div>

      <div className='h-[1000px] w-10'>1</div>
    </>
  );
};

export default PhotoSphereViewer;


