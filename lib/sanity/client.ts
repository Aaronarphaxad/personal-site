import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, SANITY_READ_TOKEN } from "./env"

// Lazily create the client only when Sanity env is configured
export const sanityClient = SANITY_PROJECT_ID
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
      token: SANITY_READ_TOKEN, // not required for public datasets
      perspective: "published",
    })
  : ({} as any)

const builder = SANITY_PROJECT_ID
  ? imageUrlBuilder({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
    })
  : null

export function urlForImage(source: any) {
  try {
    if (!builder) return undefined
    return builder.image(source).width(1200).url()
  } catch {
    return undefined
  }
}
