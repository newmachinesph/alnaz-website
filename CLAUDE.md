@AGENTS.md

# alnaz-ph

Next.js 16.2 — App Router, TypeScript, Tailwind v4, Turbopack, source in `src/`.

## Loadout

@~/.claude/rules/loadout/common.md
@~/.claude/rules/loadout/karpathy.md
@~/.claude/rules/loadout/windows.md
@~/.claude/rules/loadout/git.md
@~/.claude/rules/loadout/security.md
@~/.claude/rules/loadout/profiles/web.md

## Orchestration

@~/.claude/rules/loadout/orchestration.md
@~/.claude/rules/loadout/models.md

Routing for this repo: red build → `react-build-resolver`. Review → `react-reviewer` + `typescript-reviewer`. Auth/input/secrets touched → `security-reviewer`. Critical flows → `e2e-runner`.

## Commands

```
npm run dev     # Turbopack, :3000
npm run build
npm run lint    # eslint CLI (next lint removed in 16)
```
