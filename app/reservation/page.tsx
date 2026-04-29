"use client";
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
import { Button } from "@/components/ui/button";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { Footer } from "../components/footer";

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
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  // State for login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [inquiryEventType, setInquiryEventType] = useState("Wedding");
  const [eventType, setEventType] = useState("Wedding");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowInquiryPopup(false);
        setInquiryDate("");
        setSelectedDate(null);
      }
    };

    if (showInquiryPopup) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showInquiryPopup]);
  useEffect(() => {
    if (showInquiryPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showInquiryPopup]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowForm(false);
        setSelectedDate(null);
      }
    };

    if (showForm) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showForm]);
  useEffect(() => {
    // Check login status by reading session_token cookie
    const token = getCookie("session_token");
    setLoggedIn(!!token);
    // Trigger fade-in animation on mount
    setFadeIn(true);
  }, []);

  useEffect(() => {
    // console.log(showUpdateDelete);
    // console.log(selectedBooking);
    fetchBookings();
  }, [activeStartDate]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditingBooking(null);
      }
    };

    if (editingBooking) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editingBooking]);
  useEffect(() => {
    if (editingBooking) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [editingBooking]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowUpdateDelete(false);
      }
    };

    if (showUpdateDelete) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showUpdateDelete]);
  useEffect(() => {
    if (showUpdateDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showUpdateDelete]);
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
        const booking = bookingList.find((b) => {
          const start = new Date(b.startDate);
          for (let i = 0; i < b.totalBookingDays; i++) {
            const checkDate = new Date(start);
            checkDate.setDate(start.getDate() + i);
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

    if (!loggedIn) {
      setSelectedDate(date);
      setInquiryDate(formattedDate);
      setShowInquiryPopup(true);
      return;
    }
    setSelectedDate(date);
    setName("");
    setMobNumber("");
    setEmail("");
    setMobNumber2("");
    setBookingDays(1);
    setEventType("Wedding");
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
          eventType: eventType,
        }),
      });

      if (res.ok) {
        toast.success("Reservation successful!");
        // Generate simple booking reference
        const bookingRef = `CPP-${format(selectedDate, "ddMMyyyy")}-${Date.now().toString().slice(-3)}`;

        // WhatsApp Confirmation Message
        const message = `Chhaya Party Plot Reservation Confirmation

Dear ${name},

Thank you for choosing Chhaya Party Plot for your upcoming event.

We are pleased to confirm your reservation with the following details:

Booking Reference: ${bookingRef}

Event Date: ${format(selectedDate, "dd-MM-yyyy")}
Duration: ${bookingDays} day(s)
Event Type: ${eventType}

Our team looks forward to hosting your special occasion and ensuring a memorable experience for you and your guests.

For any assistance or enquiries, please feel free to contact us.

Contact: +91 76006 16660

With Best Regards,
Chhaya Party Plot`;

        // Encode message
        const whatsappUrl = `https://api.whatsapp.com/send?phone=91${mobNumber}&text=${encodeURIComponent(message)}`;

        // Detect mobile device
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // Open WhatsApp
        if (isMobile) {
          // Mobile redirect (iPhone safe)
          window.location.href = whatsappUrl;
        } else {
          // Desktop
          window.open(whatsappUrl, "_blank");
        }

        setShowForm(false);
        setSelectedDate(null);
        setName("");
        setMobNumber("");
        setEmail("");
        setMobNumber2("");
        setBookingDays(1);
        setEventType("Wedding");
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
      setInquiryLoading(true); //  Start loading

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          startingDate: inquiryDate,
          totalBookingDays: inquiryDays,
          eventType: inquiryEventType,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setInquirySuccess(true);

        setTimeout(() => {
          setShowInquiryPopup(false);
          setInquirySuccess(false);
        }, 2000);

        setInquiryName("");
        setInquiryPhone("");
        setInquiryDate("");
        setSelectedDate(null);
        setInquiryDays(1);
        setInquiryEventType("Wedding");

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
      setInquiryLoading(false); // Stop loading
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape"); // Landscape layout

    // ===== Logo (optional) =====
    const logo = "/logo.png";
    doc.addImage(logo, "PNG", 14, 8, 30, 15);

    // ===== Company Header =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(122, 135, 64); // #7a8740

    doc.text("Chhaya Party Plot", 148, 15, { align: "center" });

    // Month Name
    const monthName = format(activeStartDate, "MMMM yyyy");

    doc.setFontSize(12);
    doc.setTextColor(100);

    doc.text(`Booking Report - ${monthName}`, 148, 23, { align: "center" });

    // ===== Calculate Summary =====
    const totalBookings = bookingList.length;

    const eventSummary: Record<string, number> = {};

    bookingList.forEach((b) => {
      const type = b.eventType || "Other";

      if (!eventSummary[type]) {
        eventSummary[type] = 0;
      }

      eventSummary[type]++;
    });

    // ===== Summary Section =====
    let summaryY = 35;

    doc.setFontSize(11);
    doc.setTextColor(0);

    doc.text(`Total Bookings: ${totalBookings}`, 14, summaryY);

    summaryY += 8;

    doc.text("Event Summary:", 14, summaryY);

    summaryY += 6;

    Object.entries(eventSummary).forEach(([type, count]) => {
      doc.text(`${type}: ${count}`, 18, summaryY);

      summaryY += 6;
    });

    // ===== Table =====
    autoTable(doc, {
      startY: summaryY + 4,

      head: [["Name", "Mobile", "Event Date", "Event Type", "Days", "Amount"]],

      body: bookingList.map((b) => [
        b.user?.name,
        b.user?.mobNumber,
        format(new Date(b.startDate), "dd-MM-yyyy"),
        b.eventType,
        b.totalBookingDays,
      ]),

      styles: {
        fontSize: 10,
        cellPadding: 4,
      },

      headStyles: {
        fillColor: [195, 202, 109], // #c3ca6d
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },

      theme: "grid",

      didDrawPage: (data) => {
        // Footer
        const pageCount = doc.getNumberOfPages();

        doc.setFontSize(9);
        doc.setTextColor(150);

        doc.text(
          `Generated on: ${format(new Date(), "dd-MM-yyyy")}`,
          14,
          doc.internal.pageSize.height - 10,
        );

        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          doc.internal.pageSize.width - 40,
          doc.internal.pageSize.height - 10,
        );
      },
    });

    doc.save(`booking-report-${monthName}.pdf`);
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
        /* Remove underline under weekday names */
        .react-calendar__month-view__weekdays abbr {
          text-decoration: none !important;
          border-bottom: none !important;
        }

        /* Weekday header styling using theme */
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          color: #7a8740 !important; /* theme dark primary */
        }

        /* Optional spacing */
        .react-calendar__month-view__weekdays__weekday {
          padding: 8px 0;
        }
      `}</style>

      {showUpdateDelete && selectedBooking && !editingBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
          onClick={() => setShowUpdateDelete(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-2xl p-4 sm:p-6 rounded-2xl w-full max-w-xl relative max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-center">
              Manage Booking
            </h3>
            <button
              className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-lg"
              onClick={() => setShowUpdateDelete(false)}
            >
              ✕
            </button>
            {/* Booking Details */}

            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
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
                <strong>Event Type:</strong>{" "}
                {selectedBooking.eventType || "N/A"}
              </p>
              <p>
                <strong>Days:</strong> {selectedBooking.totalBookingDays}
              </p>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              {/* Cancel */}
              <button
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setShowUpdateDelete(false)}
              >
                Cancel
              </button>

              {/* Update */}
              <button
                className="w-full bg-[#c3ca6d] hover:bg-[#7a8740] text-white font-bold py-2 px-4 rounded"
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
                  setEventType(selectedBooking.eventType || "Wedding");

                  setShowUpdateDelete(false);
                }}
              >
                Update
              </button>

              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
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
                      className="bg-red-600! hover:bg-red-700!"
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
          onClick={() => setEditingBooking(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-2xl p-4 sm:p-6 rounded-2xl w-full max-w-xl relative max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Edit Booking</h3>
            <button
              className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-lg"
              onClick={() => setEditingBooking(null)}
            >
              ✕
            </button>

            {/* Name */}
            <label className="block mb-2 font-medium">Name:</label>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
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
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
              required
            />

            {/* Start Date */}
            <label className="block mb-2 font-medium">Event Date:</label>

            <input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
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

            {/* Event Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Event Type
              </label>

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              >
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Engagement">Engagement</option>
                <option value="Reception">Reception</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-4">
              <button
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setEditingBooking(null)}
              >
                Cancel
              </button>

              <button
                className="w-full bg-[#c3ca6d] hover:bg-[#7a8740] text-white font-bold py-2 px-4 rounded"
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
                      startDate: editStartDate,
                      totalBookingDays: Number(editDays),
                      eventType: eventType,
                    },

                    userData: {
                      name: editName,
                      mobNumber: editPhone,
                    },

                    userId: userid,
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
                      toast.success("Booking updated successfully");

                      fetchBookings();
                      setEditingBooking(null);
                      setShowUpdateDelete(false);
                    } else {
                      toast.error("Failed to update booking");
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Error updating booking");
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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
            onClick={() => {
              setShowForm(false);
              setSelectedDate(null);
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-2xl p-4 sm:p-6 rounded-2xl w-full max-w-xl relative max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4 text-center">
                Complete Your Reservation
              </h3>

              <form onSubmit={handleReservationSubmit}>
                {/* Starting Date */}
                {selectedDate && (
                  <div className="mb-4">
                    <button
                      className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-lg"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedDate(null);

                        setName("");
                        setMobNumber("");
                        setEmail("");
                        setMobNumber2("");
                        setBookingDays(1);
                        setEventType("Wedding");
                      }}
                    >
                      ✕
                    </button>
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
                    className="w-full border border-gray-300 rounded px-4 py-2"
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
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>
                {/* Event Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Event Type
                  </label>

                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Reception">Reception</option>
                    <option value="Other">Other</option>
                  </select>
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
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedDate(null);

                      setName("");
                      setMobNumber("");
                      setEmail("");
                      setMobNumber2("");
                      setBookingDays(1);
                      setEventType("Wedding");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-[#c3ca6d] hover:bg-[#7a8740] text-white font-bold py-2 px-4 rounded"
                  >
                    Reserve Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="flex flex-col items-center justify-center pb-12">
          <div className="w-full bg-gradient-to-r from-[#c3ca6d] to-[#7a8740] py-12 sm:py-14 md:py-16 px-4">
            <div className="flex items-center justify-center text-white text-center">
              <h1
                className={`
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        lg:text-5xl 
        font-bold 
        italic 
        leading-tight
        transition-all 
        duration-700
        ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
      `}
              >
                Plan Your Perfect Celebration
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-8 mt-4 px-4">
            {/* Calendar section (always visible) */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 w-full max-w-[340px] sm:max-w-sm mx-auto">
              <h3 className="text-2xl font-semibold mb-3 text-center text-gray-900">
                Check Date Availability
              </h3>

              <p className="text-center text-sm text-gray-600 mb-2">
                Select your preferred event date to check availability.
              </p>

              <Calendar
                className="w-full"
                locale="en-IN"
                value={selectedDate}
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                tileDisabled={({ date, view }) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const maxDate = new Date();
                  maxDate.setFullYear(maxDate.getFullYear() + 2);

                  //  Admin can see past dates
                  if (loggedIn) {
                    return view === "month" && date > maxDate;
                  }

                  //  Users cannot select past dates
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
            {showInquiryPopup && !loggedIn && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
                onClick={() => {
                  setShowInquiryPopup(false);
                  setInquiryDate("");
                  setSelectedDate(null);
                }}
              >
                <div
                  id="inquiry-form"
                  onClick={(e) => e.stopPropagation()}
                  className={`
  bg-white
  rounded-xl
  shadow-xl
  p-4 sm:p-2
  w-full
  max-w-md
  border border-gray-100
  relative
  max-h-[90vh]
  overflow-y-auto
`}
                >
                  <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    onClick={() => {
                      setShowInquiryPopup(false);
                      setInquiryDate("");
                      setSelectedDate(null);
                    }}
                  >
                    ✕
                  </button>
                  {/* Premium Heading */}
                  <h2 className="text-xl font-semibold mb-2 text-center text-gray-900">
                    Share Your Event Details
                  </h2>

                  <p className="text-sm text-gray-600 text-center mb-6">
                    Select your preferred date and provide your event details.
                    Our team will reach out to guide you through the booking
                    process.
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
                        className="w-full px-4 py-3 border border-gray-300 rounded  "
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
                          const value = e.target.value.replace(/\D/g, "");
                          setInquiryPhone(value);
                        }}
                        maxLength={10}
                        className="w-full px-4 py-3 border border-gray-300 rounded  "
                        placeholder="Enter 10-digit mobile number"
                        required
                      />
                    </div>

                    {/* Event Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date
                      </label>

                      <input
                        type="date"
                        value={inquiryDate}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                        required
                      />
                    </div>
                    {/* Event Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type
                      </label>

                      <select
                        value={inquiryEventType}
                        onChange={(e) => setInquiryEventType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        required
                      >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Reception">Reception</option>
                        <option value="Other">Other</option>
                      </select>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded  "
                        placeholder="Enter number of days"
                        required
                      />
                    </div>

                    {/* Success Message */}
                    {inquirySuccess && (
                      <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
                        Enquiry submitted successfully! We will contact you
                        soon.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={inquiryLoading}
                      className={`w-full py-4 px-6 rounded-xl! font-semibold text-lg transition-all duration-300
  ${
    inquiryLoading
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-[#c3ca6d] hover:bg-[#7a8740] text-white hover:scale-[1.02] hover:shadow-lg"
  }`}
                    >
                      {inquiryLoading ? "Sending..." : "Send Event Enquiry"}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
          {/* <FAQSection /> */}
          {/* Hide CTA if logged in */}
          {!loggedIn && (
            /* Call to Action Section */
            <div className="w-full mt-12 px-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#c3ca6d] to-[#7a8740] rounded-3xl px-6 md:px-12 py-10 md:py-12 text-white shadow-xl max-w-4xl mx-auto">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    Plan Your Special Event at Chhaya Party Plot
                  </h3>

                  <p className="text-sm md:text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Check available dates and reserve your venue today. From
                    weddings to celebrations, we make every moment memorable
                    with elegant spaces and seamless service.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="https://wa.me/917600616660?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Chhaya%20Party%20Plot."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white! text-[#7a8740]! hover:bg-gray-100! px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <FaWhatsapp size={20} />
                      Chat on WhatsApp
                    </a>

                    <a
                      href="tel:+917600616660"
                      className="inline-block bg-[#7a8740]! text-white! hover:bg-[#6a7538]! px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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
          <div className="bg-white rounded shadow-lg p-4 sm:p-6 mt-8 sm:mt-10 w-full max-w-5xl mx-auto mb-3">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-[#7a8740]!">
              This Month’s Bookings
            </h2>

            <div className="overflow-x-auto rounded">
              <table className="min-w-full border border-gray-300 text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Mobile</th>
                    <th className="border p-2 text-left">Event Date</th>
                    <th className="border p-2 text-left">Event Type</th>
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
                        <td className="border p-2">{b.eventType || "N/A"}</td>

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
              <Button
                onClick={exportToPDF}
                className="bg-[#c3ca6d] hover:bg-[#7a8740] text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Export PDF
              </Button>

              {/* <Button
                onClick={exportToExcel}
                className="bg-[#c3ca6d] hover:bg-[#7a8740] text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Export Excel
              </Button> */}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
