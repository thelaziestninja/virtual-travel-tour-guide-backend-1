import { Router } from 'express'
import { Request, Response, ResponseStatus, BaseResponse } from '../../types/request'
import { DestinationI } from '../../types'
import { DestinationM } from '../models/destination'
import { AddToDestinationRequest } from '../../types/requests/AddToDestinationRequest'

const router = Router()

// Route for creating a new destination
router.post(
  '/',
  async (
    req: Request<AddToDestinationRequest>,
    res: Response<DestinationI | { error: string }>
  ) => {
    const { name, description, image_url, country, best_time_to_visit } = req.body

    try {
      const newDestination = new DestinationM({
        name,
        description,
        image_url,
        country,
        best_time_to_visit
      })

      const savedDestination = await newDestination.save()
      res.status(201).json(savedDestination)
    } catch (e: any) {
      console.error('Error saving destination:', e)
      res.status(500).send(e)
    }
  }
)

// Route for getting the destinations
router.get('/', async (req: Request<void>, res: Response<DestinationI[] | { error: string }>) => {
  try {
    const destinations: DestinationI[] = await DestinationM.find({})

    if (!destinations || destinations.length === 0) {
      return res.status(404).send()
      //   return res.status(404).json({ error: 'No destinations found!' });
    }

    res.send(destinations)
  } catch (e: any) {
    console.error('Error fetching destinations:', e)
    res.status(500).send(e)
  }
})

// Route for getting the destinations by id
router.get(
  '/:id',
  async (req: Request<{ id: string }>, res: Response<DestinationI | { error: string }>) => {
    const _id = req.params.id

    try {
      const destination = await DestinationM.findById(_id)
      if (!destination) {
        // return res.status(404).send()
          return res.status(404).send({error: 'Destination not existing!'});
      }

      res.send(destination)
    } catch (e: any) {
      console.error('Error fetching destination by ID:', e)
      res.status(500).send(e)
    }
  }
)

//Route for editing details of a destination.
router.put('/:id', async (req: Request<DestinationI>, res: Response<DestinationI | { error: string }>) => {
    const { id } = req.params;
    const { name, description, image_url, country, best_time_to_visit } = req.body;
  
    try {
      const destination = await DestinationM.findByIdAndUpdate(
        id,
        {
          name,
          description,
          image_url,
          country,
          best_time_to_visit,
        },
        { new: true } // will contain the updated document with the new name etc. after the update is complete.
      );
  
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found!' });
      }
  
      res.status(200).json(destination);
    } catch (e: any) {
      console.error('Error updating destination:', e);
      res.status(500).json(e);
    }
  });

//Route for deleting a destination by ID
router.delete(
  '/:id',
  async (req: Request<{ id: string }>, res: Response<DestinationI | { error: string } | {message: string}>) => {
    const { id } = req.params

    try {
      const destination = await DestinationM.findByIdAndDelete(id)
      if (!destination) {
        // return res.status(404).send()
        return res.status(404).send({error: 'Destination not existing!'});
      }

      res.status(200).json({ message: `${destination.name} with ID: ${destination._id} has been deleted.` })
    } catch (e: any) {
      console.error('Error deleting destination by ID:', e)
      res.status(500).send(e)
    }
  }
)
export default router
