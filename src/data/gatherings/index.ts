import type { Gathering } from "@/types/domain";
import { gatherings as markers } from "./markers";
import { gatherings as jus } from "./j-us";
import { gatherings as anointing } from "./anointing";
import { gatherings as welove } from "./welove";

export const GATHERINGS: Gathering[] = [...markers, ...jus, ...anointing, ...welove];
