# In ./backend/Dockerfile
FROM php:8.2-apache

# This RUN command is CRITICAL for the database connection
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ... rest of your Dockerfile ...

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Copy your backend code into the container
# This copies everything from the local ./backend folder to the Apache web root
COPY . /var/www/html/

# Expose port 80 (This is the container's internal port)
EXPOSE 80

# The base image already has the CMD to start Apache in the foreground.