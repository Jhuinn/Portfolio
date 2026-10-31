# Deploy this portfolio on Render

Use a Docker **Web Service**, not a Static Site. The root Dockerfile builds the Laravel application in `laravel-app/`, compiles its React assets, and serves its `public/` directory through Apache. `render.yaml` creates a web service and a PostgreSQL database in the same region.

## Dashboard steps

1. Open https://dashboard.render.com and sign in with GitHub.
2. Choose **New → Blueprint**, connect `Jhuinn/Portfolio`, and select branch `main`. Render reads the root `render.yaml`.
3. Supply the three prompted secrets:
   - `APP_KEY`: generate a new production key locally using the command below. Keep it stable after deployment.
   - `CRUD_USERNAME`: choose a management username using letters, numbers, underscores or hyphens.
   - `CRUD_PASSWORD`: choose a strong password. The deployed CRUD routes use a browser login prompt; the public portfolio stays open.
4. Review the proposed `jinn-portfolio` Docker service and `jinn-portfolio-db` Postgres database, then deploy the Blueprint.
5. Open the web service's generated HTTPS URL when its status is Live. Startup applies migrations, imports the original projects/tools and connects uploaded-image storage.
6. After the first successful deployment, edit `render.yaml` to set `SEED_DATABASE` to `"false"`, commit and push. This avoids re-importing original records that you intentionally delete later. If you change this setting only in Render's Environment page, the Blueprint can overwrite it on a later sync.
7. Check `/`, `/work`, `/about`, `/crudprojects` and `/crudtools`. Use the chosen CRUD username/password when prompted.

Generate your production key in PowerShell from the repository root:

```powershell
cd laravel-app
php artisan key:generate --show
```

Copy the complete `base64:...` output into Render's `APP_KEY` field. Do not commit it. Render supplies the database URL and external app URL automatically; this application reads **DB_URL**, not DATABASE_URL.

If you already created a Static Site, create the new Docker web service separately. The Static Site serves the original HTML and cannot run Laravel or CRUD.

## Uploaded images and persistence

The Blueprint uses free instances for a short demonstration. Free web services lose locally uploaded images after a restart, redeploy or spin-down. Database records live separately in Postgres, but free Render Postgres expires 30 days after creation.

For lasting uploaded images, select a paid web-service instance and add a persistent disk mounted at:

```text
/var/www/html/storage/app/public
```

Configure the paid instance and disk in your Blueprint too if you want them managed by the Blueprint. Attach the disk before uploading images you intend to keep. An external object-storage integration is another option but is not configured in this application. A long-lived deployment also needs a non-expiring database plan or another suitable hosted database.

## Troubleshooting

- **Dockerfile not found:** use the repository root as build context; Dockerfile path is `./Dockerfile`. Do not set Root Directory to `laravel-app` for this Dockerfile.
- **Missing key / management credentials:** check Environment for APP_KEY, CRUD_USERNAME and CRUD_PASSWORD.
- **Database error:** DB_CONNECTION must be `pgsql`; DB_URL must be the database's internal connection URL. The Blueprint wires these automatically.
- **Blank or unstyled page:** inspect build logs for `npm run build`; ASSET_URL defaults to the Render HTTPS address at startup. Remove any old localhost APP_URL/ASSET_URL overrides.
- **Missing uploaded image:** check the disk mount and persistence settings above. Original images under `public/images` are bundled with every deployment.
- **Slow first request:** free services spin down after inactivity and must wake up again.

Reference: https://render.com/docs/deploy-php-laravel-docker and https://render.com/docs/free
