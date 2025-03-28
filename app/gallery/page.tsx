'use client'
import React, { useState, useEffect } from 'react';
import Masonry from '../comonents/Masonary';
import Image from "next/image";
import { Footer } from '../comonents/footer';

const data = [
    { id: 1, image: '/p1.jpeg', height: 600 },
    { id: 2, image: '/p2.jpeg', height: 400 },
    { id: 3, image: '/p3.jpeg', height: 400 },
    { id: 4, image: '/p4.jpeg', height: 400 },
    { id: 5, image: '/p1.jpeg', height: 400 },
    { id: 6, image: '/image4.jpg', height: 600 },
    { id: 7, image: '/image3.jpg', height: 400 },
    { id: 8, image: '/image6.jpg', height: 400 },
    { id: 9, image: '/image2.jpeg', height: 400 },
    { id: 10, image: '/image1.jpeg', height: 400 },
    { id: 11, image: '/image5.jpg', height: 400 },
    { id: 12, image: '/image4.jpg', height: 300 },
    { id: 13, image: '/image3.jpg', height: 400 },
    { id: 14, image: '/image6.jpg', height: 300 }

];

const Gallery = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 400); 
    }, []);
    

    return (
        <main className="bg-[#FeFFF1] pt-15 mb-3  ">
              <div className="relative min-h-screen bg-[#FeFFF1] ">
                  {/* Hero Section */}
                  <div className="relative h-[40vh] w-full">
                    <Image
                      src="/image6.jpg"
                      alt="Chhaya Partyplot"
                      layout="fill"
                      objectFit="cover"
                      className="brightness-50"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h1
                className={`flex justify-center text-5xl transition-opacity duration-700 transform font-bold italic ${
                    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                }`}
            >
               Snapshots of Celebration
              
            </h1>
            
                    </div>
                  </div>
                
          <div className='p-2'>
            <Masonry data={data} />
            </div>
            </div>
            <Footer/>
        </main>
    );
}

export default Gallery;