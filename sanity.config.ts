import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import schema from "./sanity/schema"
import { SANITY_PROJECT_ID, SANITY_DATASET } from "./lib/sanity/env"

const config = defineConfig({
  name: "personal_brand_site",
  title: "Personal Site CMS",
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema,
})

export default config
export { config }
