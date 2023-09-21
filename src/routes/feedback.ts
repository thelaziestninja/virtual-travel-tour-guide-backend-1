import { Router } from 'express'
import { Request, Response, ResponseStatus, BaseResponse } from '../../types/request'
import { FeedbackI } from '../../types'
import { FeedbackM } from '../models/feedback'
import { DestinationM } from '../models/destination'

const router = Router()

// Get all feedback for a specific destination.
router.get(
  '/:destinationId',
  async (
    req: Request<{ _id: string }>,
    res: Response<FeedbackI | FeedbackI[] | { error: string }>
  ) => {
    const destinationId = req.params.destinationId
    try {
      const feedback = await FeedbackM.find({ destination_id: destinationId })
      const destination = await DestinationM.findById(destinationId)
      if (!destination) {
        // return res.status(404).send()
        return res.status(404).send({ error: 'Destination not existing!' })
      }
      if (!feedback || feedback.length === 0) {
        return res.status(404).send({ error: 'No feedback found for the destination.' })
      }

      res.json(feedback)
    } catch (e: any) {
      console.error('Error fetching feedback:', e)
      res.status(500).send(e)
    }
  }
)

// Leave feedback for a specific destination.
router.post(
  '/:destinationId',
  async (
    req: Request<{ destinationId: string } & { feedback_text: string } & { left_by: string }>,
    res: Response<FeedbackI | { error: string }>
  ) => {
    const destinationId = req.params.destinationId
    const { feedback_text, left_by } = req.body
    try {
      const destination = await DestinationM.findById(destinationId)
      if (!destination) {
        // return res.status(404).send()
        return res.status(404).send({ error: 'Destination not existing!' })
      }
      const feedback = new FeedbackM({
        destination_id: destinationId,
        feedback_text,
        left_by
      })

      await feedback.save()
      res.status(201).json(feedback)
    } catch (e: any) {
      console.error('Error leaving feedback:', e)
      res.status(500).send(e)
    }
  }
)

// Delete a feedback for a specific destionation 
router.delete(
    '/:destinationId/:id',
    async (req: Request<{ destinationId: string }>, res: Response<FeedbackI | { error: string } | {message: string}>) => {
      const destinationId = req.params.destinationId
      const { id } = req.params
      try {
        const destination = await DestinationM.findById(destinationId)
        if (!destination) {
          // return res.status(404).send()
          return res.status(404).send({error: 'Destination not existing!'});
        }
        const feedback = await FeedbackM.findByIdAndDelete(id)
        if(!feedback) {
            return res.status(404).send({error:'Feedback not existing!'});
        }
  
        res.status(200).json({ message: `Feedback with ID: ${feedback._id} has been deleted.` })
      } catch (e: any) {
        console.error('Error deleting destination by ID:', e)
        res.status(500).send(e)
      }
    }
  )

export default router
