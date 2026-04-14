"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaWhatsapp } from "react-icons/fa";
import * as XLSX from "xlsx";
import { Footer } from "../components/footer";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

// Helper to read cookie by name
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function Reservation() {
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingDays, setBookingDays] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobNumber2, setMobNumber2] = useState("");
  const [editingBooking, setEditingBooking] = useState<any>(null);

  const [editStartDate, setEditStartDate] = useState("");
  const [editDays, setEditDays] = useState(1);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [userid, setuserid] = useState("");

  // Inquiry Form States
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryDays, setInquiryDays] = useState<number>(1);

  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showUpdateDelete, setShowUpdateDelete] = useState(false);

  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  // State for login status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status by reading session_token cookie
    const token = getCookie("session_token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // console.log(showUpdateDelete);
    // console.log(selectedBooking);
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
      console.error("Error fetching bookings:", error);
    }
  };

  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const isReserved = reservedDates.some(
      (d) => format(d, "yyyy-MM-dd") === formattedDate,
    );
    // console.log(isReserved);

    if (isReserved) {
      if (loggedIn) {
        // console.log("reached");
        // Find the booking that contains this date
        const booking = bookingList.find((b) => {
          const start = new Date(b.startDate);
          for (let i = 0; i < b.totalBookingDays; i++) {
            const checkDate = new Date(start);
            checkDate.setDate(start.getDate() + i);
            // console.log(checkDate);
            if (format(checkDate, "yyyy-MM-dd") === formattedDate) {
              return true;
            }
          }
          return false;
        });

        if (booking) {
          setSelectedBooking(booking); // Store the booking
          setShowUpdateDelete(true); // Show popup
        }
      } else {
        toast.error("Sorry, this date is already reserved!");
      }
      return;
    }

    if (!loggedIn) return;

    setSelectedDate(date);
    setShowForm(true);
  };

  const handleMobNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = e.target.value;
    setMobNumber(input);

    if (MOB_NUMBER_PATTERN.test(input)) {
      try {
        const res = await fetch(`/api/user?mobNumber=${input}`);
        const data = await res.json();

        // console.log(input);

        if (data && data.user) {
          setName(data.user.name);
          setEditName(data.user.name);
          // console.log(editName);
          setuserid(data.user._id);
          // console.log(userid);
          setEmail(data.user.email || "");
        } else {
          setName("");
          setEditName("");
          setEmail("");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    if (!MOB_NUMBER_PATTERN.test(mobNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!name || !mobNumber || !selectedDate) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(`/api/user?mobNumber=${mobNumber}`);
      if (!res.ok) {
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, mobNumber, email }),
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobNumber,
          mobNumber2,
          startDate: format(selectedDate, "yyyy-MM-dd"),
          totalBookingDays: bookingDays,
        }),
      });

      if (res.ok) {
        toast.success("Reservation successful!");
        setShowForm(false);
        setSelectedDate(null);
        fetchBookings();
      } else {
        const error = await res.json();
        toast.error(`Reservation failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error making reservation:", err);
      alert("Reservation failed.");
    }
  };
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!MOB_NUMBER_PATTERN.test(inquiryPhone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!inquiryName || !inquiryPhone || !inquiryDate) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      setInquiryLoading(true); // ✅ Start loading

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          startingDate: inquiryDate,
          totalBookingDays: inquiryDays,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setInquirySuccess(true);

        setInquiryName("");
        setInquiryPhone("");
        setInquiryDate("");
        setInquiryDays(1);

        // Auto hide message
        setTimeout(() => {
          setInquirySuccess(false);
        }, 4000);
      } else {
        toast.error(`Inquiry failed: ${result.error}`);
      }
    } catch (err) {
      console.error("Inquiry submission error:", err);
      alert("Error submitting inquiry.");
    } finally {
      setInquiryLoading(false); // ✅ Stop loading
    }
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Mobile", "Start Date", "Days"]],
      body: bookingList.map((b) => [
        b.user?.name,
        b.user?.mobNumber,
        format(new Date(b.startDate), "yyyy-MM-dd"),
        b.totalBookingDays,
      ]),
    });
    doc.save("bookings.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      bookingList.map((b) => ({
        Name: b.user?.name,
        Mobile: b.user?.mobNumber,
        "Start Date": format(new Date(b.startDate), "yyyy-MM-dd"),
        Days: b.totalBookingDays,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "bookings.xlsx");
  };

  // Style reserved dates for all users
  const tileClassName = ({ date }: { date: Date }) =>
    reservedDates.some(
      (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    )
      ? "reserved-date"
      : "";

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

      {showUpdateDelete && selectedBooking && !editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white shadow-2xl p-6 rounded-xl w-full max-w-xl">
            <h3 className="text-xl font-bold mb-6 text-center">
              Manage Booking
            </h3>

            {/* Booking Details */}

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedBooking.user?.name}
              </p>

              <p>
                <strong>Mobile:</strong> {selectedBooking.user?.mobNumber}
              </p>

              <p>
                <strong>Event Date:</strong>{" "}
                {format(new Date(selectedBooking.startDate), "dd-MM-yyyy")}
              </p>

              <p>
                <strong>Days:</strong> {selectedBooking.totalBookingDays}
              </p>
            </div>

            {/* Buttons */}

            <div className="flex justify-between gap-4 mt-6">
              {/* Cancel */}
              <button
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setShowUpdateDelete(false)}
              >
                Cancel
              </button>

              {/* Update */}
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // ⭐ IMPORTANT FIX
                  setuserid(selectedBooking.user?._id || "");

                  setEditStartDate(
                    format(new Date(selectedBooking.startDate), "yyyy-MM-dd"),
                  );

                  setEditDays(selectedBooking.totalBookingDays);

                  setEditName(selectedBooking.user?.name || "");

                  setEditPhone(selectedBooking.user?.mobNumber || "");

                  setEditingBooking(selectedBooking);

                  setShowUpdateDelete(false);
                }}
              >
                Update
              </button>

              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Booking?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the selected booking.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            `/api/booking/${selectedBooking._id}`,
                            {
                              method: "DELETE",
                            },
                          );

                          if (res.ok) {
                            toast.success("Booking deleted successfully.");

                            fetchBookings();
                            setShowUpdateDelete(false);
                          } else {
                            toast.error("Failed to delete booking.");
                          }
                        } catch (err) {
                          console.error(err);
                          toast.error("Error deleting booking.");
                        }
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}

      {/* EDIT FORM */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white shadow-2xl p-6 rounded-xl w-full max-w-xl">
            <h3 className="text-xl font-bold mb-6 text-center">Edit Booking</h3>

            {/* Name */}
            <label className="block mb-2 font-medium">Name:</label>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter name"
              className="border p-2 w-full rounded mb-4"
              required
            />

            {/* Mobile Number */}
            <label className="block mb-2 font-medium">Mobile Number:</label>

            <input
              type="tel"
              value={editPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setEditPhone(value);

                // Fetch user details
                handleMobNumberChange({
                  ...e,
                  target: { ...e.target, value },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter 10-digit number"
              className="border p-2 w-full rounded mb-4"
              required
            />

            {/* Start Date */}
            <label className="block mb-2 font-medium">Event Date:</label>

            <input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              className="border p-2 w-full rounded mb-4"
              required
            />

            {/* Days */}
            <label className="block mb-2 font-medium">
              Total Booking Days:
            </label>

            <input
              type="number"
              min="1"
              value={editDays}
              onChange={(e) => setEditDays(Number(e.target.value))}
              className="border p-2 w-full rounded mb-6"
              required
            />

            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setEditingBooking(null)}
              >
                Cancel
              </button>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={async () => {
                  // Validation
                  if (editPhone.length !== 10) {
                    alert("Enter valid 10-digit mobile number");
                    return;
                  }

                  if (!editName || !editStartDate) {
                    alert("Please fill all fields");
                    return;
                  }

                  const bodyData = {
                    updateData: {
                      startDate: editStartDate, // ✅ FIXED
                      totalBookingDays: Number(editDays),
                    },
                  };

                  try {
                    const res = await fetch(
                      `/api/booking/${editingBooking._id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyData),
                      },
                    );

                    if (res.ok) {
                      alert("Booking updated successfully ✅");

                      fetchBookings();
                      setEditingBooking(null);
                      setShowUpdateDelete(false);
                    } else {
                      alert("Failed to update booking ❌");
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Error updating booking ❌");
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative min-h-screen bg-[#FeFFF1]">
        {/* Form Popup */}
        {showForm && loggedIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white shadow-2xl p-6 rounded-xl w-full max-w-xl">
              <h3 className="text-xl font-bold mb-4 text-center">
                Complete Your Reservation
              </h3>

              <form onSubmit={handleReservationSubmit}>
                {/* Starting Date */}
                {selectedDate && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Event Date
                    </label>

                    <div className="w-full border rounded p-2 bg-gray-100">
                      {format(selectedDate, "dd-MM-yyyy")}
                    </div>
                  </div>
                )}
                {/* Mobile Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={mobNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setMobNumber(value);

                      handleMobNumberChange({
                        ...e,
                        target: { ...e.target, value },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }}
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile number"
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                {/* Booking Days */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Total Booking Days
                  </label>

                  <input
                    type="number"
                    value={bookingDays}
                    min={1}
                    onChange={(e) => setBookingDays(Number(e.target.value))}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reserve Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 mt-5 text-gray-900">
              Plan Your Celebration With Us
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Explore available dates and share your event details to begin
              planning.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-2 px-4">
            {/* Calendar section (always visible) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-3 text-center text-gray-900">
                Check Date Availability
              </h3>

              <p className="text-center text-sm text-gray-600 mb-2">
                Select your preferred event date to check availability.
              </p>

              <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                tileDisabled={({ date, view }) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const maxDate = new Date();
                  maxDate.setFullYear(maxDate.getFullYear() + 2);

                  return view === "month" && (date < today || date > maxDate);
                }}
                onActiveStartDateChange={({ activeStartDate }) =>
                  setActiveStartDate(activeStartDate!)
                }
              />

              <p className="mt-2 text-center text-sm text-gray-500">
                Dates marked in{" "}
                <span className="font-semibold text-red-600">red</span> are
                already booked.
              </p>
            </div>
            {/* Event Enquiry Form */}

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
              {/* Premium Heading */}
              <h2 className="text-xl font-semibold mb-2 text-center text-gray-900">
                Share Your Event Details
              </h2>

              <p className="text-sm text-gray-600 text-center mb-6">
                Select your preferred dates and our team will contact you to
                confirm availability.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // allow numbers only
                      setInquiryPhone(value);
                    }}
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                </div>

                {/* Event Date */}
                {/* Event Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>

                  <input
                    type="text"
                    placeholder="Choose your event date"
                    value={inquiryDate}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                {/* Number of Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Event Days
                  </label>
                  <input
                    type="number"
                    value={inquiryDays}
                    min={1}
                    onChange={(e) => setInquiryDays(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter number of days"
                    required
                  />
                </div>

                {/* Success Message */}
                {inquirySuccess && (
                  <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center">
                    Enquiry submitted successfully! We will contact you soon.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300
  ${
    inquiryLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-[1.02] hover:shadow-lg"
  }`}
                >
                  {inquiryLoading ? "Sending..." : "Send Event Enquiry"}
                </button>

                {/* Divider */}
                {/* <div className="flex items-center my-5">
                  <hr className="flex-grow border-gray-200" />
                  <span className="mx-3 text-gray-500 text-sm font-medium">
                    OR
                  </span>
                  <hr className="flex-grow border-gray-200" />
                </div> */}

                {/* Alternate Contact */}
                {/* <div className="flex flex-col gap-3">
            
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://wa.me/917600616660?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Chhaya%20Party%20Plot.",
                        "_blank",
                      )
                    }
                    className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] hover:bg-[#e6fff0] font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md"
                  >
                    <FaWhatsapp size={20} />
                    Chat on WhatsApp
                  </button>

               
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`+91 7600616660`);
                    }}
                    className="flex items-center justify-center gap-2 w-full border border-[#34B7F1] text-[#34B7F1] hover:bg-[#e6f7ff] font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                  >
                    <FaPhone size={18} />
                    Call Us
                  </button>
                </div> */}
              </form>
            </div>
          </div>
          {/* Hide CTA if logged in */}
          {!loggedIn && (
            /* Call to Action Section */
            <div className="w-full mt-12 px-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl px-6 md:px-12 py-10 md:py-12 text-white shadow-xl max-w-4xl mx-auto">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    Plan Your Special Event at Chhaya Party Plot
                  </h3>

                  <p className="text-sm md:text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Check available dates and reserve your venue today. From
                    weddings to celebrations, we make every moment memorable
                    with elegant spaces and seamless service.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="https://wa.me/917600616660?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Chhaya%20Party%20Plot."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <FaWhatsapp size={20} />
                      Chat on WhatsApp
                    </a>

                    <a
                      href="tel:+917600616660"
                      className="inline-block bg-green-800 text-white hover:bg-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {loggedIn && bookingList.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-10 w-full max-w-5xl mx-auto mb-3">
            <h2 className="text-xl font-bold mb-4 text-center">
              This Month’s Bookings
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Mobile</th>
                    <th className="border p-2 text-left">Event Date</th>
                    <th className="border p-2 text-center">Days</th>
                  </tr>
                </thead>

                <tbody>
                  {bookingList && bookingList.length > 0 ? (
                    bookingList.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50">
                        <td className="border p-2">{b.user?.name || "N/A"}</td>

                        <td className="border p-2">
                          {b.user?.mobNumber || "N/A"}
                        </td>

                        <td className="border p-2">
                          {b.startDate
                            ? format(new Date(b.startDate), "dd-MM-yyyy")
                            : "N/A"}
                        </td>

                        <td className="border p-2 text-center">
                          {b.totalBookingDays || 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-gray-500">
                        No bookings found for this month
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-col sm:flex-row justify-end mt-4 gap-3">
              <button
                onClick={exportToPDF}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                Export PDF
              </button>

              <button
                onClick={exportToExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
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
