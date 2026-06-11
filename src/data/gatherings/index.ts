import type { Gathering } from "@/types/domain";
import { gatherings as markers } from "./markers";
import { gatherings as jus } from "./j-us";

export const GATHERINGS: Gathering[] = [...markers, ...jus];
