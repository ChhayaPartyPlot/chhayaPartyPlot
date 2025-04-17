import * as fs from 'fs';
import {Booking} from '../../models/Booking';
import {BookingDocument} from '../../models/Booking';
import mongoose, { FilterQuery } from 'mongoose';
import { connectToDatabase } from '../../lib/mongodb';

async function addBooking(){

    await connectToDatabase();

    await Booking.deleteMany({});

    // await Booking.deleteMany({} as FilterQuery<BookingDocument>)
    //     .then(() => console.log("All existing Bookings deleted."))
    //     .catch((error: any) => console.error("Error deleting Bookings:", error));

    fs.readFile('../data/booking.json', 'utf8', async (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }
      
        // Parse the JSON data into a TypeScript object
        const bookings = JSON.parse(data);
      
        for(let booking of bookings){
          let newBooking = new Booking({
            _id: new mongoose.Types.ObjectId(booking._id),
            user: booking.user,
            startDate:booking.startDate,
            totalBookingDays:booking.totalBookingDays
          });
      
          await newBooking.save()
            .then(() => { 
              console.log(`Booking ${newBooking.name} saved successfully.`);
            })
            .catch((error: any) => {
              console.error(`Error saving Booking ${newBooking.name}:${newBooking._id}`, error);
            }
            );
        }
        
      });

      
}
// Asynchronous approach to reading the JSON file

addBooking().then(() => {
    console.log("All Bookings added successfully.");
}).catch((error:any) => {
    console.error("Error adding Bookings:", error);
});
