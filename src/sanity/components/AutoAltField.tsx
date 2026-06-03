import { type StringInputProps } from "sanity";

import { useAltFromAsset } from "../lib/useAltFromAsset";

/** Fills alt from the asset filename; no visible editor. */
export function AutoAltField(props: StringInputProps) {
  useAltFromAsset(props);
  return null;
}
