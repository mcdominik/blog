---
name: writing-style-guide
description: Style and editing guidelines for writing docs, articles, tutorials, and blog posts in clear, professional American English. Use whenever the user asks to write, edit, proofread, or polish documentation, articles, handbook pages, blog posts, or similar prose content, or asks to apply "house style" / "style guide" rules to a piece of writing.
---

# Writing Style Guide

A general-purpose style guide for producing clear, scannable, professional written content (docs, articles, tutorials, blog posts, handbook pages). Apply these guidelines whenever drafting or editing this kind of prose.

## General principles

### Assume almost nothing

As mastery of a topic grows, some things become second nature — but they weren't always obvious to the writer, and they aren't obvious to the reader. Call out non-obvious steps or concepts explicitly, and link to relevant references where possible.

Write so that both experts and newcomers can follow along and get what they need.

### Get to the point

Don't wait three paragraphs to explain something. Start with the explanation, then expand. Most drafts can be improved by shortening or removing the intro.

Don't be boring.

### Make it easy to read

Most readers scan before committing to reading in full. They're looking for signs the piece will answer their question and is worth their time.

Use clear headings, diagrams, and tables to demonstrate thoroughness and structure.

### Avoid hedging

Be opinionated. Avoid hedges like "it's complicated" or "it depends" - they frustrate readers and add no value. Instead:

1. Have an opinion.
2. Provide an example.
3. Do the research until you can do 1 or 2.

## Style rules

### Use American English

Use American English spelling, grammar, and date/time formatting for consistency, unless the user or project specifies otherwise.

### Use sentence case for titles

Write "Documentation style guide", not "Documentation Style Guide".

### Capitalize product names and proper nouns as appropriate

Capitalize a product's name as a proper noun (e.g., "The team's second product was Session Replay"). When referring to a general industry term rather than a specific product name, keep it lowercase (e.g., "how many companies now offer product analytics").

### Capitalize acronyms and define where needed

Write "URLs", not "urls". When an acronym may be unfamiliar, define it or link its first use to a definition.

### Use the Oxford comma

Write "bananas, apples, and oranges", not "bananas, apples and oranges". It prevents ambiguity (e.g., "naming things, cache invalidation, and off-by-one errors" reads very differently without the final comma).

### Prefer "enable" over "allow"

"Allow" implies permission. "Enable" implies providing the means or opportunity. In most product-writing contexts, the subject _enables_ the user to do something, rather than _allowing_ them.

### Add extra line breaks between long bullet points

When bullet items are long (a sentence or more each), add a blank line between them in the Markdown source. This makes little visual difference once rendered, but makes the raw Markdown far easier to read and edit. Short, single-line bullet lists don't need this treatment.

### Use straight apostrophes and quote marks

Avoid "curly" typographic quotes and apostrophes introduced automatically by tools like Google Docs, Notion, or Word — use straight ' and " marks. These auto-formatting options can usually be disabled in the tool's settings.

### Hyphenate compound modifiers before a noun

Compound terms like "open source" should be hyphenated when used as an adjective directly before a noun (e.g., "the open-source community") but left unhyphenated in other contexts (e.g., "the project is open source"). Apply this same logic to other compound modifiers generally.

### Use en dashes for parenthetical breaks

Prefer an en dash ( – ) with a space on either side over an em dash (—) for a parenthetical break in a sentence, and never use a plain hyphen ( - ) in its place.

> Example: "Don't upvote your own content, and don't ask others to – post it and pray."

On a Mac, `Option` + hyphen produces an en dash.

## Voice and tone

### Address the reader directly

Address the reader as "you" instead of "the user", "developers", or "we". Use the imperative form (dropping "you") for instructions and commands.

> Do: "You can create a report by clicking **New report**." / "Create a report by clicking **New report**."
> Don't: "Users can create reports."

### Use active voice

Active voice makes it clear who or what performs an action. Use passive voice only when the actor is unknown or unimportant (e.g., "The data is encrypted at rest.").

> Do: "The system captures events automatically."
> Don't: "Events are captured automatically by the system."

### Use present tense

Write in present tense unless explicitly describing future behavior.

> Do: "The dashboard displays your data."
> Don't: "The dashboard will display your data."

### Be concise

Cut words that don't add value or clarity.

> Do: "Click **Save**."
> Don't: "Now you can go ahead and click the **Save** button to save your changes."

### Avoid unexplained jargon

Explain technical terms or acronyms on first use, or link to a definition, rather than assuming the reader already knows them.

### Use contractions

Contractions keep the tone conversational (e.g., "That's it" rather than "That is it").

## Word choice

### Numbers

Spell out zero through nine; use numerals for 10 and above, and always use numerals for percentages, measurements, and technical values (e.g., "three dashboards", "15 dashboards", "30 seconds").

### Acronyms and branded technology names

Write acronyms and initialisms in all caps (API, HTML, URL, SDK, CLI). Follow a technology's official capitalization for branded names (e.g., GraphQL, PostgreSQL).

### Choose simple words

Prefer common, simple words over inflated alternatives:

| Instead of | Use          |
| ---------- | ------------ |
| utilize    | use          |
| facilitate | help         |
| commence   | start, begin |
| subsequent | next         |
| prior to   | before       |

### Use precise verbs

Prefer a specific verb over a vague catch-all:

| Vague          | Specific                              |
| -------------- | ------------------------------------- |
| use the API    | call the API                          |
| work with data | query data, analyze data              |
| handle errors  | catch errors, log errors              |
| manage users   | add users, remove users, assign roles |

### Use inclusive language

Prefer neutral, inclusive terms, e.g., denylist/allowlist instead of blacklist/whitelist, validation/verification instead of sanity check, primary/secondary instead of master/slave.

### Avoid words that trivialize

Skip words like "simply", "just", "easily", "obviously", "of course", and "clearly" — they can sound dismissive of the reader's effort, especially when the step isn't actually simple for everyone.

> Do: "Add the SDK to your project."
> Don't: "Simply add the SDK to your project."

## Formatting and structure

### Write descriptive, action-oriented headings

Headings should say exactly what's in the section, preferring an action over a bare noun or gerund.

> Do: "## How to create a report"
> Don't: "## Report creation"

### Keep paragraphs short

Avoid paragraphs longer than 3–4 lines. Break up long content with subheadings, lists, or line breaks.

### Choose the right list type

Use bulleted lists for unordered items of equal importance; use numbered lists when order, ranking, or sequence matters. If a list has only one or two items, prose is often clearer than a list.

Be consistent with punctuation within one list: if items are complete sentences (subject + verb), end each with a period; if items are fragments completing an introductory phrase, use no period on any of them.

For definition-style lists (term plus short description), separate the term from its description with a dash, not a colon:

> Do: "**Feature flags** – control rollouts and run experiments"
> Don't: "**Feature flags:** control rollouts and run experiments"

### Use tables for multi-attribute comparisons

When a list has become hard to scan because each item packs in several attributes (e.g., name, price, limits), switch to a table with one column per attribute instead.

### Use bold with intention

Reserve bold text for structured elements: callout labels ("**Note:**", "**Warning:**"), definition-list terms, problem/solution labels, and UI elements the reader needs to find (buttons, menu items, field names — without quotes around them). Avoid bold for general emphasis in ordinary prose; if a point truly needs emphasis, consider a callout box instead.

For a sequence of nested UI elements, connect them with `>` rather than a full sentence (e.g., "Go to **Settings** > **API keys**").

### Don't over-format

Avoid stacking multiple heading levels in a short section, bolding for general emphasis, turning short prose into a list, or using too many callout boxes on one page.

## Links

### Link the first mention of a term

Link the first mention of a term, feature, or concept on a page to wherever it's defined or documented in more depth, Wikipedia-style.

### Write descriptive link text

Link text should describe the destination rather than using generic phrases like "click here" or "this page".

> Do: "See the [installation guide](#) for instructions."
> Don't: "Click [this link](#) for installation instructions."

## Code

### Use backticks for code

Use single backticks for inline code or values in prose (e.g., `func()`), and triple backticks for multi-line code blocks.

### Follow each language's own conventions

Follow the target language's standard naming and style conventions rather than imposing one convention everywhere (e.g., `camelCase` for JS/TS functions and variables vs. `snake_case` for Python).

### Use realistic examples

Show realistic values and use cases in code samples rather than placeholders like `event` / `property` / `value`, so the example doubles as a template the reader can adapt.

### Comment sparingly

Add a comment only when the code isn't self-explanatory — explain the "why", not the "what".

## Applying this guide

When writing or editing content:

1. Draft with the general principles above in mind (be direct, opinionated, and scannable), addressing the reader as "you", in active voice and present tense.
2. Pass over the draft and apply the mechanical style rules (capitalization, punctuation, dashes, quotes, comma usage, numbers, "enable" vs. "allow").
3. Tighten word choice: cut jargon, trivializing words, and inflated vocabulary; use precise verbs and inclusive terms.
4. Check structure: descriptive headings, short paragraphs, the right list type, tables where a list gets hard to scan, and bold/links used with intention.
5. If the user has their own house-style conventions that conflict with a rule here (e.g., British English, different comma conventions), defer to their stated preference.
