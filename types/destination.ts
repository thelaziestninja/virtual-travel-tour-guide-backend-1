import { Document } from 'mongoose'

export interface DestinationI extends Document {
  _id: string
  name: string
  description: string
  image_url?: string
  country: string
  best_time_to_visit: string
}
