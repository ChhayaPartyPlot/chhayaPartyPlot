import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, PinIcon as Pinterest, Phone, Mail } from "lucide-react";

export function Footer() {
return (
<footer className="bg-zinc-900 text-zinc-300 w-full z-50">
<div className="container mx-auto px-4 py-12 w-full">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
{/* Logo and About */}
          <div className="space-y-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
<Image
src="/logo.png"
alt="Chhaya Party Plot"
width={220}
height={60}
className="mb-4"
/>
              <div className="flex flex-col space-y-2">
<div className="flex items-center gap-2 justify-center md:justify-start">
<Phone size={20} className="text-zinc-400" />
                  <a href="tel:+919898221804" className="text-white">
+91 98982 21804
</a>
</div>

<div className="flex items-center gap-2 justify-center md:justify-start">
<Mail size={20} className="text-zinc-400" />
<a href="mailto:info@chhayapartyplot.com" className="text-white">
info@chhayapartyplot.com
</a>
</div>
<div className="space-y-4 md:space-y-0">
                  {/* Contact Information for Mobile */}
<div className="md:hidden">
<h3 className="text-xl font-medium mb-4 text-center">Contact</h3>
                    <address className="not-italic text-sm leading-relaxed text-center">
bla bla bla Road, Opp. abc xyz,
<br />
hiddenleaf,
<br />
Surat, Gujarat, India.
</address>
</div>
<div className="flex gap-4 mt-3 justify-center md:justify-start">
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
<Instagram size={24} />
</a>
<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
<Youtube size={24} />
</a>
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
<Facebook size={24} />
</a>
<a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white">
<Pinterest size={24} />
</a>
</div>
</div>
</div>
</div>
</div>

{/* Navigation */}
<div className="space-y-4 flex justify-center md:block hidden">
<nav className="flex flex-col space-y-2">
<h3 className="text-xl font-medium mb-4 text-center">Explore</h3>
              <Link href="/" className="text-white">
Home
</Link>
              <Link href="/about" className="text-white">
    
About
</Link>
              <Link href="/gallery" className="text-white">
            
Gallery
</Link>
              <Link href="/contact" className="text-white">
Contact
</Link>
</nav>
</div>

{/* Contact Information for Desktop */}
<div className="space-y-4 md:block hidden">
<h3 className="text-xl font-medium mb-4 text-center">Contact</h3>
            <address className="not-italic text-sm leading-relaxed text-center md:text-left">
bla bla bla Road, Opp. abc xyz,
<br />
hiddenleaf,
<br />
Surat, Gujarat, India.
</address>
</div>
</div>
</div>

{/* Copyright */}
<div className="border-t border-zinc-800 py-4 w-full">
<div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs text-zinc-500">
<p>Copyright © Chhaya Party Plot</p>
</div>
</div>
</footer>
);
}