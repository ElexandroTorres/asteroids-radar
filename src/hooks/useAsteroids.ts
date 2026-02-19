import { useSetAtom } from "jotai";
import { fetchAsteroids } from "../services/nasa";

import { asteroidListAtom, loadingAtom } from "../store/asteroid.atoms";

export function useAsteroids() {
    const setAsteroids = useSetAtom(asteroidListAtom);
    const setLoading = useSetAtom(loadingAtom);

    async function load(start: string, end: string) {
        try {
            setLoading(true);

            const data = await fetchAsteroids(start, end);
            setAsteroids(data);
        } catch (error) {
            console.log("Erro ao carregar asteroides:", error);
        } finally {
            setLoading(false);
        }
    }

    return { load };
}