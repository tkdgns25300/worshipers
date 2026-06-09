import type { Gathering } from "@/types/domain";
import { gatherings as markers } from "./markers";
import { gatherings as jUs } from "./j-us";
import { gatherings as welove } from "./welove";

export const GATHERINGS: Gathering[] = [...markers, ...jUs, ...welove];
