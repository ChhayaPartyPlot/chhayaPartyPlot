import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationArrow,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export function Footer() {
  return (
    <footer className="bg-[#c3ca6d] text-zinc-300 w-full z-50">
      <div className="container mx-auto pt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo */}
          <div className="space-y-4 flex flex-col md:flex-row items-center md:items-start">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
              <Image
                src="/logo.png"
                alt="Chhaya Party Plot"
                width={280}
                height={60}
                className="mb-4"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex justify-start">
            <nav className="flex flex-col space-y-2 items-center md:items-start">
              <h3 className="text-xl font-medium mb-4 text-black">Explore</h3>

              <Link
                href="/"
                className="text-black hover:underline transition-colors"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-black hover:underline transition-colors"
              >
                About
              </Link>

              <Link
                href="/gallery"
                className="text-black hover:underline transition-colors"
              >
                Gallery
              </Link>

              <Link
                href="/reservation"
                className="text-black hover:underline transition-colors"
              >
                Reservation
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <ul className="space-y-3 text-center md:text-left text-[#2c1f17]">
            {/* Phone */}
            <li>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <FaPhoneAlt size={18} className="mt-[4px] shrink-0 w-[18px]" />

                <p className="mb-0">
                  <strong>Phone:</strong>{" "}
                  <Link
                    href="tel:+917600616660"
                    className="text-black hover:underline"
                  >
                    +91 76006 16660
                  </Link>
                </p>
              </div>
            </li>

            {/* Email */}
            <li>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <IoMail size={18} className="mt-[4px] shrink-0 w-[18px]" />

                <p className="mb-0">
                  <strong>Email:</strong>{" "}
                  <Link
                    href="mailto:chhayapartyplot@gmail.com"
                    className="text-black hover:underline"
                  >
                    chhayapartyplot@gmail.com
                  </Link>
                </p>
              </div>
            </li>

            {/* Address */}
            <li>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <FaLocationArrow
                  size={18}
                  className="mt-[4px] shrink-0 w-[18px]"
                />

                <div className="text-left leading-relaxed">
                  <strong>Address:</strong>{" "}
                  <Link
                    href="https://www.google.com/maps/place/Chhaya+Party+Plot/@20.7288678,73.0306851,17z/data=!3m1!4b1!4m6!3m5!1s0x3be0ed1aac0027a3:0xa2d6c4b636ce3d7f!8m2!3d20.7288678!4d73.0306851!16s%2Fg%2F11v0y548kr?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    Chhaya Party Plot, Chimla, NH 48, Chikhli, Navsari-396521.
                  </Link>
                </div>
              </div>
            </li>
            <ul className="social-media mt-4 flex gap-4 justify-start md:justify-start">
              {/* Instagram */}
              <li>
                <Link
                  href="https://www.instagram.com/chhaya_partyplot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition-colors"
                >
                  <FaInstagram size={20} />
                </Link>
              </li>
              {/* WhatsApp */}
              <li>
                <Link
                  href="https://wa.me/917600616660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition-colors"
                >
                  <FaWhatsapp size={20} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@ChhayaPartyPlot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition-colors"
                >
                  <FaYoutube size={20} />
                </Link>
              </li>

              {/* Facebook */}
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61560839651768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition-colors"
                >
                  <FaFacebookF size={20} />
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black/20 w-full py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs text-zinc-500">
          <div className="text-center md:text-left">
            <p className="mb-0">
              © {new Date().getFullYear()}{" "}
              <Link
                href="https://chhayapartyplot.com/"
                target="_blank"
                className="hover:text-black transition-colors"
              >
                Chhaya Party Plot
              </Link>{" "}
              | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
