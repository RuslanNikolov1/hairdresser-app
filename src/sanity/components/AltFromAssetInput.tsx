import { type StringInputProps } from "sanity";

import { useAltFromAsset } from "../lib/useAltFromAsset";

export function AltFromAssetInput(props: StringInputProps) {
  useAltFromAsset(props);
  return props.renderDefault(props);
}
