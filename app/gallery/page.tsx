'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Footer } from '../comonents/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

//const VALID_EVENT_TYPES = ['wedding', 'Birthday', 'party', 'festival']; // Example types - adjust per your backend

const Gallery = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [images, setImages] = useState<{ _id: string; url: string; width: number; height: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  // State for login status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status by reading session_token cookie
    const token = getCookie('session_token');
    setLoggedIn(!!token);
  }, []);
  //const [eventType, setEventType] = useState(VALID_EVENT_TYPES[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 400);

    const fetchImages = async () => {
      try {
        const res = await fetch('/api/image');
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const columnWidth = 300;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploading(true);

      try {
        // Prepare form data
        const formData = new FormData();
        formData.append('file', files[0]);  // Upload one file at a time for now
       // formData.append('eventType', eventType);

        const res = await fetch('/api/image', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();

        if (!res.ok) {
          alert(`Upload failed: ${json.error || 'Unknown error'}`);
          setUploading(false);
          return;
        }

        alert('Image uploaded successfully!');
        // Optionally, refresh images list
        const updatedImages = await (await fetch('/api/image')).json();
        setImages(updatedImages);
      } catch (error) {
        alert('Error uploading image');
        console.error(error);
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = ''; // reset file input
      }
    }
  };

  return (
    <main className="bg-[#FeFFF1] pt-15 mb-3 min-h-screen">
      <div className="relative bg-[#FeFFF1]">
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
              className={`text-5xl font-bold italic transition-opacity duration-700 transform ${
                fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              Snapshots of Celebration
            </h1>
          </div>
        </div>

        {/* Upload Section */}
        <div className="p-4 max-w-7xl mx-auto flex items-center justify-end gap-3">
          {/* <select
            //value={eventType}
            //onChange={(e) => setEventType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {VALID_EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select> */}

          {loggedIn && (
  <>
    <button
      onClick={handleUploadClick}
      disabled={uploading}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow ${
        uploading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {uploading ? 'Uploading...' : 'Upload Image'}
    </button>
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      className="hidden"
    />
  </>
)}

        </div>

        {/* Gallery */}
        <div className="p-4 max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-lg p-5">Loading images...</div>
          ) : (
            <div
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
              style={{ columnGap: '1rem' }}
            >
              {images.map((img) => {
                const height = (img.height / img.width) * columnWidth;
                return (
                  <div
                    key={img._id}
                    className="mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105"
                    style={{ width: `${columnWidth}px` }}
                  >
                    <img
                      src={img.url}
                      alt="Gallery image"
                      width={columnWidth}
                      height={height}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Gallery;
