import { Document, Types } from 'mongoose'

export interface FeedbackI extends Document {
  destination_id: Types.ObjectId
  feedback_text: string
  left_by: string
  feedback_date: Date
}
