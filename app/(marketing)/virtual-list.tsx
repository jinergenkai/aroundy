"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const places = [
  { name: 'THAILAND', image: '/virtual/thailand.jpg' },
  { name: 'SINGAPORE', image: '/virtual/singapore.jpg' },
  { name: 'PARIS', image: '/virtual/paris.jpg' },
  { name: 'DUBAI', image: '/virtual/dubai.jpg' },
  { name: 'NEW YORK CITY', image: '/virtual/newyork.jpg' },
  { name: 'KUALA LUMPUR', image: '/virtual/kualalumpur.jpg' },
  { name: 'TOKYO', image: '/virtual/tokyo.jpg' },
  { name: 'ROME', image: '/virtual/rome.jpg' },
];

const VirtualList = () => {

  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-2 text-3xl font-bold">Vòng quanh thế giới</h1>
      <p className="mb-6 text-gray-500">Tua du lịch ảo khắp thế giới trên thiết bị của bạn</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {places.map((place, index) => (
          <div key={index} className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg" onClick={() => router.push(`/virtual/${place.name.toLowerCase()}`)}>
            <Image
              src={place.image}
              alt={place.name}
              width={1000}
              height={1000}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <span className="absolute bottom-4 left-4 text-lg font-bold uppercase tracking-wide text-white">
              {place.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
