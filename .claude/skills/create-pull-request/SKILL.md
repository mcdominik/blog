---
name: create-pull-request
description: Create a GitHub pull request in current repository. Use when the user asks to open a PR, push a fix, create a pull request, or ship changes.
lastReviewed: 2026-05-20
---

# Create Pull Request

## Workflow

Rules:

- Stable branches are `main` and `dev`
- You **never** push directly to stable branch, unless user requests it.
- You **never** force-push.
- **PR title** and **commits** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): `type(scope): imperative summary` (concise, no trailing period).
- **PR description** Follow `.github/pull_request_template.md` and the `writing-pr-descriptions` skill.
- If there are uncommitted changes, commit them, unless the user specifies not to commit them.
- If you are currently on stable branch, infer a meaningful branch name from the staged/uncommitted changes and branch off by yourself.
- If the intent is unclear or ambiguous, **always** ask the user before proceeding.
- Once the PR is prepared, share a summary and **always** wait for approval before publishing.

## Your workflow:

1. Gather context based on rules.
2. Create the PR (locally).
3. Return summary and wait for confirmation.
   - If accepted, push to remote and return the PR URL as a hyperlink.
   - If rejected, follow user instructions or clean up after yourself.
