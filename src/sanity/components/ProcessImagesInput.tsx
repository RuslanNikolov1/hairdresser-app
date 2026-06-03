import { UploadIcon } from "@sanity/icons";
import { randomKey } from "@sanity/util/content";
import { Button, Stack, Text, useToast } from "@sanity/ui";
import { useCallback, useRef, useState } from "react";
import {
  type ArrayOfObjectsInputProps,
  insert,
  setIfMissing,
  useClient,
} from "sanity";

import { apiVersion } from "../env";
import { altTextFromFilename } from "../lib/altFromFilename";

const IMAGE_MEMBER_TYPE = "imageWithAutoAlt";

type ProcessImageItem = {
  _key: string;
  _type: typeof IMAGE_MEMBER_TYPE;
  alt: string;
  asset: {
    _type: "reference";
    _ref: string;
  };
};

export function ProcessImagesInput(props: ArrayOfObjectsInputProps) {
  const { onChange, readOnly, renderDefault } = props;
  const client = useClient({ apiVersion });
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length || readOnly) {
        return;
      }

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (!imageFiles.length) {
        toast.push({
          status: "warning",
          title: "Няма избрани изображения",
          description: "Изберете един или повече файлове с формат на снимка.",
        });
        return;
      }

      setUploading(true);

      try {
        const uploadedItems = await Promise.all(
          imageFiles.map(async (file): Promise<ProcessImageItem> => {
            const asset = await client.assets.upload("image", file, {
              filename: file.name,
            });

            return {
              _key: randomKey(12),
              _type: IMAGE_MEMBER_TYPE,
              alt: altTextFromFilename(file.name),
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            };
          }),
        );

        onChange([setIfMissing([]), insert(uploadedItems, "after", [-1])]);

        toast.push({
          status: "success",
          title:
            imageFiles.length === 1
              ? "Качено е 1 изображение"
              : `Качени са ${imageFiles.length} изображения`,
        });
      } catch (error) {
        toast.push({
          status: "error",
          title: "Качването неуспешно",
          description:
            error instanceof Error ? error.message : "Опитайте отново.",
        });
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [client, onChange, readOnly, toast],
  );

  return (
    <Stack space={3}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          void handleFiles(event.target.files);
        }}
      />
      <Button
        icon={UploadIcon}
        text={uploading ? "Качване…" : "Качи няколко снимки наведнъж"}
        mode="ghost"
        disabled={readOnly || uploading}
        onClick={() => fileInputRef.current?.click()}
      />
      <Text muted size={1}>
        Изберете множество файлове в прозореца за качване, или плъзнете
        снимки върху полето по-долу.
      </Text>
      {renderDefault(props)}
    </Stack>
  );
}
