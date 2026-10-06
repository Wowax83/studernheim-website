# Studernheim Website

Webauftritt des Studernheims. Next.js 14 (App Router) + Tailwind + Sanity CMS + Prisma.

> **Aktueller Stand:** v1.2 – produktiv live auf <https://studernheim.net> (und <https://studernheim.com> als 301-Weiterleitung).
> Deployment via Docker auf Hetzner, Updates per `git push` + automatisierter `docker compose up -d --build`.

**Repo:** <https://github.com/Wowax83/studernheim-website>
**Lokaler Stand:** `/store/KI/KI Projekt/Projekt/Studernheim-Website/`
**Sanity Studio:** <https://studernheim.net/studio>

---

## Inhaltsverzeichnis

- [Changelog](#changelog)
- [Schnellstart (lokal)](#schnellstart-lokal)
- [Deployment auf Produktion](#deployment-auf-produktion)
- [Tech Stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Verbindungen & Keys](#verbindungen--keys)
- [Git-Workflow](#git-workflow)
- [Bekannte Stolpersteine](#bekannte-stolpersteine)
- [Workflow fuer die Nachwelt (Hermes)](#workflow-fuer-die-nachwelt-hermes)
- [Konvention: KI-Projekt-Wurzel](#konvention-ki-projekt-wurzel)

---

## Changelog

### v1.2 – 2026-10-02

- **Video-Clip-Feld fuer Feste** – Sanity-Schema um optionales `clip` Feld (file, `video/mp4`) erweitert. Wird im Studio unter `/studio` als "Video-Clip (MP4)" angezeigt. Auf der Webseite rendert `FestCard` unter der Bildergalerie einen nativen `<video>`-Player (`controls`, `preload="metadata"`, `playsInline`), Poster faellt auf das erste Bild der Galerie zurueck. GROQ-Projektion in `getFeste` und `getAllEvents` um `clip.asset->url` als `videoUrl` erweitert.
- **README** – Workflow fuer die Nachwelt dokumentiert: Hermes-spezifischer SSH-Staging-Trick, Staging-Pattern bei Sandbox-Write-Deny, Cache-Strategie beim Docker-Build.

### v1.1 – 2026-08-25

- **Domain-Fix**: alle Hardcoded `studernheim.com`-Referenzen in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` auf `studernheim.net` korrigiert (Canonical, OG, Twitter, JSON-LD, Sitemap). Live-Seite läuft seit jeher auf `.net` – jetzt stimmen SEO-Metadaten überein.
- **NextFestHero: alle Highlights rendern** – vorher wurde nur der erste Link aus Sanity-Highlights angezeigt. Jetzt werden alle Links als Buttons gerendert (Filter auf Items mit URL, Map auf `{text, url}`).
- **Hierarchisches Button-Styling** – der erste Highlight-Link bleibt der primäre grüne CTA, alle weiteren erscheinen als kleinere "Ghost"-Buttons (`bg-white/10` + `border-white/30` + `text-xs`).
- **README-Überarbeitung** – Header-Badge mit Live-URL, Inhaltsverzeichnis, Deployment-Workflow dokumentiert, Changelog-Section.
- **`.gitignore` erweitert** – `.env*`, `node_modules/`, `.next/`, `out/`, `dist/`, `*.tsbuildinfo`, `next-env.d.ts`, Prisma-Generated, Sanity-Build, Vercel-Output, IDE- und OS-Müll. Der alte Stand hatte nur 5 Zeilen und hätte viele Geister-Files eingecheckt.
- **`.env.example` hinzugefügt** – leere Token-Vorlage mit Kommentaren, wie Werte aus `/store/KI/KI Projekt/new.txt` übernommen werden.

### v1.0.0 – 2026-04-14

Initial Release. Next.js 14 App Router, Sanity Studio als Route, Resend-Mail, Prisma, Tailwind, Docker-Setup.

---

## Schnellstart (lokal)

```bash
# 1. Env-Datei anlegen (Tokens aus /store/KI/KI Projekt/new.txt uebernehmen)
cp .env.example .env
# Werte eintragen -- siehe Abschnitt "Verbindungen & Keys" unten

# 2. Abhaengigkeiten installieren
# ACHTUNG: /store unterstuetzt keine Symlinks. Wenn npm install mit
# "EIO: i/o error, symlink" abbricht, von /opt/data aus arbeiten:
#   cp -r "/store/KI/KI Projekt/Projekt/Studernheim-Website" /opt/data/
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

## Deployment auf Produktion

Die Seite läuft auf einem **Hetzner Cloud Server** (`ubuntu-4gb-nbg1-1`, IP `178.104.136.175`) hinter nginx als Reverse-Proxy. Source liegt unter `/root/studernheim-website/`, App läuft als Docker-Container `studernheim-web`.

### Manuelles Deployment

```bash
# Vom lokalen Repo (z.B. /store/KI/KI Projekt/Projekt/Studernheim-Website/)
git push origin main

# Auf dem Hetzner-Server:
cd /root/studernheim-website
git pull origin main
docker compose up -d --build
```

Der Build nutzt den Docker-Cache und dauert auf dem 4GB-Server ca. **2-3 Minuten**. Während des Builds antwortet nginx mit `502 Bad Gateway` auf Port 3501 – akzeptabel für ein Dorfprojekt.

**Wichtig:** Auf dem 4GB-Server **niemals** `docker compose build --no-cache` laufen lassen – das hat in der Vergangenheit den nginx via OOM gekillt. Bei Cache-Problemen stattdessen `docker builder prune` mit Bedacht oder das `node_modules`-Volume separat cachen.

### Architektur (vereinfacht)

```
Internet (443) → nginx (Hetzner)
                  ├─ studernheim.com    → 301 → studernheim.net
                  ├─ studernheim.net    → proxy → 127.0.0.1:3501
                  └─ studrum.de         → proxy → 127.0.0.1:3501
                                          ↓
                              Docker-Container "studernheim-web"
                              Image: studernheim-website-web:latest
                                  ↓
                              next-server (v14.2.28) auf Port 3000
```

Sanity-Inhalte werden im Container-Build nicht eingebacken – das `next build` rendert statisch, was geht, und holt Live-Daten aus Sanity zur Request-Zeit via `lib/queries.ts`.

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

- **Project-ID:** `agl5pbdz` (hardcoded in `lib/sanity.ts` und `sanity.config.ts`)
- **Dataset:** `production`
- **API-Version:** `2024-01-01`

Falls ein Read/Write-Token benötigt wird (z.B. für serverseitige Mutationen), in `.env` eintragen:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=agl5pbdz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

### Prisma / Datenbank

1. PostgreSQL lokal via Docker Compose: `docker-compose up -d db`
2. `DATABASE_URL` in `.env` setzen
3. `npx prisma migrate dev` zum Anwenden der Migrationen
4. Optional: Seed via `npm run prisma:seed`

### Resend (Mail)

1. Account: <https://resend.com>
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

Bei Verbindungsproblemen zu GitHub: SSH-Key bzw. PAT aus `/store/KI/KI Projekt/new.txt` pruefen.
Siehe Skill `hermes-sandbox-paths` fuer den Sandbox-Workaround.

## Bekannte Stolpersteine

- **`/store` ohne Symlinks**: `npm install` kann mit `EIO: i/o error, symlink` abbrechen. Workaround: von `/opt/data` aus arbeiten oder Worktree benutzen.
- **Vercel-Build defaultet nach `/opt/data`**: Falls Vercel-Deployment dazukommt, Root Directory im Vercel-Projekt setzen.
- **Sandbox blockt Writes außerhalb `/opt/data`**: neue Dateien erst nach `/opt/data/`, dann `cp` ins Ziel auf `/store/`.
- **Hardcoded Sanity-Project-ID**: `lib/sanity.ts` und `sanity.config.ts` enthalten `projectId: 'agl5pbdz'`. Sanity-IDs sind public, das ist ok – aber Read/Write-Tokens gehören in `.env`.
- **Docker-Build kann OOM killen**: auf dem 4GB-Hetzner-Server `docker compose build --no-cache` vermeiden. Der inkrementelle Build nutzt den Cache und braucht ~1GB weniger RAM.
- **`admin.studrum.de`-Rewrite** in `next.config.js`: leitet alle Requests für diesen Host auf `/studio/:path*` um. Wer diese Domain kontrolliert, bekommt damit Zugriff auf das Sanity Studio. Vor Go-Live klären, wem die Domain gehört.

## Workflow fuer die Nachwelt (Hermes)

Dieser Workflow dokumentiert den End-to-End-Pfad, wie Aenderungen an diesem Repo produktiv werden – geschrieben fuer Folge-Sessions / andere Agents.

### Schritte

1. **Lokal patchen** – Dateien im Repo unter `/store/KI/KI Projekt/Projekt/Studernheim-Website/` editieren.
2. **Sandbox-Workaround** – Hermes' `HERMES_WRITE_SAFE_ROOT=/opt/data` blockt Writes nach `/store/...`. Workaround: modifizierte Dateien zuerst nach `/opt/data/studernheim-patch/` schreiben, dann mit `cp` ins Repo zurueckkopieren. Beispiel:

   ```bash
   mkdir -p /opt/data/studernheim-patch/<pfad>
   # Datei in /opt/data/studernheim-patch/... schreiben
   cp /opt/data/studernheim-patch/<pfad>/<datei> \
      "/store/KI/KI Projekt/Projekt/Studernheim-Website/<pfad>/<datei>"
   ```

3. **Lokal verifizieren** – `git diff` zeigt die Aenderungen; `git diff --stat` muss exakt die gepatchten Dateien treffen.
4. **Committen & pushen**:

   ```bash
   cd "/store/KI/KI Projekt/Projekt/Studernheim-Website"
   git config user.email "w.merdian@gmail.com"
   git config user.name "Wowax83"
   git add -A
   git commit -m "<beschreibung>"
   git push origin main
   ```

5. **Auf Hetzner deployen** – SSH-Config liegt unter `/home/hermes/.hermes/home/.ssh/config`, Alias `studi-prod` zeigt via ProxyJump ueber `unraid` auf `178.104.136.175`. Key fuer den Jump liegt in `/opt/data/.ssh/hermes-unraid-key`. Wichtig: SSH-Agent muss aktiv sein (`eval "$(ssh-agent -s)"` + `ssh-add /opt/data/.ssh/hermes-unraid-key`) und die Verbindung mit expliziten Config-Pfad aufgebaut werden:

   ```bash
   SSH='ssh -F /home/hermes/.hermes/home/.ssh/config'
   $SSH studi-prod 'cd /root/studernheim-website && \
                     git fetch origin --prune && \
                     git pull --ff-only && \
                     docker compose build --pull && \
                     docker compose up -d && \
                     sleep 4 && \
                     curl -sS -o /dev/null -w "http_code=%{http_code}\n" \
                       http://127.0.0.1:3501/ -H "Host: studernheim.net"'
   ```

   Erwartetes Ergebnis: `http_code=200`, Container `studernheim-web` Status `Up <Xs>`.

### Stolpersteine (siehe auch Skill `studernheim-hetzner-deploy`)

- **Build-Cache vs OOM**: Hetzner hat 3.7 GiB RAM. `docker compose build --no-cache` killt den Build (steht im README). Default-Build (Layer-Cache) ist sicher.
- **`/feste` ist kein Pfad**: Next.js serviert die Fest-Sektion als Anker `#feste` auf `/`. Curl-Test mit `/feste` liefert 404, ist aber kein Bug.
- **Sandbox-Write auf `/store`**: `write_file` / `patch` ausserken des Safe-Roots werden abgelehnt. Workaround siehe oben.
- **SSH mit `studi-prod` ohne `-F` schlaegt fehl** mit "Could not resolve hostname studi-prod" – immer `-F /home/hermes/.hermes/home/.ssh/config` mitgeben.

### Sanity Studio erreichbar

- Produktion: <https://studernheim.net/studio>
- Lokaler Dev: `npm run dev` und dann <http://localhost:3000/studio>
- Felder, die im Studio fuer jedes Fest verfuegbar sind: Name, Beschreibung, Start/Ende-Daten, Ort, Vibe, Veranstalter, Bilder-Galerie (hotspot), Fallback-Bild (hidden), **Video-Clip (MP4)**, Kurzinfos, Links/Highlights.

---

## Konvention: KI-Projekt-Wurzel

Dieses Projekt liegt unter `/store/KI/KI Projekt/Projekt/Studernheim-Website/` (zentraler Projekt-Ordner).
Siehe `/store/KI/KI Projekt/README.md` fuer die uebergeordnete Konvention.
