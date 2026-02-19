import { z } from "zod";

export const CloseApproachSchema = z.object({
  miss_distance: z.object({
    kilometers: z.string(),
  }),
  relative_velocity: z.object({
    kilometers_per_hour: z.string(),
  }),
});

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
  close_approach_data: z.array(CloseApproachSchema),
});

export const FeedResponseSchema = z.object({
  near_earth_objects: z.record(z.string(), z.array(AsteroidSchema)),
}).transform((data) => {
  const flattened: any[] = [];
  
  Object.entries(data.near_earth_objects).forEach(([date, asteroids]) => {
    asteroids.forEach((asteroid) => {
      flattened.push({
        id: asteroid.id,
        name: asteroid.name,
        hazardous: asteroid.is_potentially_hazardous_asteroid,
        diameterMin: asteroid.estimated_diameter.meters.estimated_diameter_min,
        diameterMax: asteroid.estimated_diameter.meters.estimated_diameter_max,
        distance: Number(asteroid.close_approach_data[0].miss_distance.kilometers),
        velocity: Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
        date,
      });
    });
  });
  
  return flattened;
});