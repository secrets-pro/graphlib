import { Graph } from "../graph";
import { topsort } from "./topsort";

export function isAcyclic(g: Graph) {
  try {
    topsort(g);
  } catch (e) {
    if (e instanceof topsort.CycleException) {
      return false;
    }
    throw e;
  }
  return true;
}
