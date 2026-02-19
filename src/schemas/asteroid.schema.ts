import { z } from "zod";

export const AsteroidSchema = z.object({
  id: z.string(),
  name: z.string(),
  is_potentially_hazardous_asteroid: z.boolean(),
  estimated_diameter: z.object({
    meters: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number(),
    }),
  }),
  close_approach_data: z.array(
    z.object({
      miss_distance: z.object({
        kilometers: z.string(),
      }),
      relative_velocity: z.object({
        kilometers_per_hour: z.string(),
      }),
    })
  ),
});

export type Asteroid = z.infer<typeof AsteroidSchema>;