import { Schema, model } from 'mongoose'
import { DestinationI } from '../../types'

const destinationSchema = new Schema<DestinationI>({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image_url: {
      type: String
      //   required: true,
    },
    country: {
      type: String,
      required: true
    },
    best_time_to_visit: {
      type: String,
      required: true
    }
  })
  
  export const DestinationM = model<DestinationI>('Destination', destinationSchema)