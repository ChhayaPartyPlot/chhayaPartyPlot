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
      <div className="container mx-auto px-3 pt-4 md:pt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-center items-center ">
          {/* Logo */}
          <div className="space-y-4 flex flex-col md:flex-row items-start md:items-start">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
              <Image
                src="/logo.png"
                width={280}
                height={60}
                className="mb-2 w-47.5 sm:w-57.5 md:w-70 h-auto"
                alt={""}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="
    space-y-4
    text-center
    md:text-right
    text-[#2c1f17]
  "
          >
            {/* Contact List */}
            <ul className="space-y-1 md:space-y-2 list-none m-0 p-0">
              {/* Phone */}
              <li>
                <div className="flex items-start gap-3 justify-start md:justify-end">
                  <FaPhoneAlt size={18} className="mt-[3px] shrink-0" />

                  <p className="text-sm sm:text-base leading-relaxed">
                    <strong>Phone:</strong>{" "}
                    <Link
                      href="tel:+917600616660"
                      className="text-black hover:underline wrap-break-word"
                    >
                      +91 76006 16660
                    </Link>
                  </p>
                </div>
              </li>

              {/* Email */}
              <li>
                <div className="flex items-start gap-3 justify-start md:justify-end">
                  <IoMail size={18} className="mt-[3px] shrink-0" />

                  <p className="text-sm sm:text-base leading-relaxed">
                    <strong>Email:</strong>{" "}
                    <Link
                      href="mailto:chhayapartyplot@gmail.com"
                      className="text-black hover:underline break-all"
                    >
                      chhayapartyplot@gmail.com
                    </Link>
                  </p>
                </div>
              </li>

              {/* Address */}
              <li>
                <div className="flex items-start gap-3 justify-start md:justify-end">
                  <FaLocationArrow size={18} className="mt-0.75 shrink-0" />

                  <p className="text-sm sm:text-base leading-relaxed text-left md:text-right ">
                    <strong>Address:</strong>{" "}
                    <Link
                      href="https://www.google.com/maps/place/Chhaya+Party+Plot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline word-break break-word"
                    >
                      Chhaya Party Plot, Chimla, NH 48, Chikhli, Navsari-396521
                    </Link>
                  </p>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <ul
              className="
    
      flex
      gap-4
      justify-center
      md:justify-end
      list-none
     md:m-0 md:p-0
     mt-2
    
  
    "
            >
              <li>
                <Link
                  href="https://www.instagram.com/chhaya_partyplot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </Link>
              </li>

              <li>
                <a
                  href={`https://wa.me/917600616660?text=${encodeURIComponent(
                    "Hello, I would like to enquire about booking Chhaya Party Plot.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#25D366] transition"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              </li>

              <li>
                <Link
                  href="https://www.youtube.com/@ChhayaPartyPlot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61560839651768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#2c1f17] transition"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} />
                </Link>
              </li>
            </ul>
          </div>
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
