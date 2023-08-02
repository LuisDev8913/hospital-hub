import { z } from "zod";

export const clinicSchema = z.object({
  id: z.string(),
  createdTime: z.string().datetime(),
  fields: z.object({
    Name: z.string(),
    "Service Tvpe": z.array(z.string()),
    lat: z.number(),
    lng: z.number(),
    Address: z.string(),
    State: z.string(),
    "Street Address": z.string(),
    Suburb: z.string(),
    Postcode: z.string(),
    "Geocode Cache": z.string(),
  }),
});

export type Clinic = z.infer<typeof clinicSchema>;
