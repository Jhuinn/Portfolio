# Build React/Tailwind assets independently from the PHP runtime.
FROM node:24-bookworm-slim AS frontend
WORKDIR /build
COPY laravel-app/package*.json laravel-app/.npmrc ./
RUN npm ci --ignore-scripts
COPY laravel-app/resources ./resources
COPY laravel-app/vite.config.js ./
RUN npm run build

FROM php:8.5-apache-bookworm AS runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev libzip-dev unzip apache2-utils \
    && docker-php-ext-install pdo_pgsql zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
WORKDIR /var/www/html
COPY laravel-app/ ./
RUN mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader \
    && chown -R www-data:www-data storage bootstrap/cache
COPY --from=frontend /build/public/build ./public/build
COPY docker/apache.conf /etc/apache2/sites-available/000-default.conf
COPY docker/start.sh /usr/local/bin/portfolio-start
RUN sed -i 's/\r$//' /usr/local/bin/portfolio-start \
    && chmod +x /usr/local/bin/portfolio-start \
    && printf 'upload_max_filesize=3M\npost_max_size=8M\nexpose_php=Off\n' > /usr/local/etc/php/conf.d/portfolio.ini
EXPOSE 10000
CMD ["/usr/local/bin/portfolio-start"]
