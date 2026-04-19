# Projekt-Dokumentation: Studernheim Website

## Übersicht
Dieses Projekt umfasst die "Studernheim" Website, eine moderne Webanwendung, die mit aktuellen Technologien entwickelt wurde. Die Verwaltung und das Hosting erfolgen innerhalb des OpenClaw Workspace-Ökosystems. Das Ziel der Seite ist es, Informationen über Studernheim strukturiert und ansprechend zu präsentieren.

## Technologiestack (Tech Stack)
Die Anwendung nutzt einen hochmodernen Stack, um Performance, Skalierbarkeit und Wartbarkeit zu gewährleisten:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router) – Für schnelles Rendering und optimale SEO-Eigenschaften.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) – Ein Utility-First CSS-Framework für ein responsives und effizientes Design.
*   **Content Management System (CMS):** [Sanity.io](https://www.sanity.io/) – Ermöglicht eine flexible und strukturierte Verwaltung der Inhalte (Headless CMS).
*   **Datenbank & ORM:** [Prisma](https://www.prisma.io/) – Ein Type-safe ORM für den einfachen und sicheren Zugriff auf die Datenbank.
*   **Infrastruktur & Containerisierung:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) – Für eine konsistente Laufzeitumgebung in der Entwicklung und Produktion.

## Projektstruktur & Kernkomponenten
Die Repository-Struktur ist modular aufgebaut:

*   `app/`: Das Herzstück der Anwendung. Enthält die Routen (App Router), die Logik der Seiten und die API-Endpunkte.
*   `components/`: Eine Sammlung von wiedervertildebaren UI-Komponenten, die für ein konsistentes Design sorgen.
*   `sanity/`: Enthält die Konfiguration und das Schema für die Integration mit dem Sanity CMS.
*   `prisma/`: Beinhaltet das Datenbank-Schema (`schema.prisma`) und den generierten Prisma Client.
*   `public/`: Verzeichnis für statische Ressourcen wie Bilder, Icons und andere Assets.
*   `scripts/`: Hilfsskripte für Automatisierungsprozesse (z. B. Deployment oder Datenmigration).

## Entwicklung & Deployment

### Lokale Entwicklung
Um die Anwendung lokal zu starten, stelle sicher, dass Docker installiert ist. Die Umgebung wird über Docker Compose verwaltet.

**Container starten:**
```bash
docker-compose up -d
```

Die Anwendung ist nach dem Start unter der Standard-URL (meist `http://localhost:3000`) erreichbar.

### Deployment Workflow
Das Projekt ist so konfiguriert, dass es einfach in Docker-Containern bereitgestellt werden kann. Dies garantiert, dass die Umgebung auf dem Server identisch mit der lokalen Entwicklungsumgebung ist. 

Ein typischer Workflow umfasst:
1. Code-Änderungen lokal testen.
2. Änderungen via Git zu GitHub pushen.
3. Auf dem Zielserver `git pull` ausführen und den Docker-Container neu starten.

## Konfiguration & Sicherheit
Die Anwendung nutzt Umgebungsvariablen zur Steuerung sensibler Daten.

*   **`.env` Datei:** Hier werden wichtige Schlüssel wie Datenbank-URLs, Sanity-Tokens oder GitHub-Zugriffe verwaltet. 
*   **Sicherheitshinweis:** Die `.env`-Datei darf **niemals** in das Git-Repository hochgeladen werden! Achte darauf, dass sie in der `.gitignore` enthalten ist.

Alle notwendigen API-Endpunkte und Zugriffsberechtigungen müssen vor dem Deployment korrekt konfiguriert sein, um eine reibungslose Funktion zu gewährleisten.
