# Time & Joy Works Revamp Design

Date: 2026-04-25
Project: `Time & Joy`
Scope: homepage, `Projects`, `Project Detail`, `Studio`, `Journal`, navigation updates

## 1. Goal

This revamp keeps the current quiet, refined, high-end visual language, while making the site easier to read as a body of work rather than a brand statement page.

The redesign solves three primary problems:

1. Users should reach project browsing quickly from the homepage.
2. The `Projects` page should behave like a readable project directory instead of an image wall.
3. The `Project Detail` page should communicate design method and judgment, not only mood and imagery.

## 2. Product Positioning

- Site type: interior and spatial design portfolio
- Primary objective: brand presentation first, soft inquiry second
- Main narrative: commercial spaces lead, residential projects support aesthetic credibility
- Reading path: gallery entry -> project directory -> readable project detail -> soft contact
- Tone: restrained, clear, artistic, opinionated, not abstract for its own sake
- CTA style: lightweight, invitation-based, never sales-heavy

## 3. Design Principles

- Preserve the current spacing, typography restraint, and premium feeling.
- Improve information hierarchy before changing the visual style.
- Make key project information visible by default on desktop and mobile.
- Avoid hover-only information layers as the sole reading mechanism.
- Favor calm transitions and stable layouts over expressive effects.
- Treat each page as part of one continuous project-reading flow.

## 4. Information Architecture

Primary navigation becomes:

- `Projects`
- `Studio`
- `Journal`
- `Contact`

Page priority becomes:

1. `Projects`
2. `Home`
3. `Project Detail`
4. `Studio`
5. `Contact`
6. `Journal`

## 5. Homepage

### 5.1 Intent

The homepage should establish atmosphere quickly, then move users into selected work with minimal friction.

### 5.2 Structure

Order:

1. `Hero`
2. `Selected Works`
3. `Design Perspective`
4. `Soft Contact`

### 5.3 Hero

- Keep the current hero image, title, and overall visual mood.
- Keep text concise and attitude-led.
- Add one lightweight entry such as `View Selected Works` or `Explore Projects`.
- Do not add dense copy or strong CTA buttons.

### 5.4 Selected Works

- Place directly after the hero.
- Show 4 featured projects in the first iteration.
- Prioritize commercial projects in sequence.
- Use residential work selectively as aesthetic support.
- Every card shows by default:
  - cover image
  - project name
  - city
  - type
- Cards must read clearly on mobile without hover.

Recommended content pattern:

- 3 commercial projects
- 1 residential project

### 5.5 Design Perspective

- Replace the current longer manifesto and `Our Story` emphasis with a shorter design-position text.
- Length target: 80 to 140 words in English, equivalent concise Chinese translation.
- Focus on order, light, material restraint, proportion, and long-term calm.
- Keep this section secondary to work browsing.

### 5.6 Soft Contact

- Retain a minimal bottom invitation.
- Use light phrasing such as:
  - `For selected commissions and collaborations, please get in touch.`

## 6. Projects Page

### 6.1 Intent

The page should function as a readable catalog of work, not a pure visual collage.

### 6.2 Structure

1. Short intro text
2. Filter controls
3. Ordered project grid

### 6.3 Intro

- Keep one short overview sentence.
- Tone should feel editorial and specific.
- Avoid hover-instruction wording because critical information will be visible by default.

Reference direction:

`A curated archive of commercial and residential interiors shaped by spatial clarity, material restraint, and emotional resonance.`

### 6.4 Filters

Provide:

- `All`
- `Commercial`
- `Residential`

Behavior:

- `All` is default
- Filter switches the visible project cards inline
- No page reload required in the first implementation

### 6.5 Project Cards

All cards should share a stable information block:

- image
- project name
- city
- type
- optional secondary meta: year or area

Reading behavior:

- information visible by default
- hover can add subtle emphasis only
- mobile keeps the same content hierarchy

### 6.6 Ordering

- Commercial projects appear first in `All`
- Featured commercial projects occupy the most prominent early positions
- Residential projects remain present but do not lead the main narrative

## 7. Project Detail

### 7.1 Intent

The project detail page should feel like reading a concise design case study.

### 7.2 Structure

1. Project header
2. Hero image
3. Concept
4. Project data
5. Concept summary line
6. `Spatial Narrative`
7. Curated gallery
8. `Related Projects`
9. Soft CTA

### 7.3 Header

The project title area should contain:

- city
- project name
- type
- one short concept summary

The summary should express the project stance in one sentence.

### 7.4 Concept

- Retain the current concept section.
- Refine copy to emphasize design judgment rather than atmosphere alone.
- Target length: 80 to 180 words.

### 7.5 Project Data

Retain the current module and extend when useful with:

- Location
- Type
- Area
- Year
- Scope
- Photography

### 7.6 Spatial Narrative

Add a new method-focused section with 3 or 4 short sub-points:

- circulation
- light
- material
- function and mood

This section should explain:

- how movement is organized
- how light enters or is staged
- how material choices are restrained and controlled
- how practical use and emotional atmosphere are balanced

The section should be concise but explicit enough that a commercial client can understand the design strategy.

### 7.7 Gallery

Keep the current gallery presence, but change its logic from equal-density scrolling to paced reading.

Gallery strategy:

- alternate wide space views and tighter detail views
- avoid a purely repetitive masonry rhythm
- add light captions where helpful
- allow insertion of plan, sketch, material, or detail frames in future

### 7.8 Related Projects

Add a two-project recommendation block at the bottom.

Each related project includes:

- image
- name
- city
- type

Purpose:

- keep browsing continuous
- reduce dead ends after one detail page

### 7.9 Soft CTA

End with one line of invitation, not a strong conversion block.

Reference direction:

`For selected commissions and collaborations, please get in touch.`

## 8. Studio Page

### 8.1 Intent

`Studio` replaces the old `About` logic. It should explain how the practice thinks and works, not function as a corporate profile.

### 8.2 Structure

1. Brand introduction
2. Design position
3. Service focus
4. Collaboration approach
5. Cities or project range

### 8.3 Tone

- no timeline-heavy company story
- no inflated self-description
- emphasize working method, suitability, and point of view

## 9. Journal Page

### 9.1 Intent

`Journal` should act as a future-facing editorial output page, even if the first version is lightweight.

### 9.2 Structure

1. Intro line
2. Article list or editorial cards
3. Basic metadata per entry

### 9.3 Content Direction

- project releases
- material and craft notes
- spatial essays
- construction and execution details
- awards, media, exhibitions

The first version can be a simple structured list with strong typography and spacing.

## 10. Interaction Rules

- Filters should update clearly and immediately.
- Hover may enrich cards but must never hide essential metadata.
- Mobile cards and detail sections must remain readable without layered interactions.
- Motion should stay subtle and support hierarchy, not performance.
- Existing bilingual behavior remains in place and should extend to new page content.

## 11. Content Strategy For This Iteration

- Use the current sample project set already present in the site.
- Reorganize those sample projects into a clearer commercial-first system.
- Do not block implementation on final real project data.
- Keep copy modular so real project names and facts can be replaced later.

## 12. Implementation Order

### Priority 1

- Homepage `Selected Works`
- Homepage `Design Perspective` replacing the current heavier `Our Story` emphasis

### Priority 2

- `Projects` filters
- unified project card system
- commercial-first ordering

### Priority 3

- `Project Detail` concept summary
- `Spatial Narrative`
- gallery rhythm improvements
- `Related Projects`
- soft CTA
- `Studio` page
- `Journal` page
- navigation label updates

## 13. Error Handling And Edge Cases

- If JavaScript filtering is unavailable, `Projects` should still show all projects in a readable default order.
- If a card image fails, the text block must remain readable and clickable.
- Mobile layouts must not rely on hover states to expose project metadata.
- New nav destinations must not ship with broken links; `Studio` and `Journal` must exist before nav labels change.
- Related project cards must degrade gracefully if fewer than two recommended items are available.

## 14. Verification

Manual verification for the first implementation should cover:

- homepage hero to selected works reading flow
- mobile readability of homepage project cards
- `Projects` filter behavior and active state
- commercial-first ordering in `All`
- detail page readability of concept summary and `Spatial Narrative`
- gallery pacing on desktop and mobile
- related project continuity
- nav routing to `Studio`, `Journal`, `Contact`, and `Projects`
- bilingual switching on all new copy

## 15. Out Of Scope

- replacing all sample projects with final real project assets
- advanced CMS behavior
- article detail pages for `Journal`
- complex animations or experimental layouts
- heavy inquiry forms or sales-led conversion flows

## 16. Success Criteria

The redesign succeeds if:

- users can reach work browsing almost immediately from the homepage
- the `Projects` page reads as a catalog, not a collage
- the detail page communicates method and strategy, not only taste
- users have a clear path to continue browsing after one project
- the site remains quiet, refined, and easy to read on mobile and desktop
