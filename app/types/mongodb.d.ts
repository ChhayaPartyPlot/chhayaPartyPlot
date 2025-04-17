import { ObjectId } from 'mongodb';

export interface MongoPost extends Post {
  _id: ObjectId;
}

// Use this interface in API route when interacting with MongoDB
