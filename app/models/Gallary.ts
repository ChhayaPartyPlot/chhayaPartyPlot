import mongoose, { Document, Schema, Types } from 'mongoose';

interface GalleryDocument extends Document {
  url:String,
  eventType:'Birthday' | 'Marriage' | 'Corporate Meeting' | 'Interior' | 'Other',
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
