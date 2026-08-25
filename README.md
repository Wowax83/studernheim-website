# Studernheim Website

Webauftritt des Studernheims. Next.js 14 (App Router) + Tailwind + Sanity CMS + Prisma.

Repo-Quelle (remote): https://github.com/Wowax83/studernheim-website
Lokaler Stand: `/store/KI/KI Projekt/Projekte/Clone/Webseite-Studernheim/`

## Schnellstart

```bash
# 1. Env-Datei anlegen (Tokens aus /store/KI/KI Projekt/new.txt uebernehmen)
cp .env.example .env
# Werte eintragen -- siehe Abschnitt "Verbindungen & Keys" unten

# 2. Abhaengigkeiten installieren
# ACHTUNG: /store unterstuetzt keine Symlinks. Wenn npm install mit
# "EIO: i/o error, symlink" abbricht, von /opt/data aus arbeiten:
#   cp -r "/store/KI/KI Projekt/Projekte/Clone/Webseite-Studernheim" /opt/data/
#   cd /opt/data/Webseite-Studernheim
#   npm install
npm install

# 3. Dev-Server starten
npm run dev
# -> http://localhost:3000

# 4. Datenbank-Setup (optional, fuer Prisma)
npx prisma migrate dev
npm run data:generate   # falls Daten-Skripte vorhanden

# 5. Build / Production
npm run build
npm start
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity.io (Studio unter `app/studio`)
- **Datenbank & ORM:** Prisma (Schema in `prisma/schema.prisma`)
- **Container:** Docker / Docker Compose
- **Mail:** Resend
- **Animationen:** Framer Motion

## Projektstruktur

```
.
├── app/                  # Next.js Routen (App Router)
│   ├── api/              # API-Endpoints
│   ├── studio/           # Sanity Studio
│   ├── datenschutz/      # DSE-Seite
│   ├── impressum/        # Impressum
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/           # Wiederverwendbare UI-Komponenten
├── lib/                  # Datenabruf, Helpers, Sanity-Client
├── prisma/               # DB-Schema
├── public/               # statische Assets
├── sanity/               # Sanity-Schema
├── scripts/              # Daten- / Build-Skripte
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Verbindungen & Keys

Das Projekt benoetigt Zugang zu folgenden externen Diensten. **Echte Tokens leben in `/store/KI/KI Projekt/new.txt`** (Wurzel der KI-Projekt-Struktur) und werden **nie** in `.env` dupliziert, wenn sie nicht zu diesem Projekt gehoeren.

### Sanity CMS

1. Projekt anlegen: https://www.sanity.io/manage
2. Projekt-ID + Dataset-Namen notieren
3. API-Token mit Lese/Schreibrechten generieren (Settings -> API -> Tokens)
4. Eintragen in `.env`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (Standard: `production`)
   - `SANITY_API_READ_TOKEN`
   - `SANITY_API_WRITE_TOKEN`

Wenn der Sanity-Token in `new.txt` unter `SANITY_*` oder `STUDERNHEIM_SANITY_*` liegt:
```bash
grep -E "SANITY_(PROJECT|API)" /store/KI/KI\ Projekt/new.txt >> .env
```

### Prisma / Datenbank

1. PostgreSQL lokal via Docker Compose: `docker-compose up -d db`
2. `DATABASE_URL` in `.env` setzen
3. `npx prisma migrate dev` zum Anwenden der Migrationen
4. Optional: Seed via `npm run prisma:seed`

### Resend (Mail)

1. Account: https://resend.com
2. API-Key generieren
3. Absender-Domain verifizieren (SPF/DKIM)
4. `RESEND_API_KEY` + `RESEND_FROM_EMAIL` in `.env`

## Git-Workflow

```bash
git status
git add -A
git commit -m "..."                    # Author: w.merdian@gmail.com
git push origin main
```

Bei Verbindungsproblemen zu GitHub: SSH-Key bzw. PAT aus `new.txt` pruefen.
Siehe Skill `hermes-sandbox-paths` fuer den Sandbox-Workaround.

## Bekannte Stolpersteine

- **`/store` ohne Symlinks**: `npm install` kann mit `EIO: i/o error, symlink` abbrechen. Workaround: von `/opt/data` aus arbeiten oder Worktree benutzen.
- **Vercel-Build defaultet nach `/opt/data`**: Wenn Vercel-Deployment dazukommt, Root Directory im Vercel-Projekt setzen.
- **Sanity Studio laeuft auf separater Route** (`/studio`), nicht im Hauptlayout.
- **`tsconfig.tsbuildinfo`** ist im Repo committed (Next.js Artefakt). Beim Aendern von `tsconfig.json` ggf. loeschen, um Cache-Probleme zu vermeiden.

## Konvention: KI-Projekt-Wurzel

Dieses Projekt liegt unter `/store/KI/KI Projekt/Projekte/Clone/` (Klon-Bereich).
Siehe `/store/KI/KI Projekt/README.md` fuer die uebergeordnete Konvention.
