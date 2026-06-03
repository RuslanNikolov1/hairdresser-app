import { useEffect } from "react";
import { type StringInputProps, set } from "sanity";

/** Keeps module status always "live" (hidden from editors). */
export function ForceLiveStatusInput(props: StringInputProps) {
  const { onChange, value } = props;

  useEffect(() => {
    if (value !== "live") {
      onChange(set("live"));
    }
  }, [onChange, value]);

  return null;
}
