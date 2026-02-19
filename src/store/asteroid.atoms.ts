import { atom } from "jotai";

export const asteroidListAtom = atom<any[]>([]);
export const loadingAtom = atom(false);
export const hazardousFilterAtom = atom(false);