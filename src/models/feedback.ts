import { Schema, model } from 'mongoose'
import { FeedbackI } from '../../types'

const feedbackSchema = new Schema<FeedbackI>({
  destination_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  feedback_text: {
    type: String,
    required: true
  },
  left_by: {
    type: String,
    required: true
  },
  feedback_date: {
    type: Date,
    default: Date.now
  }
})

export const FeedbackM = model<FeedbackI>('Feedback', feedbackSchema)
