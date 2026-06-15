import type { Gathering } from "@/types/domain";
import { gatherings as markers } from "./markers";
import { gatherings as jus } from "./j-us";
import { gatherings as anointing } from "./anointing";
import { gatherings as welove } from "./welove";
import { gatherings as ywam } from "./ywam";
import { gatherings as i6tyone } from "./i6tyone";
import { gatherings as feast } from "./feast";
import { gatherings as fia } from "./fia";
import { gatherings as yeram } from "./yeram";
import { gatherings as teamluke } from "./teamluke";

export const GATHERINGS: Gathering[] = [...markers, ...jus, ...anointing, ...welove, ...ywam, ...i6tyone, ...feast, ...fia, ...yeram, ...teamluke];
