"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import BottomCTA from "../components/BottomCTA";
import { Footer } from "../components/footer";

export default function About() {
  /* Animation Variants */

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const FeatureBlock = ({
    title,
    label,
    description,
    image,
    reverse,
  }: {
    title: string;
    label: string;
    description: string;
    image: string;
    reverse?: boolean;
  }) => {
    return (
      <div
        className={`
  grid
  grid-cols-1
  md:grid-cols-2
  gap-8 md:gap-10
  items-center
  mt-12 md:mt-20
`}
      >
        {/* Image */}

        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="
  w-full
  h-[220px]
  sm:h-[260px]
  md:h-[350px]
  object-cover
  hover:scale-105
  transition
  duration-500
"
            />
            <div className="absolute bottom-4 left-4">
              <Image
                src="/logo.png"
                alt="Evergreen Party Plot Logo"
                width={100}
                height={50}
              />
            </div>
          </div>
        </motion.div>

        {/* Text */}

        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-10 rounded-2xl shadow-xl"
        >
          <p
            className="text-sm tracking-widest   text-linear-to-r
      from-green-600
      to-emerald-600 font-semibold"
          >
            {label}
          </p>

          <h2 className="text-3xl font-bold mt-2">{title}</h2>

          <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>
        </motion.div>
      </div>
    );
  };
  const features = [
    {
      label: "DISCOVER",
      title: "Enchanting Landscape",
      image: "/p2.jpeg",
      description:
        "Our lush green landscape creates a beautiful natural backdrop for unforgettable celebrations and flexible theme setups.",
    },

    {
      label: "LUXURY",
      title: "Magnificent Bride & Groom Room",
      image: "/p1.jpeg",
      description:
        "Exclusive air-conditioned rooms provide comfort and relaxation for the bride and groom on their special day.",
    },

    {
      label: "LAWN AREA",
      title: "Spacious Lawn",
      image: "/p5.jpeg",
      description:
        "Our expansive 30,000 sq. ft. lawn offers the perfect open-air environment for large-scale weddings and events.",
    },

    {
      label: "BANQUET",
      title: "Luxury Banquet Hall",
      image: "/p6.jpeg",
      description:
        "A fully air-conditioned banquet hall designed for elegant indoor ceremonies and receptions.",
    },

    {
      label: "CONVENIENCE",
      title: "Parking Facilities",
      image: "/p7.jpeg",
      description:
        "Well-managed parking space ensures a smooth and stress-free experience for all guests.",
    },

    {
      label: "EXPERIENCE",
      title: "Beautiful Ambience",
      image: "/p8.jpeg",
      description:
        "Surrounded by greenery and open skies, the venue creates a magical and serene atmosphere.",
    },

    {
      label: "COMFORT",
      title: "Modern Amenities",
      image: "/p9.jpeg",
      description:
        "Equipped with modern infrastructure and facilities for a seamless celebration experience.",
    },

    {
      label: "FLEXIBILITY",
      title: "Custom Decoration",
      image: "/p10.jpeg",
      description:
        "Flexible decoration and setup options allow you to design your dream celebration.",
    },
  ];

  function copyToClipboard(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main className="bg-[#FeFFF1]">
      {/* ================= PREMIUM HERO SECTION ================= */}

      <section className="relative h-[75vh] w-full overflow-hidden">
        {/* Background Image */}

        <Image
          src="/A1.JPG"
          alt="Chhaya Party Plot - Chikhli"
          fill
          priority
          className="object-cover scale-100 object-center "
        />

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        {/* Hero Content */}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8">
          {/* Subtitle */}

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-sm md:text-base tracking-[4px] uppercase text-amber-300"
          >
            A Venue Beyond Your Imagination
          </motion.p>

          {/* Main Title */}

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mt-4 leading-tight "
          >
            Our Story of Vision
          </motion.h1>

          {/* Description */}
        </div>
      </section>
      {/* ================= OUR STORY SECTION ================= */}

      <section className="py-10 md:pt-16 bg-[#FEFFF1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-4 sm:px-6 lg:px-8 lg:px-8">
          {/* Title */}

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
        text-2xl sm:text-3xl md:text-5xl
        font-bold
        text-center
        leading-snug
      "
          >
            Our Story – A Vision Turned Into Reality
          </motion.h2>

          {/* Decorative Line */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
      w-[180px] md:w-full
        h-[2px]
        bg-gradient-to-r
        from-green-600
        to-emerald-600
        mx-auto
        mt-4 md:mt-6
        mb-8
      "
          />

          {/* Paragraph 1 */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="
        text-gray-700
        leading-relaxed md:leading-loose
        text-base md:text-lg
       text-justify
        mt-6
      "
          >
            In mid <b>2022</b>, the <b>Rathod family</b> purchased approximately{" "}
            <b>3 acres of land</b> located along the prominent{" "}
            <b>NH-48 highway at Chimla</b>. With a clear vision for the future
            and a strong passion for creating meaningful spaces, they laid the
            foundation for what would become <b>Chhaya Party Plot</b>. The venue
            was lovingly named <b>"Chhaya"</b> in honor of the head of the
            family, <b>Smt. Chhayaben</b>, symbolizing warmth, care, and family
            values. It was thoughtfully designed to serve as a modern and
            elegant destination for memorable celebrations.
          </motion.p>

          {/* Paragraph 2 */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="
        text-gray-700
        leading-relaxed md:leading-loose
        text-base md:text-lg
       text-justify
        mt-6
      "
          >
            With the technical expertise of
            <b> Mr. Jitendra Chhaganlal Rathod</b>, a retired
            <b> Class-1 Civil Engineer</b> from the
            <b> Roads & Buildings (R&B) Division</b>, the planning and
            construction of the venue were carried out with precision and
            quality. Utilizing his extensive engineering knowledge and
            experience, he personally supervised every stage of the development.
            The construction work began in <b>May 2023</b>, and within just{" "}
            <b>seven months</b>, the project was successfully completed. On{" "}
            <b>26 January 2024</b>, Chhaya Party Plot officially began
            operations with a fully centralized
            <b> air-conditioned banquet hall</b>, a spacious
            <b> 30,000 sq. ft. green lawn area</b>, and parking facilities for
            over <b>200 vehicles</b>, providing a complete and comfortable event
            experience.
          </motion.p>

          {/* Paragraph 3 */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="
        text-gray-700
        leading-relaxed md:leading-loose
        text-base md:text-lg
        text-justify md:text-justify
        mt-6
      "
          >
            Continuing the vision of growth and excellence, in
            <b> 2025</b>, a new <b>multipurpose hall</b> was added to{" "}
            <b>Chhaya Party Plot</b>, further enhancing its capacity and
            versatility to host a wide range of celebrations and social events.
            This expansion reflects the commitment of the <b>Rathod family</b>{" "}
            to continuously improve and provide modern facilities that meet the
            evolving needs of guests. Today,
            <b> Chhaya Party Plot</b> stands as a symbol of thoughtful planning,
            strong engineering expertise, and dedication to delivering premium
            experiences, making it one of the trusted destinations for memorable
            celebrations in the region. With a strong foundation and a clear
            vision for the future,
            <b> Chhaya Party Plot</b> continues to grow as a place where
            celebrations turn into lifelong memories.
          </motion.p>
        </div>
      </section>

      {/* ================= PREMIUM JOURNEY TIMELINE ================= */}

      <section className="py-10  bg-[#FEFFF1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-4 sm:px-6 lg:px-8">
          {/* Title */}

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
        text-2xl sm:text-3xl md:text-5xl
        font-bold
        text-center
      "
          >
            Our Journey
          </motion.h2>

          {/* Decorative Line */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
        w-40 md:w-full
        h-[2px]
        bg-gradient-to-r
        from-green-600
        to-emerald-600
        mx-auto
        mt-4 md:mt-6
        mb-8
      "
          />

          {/* Subtitle */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="
        text-gray-600
        text-center
        max-w-2xl
        mx-auto
        text-sm md:text-base
      "
          >
            From vision to reality, our journey reflects dedication, engineering
            excellence, and a commitment to creating unforgettable celebrations.
          </motion.p>

          {/* Timeline */}

          <div className="relative mt-10 md:mt-16">
            {/* Vertical Line */}

            <div
              className="
        absolute left-4 md:left-1/2
        transform md:-translate-x-1/2
        h-full w-[2px]
        bg-gradient-to-b
        from-green-700
        to-emerald-700
      "
            ></div>

            {/* Step 1 */}

            <div className="relative mb-12 md:mb-16">
              <div
                className="
          flex flex-col md:flex-row
          items-start md:items-center
          md:justify-between
        "
              >
                <div
                  className="
            ml-10 md:ml-0
            md:w-5/12
            md:text-right
            md:pr-8
          "
                >
                  <h3 className="text-xl md:text-2xl font-bold">2022</h3>

                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Land purchased along NH-48 at Chimla, laying the foundation
                    for Chhaya Party Plot.
                  </p>
                </div>

                {/* Dot */}

                <div
                  className="
            absolute left-4 md:left-1/2
            transform md:-translate-x-1/2
    w-4 h-4 md:w-5 md:h-5 border-2 border-white
            bg-gradient-to-r
            from-green-600
            to-emerald-600
            rounded-full
          "
                ></div>
              </div>
            </div>

            {/* Step 2 */}

            <div className="relative mb-12 md:mb-16">
              <div
                className="
          flex flex-col md:flex-row
          items-start md:items-center
          md:justify-between
        "
              >
                <div className="md:w-5/12"></div>

                <div
                  className="
            ml-10 md:ml-0
            md:w-5/12
            md:pl-8
          "
                >
                  <h3 className="text-xl md:text-2xl font-bold">May 2023</h3>

                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Construction began under the supervision of retired Class-1
                    Civil Engineer Mr. Jitendra Rathod.
                  </p>
                </div>

                {/* Dot */}

                <div
                  className="
            absolute left-4 md:left-1/2
            transform md:-translate-x-1/2
          w-4 h-4 md:w-5 md:h-5 border-2 border-white
            bg-gradient-to-r
            from-green-600
            to-emerald-600
            rounded-full
          "
                ></div>
              </div>
            </div>

            {/* Step 3 */}

            <div className="relative mb-12 md:mb-16">
              <div
                className="
          flex flex-col md:flex-row
          items-start md:items-center
          md:justify-between
        "
              >
                <div
                  className="
            ml-10 md:ml-0
            md:w-5/12
            md:text-right
            md:pr-8
          "
                >
                  <h3 className="text-xl md:text-2xl font-bold">26 Jan 2024</h3>

                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Official inauguration with centralized AC hall, 30,000 sq.
                    ft. lawn, and 200+ parking facilities.
                  </p>
                </div>

                {/* Dot */}

                <div
                  className="
        absolute left-4 md:left-1/2
            transform md:-translate-x-1/2
    w-4 h-4 md:w-5 md:h-5 border-2 border-white
            bg-gradient-to-r
            from-green-600
            to-emerald-600
            rounded-full
          "
                ></div>
              </div>
            </div>

            {/* Step 4 */}

            <div className="relative">
              <div
                className="
          flex flex-col md:flex-row
          items-start md:items-center
          md:justify-between
        "
              >
                <div className="md:w-5/12"></div>

                <div
                  className="
            ml-10 md:ml-0
            md:w-5/12
            md:pl-8
          "
                >
                  <h3 className="text-xl md:text-2xl font-bold">2025</h3>

                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Addition of a modern multipurpose hall to expand capacity
                    and enhance flexibility.
                  </p>
                </div>

                {/* Dot */}

                <div
                  className="
            absolute left-4 md:left-1/2
            transform md:-translate-x-1/2
        w-4 h-4 md:w-5 md:h-5 border-2 border-white
            bg-gradient-to-r
            from-green-600
            to-emerald-600
            rounded-full
          "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}

      {/* <section className="py-16 bg-[#FeFFF1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Our Venue Highlights
          </motion.h2>

  

          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              label={feature.label}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section> */}

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Title */}

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold"
          >
            Why Choose <b>Chhaya Party Plot</b>
          </motion.h2>

          {/* Decorative Line */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full h-[2px] mb-3 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6"
          />

          {/* Subtitle */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-600 max-w-2xl mx-auto"
          >
            We combine elegance, space, and thoughtful planning to deliver
            seamless and memorable celebrations for every family.
          </motion.p>

          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-12 md:mt-16">
            {/* Card 1 */}

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.05 }}
              className="bg-[#FeFFF1] p-10 rounded-2xl  hover:shadow-2xl transition duration-300"
            >
              {/* Icon */}

              <div className="text-4xl mb-6">🌿</div>

              {/* Title */}

              <h3
                className="text-xl font-semibold 
        bg-gradient-to-r from-amber-500 to-yellow-600 
        bg-clip-text text-transparent"
              >
                Spacious 30,000 Sq. Ft Lawn
              </h3>

              {/* Description */}

              <p className="mt-4 text-gray-600">
                Our expansive lawn provides the perfect setting for large
                gatherings, weddings, and grand celebrations.
              </p>
            </motion.div>

            {/* Card 2 */}

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#FeFFF1] p-10 rounded-2xl  hover:shadow-2xl transition duration-300"
            >
              {/* Icon */}

              <div className="text-4xl mb-6">🚗</div>

              {/* Title */}

              <h3
                className="text-xl font-semibold 
        bg-gradient-to-r from-amber-500 to-yellow-600 
        bg-clip-text text-transparent"
              >
                Ample Parking Facilities
              </h3>

              {/* Description */}

              <p className="mt-4 text-gray-600">
                With dedicated parking for 200+ vehicles, guests enjoy a smooth
                and stress-free arrival.
              </p>
            </motion.div>

            {/* Card 3 */}

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#FeFFF1] p-10 rounded-2xl  hover:shadow-2xl transition duration-300"
            >
              {/* Icon */}

              <div className="text-4xl mb-6">⭐</div>

              {/* Title */}

              <h3
                className="text-xl font-semibold 
        bg-gradient-to-r from-amber-500 to-yellow-600 
        bg-clip-text text-transparent"
              >
                Trusted Event Experience
              </h3>

              {/* Description */}

              <p className="mt-4 text-gray-600">
                Having hosted 50+ successful events, we understand how to
                deliver smooth and memorable celebrations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= LUXURY QUOTE SECTION ================= */}

      <section className="relative py-10 md:py-16  overflow-hidden">
        {/* Quote Content */}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
        text-2xl md:text-4xl
        leading-relaxed
        font-semibold
        tracking-wide
      "
          >
            "આપના પ્રસંગ માટેનું એકમાત્ર સ્થળ એટલે
            <span className="text-emerald-600 font-bold">
              {" "}
              છાયા પાર્ટી પ્લોટ
            </span>
            "
          </motion.h2>
        </div>
      </section>

      {/* CTA Section */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BottomCTA />
      </div>

      {/* ================= GOOGLE REVIEWS SECTION ================= */}

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Title */}

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
        text-2xl sm:text-3xl md:text-5xl
        font-bold
      "
          >
            Google Reviews
          </motion.h2>

          {/* Decorative Line */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="
w-[180px] md:w-full
        h-[2px]
        bg-gradient-to-r
        from-green-600
        to-emerald-600
        mx-auto
        mt-4 md:mt-6
        mb-6
      "
          />

          {/* Subtitle */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="
        text-gray-600
        max-w-2xl
        mx-auto
        text-sm md:text-base
      "
          >
            See what our customers are saying about their experiences at Chhaya
            Party Plot.
          </motion.p>

          {/* Google Map Embed */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="
        mt-10 md:mt-16
        rounded-2xl
        overflow-hidden
        shadow-xl
      "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.5406954840605!2d73.02810481156264!3d20.728867780766617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ed1aac0027a3%3A0xa2d6c4b636ce3d7f!2sChhaya%20Party%20Plot!5e0!3m2!1sen!2sin!4v1774952053460!5m2!1sen!2sin"
              width="100%"
              height="350"
              className="w-full h-[280px] sm:h-[350px] md:h-[450px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
