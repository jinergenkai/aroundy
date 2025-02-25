"use client";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { ReactPhotoSphereViewer, ViewerAPI } from "react-photo-sphere-viewer";
import "@photo-sphere-viewer/markers-plugin/index.css";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function SphereComponent() {
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
  };

  const plugins = [
    [
      MarkersPlugin,
      {
        // list of markers
        markers: [
          {
            // image marker that opens the panel when clicked
            id: "image",
            position: { yaw: 1.5195045784394368, pitch: -0.17297899422601049 },
            image: "/images/banner/logo.svg",
            anchor: "bottom center",
            size: { width: 32, height: 32 },
            tooltip: "Monte Civetta, Dolomites, Italy",
          },
        ],
      },
    ],
  ] as any;

  return (
    <div className="App">
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        // src="/images/view3.jpg"
        src="/virtual/background_mountain.jpg"
        // defaultZoomLvl={0}
        // littlePlanet={true}
        hideNavbarButton={true}
        height={"100vh"}
        width={"100vw"}
        onReady={handleReady}
        plugins={plugins}
      />
      <Button onClick={() => console.log("aa")} className='fixed bottom-0 left-1/2 mb-4 -translate-x-1/2'>Cảm biến {clickPosition.longitude} {clickPosition.latitude}</Button>
    </div>
  );
}


export default async function VirtualPage() {
  return (
    // <PhotoSphereViewer src={"images/view1.jpg"} />
    <SphereComponent></SphereComponent>

  )
}
