# Jinn portfolio — Laravel conversion

The converted application lives in `laravel-app/`. The HTML files at the repository root are the original design reference; serve the Laravel app to use the new database-backed portfolio.

## Run locally

Requires PHP 8.3+, Composer, Node.js 22.12+ and the PHP SQLite extensions.

```powershell
cd laravel-app
composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -ErrorAction SilentlyContinue
npm ci
php artisan migrate --seed
php artisan storage:link
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

For this already-configured checkout, only the last command is needed. Stop any old server using port 8000 first. Visit http://127.0.0.1:8000 and http://127.0.0.1:8000/crudtools.

For frontend development, run `npm run dev` in a second terminal. Run `php artisan test` to verify the backend and `npm run build` to verify the frontend.

## What changed

The original Home, About, Work and Contact designs are React pages served through Inertia. Navbar, Footer, Layout, ToolsSection and ToolForm are shared components. Tailwind compiles locally through Vite. Original images, colors, dark mode, mobile navigation and the tools marquee are retained. Contact remains a clearly identified frontend demonstration, as in the original site.

Tools I use and Tech stack read the same ordered `tools` database records. The seeder imports the original 14 entries, including Codex and Claude AI, excluding ChatGPT and Claude Code. The management area supports create, list/search, edit, and deletion with a confirmation dialog. Validation errors appear beside each input and preserve typed values. Each successful mutation displays feedback.

The tools management routes are intended for the local classroom demonstration and have no login protection. Add authentication before exposing management routes publicly. The original root `render.yaml` describes a static deployment and does not deploy this Laravel application.

## Projects CRUD

Visit `/crudprojects` to manage projects, or `/crudprojects/create` to add one. The four original projects are imported by `ProjectSeeder`. Changes update `/work` and the homepage's first three projects in display order. The tools and projects management screens link to each other.

Projects store title, unique URL anchor (slug), description, comma-separated tech stack, image, category, role, completed year, optional project/repository URLs, and display order. Validation checks unique title and slug while ignoring the current record on update, text lengths, slug format, year limits, numeric order and safe URL formats.

Project images and tool icons have a Choose image button that opens the system file picker. JPG, PNG, WebP and GIF uploads up to 2 MB are validated on the server and stored on Laravel's public disk. Run `php artisan storage:link` to serve them. Edit without selecting a file retains the existing image. Replacing or deleting a record removes its previous uploaded file; original portfolio assets remain available. `ImageUploadTest` verifies both resources' upload lifecycle and invalid/oversized files.

Implementation: `Project` model, `ProjectRequest` validation, `ProjectController` resource controller, `create_projects_table` migration, `Pages/Projects/{Index,Create,Edit}.jsx`, and shared `ProjectForm`/`ProjectCard` components. `ProjectTest` covers CRUD, both public sections, ordering, input retention, uniqueness and invalid values. Project management is also intended for local use until authentication is added.

## Five meaningful fields

- `name`: string up to 80 characters, required and unique. Identifies the tool; uniqueness ignores the current record when editing.
- `category`: required string up to 60 characters. Groups the tool by its role.
- `proficiency`: required integer from 1 to 100. Records a self-assessed skill level.
- `icon`: optional image path. The file picker accepts JPG, PNG, WebP and GIF images up to 2 MB; the stored public URL is saved in this field.
- `display_order`: required integer from 0 to 9999. Controls order on both public pages.

Tools are useful database content because the stack changes over time. One edit now updates both public sections without editing markup.

## Request flow and files

`routes/web.php` maps the public pages and registers `Route::resource('crudtools', ToolController::class)->parameters(['crudtools'=>'tool'])->names('tools')->except('show')`. A resource controller keeps persistence logic out of route definitions. `ToolRequest` validates before a controller writes through the `Tool` Eloquent model. `$fillable` limits mass-assigned fields to the five intended attributes.

After a successful write, the controller redirects to the index with a flash message. Inertia middleware shares that message and Laravel validation errors. React's `useForm` sends the request, retains form state on failure, and exposes field errors. Server validation also protects requests that bypass the browser UI.

- Migration: `database/migrations/2026_10_31_000000_create_tools_table.php`
- Model: `app/Models/Tool.php`
- Validation/custom messages: `app/Http/Requests/ToolRequest.php`
- CRUD: `app/Http/Controllers/ToolController.php`
- Inertia middleware: `app/Http/Middleware/HandleInertiaRequests.php`
- Public pages: `resources/js/Pages/{Portfolio,About,Work,Contact}.jsx`
- Management: `resources/js/Pages/Tools/{Index,Create,Edit}.jsx`
- Shared components: `resources/js/Components/`
- Automated validation and CRUD checks: `tests/Feature/ToolTest.php`

## Demonstration and submission work

The code conversion includes automated validation checks. The assignment's personal voice recording, live-change demonstration, personal reflections, screenshots and final submission PDF still need to be prepared from your own demonstration. No video or submission links have been fabricated.

Suggested live change: add an optional `website` URL using a new migration, add it to `$fillable`, add a nullable HTTPS URL validation rule, and add it to ToolForm's initial state and field list. Run the migration, then demonstrate an invalid value and a valid value without cutting the recording.

## Verified validation cases

All of these automated cases passed in `ToolTest`:

1. Empty request: errors for name, category, proficiency and display order; no record inserted.
2. Name of 81 characters: name length error.
3. Proficiency set to letters, 0 or 101: type or range error; negative display order also rejected.
4. Duplicate Codex name: uniqueness error and only one record retained.
5. Edit Codex without changing its name: saves successfully; changing it to another record's name is rejected.
6. Icon set to `javascript:alert(1)`, an HTTP URL or plain text: icon format error.
7. Invalid proficiency after entering a valid name: redirects back and preserves the entered name.
8. Valid create and delete: success feedback and matching public-page database records before and after deletion.

Browser checks also verified the public pages, inline validation, unchanged-name edit, success message, delete dialog and a 390px mobile layout without horizontal overflow. Captures are saved under `output/screenshots/` at repository root for your submission preparation.
