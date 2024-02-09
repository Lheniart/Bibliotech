# Utilisez une image PostgreSQL de base
FROM postgres:latest

# Définit le nom de la base de données
ENV POSTGRES_DB postgres

# Définit l'utilisateur et le mot de passe pour la base de données
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres

# Copie le script SQL pour créer la table bibliothèque
COPY init.sql /docker-entrypoint-initdb.d/