'use client';
import Image from "next/image";
import { Footer } from "../comonents/footer";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Reservation() {
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [value, setValue] = useState<Date | null>(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const month = activeStartDate.getMonth() + 1;
        const year = activeStartDate.getFullYear();

        const res = await fetch(`/api/booking?month=${month}&year=${year}`);
        const data = await res.json();

        const bookedDates: Date[] = [];

        data.forEach((booking: any) => {
          const start = new Date(booking.startDate);
          const days = booking.totalBookingDays;

          for (let i = 0; i < days; i++) {
            const bookedDate = new Date(start);
            bookedDate.setDate(bookedDate.getDate() + i);
            bookedDates.push(bookedDate);
          }
        });

        setReservedDates(bookedDates);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [activeStartDate]);

  async function handleDateClick(date: Date) {
    const isReserved = reservedDates.some(
      d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (isReserved) {
      alert("Sorry, this date is already reserved!");
      return;
    }

    const email = prompt("Enter your email:");
    const mobNumber = prompt("Enter your mobile number:");
    const daysInput = prompt("How many days do you want to reserve?");
    const totalBookingDays = Number(daysInput);

    if (!email || !mobNumber || isNaN(totalBookingDays) || totalBookingDays <= 0) {
      alert("Invalid input. Reservation not submitted.");
      return;
    }

    try {
      const startDateParam = encodeURIComponent(format(date, 'yyyy-MM-dd'));
      const url = `/api/booking?email=${email}&mobNumber=${mobNumber}&startDate=${startDateParam}&totalBookingDays=${totalBookingDays}`;

      const res = await fetch(url, {
        method: 'POST',
      });

      if (res.ok) {
        const updatedDates: Date[] = [];
        for (let i = 0; i < totalBookingDays; i++) {
          const d = new Date(date);
          d.setDate(d.getDate() + i);
          updatedDates.push(d);
        }
        setReservedDates(prev => [...prev, ...updatedDates]);
        alert("Your reservation is confirmed!");
      } else {
        const error = await res.json();
        alert(`Reservation failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error sending booking:", err);
      alert("Failed to make reservation.");
    }
  }

  function tileDisabled({ date }: { date: Date }) {
    return reservedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
  }

  function tileClassName({ date }: { date: Date }) {
    if (reservedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))) {
      return 'reserved-date';
    }
    return '';
  }

  return (
    <main>
      <style jsx global>{`
        .react-calendar {
          border: none;
          background-color: transparent;
        }
        .react-calendar__tile.reserved-date {
          background: #ff4d4d !important;
          color: white !important;
        }
      `}</style>

      <div className="relative min-h-screen bg-[#FeFFF1]">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full">
          <Image
            src="/image3.jpg"
            alt="Chhaya Partyplot"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-sm tracking-widest font-serif italic text-gray-200">A Venue Beyond Your Imagination</h1>
            <h2 className="text-5xl font-bold mt-2 font-sans text-gray-100">Discover Our Story</h2>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex justify-center items-center mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Reserve Your Date</h3>
            <Calendar
              onClickDay={handleDateClick}
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
              onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)}
            />
            <p className="mt-4 text-center text-sm text-gray-500">Red dates are already reserved</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
