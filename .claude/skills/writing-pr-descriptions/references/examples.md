# Worked examples

Two merged PRs, as shipped and after all five passes. Read these when the rule in `SKILL.md` is clear but you want to see it applied end to end.

Example 1 comes from this repo and shows the risk and rollout section at work.
Example 2 comes from a public open-source repo. The stack differs, but the passes apply the same way.
Example 2 is a cut, and it comes out shorter, because bullets are how you cut to the facts that matter, not how you restate a paragraph at greater length.

---

## Example 1: the risk the body never mentioned

[fix(pricing): enforce negative fee permissions for onramp quotes](https://github.com/GetUnblock/bakkt-core/pull/1879), +99/-7 in two files.

### As shipped, 89 words

```markdown
## Summary
- Enforce merchant negative_fees permission for SUBTRACT fees when pricing an onramp quote without processDb.
- Add regression coverage in setOnrampQuoteFees unit tests.

## Scope
The current diff against dev contains only pricing-engine/src/fees/fees.ts and pricing-engine/test/units/setOnrampQuoteFees.unit.test.ts. Earlier BlindPay quote feature changes are already present in dev history.

## Validation
- Regression tests were added and validated during feature development.
- Tests were not re-run during PR creation.

## Related work
Companion to the Ion feat/blindpay-onramp-quote PR targeting dev. No deployment or merge is performed by creating this PR.
```

### After all passes, 162 words

```markdown
## Problem

- Onramp quotes for a merchant without negative fee permission locked a discounted merchant fee.
- The permission check ran only when pricing a transaction. Quote pricing skipped it.

## Changes

- Quote pricing now rejects a SUBTRACT merchant fee with `FORBIDDEN` unless the merchant has `negative_fees`.
- Transaction pricing keeps its error and its Slack alert. Quotes still send no alert.

## Risk and rollout

> [!WARNING]
> A missing merchant row now fails pricing on both paths. Before, transaction pricing with a SUBTRACT fee and no merchant row passed.

- Merchants with a SUBTRACT fee config and no `negative_fees` now get a 403 on onramp quotes.
- Deploy: pricing-engine only. Companion PR in Ion: feat/blindpay-onramp-quote.

## How did you test this code?

- New tests in `setOnrampQuoteFees.unit.test.ts` catch three regressions: an unauthorized or missing merchant gets a discounted quote, an authorized discount fails to lock, and the transaction path loses its alert.
- Not re-run during PR creation.
```

### What the passes did

| Text                                                                   | Pass         | What happened and why                                                               |
| ---------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| "Enforce merchant negative_fees permission ... without processDb"      | 1            | Split into effect (Problem) and mechanism (Changes). `processDb` left the lead line |
| The whole Scope section                                                | 3            | Process narration about branch history. No reviewer needs it                        |
| "No deployment or merge is performed by creating this PR"              | 3            | True of every PR                                                                    |
| "Regression tests were added and validated during feature development" | 3            | Not checkable. Replaced by the named regressions the tests catch                    |
| "Tests were not re-run during PR creation"                             | 3            | Kept. An honest statement of what went unchecked                                    |
| Missing merchant row now throws on the transaction path                | Risk         | Added. A behavior change the diff makes but the shipped body never mentioned        |
| Merchants with SUBTRACT configs now get 403 on quotes                  | Risk         | Added. Who sees a different result after release                                    |

This is the one example that came out longer, and the reason matters. The shipped body was short because it was empty: Scope and Related work narrated the process, and Validation made a claim nobody can check. Pass 3 deleted those. The words that came back carry what the shipped body never said: why the bug existed, which regressions the tests catch, and the risk below. A short body that omits the risk is not the goal the line check aims at.
The hidden risk sits in one line: `if (!merchant?.negative_fees)` now also rejects `null`. The risk and rollout section exists to make the author look for that.

---

## Example 2: a long causal chain

[fix(data-warehouse): recognize Neon's pooler rejection of libpq options](https://github.com/PostHog/posthog/pull/77899). Problem and Changes only.

### As shipped, 297 words

```markdown
## Problem

Transaction-mode connection poolers reject the libpq `options` startup parameter, so `_connect_with_options_fallback` drops `options` and reconnects. The match is on the exact wording those poolers use:

FATAL: unsupported startup parameter: options

Neon's pooled endpoint names the offending setting instead of the parameter:

ERROR: unsupported startup parameter in options: statement_timeout.
Please use unpooled connection or remove this parameter from the startup package.

`"unsupported startup parameter: options"` is not a substring of that, so the fallback never fires and the connect just fails.

On the CDC path that connect is the first thing `cdc_extract_activity` does, and the stream reader always sends `options` (`statement_timeout=1800000 -c idle_in_transaction_session_timeout=0`). So every extraction run against a Neon pooled endpoint fails at `stream_reader.connect()`, forever. It classifies as a generic retryable `connection_failed`, so the user sees "Could not connect to the source database. PostHog will keep retrying — if this persists, check that the database is reachable and accepting connections" for a database that is reachable and perfectly healthy. There is nothing they can do to make that message go away, because it isn't describing their problem.

One source has been in this state since the day it was created. It never had a single successful extraction run.

## Changes

Match on the prefix `unsupported startup parameter in options` so any setting Neon names is covered, alongside the existing exact-wording and RDS Proxy matches.

The stale comment on the CDC stream reader claimed CDC sources never sit behind a pooler that rejects `options`. They do. Neon's pooler serves the `pg_logical_slot_peek_binary_changes` calls the reader uses just fine, so dropping the two server-side timeouts is the difference between working change capture and none at all. Updated it to say so, and to note that the activity's start-to-close and heartbeat timeouts still bound a stalled peek once the server-side ceiling is gone.
```

### After the remaining passes, 197 words

````markdown
## Problem

- Transaction-mode connection poolers reject the libpq `options` startup parameter.
- `_connect_with_options_fallback` drops `options` and reconnects when it sees the exact wording those poolers use:

```
FATAL:  unsupported startup parameter: options
```

- Neon's pooled endpoint names the setting instead of the parameter:

```
ERROR:  unsupported startup parameter in options: statement_timeout.
```

- That is not a substring of the match, so the fallback never fires.
- The CDC stream reader always sends `options`, and that connect is the first thing `cdc_extract_activity` does.
- Every extraction run against a Neon pooled endpoint therefore fails at `stream_reader.connect()`, forever.
- It classifies as a retryable `connection_failed`, so the user is told to check a database that is reachable and healthy.
- One source has never had a successful extraction run since the day it was created.

## Changes

- The match now uses the prefix `unsupported startup parameter in options`, so any setting Neon names is covered.
- The stream reader's comment claimed CDC sources never sit behind a pooler that rejects `options`. They do, and the comment now says so.
- Dropping the two server-side timeouts is the difference between working change capture and none.

> [!NOTE]
> Retry and classification behavior do not change. This makes the connection succeed where it currently cannot be opened at all.
````

### What the passes did

Pass 3 cut 100 words:

| Cut                                                                                                    | Why                                                                                       |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| The second line of Neon's error, and the full quoted user-facing message                               | The reader needs the phrasing that breaks the match, not the whole string                 |
| `statement_timeout=1800000 -c idle_in_transaction_session_timeout=0`                                   | "Always sends `options`" is the fact. The values themselves change nothing for the reader |
| "There is nothing they can do to make that message go away, because it isn't describing their problem" | Second half of a reason pair. The bullet above it already says the database is healthy    |
| "Neon's pooler serves the `pg_logical_slot_peek_binary_changes` calls the reader uses just fine"       | Supports a claim nobody will dispute                                                      |
| The start-to-close and heartbeat timeout note                                                          | Belongs in the code comment it describes, and is there                                    |

Pass 4 split the 76-word failure chain, which was the densest sentence in the description, into the five links a reviewer checks one at a time.

Both fenced blocks survived untouched. Pass 4 governs prose only.

Pass 1 came later than this rewrite, and the rewrite fails it. The lead is a fact about libpq, while the effect sits in bullets 6 and 8. Cutting did not fix that, and no amount of it would. Open with them instead:

> - Data warehouse syncs from a Neon pooled endpoint have never worked. One source has failed every extraction run since the day it was created.
> - The user is told to check a database that is reachable and healthy, because the failure classifies as a retryable `connection_failed`.

That first bullet is also the one claim here the claim rules in pass 3 reach. "Never worked" and "every run" are things the author saw, not behavior a reader can check against the code. The bullet owes a link to the run or the error tracking issue behind it. Every other bullet in this example describes behavior and needs none.
