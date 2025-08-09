import { groq } from "next-sanity"

export const SETTINGS = groq`*[_type == "settings"][0]{
  name, role, current, location, email, availability, socials, tagline, about, values,
  accent, footballTeam, teamBadge
}`

export const PROJECTS = groq`*[_type == "project"]|order(coalesce(order, 9999) asc, year desc){
  _id, title, "slug": slug.current, year, description, role, tags, image, highlights, problem, solution, outcome
}`

export const EXPERIENCE = groq`*[_type == "experience"]|order(coalesce(order, 9999) asc){
  title, org, period, blurb
}`

export const NOTES = groq`*[_type == "note"]|order(date desc){
  title, content, "date": coalesce(date, "") , tags
}`

export const QUOTES = groq`*[_type == "quote"]{
  text, author
}`

export const BOOKS = groq`*[_type == "book"]|order(title asc){
  title, author, cover, link
}`

export const MUSIC = groq`*[_type == "music"]|order(track asc){
  artist, track, art
}`

export const SHOWS = groq`*[_type == "show"]|order(year desc){
  title, year
}`
