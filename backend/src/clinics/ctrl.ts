import type { Request, Response } from 'express';
import { findClinics } from './model';
import { z } from 'zod';

const getClinicsQuerySchema = z.object({
  service: z.string().or(z.array(z.string())).optional(),
  location: z.string().optional()
});

/**
 * @desc      Get clinics by service or/and location
 * @route     `GET` `/clinics/?service=service&location=location`
 * @query     `service` - service type - can be multiple
 * @query     `location` - location query by Address
 * @success 	`{
 *                isSuccess: boolean,
 *                clinics: Clinic[]
 *             }`
 * @access    Public
 */
const getClinics = async (req: Request, res: Response) => {
  try {
    const query = getClinicsQuerySchema.safeParse(req.query);

    if (!query.success) {
      return res.status(400).json({ isSuccess: false, message: 'Invalid query params' });
    }

    const { service, location } = query.data;

    const clinics = await findClinics(service, location);

    return res.status(200).json({
      isSuccess: true,
      clinics
    });
  } catch (err) {
    console.error(`Error: ${err}`.red);
    return res.status(500).json({ isSuccess: false, message: 'Server Error' });
  }
};

export default { getClinics };
