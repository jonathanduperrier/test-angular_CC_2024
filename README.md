# Entretien technique - Angular

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Build

Lancer la commande `ng build` pour construire le projet. L'artifact généré se trouvera dans le répertoire `dist/`.

## Running unit tests

Lancer la commande `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io).

## Application

L'application Angular permet à des clients d'effectuer des transactions entre leurs comptes, à l'aide d'une API très simple.

## Lancement de l'application

## Utilisation

La commande `npm run start` lance l'application.

- Le client est disponible à l'adresse [suivante](http://localhost:4200/).
- L'API est disponible à l'adresse [suivante](http://localhost:3000/). Les opérations suivantes sont disponibles :
  - GET /users
  - GET /users/:id
  - POST /users
  - PUT /users/:id
  - PATCH /users/:id
  - DELETE /users/:id

L'application se rechargera automatiquement en cas de changement du code source.

## Instructions

**L'architecture logicielle est entièrement modifiable par le candidat.
Chaque décision doit pouvoir se justifier.**

### [CODE] Intégrer Angular Material

L'utilisation d'[Angular Material](https://material.angular.io/) facilitera l'implémentation des fonctionnalités demandées.

### [CODE] Fonctionnalités

Implémenter les fonctionnalités suivantes :

- Sur le tableau : tri, filtres, pagination, afficher le montant au format français
- Les opérations CRUD sur un enregistrement

### [CODE] Tests unitaires

Implémenter les tests unitaires nécessaires.

[Karma](https://karma-runner.github.io) est le framework de test utilisé par défaut mais le choix du framework de test est libre.

### [CODE] Exceptions

Mettre en place un système de gestion des exceptions (appel API, erreur action utilisateur, etc...).

### [CODE] Accessibilité

Rendre l'application accessible avec un lecteur tel quel [AInspector](https://addons.mozilla.org/fr/firefox/addon/ainspector-wcag/).

### [DEVOPS] Construction de l'image Docker

Réaliser le `Dockerfile` permettant de construire une image Docker du service à l'aide de l'instruction suivante :

```bash
docker build . -t test-angular
```

L'image doit permettre le lancement de l'application au démarrage du conteneur.
