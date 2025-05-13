'use client';
import Image from "next/image";
import { Footer } from "../comonents/footer";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

export default function Reservation() {
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [value, setValue] = useState<Date | null>(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const [name, setName] = useState('');
  const [mobNumber, setMobNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [activeStartDate]);

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

  const handleMobNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMobNumber(input);

    if (MOB_NUMBER_PATTERN.test(input)) {
      try {
        const res = await fetch(`/api/user?mobNumber=${input}`);
        const data = await res.json();

        if (data && data.user) {
          setName(data.user.name);
          setEmail(data.user.email || '');
        } else {
          setName('');
          setEmail('');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  async function handleDateClick(date: Date) {
    const isReserved = reservedDates.some(
      d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (isReserved) {
      alert("Sorry, this date is already reserved!");
      return;
    }

if (!MOB_NUMBER_PATTERN.test(mobNumber)) {
  alert("Please enter a valid 10-digit mobile number.");
  return;
}

let finalName = name;

if (!finalName) {
  const inputName = prompt("Enter your name:");
  if (!inputName) {
    alert("Name is required.");
    return;
  }
  finalName = inputName;
  setName(finalName);
}

// Save user if not exists
try {
  const res = await fetch(`/api/user?mobNumber=${mobNumber}`);
  if (res.status === 404) {
    console.log("User not found, creating new user...");
    await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: finalName, mobNumber}),
    });
  }
} catch (error) {
  console.error('Error while verifying/creating user:', error);
}


    const daysInput = prompt("How many days do you want to reserve?");
    const totalBookingDays = Number(daysInput);

    if (isNaN(totalBookingDays) || totalBookingDays <= 0) {
      alert("Invalid number of days.");
      return;
    }

    try {
      const startDateParam = encodeURIComponent(format(date, 'yyyy-MM-dd'));
  const res = await fetch('/api/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobNumber,
      startDate: format(date, 'yyyy-MM-dd'),
      totalBookingDays,
    }),
  });

      if (res.ok) {
        alert("Reservation successful!");
        fetchBookings(); // Refresh calendar
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

        {/* User Info Inputs */}
        <div className="flex justify-center mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-2xl font-semibold mb-4 text-center">Enter Your Details</h3>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobNumber}
              onChange={handleMobNumberChange}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex justify-center items-center mt-6">
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
