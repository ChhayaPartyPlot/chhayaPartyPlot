'use client'
import React, { useState, useEffect } from 'react';
import Masonry from '../comonents/Masonary';

const data = [
    { id: 1, image: 'https://picsum.photos/id/10/200/300', height: 600 },
    { id: 2, image: 'https://picsum.photos/id/14/200/300', height: 400 },
    { id: 3, image: 'https://picsum.photos/id/15/200/300', height: 400 },
    { id: 4, image: 'https://picsum.photos/id/16/200/300', height: 400 },
    { id: 5, image: 'https://picsum.photos/id/17/200/300', height: 400 },
    { id: 6, image: 'https://picsum.photos/id/19/200/300', height: 400 },
    { id: 7, image: 'https://picsum.photos/id/37/200/300', height: 300 },
    { id: 8, image: 'https://picsum.photos/id/39/200/300', height: 400 },
    { id: 9, image: 'https://picsum.photos/id/85/200/300', height: 300 },
    { id: 10, image: 'https://picsum.photos/id/103/200/300', height: 600 }
];

const Gallery = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 400); 
    }, []);

    return (
        <main className="pt-20 mb-3 bg-[#FeFFF1] ">
            <h1
                className={`flex justify-center text-5xl transition-opacity duration-700 transform font-bold italic ${
                    fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                }`}
            >
                Gallery
            </h1>
            <Masonry data={data} />
        </main>
    );
}

export default Gallery;