import { type SchemaTypeDefinition } from "sanity"
import { defineType, defineField } from "sanity"

const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "current", type: "string", title: "Current Role" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "availability",
      type: "string",
      options: { list: ["open", "selective", "closed"] },
      initialValue: "open",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "url" },
          ],
        },
      ],
    }),
    defineField({ name: "tagline", type: "text", rows: 3 }),
    defineField({ name: "about", type: "text", rows: 6 }),
    defineField({
      name: "values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "detail", type: "text", rows: 3 },
          ],
        },
      ],
    }),
    defineField({ name: "accent", type: "string", description: "Brand color (e.g., #7CFF6B)" }),
    defineField({ name: "footballTeam", type: "string" }),
    defineField({ name: "teamBadge", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
})

const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({ name: "outcome", type: "text" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "year", media: "image" } },
})

const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "org", type: "string", title: "Organization" }),
    defineField({ name: "period", type: "string" }),
    defineField({ name: "blurb", type: "text" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "period" } },
})

const note = defineType({
  name: "note",
  title: "Notes",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "content", type: "text" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "title", subtitle: "date" } },
})

const quote = defineType({
  name: "quote",
  title: "Quotes",
  type: "document",
  fields: [
    defineField({ name: "text", type: "text" }),
    defineField({ name: "author", type: "string" }),
  ],
  preview: { select: { title: "author", subtitle: "text" } },
})

const book = defineType({
  name: "book",
  title: "Books",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "link", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "author", media: "cover" } },
})

const music = defineType({
  name: "music",
  title: "Music",
  type: "document",
  fields: [
    defineField({ name: "artist", type: "string" }),
    defineField({ name: "track", type: "string" }),
    defineField({ name: "art", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "track", subtitle: "artist", media: "art" } },
})

const show = defineType({
  name: "show",
  title: "Shows & Movies",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "year", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "year" } },
})

export default {
  types: [settings, project, experience, note, quote, book, music, show],
} satisfies { types: SchemaTypeDefinition[] }
