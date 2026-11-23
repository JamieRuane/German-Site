# WortWise

A German B2-to-C1 trainer built with React, TypeScript and Vite. Every module works, and progress is saved in the browser (localStorage).

- **Vocabulary**: spaced-repetition review of C1 Nomen-Verb-Verbindungen, genitive prepositions, connectors and Redemittel. You type the missing word (active recall), with tolerance for umlaut transcriptions and small typos.
- **Reading**: C1 texts with tap-to-gloss vocabulary you can add to your deck, plus Goethe/telc-style questions (richtig / falsch / steht nicht im Text).
- **Grammar**: six C1 topics (Nominalstil, Konjunktiv I, Passiv-Ersatzformen, Partizipialattribute, two-part connectors, genitive prepositions). Each has a rule summary and exercises with explanations.
- **Writing**: exam-format tasks with clickable Redemittel, autosaved drafts, a live self-check (length, structure, connectors, register, word-order variety) and model answers.
- **Progress & dashboard**: real study time (counted only while you are active), streaks, a 7-day chart, a per-skill "road to C1" breakdown and a daily plan built from what is due.

## Development

Install dependencies and start the local Vite server from the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser.

## Checks

```sh
npm test
npm run lint
npm run build
```

## Legacy static version

The original standalone HTML, CSS and JavaScript dashboard is preserved in [`legacy/`](./legacy/).
