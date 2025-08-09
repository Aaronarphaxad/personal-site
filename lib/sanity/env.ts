// Support multiple common env names to reduce misconfiguration
const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_API_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  ""

const dataset =
  process.env.SANITY_DATASET ||
  process.env.SANITY_API_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production"

export const SANITY_PROJECT_ID = projectId
export const SANITY_DATASET = dataset
export const SANITY_API_VERSION = process.env.SANITY_API_VERSION || "2025-05-01"
export const SANITY_READ_TOKEN =
  process.env.SANITY_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_READ_TOKEN
