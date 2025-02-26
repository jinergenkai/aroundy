"use client";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { ReactPhotoSphereViewer, ViewerAPI } from "react-photo-sphere-viewer";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
const caption = 'Cape Florida Light, Key Biscayne <b>&copy; Pixexid</b>';

export default function VirtualTour({ params }) {
  const photoSphereRef = React.useRef<ViewerAPI | null>(null);
  const [clickPosition, setClickPosition] = useState({ longitude: 0, latitude: 0 });

  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    console.log(markersPlugs);
    markersPlugs.addEventListener("select-marker", () => {
      console.log("asd");
    });

    instance.addEventListener('click', ({ data }) => {
      console.log(`${data.rightclick ? 'right ' : ''}clicked at yaw: ${data.yaw} pitch: ${data.pitch}`);
      setClickPosition({ longitude: data.yaw, latitude: data.pitch });
    });

    const gyroscopePlugin = instance.getPlugin(GyroscopePlugin) as GyroscopePlugin;
    gyroscopePlugin?.start(); 
  };

  const plugins = [
    GyroscopePlugin,
    MarkersPlugin,
    // [GalleryPlugin, {
    //   thumbnailSize: { width: 100, height: 100 },
    // }],
    [VirtualTourPlugin, {
      positionMode: 'gps',
      renderMode: '3d',
      nodes: nodes,
      startNodeId: '2',
    }],
  ] as any;

  // function handleGyroscope(e): void {
  //   const gyroscopePlugin = viewer.current?.getPlugin(GyroscopePlugin) as GyroscopePlugin;
  //   if (gyroscopePlugin.isEnabled()) {
  //     gyroscopePlugin.stop();
  //     // viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.remove('enabled');
  //   }
  //   else {
  //     gyroscopePlugin.start();
  //     // viewer.current?.navbar.getButton('custom-gyroscope-btn').container.classList.add('enabled');
  //   }

  // }

  return (
    <div className="App">
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        // src="/images/view3.jpg"
        src={`${baseUrl}loader.gif`}
        // touchmoveTwoFingers={true}
        // mousewheelCtrlKey={true}
        navbar={['zoom', 'move', 'caption', 'gyroscope']}
        // defaultZoomLvl={0}
        // littlePlanet={true}
        hideNavbarButton={true}
        height={"100vh"}
        width={"100vw"}
        onReady={handleReady}
        plugins={plugins}
      />
      {/* <Button onClick={handleGyroscope} className='fixed bottom-0 left-1/2 mb-4 -translate-x-1/2'>Cảm biến {clickPosition.longitude} {clickPosition.latitude}</Button> */}
    </div>
  );
}




const markerLighthouse = {
  id: 'marker-1',
  image: baseUrl + 'pictos/pin-red.png',
  tooltip: 'Cape Florida Light, Key Biscayne',
  size: { width: 32, height: 32 },
  anchor: 'bottom center',
  gps: [-80.155973, 25.666601, 29 + 3],
};

const nodes = [
  {
    id: '1',
    panorama: baseUrl + 'tour/key-biscayne-1.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-1-thumb.jpg',
    name: 'One',
    caption: `[1] ${caption}`,
    links: [{ nodeId: '2' }],
    markers: [markerLighthouse],
    gps: [-80.156479, 25.666725, 3],
    sphereCorrection: { pan: '33deg' },
  },
  {
    id: '2',
    panorama: baseUrl + 'tour/key-biscayne-2.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-2-thumb.jpg',
    name: 'Two',
    caption: `[2] ${caption}`,
    links: [{ nodeId: '3' }, { nodeId: '1' }],
    markers: [markerLighthouse],
    gps: [-80.156168, 25.666623, 3],
    sphereCorrection: { pan: '42deg' },
  },
  {
    id: '3',
    panorama: baseUrl + 'tour/key-biscayne-3.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-3-thumb.jpg',
    name: 'Three',
    caption: `[3] ${caption}`,
    links: [{ nodeId: '4' }, { nodeId: '2' }, { nodeId: '5' }],
    gps: [-80.155932, 25.666498, 5],
    sphereCorrection: { pan: '50deg' },
  },
  {
    id: '4',
    panorama: baseUrl + 'tour/key-biscayne-4.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-4-thumb.jpg',
    name: 'Four',
    caption: `[4] ${caption}`,
    links: [{ nodeId: '3' }, { nodeId: '5' }],
    gps: [-80.156089, 25.666357, 3],
    sphereCorrection: { pan: '-78deg' },
  },
  {
    id: '5',
    panorama: baseUrl + 'tour/key-biscayne-5.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-5-thumb.jpg',
    name: 'Five',
    caption: `[5] ${caption}`,
    links: [{ nodeId: '6' }, { nodeId: '3' }, { nodeId: '4' }],
    gps: [-80.156292, 25.666446, 2],
    sphereCorrection: { pan: '170deg' },
  },
  {
    id: '6',
    panorama: baseUrl + 'tour/key-biscayne-6.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-6-thumb.jpg',
    name: 'Six',
    caption: `[6] ${caption}`,
    links: [{ nodeId: '5' }, { nodeId: '7' }],
    gps: [-80.156465, 25.666496, 2],
    sphereCorrection: { pan: '65deg' },
  },
  {
    id: '7',
    panorama: baseUrl + 'tour/key-biscayne-7.jpg',
    thumbnail: baseUrl + 'tour/key-biscayne-7-thumb.jpg',
    name: 'Seven',
    caption: `[7] ${caption}`,
    links: [{ nodeId: '6' }],
    gps: [-80.15707, 25.6665, 3],
    sphereCorrection: { pan: '110deg', pitch: -3 },
  },
];
