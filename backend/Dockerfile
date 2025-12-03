# Start from PHP with Apache
FROM php:8.2-apache

# Install PostgreSQL PDO extension
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Copy your backend code into the container
COPY . /var/www/html/

# Expose port 80
EXPOSE 80
