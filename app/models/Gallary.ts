import mongoose, { Document, Schema, Types } from 'mongoose';

// Allowed event types
export const VALID_EVENT_TYPES = [
  'Birthday',
  'Marriage',
  'Corporate Meeting',
  'Interior',
  'Other',
] as const;

// Create a union type from the array
export type EventType = (typeof VALID_EVENT_TYPES)[number];

interface GalleryDocument extends Document {
  url:String,
  eventType:EventType,
}

const gallerySchema = new Schema<GalleryDocument>({
    url:{
        type:String,
        required:true,
    },
    eventType:{
        type:String,
        enum:['Birthday', 'Marriage', 'Corporate Meeting', 'Interior', 'Other'],
        required:true,
    },
});

const Gallery = mongoose.models.Gallery || mongoose.model<GalleryDocument>('Gallery', gallerySchema);

export {Gallery};
export type { gallerySchema };

//all
//birthday
//marrage/eng
//co. meeting
