#!/bin/sh
set -eu

: "${APP_KEY:?Set APP_KEY in your Render environment}"
: "${DB_URL:?Set DB_URL to the Render Postgres internal connection URL}"
: "${CRUD_USERNAME:?Set a username for your CRUD management pages}"
: "${CRUD_PASSWORD:?Set a password for your CRUD management pages}"

case "$CRUD_USERNAME" in
    ''|*[!a-zA-Z0-9_-]*) echo 'CRUD_USERNAME must use letters, numbers, underscores or hyphens.' >&2; exit 1 ;;
esac
PORT="${PORT:-10000}"
case "$PORT" in ''|*[!0-9]*) echo 'PORT must be numeric.' >&2; exit 1 ;; esac

export APP_ENV=production APP_DEBUG=false DB_CONNECTION=pgsql
export APP_URL="${APP_URL:-${RENDER_EXTERNAL_URL:-http://localhost}}"
export ASSET_URL="${ASSET_URL:-$APP_URL}"
export SESSION_SECURE_COOKIE=true

printf '%s\n' "$CRUD_PASSWORD" | htpasswd -Bci /etc/apache2/portfolio.htpasswd "$CRUD_USERNAME"
chown root:www-data /etc/apache2/portfolio.htpasswd
chmod 640 /etc/apache2/portfolio.htpasswd

sed -i "s/^Listen 80$/Listen $PORT/" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/" /etc/apache2/sites-available/000-default.conf

mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
php artisan config:cache
php artisan migrate --force
if [ "${SEED_DATABASE:-false}" = "true" ]; then
    php artisan db:seed --force
fi
php artisan storage:link --force
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache

exec apache2-foreground
