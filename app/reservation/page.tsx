'use client';
import Image from "next/image";
import { Footer } from "../components/footer";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

// Helper to read cookie by name
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default function Reservation() {
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
   const [bookingList, setBookingList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingDays, setBookingDays] = useState<number>(1);

  const [name, setName] = useState('');
  const [mobNumber, setMobNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mobNumber2, setMobNumber2] = useState('');



  // Inquiry Form States
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryDays, setInquiryDays] = useState<number>(1);

  // State for login status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status by reading session_token cookie
    const token = getCookie('session_token');
    setLoggedIn(!!token);
  }, []);

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
      setBookingList(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const isReserved = reservedDates.some(
      d => format(d, 'yyyy-MM-dd') === formattedDate
    );

    if (isReserved) {
      alert("Sorry, this date is already reserved!");
      return;
    }

    if (!loggedIn) {
      
      return;
    }

    setSelectedDate(date);
    setShowForm(true);
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

const handleReservationSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedDate) return;

  if (!MOB_NUMBER_PATTERN.test(mobNumber)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!name) {
    alert("Name is required.");
    return;
  }


    try {
      const res = await fetch(`/api/user?mobNumber=${mobNumber}`);
      if (!res.ok) {
        await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, mobNumber, email }),
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }

  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobNumber,
        mobNumber2,
        startDate: format(selectedDate, 'yyyy-MM-dd'),
        totalBookingDays: bookingDays,
      }),
    });

    if (res.ok) {
      alert("Reservation successful!");
      setShowForm(false);
      setSelectedDate(null);
      fetchBookings();
    } else {
      const error = await res.json();
      alert(`Reservation failed: ${error.message}`);
    }
  } catch (err) {
    console.error("Error making reservation:", err);
    alert("Reservation failed.");
  }
};

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          startingDate: inquiryDate,
          totalBookingDays: inquiryDays,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Inquiry submitted successfully.");
        setInquiryName('');
        setInquiryPhone('');
        setInquiryDate('');
        setInquiryDays(1);
      } else {
        alert(`Inquiry failed: ${result.error}`);
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      alert("Error submitting inquiry.");
    }
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Name', 'Mobile', 'Start Date', 'Days']],
      body: bookingList.map(b => [
        b.user?.name,
        b.user?.mobNumber,
        format(new Date(b.startDate), 'yyyy-MM-dd'),
        b.totalBookingDays
      ])
    });
    doc.save('bookings.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      bookingList.map(b => ({
        Name: b.user?.name,
        Mobile: b.user?.mobNumber,
        'Start Date': format(new Date(b.startDate), 'yyyy-MM-dd'),
        Days: b.totalBookingDays
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'bookings.xlsx');
  };


  // Disable tiles if date is reserved (for all users)
  const tileDisabled = ({ date }: { date: Date }) =>
    reservedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));

  // Style reserved dates for all users
  const tileClassName = ({ date }: { date: Date }) =>
    reservedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      ? 'reserved-date'
      : '';

  return (
    <main className=" pt-15 mb-3 ">
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
        {/* Form Popup */}
        {showForm && loggedIn && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl p-6 m-4 rounded-xl w-[90%] max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Complete Your Reservation</h3>
            <form onSubmit={handleReservationSubmit}>
              {selectedDate && (
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Starting Date</label>
                  <div className="w-full border rounded p-2 bg-gray-100">
                    {format(selectedDate, 'yyyy-MM-dd')}
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={mobNumber}
                  onChange={handleMobNumberChange}
                  className="w-full border rounded p-2"
                  required
                />
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Alternate Mobile Number (optional)</label>
                  <input
                    type="text"
                    value={mobNumber2}
                    onChange={(e) => setMobNumber2(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Total Booking Days</label>
                <input
                  type="number"
                  value={bookingDays}
                  min={1}
                  onChange={(e) => setBookingDays(Number(e.target.value))}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Reserve Now
                </button>
              </div>
            </form>
          </div>
        )}

        <section className="flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-3">"Let’s Lock in Your Celebration Date!"</h1>
            <p className="text-lg text-gray-700">Select your desired date from the calendar</p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-10 px-4">
            {/* Calendar section (always visible) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-center">Reservation Calendar</h3>
              <Calendar
                onClickDay={handleDateClick}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)}
              />
              <p className="mt-4 text-center text-sm text-gray-500">
                Dates in <span className="font-bold text-red-600">red</span> are already booked.
              </p>
              {!loggedIn && (
                <p className="mt-1 text-center text-sm text-gray-600">
                  
                </p>
              )}
            </div>
{/* Inquiry Form */}
<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
  <h2 className="text-lg font-semibold mb-6 text-center">
    "Booking Your Date Starts Here – Let’s Go!"
  </h2>
  <form onSubmit={handleInquirySubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
      <input
        type="text"
        value={inquiryName}
        onChange={(e) => setInquiryName(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        placeholder="Your full name"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
      <input
        type="tel"
        value={inquiryPhone}
        onChange={(e) => setInquiryPhone(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        placeholder="+91 98765 43210"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Starting Date *</label>
      <input
        type="date"
        value={inquiryDate}
        onChange={(e) => setInquiryDate(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Total Booking Days *</label>
      <input
        type="number"
        value={inquiryDays}
        min={1}
        onChange={(e) => setInquiryDays(Number(e.target.value))}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        placeholder="Number of days"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
    >
      Submit Inquiry
    </button>

    {/* Divider with OR */}
    <div className="flex items-center my-4">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-3 text-gray-500 font-semibold">or</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    {/* Alternate Contact Buttons */}
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => window.open(`https://wa.me/9265310320`, "_blank")}
        className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] hover:bg-[#e6fff0] font-semibold py-3 px-4 rounded-xl transition-all duration-200"
      >
        <FaWhatsapp size={18} />
        WhatsApp
      </button>

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(`+91 9265310320`);
        }}
        className="flex items-center justify-center gap-2 w-full border border-[#34B7F1] text-[#34B7F1] hover:bg-[#e6f7ff] font-semibold py-3 px-4 rounded-xl transition-all duration-200"
      >
        <FaPhone size={18} />
        Call
      </button>
    </div>
  </form>



            </div>
            
          </div>
        </section>
                  {loggedIn && bookingList.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-10 w-full max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">This Month’s Bookings</h2>
            <div className="overflow-auto">
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Mobile</th>
                    <th className="border p-2">Start Date</th>
                    <th className="border p-2">Days</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingList.map((b) => (
                    <tr key={b._id}>
                      <td className="border p-2">{b.user?.name}</td>
                      <td className="border p-2">{b.user?.mobNumber}</td>
                      <td className="border p-2">{format(new Date(b.startDate), 'yyyy-MM-dd')}</td>
                      <td className="border p-2">{b.totalBookingDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Export Buttons */}
            <div className="flex justify-end mt-4 gap-4">
              <button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Export PDF
              </button>
              <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Export Excel
              </button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
