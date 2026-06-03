import { useEffect } from "react";
import { set, type ObjectInputProps, useFormValue } from "sanity";

import { slugifyFromTitle } from "../lib/slugifyFromTitle";

type SlugValue = {
  _type: "slug";
  current?: string;
};

export function AutoSlugInput(props: ObjectInputProps<SlugValue>) {
  const { onChange, renderDefault, schemaType, value } = props;
  const title = useFormValue(["title"]) as string | undefined;
  const maxLength =
    typeof schemaType.options?.maxLength === "number"
      ? schemaType.options.maxLength
      : 96;

  useEffect(() => {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      return;
    }

    const nextSlug = slugifyFromTitle(trimmedTitle, maxLength);

    if (nextSlug && nextSlug !== value?.current) {
      onChange(
        set({
          _type: "slug",
          current: nextSlug,
        }),
      );
    }
  }, [maxLength, onChange, title, value?.current]);

  return renderDefault({ ...props, readOnly: true });
}
