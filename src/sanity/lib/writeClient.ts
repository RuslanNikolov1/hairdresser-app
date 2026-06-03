import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
