---
name: creating-blog-post
description: House conventions for writing or editing a blog post in src/content/blog. Use ALWAYS when asked to write, create, draft, edit, rewrite, or polish ("zredaguj", "napisz post") a blog post, before touching any .mdx file there. Covers frontmatter, post structure for tips vs. tutorial posts, TL;DR placement, collapsible FAQ, images, internal links, and SEO/GEO/AEO rules.
---

# Creating or editing a blog post

Posts live in `src/content/blog/<slug>.mdx`. The frontmatter schema is in `src/content.config.ts`. The URL is `/posts/<slug>/`.

**SEO, GEO, and AEO are the top priority.** The blog exists to win organic traffic from Google and to get cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews). Every decision – title, headings, structure, FAQ, links – must serve that goal. Run the [SEO / GEO / AEO checklist](#seo--geo--aeo-checklist) on every post, not as an afterthought.

Load the `writing-style-guide` skill too: it covers prose (American English, sentence-case headings, straight quotes, en dashes, Oxford comma).

## Rule zero: copy existing posts, don't invent

Before writing, open 1–2 published posts of the same type and copy their structure. Only `published: true` posts are the reference; `published: false` ones are template leftovers or drafts.

| Type     | Tags                                     | Reference posts                                                                            |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Tips     | `tips` + language/topic                  | `stop-using-typescript-enums.mdx`, `store-monetary-values.mdx`, `which-uuid-is-better.mdx` |
| Tutorial | `tutorial` + topic (e.g., `electronics`) | `arduino-dc-motors-l298n.mdx`, `arduino-servo-motors.mdx`, `arduino-oled-display.mdx`      |

If you claim "no other post does X", prove it with a search scoped to that one pattern (e.g., `grep -l "## TL;DR" src/content/blog/*.mdx`), never from a long, truncated output.

## Frontmatter

```yaml
---
title: "How to <main keyword>: specific subtopics" # or "X vs. Y: ..." for comparisons; keep the author's "How to" title if the draft has one
description: "140–160 chars, contains the main keyword, says what the reader gets."
pubDate: "YYYY-MM-DD"
updatedDate: "YYYY-MM-DD" # only when editing an already published post
published: true
tags: ["tips", "JavaScript"]
---
```

- Never repeat the title as an `# H1` in the body; the layout renders it.
- Reuse existing tags (`tips`, `tutorial`, `JavaScript`, `TypeScript`, `database`, `electronics`) before adding a new one.
- When editing a published post, set `updatedDate` to today and leave `pubDate` alone.

## Tips post structure

1. One or two sentences of intro that state the answer, or go straight to the first `##` section.
2. `##` sections with question- or action-style headings ("How to…", "Why…", "X vs. Y").
3. **`## TL;DR` at the END**, never at the top. It holds a short prose summary or a short list.
4. Directly under TL;DR, one internal link – **only if a genuinely related post exists** (same topic or the reader's next question). For example, `store-monetary-values.mdx` links to the UUID post because both are about designing database tables. If nothing related exists, leave the link out; an off-topic link hurts more than it helps.

## Tutorial post structure

1. A YouTube URL alone on the first line of the body, if there's a video.
2. `## Overview` with a short intro and a "Key topics covered:" list (`**Term** – description`, with blank lines between items).
3. A `---` horizontal rule between every `##` section.
4. Code in `###` subsections, one complete runnable sketch per block.
5. `## FAQ and troubleshooting` as the last section.

## FAQ format (collapsible)

An FAQ is ALWAYS collapsible `<details>` blocks; `ProseWrapper.astro` styles them as an accordion. Never use `###` headings for FAQ questions.

```mdx
---

## FAQ and troubleshooting

<details>
<summary>Why does my DC motor not spin?</summary>

Answer in plain Markdown. Keep the blank lines after `<summary>` and before `</details>`, or Markdown inside won't render.

</details>

<details>
<summary>Next question?</summary>

Answer.

</details>
```

Write each `<summary>` as the exact question people search for. Answer it in the first sentence.

In a tips post, place the FAQ after TL;DR and its link, separated by `---`.

## Images

- Store them in `src/assets/posts/<topic>/`, preferably as `.webp` (`.svg` for diagrams).
- Reference them relatively: `![Descriptive alt text with keywords](../../assets/posts/<topic>/file.webp)`.
- Hand-made SVG diagrams match the existing ones (`uuid/`, `lambda/`): dark `#121212` rounded background, `#242424` cards, white sans-serif title, accents `#3498db` / `#2ecc71` / `#e67e22` / `#22d3ee`. Render a preview with `rsvg-convert` and look at it before inserting.
- Alt text describes what the image shows (connections, labels), not "image" or "diagram".

## SEO / GEO / AEO checklist

- The main keyword appears in the title, description, first paragraph, and at least one `##` heading.
- Headings are questions or tasks that match real searches.
- Each section opens with a direct answer, then expands.
- Facts and numbers match official docs; quote the docs in `>` blockquotes, not inline code.
- Internal links only to genuinely related posts, with descriptive anchor text; never add one just to have one.
- Link official docs and tools on first mention.
- **Never write a URL from memory.** Fetch every external link before adding it and confirm it loads with the expected content. A dead link hurts SEO and the author's credibility.
- **Quotes must be verbatim** from a page you actually fetched, with the source linked in the lead-in sentence: link the source in the sentence that introduces the quote, e.g., `Here's what [AWS says in its performance guide](url):` followed by `> ...exact excerpt.` Put nothing under the quote (no "Source:" line, no dash). Never use an em dash (—) anywhere, including attributions; ignore `markdown-style-guide.mdx`, it is a theme template, not a house reference. Keep the author's chosen excerpt; never expand it to the full sentence. Mark omitted words with `...` (e.g., `> ...data shows that...`). If you can't verify a quote, say so in your reply instead of publishing it.
- Code blocks use the correct language tag (`ts` for TypeScript, not `jsx`).
- Never rewrite the author's intro, jokes, or colorful phrasing ("brick-thick, ugly AWS docs"). That voice is the point of the blog. Fix only typos, grammar, punctuation, and exact duplicates; if you think a line should change, propose it in your reply and leave the text alone.
- Keep the author's voice and opinions. Don't rewrite the author's claims without saying so; point out factual problems in your reply instead of changing them silently.

## Before you finish

- Run `npx astro check`; it must report 0 errors.
- Compare the post against a reference post of the same type, section by section.
- In your reply, list what you changed in content (not only formatting) so the author can review it.
