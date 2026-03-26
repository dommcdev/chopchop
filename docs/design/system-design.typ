// --- Color Definitions ---
#let ccgreen = rgb("2E5F46")
#let ccink = rgb("2D2D2D")
#let cclink = rgb("1B5C8D")

// --- Document Setup ---
#set document(title: "ChopChop: The Digital Cookbook")
#set page(
  paper: "us-letter",
  margin: 1in,
  // Modern Typst uses 'context' to check the current page number
  header: context {
    if counter(page).get().first() > 1 {
      grid(
        columns: (1fr, 1fr),
        align(left)[#text(fill: ccink)[*ChopChop*: The Digital Cookbook]],
        align(right)[#text(fill: ccink)[System Design]],
      )
      v(-0.5em)
      line(length: 100%, stroke: 0.5pt + luma(200))
    }
  },
  footer: context {
    if counter(page).get().first() > 1 {
      align(center)[#text(fill: ccink)[#counter(page).display()]]
    }
  },
)

// --- Typography ---
#set text(font: "New Computer Modern", size: 11pt, fill: ccink)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.")

// Style headings to match the LaTeX colors
#show heading: it => block(below: 1em)[
  #set text(fill: ccgreen) if it.level == 1
  #set text(fill: ccink) if it.level > 1
  #it
]
#show link: set text(fill: cclink)

// ==========================================
// TITLE PAGE
// ==========================================
#align(center + horizon)[
  #text(48pt, fill: ccgreen, weight: "bold")[ChopChop] \
  #v(0.5em)
  #text(24pt, fill: ccink, weight: "bold")[The Digital Cookbook] \

  #v(1.5em)
  #line(length: 60%, stroke: 1.5pt + luma(150))
  #v(2em)

  #text(16pt)[CS3340/6340 System Design Document] \

  #v(3em)
  #text(18pt, weight: "bold")[Prepared By:] \
  #v(1em)
  #text(14pt)[
    Adolfo Duran \
    Dominic McDevitt \
    Katie Cerda \
    Kobie Henson \
    Shane Misley
  ] \
  #v(2em)
  #text(14pt)[February 10, 2026] \

  #v(4em)
  #box(width: 85%)[
    #text(14pt, style: "italic")[
      A web-based recipe management platform for transforming fragmented culinary data into structured, editable, and shareable digital recipes.
    ]
  ]
]

#pagebreak()

// ==========================================
// TABLE OF CONTENTS
// ==========================================
#outline(title: [Table of Contents], indent: auto)

#pagebreak()

// ==========================================
// CONTENT (Examples & Filler)
// ==========================================
= Background and Overview
ChopChop is a web-based recipe management platform designed to solve the problem of disorganization with cooking recipes. By converting unstructured image data into structured JSON objects, the system enables dynamic recipe scaling, editing, and cross-platform access.

This approach solves the legacy data problem. Users are no longer left with folders of inconsistently formatted PDFs or physical binders that are static and unsearchable.

= Requirements Analysis
== Introduction
Our idea for ChopChop came from recognizing that many people rely on unreliable and inconvenient methods to save recipes.

== Main Functionalities
*A user will be able to...*
- Create an account to have easy access to their recipe collection.
- Upload a pdf or image of a recipe to add it to the system.
- Create/edit categories to keep recipes organized.
- Edit the number of servings they want for a recipe.

#pagebreak()

= Detailed Design
== System Architecture
The system follows a modern web application architecture using Next.js for both frontend and backend API routes.

== Data Design
Here is an example of a clean, natively-rendered table in Typst:

#v(1em)
#table(
  columns: (1fr, 1.5fr, 2fr),
  inset: 8pt,
  align: horizon,
  stroke: (x, y) => (
    bottom: if y == 0 { 1pt + black } else { 0.5pt + luma(200) },
    top: if y == 0 { 1pt + black } else { 0pt },
  ),
  [*Field*], [*Type*], [*Description*],
  [id], [UUID (Primary Key)], [Unique identifier],
  [email], [String (Unique, Indexed)], [User email address],
  [password_hash], [String], [Argon2id hashed password],
)
