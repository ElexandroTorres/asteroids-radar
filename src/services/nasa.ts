import { FeedResponseSchema } from "../schemas/feed.schema";
import { api } from "./api";

export async function fetchAsteroids(start: string, end: string) {
    const response = await api.get("/feed", {
        params: {
            start_date: start,
            end_date: end,
        }
    });

    const validated = FeedResponseSchema.parse(response.data);
    console.log(validated);

    return validated;
}

export async function fetchAsteroidById(id: string) {
    const response = await api.get(`/neo/${id}`, {
        params: {
        },
    });

    return response.data;
}