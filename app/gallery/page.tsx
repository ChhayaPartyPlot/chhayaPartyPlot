"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Footer } from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
/* ================= Cookie Helper ================= */

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const Gallery = () => {
  const [fadeIn, setFadeIn] = useState(false);

  const [images, setImages] = useState<
    { _id: string; url: string; width: number; height: number }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= Keyboard Navigation ================= */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  /* ================= Check Login ================= */

  useEffect(() => {
    const token = getCookie("session_token");
    setLoggedIn(!!token);
  }, []);

  /* ================= Fetch Images ================= */

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300);

    const fetchImages = async () => {
      try {
        const res = await fetch("/api/image");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /* ================= Delete ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/image?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      const updatedImages = await (await fetch("/api/image")).json();

      setImages(updatedImages);

      alert("Image deleted successfully!");
    } catch (error) {
      alert("Error deleting image");
      console.error(error);
    }
  };

  /* ================= Upload ================= */

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        alert(`Upload failed: ${json.error}`);
        return;
      }

      alert("Image uploaded successfully!");

      const updatedImages = await (await fetch("/api/image")).json();

      setImages(updatedImages);
    } catch (error) {
      alert("Upload error");
      console.error(error);
    } finally {
      setUploading(false);

      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  /* ================= Navigation ================= */

  const handleNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <main className="bg-[#FEFFF1] pt-16 min-h-screen">
      {/* ================= HERO ================= */}

      <div className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] w-full">
        <Image
          src="/D3.JPG"
          alt="Chhaya Partyplot"
          fill
          className="object-cover brightness-50"
        />

        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
          <h1
            className={`
              text-2xl
              sm:text-3xl
              md:text-5xl
              font-bold
              italic
              transition-all
              duration-700
              ${
                fadeIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-6"
              }
            `}
          >
            Moments Worth Remembering
          </h1>
        </div>
      </div>

      {/* ================= Upload ================= */}

      <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex justify-end">
        {loggedIn && (
          <>
            <button
              onClick={handleUploadClick}
              disabled={uploading}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm sm:text-base
                py-2 px-4 sm:px-5
                rounded-lg
                shadow
                transition
              "
            >
              {uploading ? "Uploading..." : "Upload Image"}
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

      {/* ================= Gallery ================= */}

      <div className="px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-lg py-10">Loading images...</div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, index) => (
              <div
                key={img._id}
                className="
                  break-inside-avoid
                  rounded-lg
                  overflow-hidden
                  shadow-lg
                  bg-white
                  hover:scale-[1.02]
                  transition
                  relative
                "
              >
                <img
                  src={img.url}
                  alt="Gallery image"
                  onClick={() => setSelectedIndex(index)}
                  className="w-full h-auto cursor-pointer"
                  loading="lazy"
                />

                {loggedIn && (
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="
                      absolute
                      top-2 right-2
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      text-xs
                      px-2 py-1
                      rounded-md
                      shadow
                      transition
                    "
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Lightbox ================= */}

      {selectedIndex !== null && (
        <div
          className="
            fixed inset-0
            backdrop-blur-lg
            bg-black/40
            flex items-center justify-center
            z-50
          "
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}

          <button
            className="
              absolute
              top-5 right-5
              text-white
              text-3xl sm:text-4xl
              font-bold
            "
            onClick={() => setSelectedIndex(null)}
          >
            ×
          </button>

          {/* Prev */}

          <button
            className="
              absolute
              left-4
              text-white
              text-3xl sm:text-5xl
              font-bold
            "
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            ‹
          </button>

          {/* Image */}

          <img
            src={images[selectedIndex].url}
            alt="Full view"
            className="
              max-h-[85vh]
              max-w-[95vw]
              object-contain
              rounded-lg
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}

          <button
            className="
              absolute
              right-4
              text-white
              text-3xl sm:text-5xl
              font-bold
            "
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Gallery;
