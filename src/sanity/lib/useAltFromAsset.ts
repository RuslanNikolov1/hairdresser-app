import { useEffect, useRef } from "react";
import { set, useClient, useFormValue, type StringInputProps } from "sanity";

import { apiVersion } from "../env";
import { altTextFromFilename } from "./altFromFilename";

export function useAltFromAsset(
  props: Pick<StringInputProps, "onChange" | "path" | "value">,
) {
  const { onChange, path, value } = props;
  const client = useClient({ apiVersion });
  const imagePath = path.slice(0, -1);
  const assetRef = useFormValue([...imagePath, "asset", "_ref"]) as
    | string
    | undefined;
  const filledForAssetRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!assetRef || value) {
      return;
    }

    if (filledForAssetRef.current === assetRef) {
      return;
    }

    let cancelled = false;

    void client
      .fetch<{ originalFilename?: string } | null>(
        `*[_id == $id][0]{ originalFilename }`,
        { id: assetRef },
      )
      .then((asset) => {
        if (cancelled || !asset?.originalFilename || value) {
          return;
        }

        const alt = altTextFromFilename(asset.originalFilename);
        if (!alt) {
          return;
        }

        filledForAssetRef.current = assetRef;
        onChange(set(alt));
      });

    return () => {
      cancelled = true;
    };
  }, [assetRef, client, onChange, value]);

  useEffect(() => {
    if (!assetRef) {
      filledForAssetRef.current = undefined;
    }
  }, [assetRef]);
}
