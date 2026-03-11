# Campaign Ad Server

Ce projet est une API permettant de gérer des campagnes publicitaires :
- création de campagnes
- diffusion d'impressions publicitaires
- statistiques des campagnes

L'application est conteneurisée avec Docker et composée d'un frontend React et d'un backend NestJS connecté à MongoDB.

---

# Architecture du projet

L'application suit une architecture **client / serveur**.

Frontend (React + Vite)
↓
Backend API (NestJS)
↓
Base de données (MongoDB)

## Frontend
Technologies :
- React
- TypeScript
- Vite
- React Hook Form
- Zod (validation)

Rôle :
- interface utilisateur
- création des campagnes
- affichage des statistiques
- communication avec l'API backend via HTTP

## Backend
Technologies :
- NestJS
- TypeScript
- Mongoose
- REST API

Le backend gère :
- la logique métier
- la validation
- la gestion des campagnes
- la diffusion des impressions
- les statistiques

Structure principale :

src/
modules/
campaign/
campaign.controller.ts
campaign.service.ts
campaign.schema.ts

Le module Campaign gère :
- création d'une campagne
- incrémentation des impressions
- statistiques

## Base de données

MongoDB est utilisé pour stocker :
- les campagnes
- les impressions servies
- les statistiques

---

# Choix techniques

## NestJS
Choisi pour :
- architecture modulaire
- injection de dépendances
- maintenabilité
- facilité de scaling

## MongoDB
Choisi pour :
- grande performance en écriture
- schéma flexible
- bonne scalabilité horizontale

## React + Vite
Choisi pour :
- rapidité de développement
- expérience développeur
- performance du build

## Docker
Docker permet :
- reproductibilité de l'environnement
- déploiement simplifié
- isolation des services

---

# Conteneurisation

L'application utilise Docker avec 3 services :

- frontend
- backend
- mongodb

Commandes principales :

```bash
docker compose up --build