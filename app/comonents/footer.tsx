import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, PinIcon as Pinterest, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 w-full z-50">
      <div className="container mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and About */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/placeholder.svg?height=60&width=240"
              alt="Chhaya Party Plot"
              width={240}
              height={60}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed">
              We look forward to helping you create the perfect atmosphere for your event and create a lifetime of
              memories for you and your families.
            </p>
            <p className="text-sm leading-relaxed">
              So make your celebration the one to remember... Exclusively yours at Evergreen Party Plot.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 flex justify-center">
            <nav className="flex flex-col space-y-2">
            <h3 className="text-xl font-medium mb-4">Explore</h3>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">Contact</h3>
            <address className="not-italic text-sm leading-relaxed">
              bla bla bla Road, Opp. abc xyz,
              <br />
              hiddenleaf,
              <br />
              Surat, Gujarat, India.
            </address>

            <div className="flex items-center gap-2 mt-6 justify-center md:justify-start">
              <Phone size={20} className="text-zinc-400" />
              <a href="tel:+919898221804" className="hover:text-white transition-colors">
                +91 98982 21804
              </a>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={20} className="text-zinc-400" />
              <a href="mailto:info@evergreenpartyplot.com" className="hover:text-white transition-colors underline">
                info@chhayapartyplot.com
              </a>
            </div>

            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a href="https://instagram.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://pinterest.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Pinterest size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-800 py-4 w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <p>Copyright © Chhaya Party Plot</p>
        </div>
      </div>
    </footer>
  );
}