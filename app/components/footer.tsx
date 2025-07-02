import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, PinIcon as Pinterest, Phone, Mail } from "lucide-react";

export function Footer() {
return (
<footer className="bg-[#c3ca6d] text-zinc-300 w-full z-50">
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
<Phone size={20} className="text-[#2c1f17]" />
                  <a href="tel:+919898221804" className="text-black">
+91 76006 16660
</a>
</div>

<div className="flex items-center gap-2 justify-center md:justify-start">
<Mail size={20} className="text-[#2c1f17]" />
<a href="mailto:info@chhayapartyplot.com" className="text-black">
info@chhayapartyplot.com
</a>
</div>
<div className="space-y-4 md:space-y-0">
                  {/* Contact Information for Mobile */}
<div className="md:hidden text-[#2c1f17]">
<h3 className="text-xl  font-medium text-[#2c1f17] mb-4 text-center">Contact</h3>
                    <address className="not-italic text-[#2c1f17] text-sm leading-relaxed text-center">
Chhaya Party Plot, 
<br />
Near By Chimla Fatak, 
<br />
NH 48, Chikhli-396521, Gujarat, India.
</address>
</div>
<div className="flex gap-4 mt-3 justify-center md:justify-start">
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black">
<Instagram size={24} />
</a>
<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-black">
<Youtube size={24} />
</a>
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black">
<Facebook size={24} />
</a>
{/* <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-black">
<Pinterest size={24} />
</a> */}
</div>
</div>
</div>
</div>
</div>

{/* Navigation */}
<div className="space-y-4 flex justify-center md:block hidden">
<nav className="flex flex-col space-y-2">
<h3 className="text-xl font-medium mb-4 text-center text-black">Explore</h3>
              <Link href="/" className="text-black">
Home
</Link>
              <Link href="/about" className="text-black">
    
About
</Link>
              <Link href="/gallery" className="text-black">
            
Gallery
</Link>
              <Link href="/reservation" className="text-black">
Reservation
</Link>
</nav>
</div>

<div className="space-y-4 md:block ">
  <h3 className="text-xl font-medium mb-4 text-center text-black">Location</h3>

  <div className="w-full h-64 mt-4 relative group">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.870710040295!2d73.0281102!3d20.7288678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ed1aac0027a3%3Aa2d6c4b636ce3d7f!2sChhaya%20Party%20Plot!5e0!3m2!1sen!2sin!4v1716055539421!5m2!1sen!2sin"
      width="100%"
      height="100%"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-md border-0 pointer-events-none"
    ></iframe>

    {/* Invisible full-link over map */}
    <a
      href="https://www.google.com/maps/place/Chhaya+Party+Plot/@20.7288678,73.0306851,17z/data=!3m1!4b1!4m6!3m5!1s0x3be0ed1aac0027a3:0xa2d6c4b636ce3d7f!8m2!3d20.7288678!4d73.0306851!16s%2Fg%2F11v0y548kr?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10"
      aria-label="Open full map"
    ></a>
  </div>
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