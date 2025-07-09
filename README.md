# Boutique Vert

Boutique Vert est une application web de boutique en ligne développée avec Angular. Elle permet de découvrir, rechercher, filtrer et consulter des produits, de gérer ses favoris, et de contacter l'équipe via un formulaire. L'application propose une expérience utilisateur moderne et responsive.

## Fonctionnalités principales

- **Accueil dynamique** : Présentation de la boutique, produits tendance, témoignages clients, newsletter.
- **Catalogue produits** :
  - Recherche, filtrage par catégorie, tri (populaires, récents, prix).
  - Pagination et affichage optimisé.
  - Badges (Nouveau, Populaire, Promotion).
- **Détail produit** :
  - Galerie d'images, caractéristiques, stock, ajout aux favoris et au panier.
  - Suggestions de produits similaires.
- **Favoris** :
  - Ajout/suppression de produits favoris (stockés en localStorage).
  - Accès rapide à ses produits préférés et recommandations personnalisées.
- **Contact** :
  - Formulaire de contact validé (nom, email, sujet, message).
  - Informations de contact et FAQ.

## Technologies utilisées

- **Framework** : Angular 19
- **Langages** : TypeScript, HTML, CSS
- **Gestion des dépendances** : npm
- **API** : Mockée en local, facilement remplaçable par une API REST

## Installation et lancement

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Zahar-Ahmed1/boutique-vert.git
   cd boutique-vert
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Démarrer le serveur de développement**
   ```bash
   ng serve
   ```
   Accédez à [http://localhost:4200](http://localhost:4200) dans votre navigateur.

## Scripts utiles

- `npm start` : démarre l'application en mode développement
- `npm run build` : build de production dans `dist/`
- `npm test` : lance les tests unitaires

## Pages principales

- **/home** : page d'accueil, produits tendance, newsletter, témoignages
- **/products** : catalogue produits, recherche, filtres, tri, pagination
- **/products/:id** : détail produit, galerie, favoris, panier, suggestions
- **/favorites** : gestion des favoris, recommandations
- **/contact** : formulaire de contact, infos, FAQ

## Personnalisation

- Les produits sont mockés dans `ProductService` (remplaçable par une API via `ApiService`).
- Les favoris sont stockés localement (pas besoin de compte).
- Les styles sont personnalisables dans `src/styles.css` et `src/app/shared/styles/common.css`.

## Contribution

Les contributions sont les bienvenues ! Merci de créer une issue ou une pull request pour toute suggestion ou amélioration.

## Licence

Ce projet est open-source et libre d'utilisation.

## Contact

Pour toute question ou suggestion, merci de contacter l'équipe via la page [Contact](./src/app/pages/contact/contact.component.html) de l'application.
