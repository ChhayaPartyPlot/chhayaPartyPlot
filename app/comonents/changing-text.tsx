"use client";
import { useEffect, useState } from "react";

const words = ["Wedding", "Birthday Party", "Business Party"];

const ChangingText = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[index];
    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting && charIndex === 0 ? 1000 : typingSpeed;

    const timeout = setTimeout(() => {
      setText(currentWord.substring(0, charIndex));

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <span className="text-green-700 font-bold">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default ChangingText;