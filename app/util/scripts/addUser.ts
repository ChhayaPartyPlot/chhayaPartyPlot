import * as fs from 'fs';
import {User} from '../../models/User';
import {UserDocument} from '../../models/User';
import mongoose, { FilterQuery } from 'mongoose';
import { connectToDatabase } from '../../lib/mongodb';

async function adduser(){

    await connectToDatabase();

    await User.deleteMany({});

    // await User.deleteMany({} as FilterQuery<UserDocument>)
    //     .then(() => console.log("All existing users deleted."))
    //     .catch((error: any) => console.error("Error deleting users:", error));

    fs.readFile('../data/user.json', 'utf8', async (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          return;
        }
      
        // Parse the JSON data into a TypeScript object
        const users = JSON.parse(data);
      
        for(let user of users){
          let newUser = new User({
              _id: new mongoose.Types.ObjectId(user._id), // Generate a new ObjectId for each user
            name: user.name,
            mobNumber: user.mobNumber,
            email: user.email
          });
      
          await newUser.save()
            .then(() => { 
              console.log(`User ${user.name} saved successfully.`);
            })
            .catch((error: any) => {
              console.error(`Error saving user ${user.name}:${user._id}`, error);
            }
            );
        }
        
      });

      
}
// Asynchronous approach to reading the JSON file

adduser().then(() => {
    console.log("All users added successfully.");
}).catch((error:any) => {
    console.error("Error adding users:", error);
});
