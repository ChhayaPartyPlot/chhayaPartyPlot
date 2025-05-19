import mongoose, { Document, Schema, Types } from 'mongoose';


interface GalleryDocument extends Document {
  url:String,
}

const gallerySchema = new Schema<GalleryDocument>({
    url:{
        type:String,
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
