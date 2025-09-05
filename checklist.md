# ✅ À faire — Back-end

---

## 🌐 Fonctionnalités (activables via `.env`)

Chaque fonctionnalité est conditionnée par des variables d’environnement pour faciliter le déploiement modulable.

### 🔧 Variables d’environnement

```env
USE_MAIL=true        # Active l'envoi d'e-mails
MAIL_HOST=smtp.exemple.com    # Serveur SMTP (ex: smtp.gmail.com)
MAIL_PORT=587                 # Port SMTP (ex: 587 pour TLS)
MAIL_SECURE=false             # true si SMTP sécurisé (SSL), false sinon
MAIL_USER=monuser             # Identifiant SMTP
MAIL_PASS=monpass             # Mot de passe SMTP

USE_FEEDBACK=true    # Active le système de feedback utilisateur

USE_OAUTH=true         # Active l'authentification OAuth (Google, Microsoft, Discord, etc.)
OAUTH_GOOGLE_CLIENT_ID=xxx
OAUTH_GOOGLE_CLIENT_SECRET=yyy
OAUTH_MICROSOFT_CLIENT_ID=xxx
OAUTH_MICROSOFT_CLIENT_SECRET=yyy
OAUTH_DISCORD_CLIENT_ID=xxx
OAUTH_DISCORD_CLIENT_SECRET=yyy
OAUTH_CALLBACK_URL=https://ton-backend.com/api/auth/oauth/callback
```

### 💬 USE_FEEDBACK – Formulaire d’évolution / feedback
Création d’une table feedbacks avec les champs suivants :
| Champ       | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| `idUser`    | string    | ID du créateur                                    |
| `type`      | enum      | `suggestion` \| `comment` \| `bug` \| `other`     |
| `content`   | text      | Message complet de l’utilisateur                  |
| `isPublic`  | boolean   | Accepte que sa question soit publiée (anonymisée) |
| `timestamp` | datetime  | Date d’envoi                                      |
| `answer`    | text/null | Réponse éventuelle d’un admin                     |

### 🛡️ USE_OAUTH – Authentification via fournisseurs OAuth
- Gérer le flux OAuth (Authorization Code Flow) pour Google, Microsoft, Discord, etc.
- Endpoints back dédiés pour recevoir le callback OAuth, récupérer le token d’accès, et les infos utilisateurs.
- Créer ou mettre à jour un utilisateur en base selon les infos reçues du provider (email, nom, provider, providerId).
- Lier le compte OAuth à un compte local existant si l’e-mail correspond, sinon créer un nouvel utilisateur.
- Générer un token JWT/session sécurisée pour la session utilisateur après connexion OAuth.
- Valider les tokens OAuth et sécuriser les secrets client OAuth dans l’environnement serveur.
- Prévoir une table ou champs supplémentaires dans la table users pour stocker :
    - oauthProvider (ex : google, microsoft, discord)
    - oauthProviderId (id utilisateur donné par le provider)
    - (optionnel) oauthAccessToken, oauthRefreshToken si besoin de faire des appels API vers le provider

--- 

## 📡 API

### ✅ Authentification
| Méthode | Endpoint                    | Description                                                                   |
| ------- | --------------------------- | ----------------------------------------------------------------------------- |
| `POST`  | `/api/auth/register`        | Création de compte                                                            |
| `POST`  | `/api/auth/login`           | Connexion utilisateur (local)                                                 |
| `GET`   | `/api/auth/oauth/:provider` | Redirection vers OAuth provider (Google, Microsoft, Discord)                  |
| `GET`   | `/api/auth/oauth/callback`  | Callback OAuth - échange code contre token, connexion ou création utilisateur |


### 👤 Utilisateur
| Méthode  | Endpoint             | Description                                    |
| -------- | -------------------- | ---------------------------------------------- |
| `GET`    | `/api/user/me`       | Infos de son propre profil (sans mot de passe) |
| `PUT`    | `/api/user`          | Modifier prénom, nom, email                    |
| `DELETE` | `/api/user`          | Supprimer son compte                           |
| `PUT`    | `/api/user/password` | Modifier son mot de passe                      |
| `GET`    | `/api/user/all`      | Récupérer tous les utilisateurs (admin only)   |

### 💬 Feedbacks / Suggestions
Le nom suggestions peut être changé (feedbacks, tickets, etc.)
| Méthode  | Endpoint                     | Description                                                  |
| -------- | ---------------------------- | ------------------------------------------------------------ |
| `POST`   | `/api/feedback`              | Créer une nouvelle suggestion / feedback                     |
| `GET`    | `/api/feedback/:id`          | Voir sa propre suggestion (ou toutes si admin)               |
| `GET`    | `/api/feedback`              | Voir toutes les suggestions (admin only)                     |
| `GET`    | `/api/feedback/user/:userId` | Voir toutes les suggestions d’un utilisateur (admin or self) |
| `PUT`    | `/api/feedback/:id`          | Modifier une suggestion (si créateur et non encore répondue) |
| `DELETE` | `/api/feedback/:id`          | Supprimer une suggestion (si créateur)                       |
| `POST`   | `/api/feedback/:id/answer`   | Répondre à une suggestion (admin uniquement)                 |

### 💡 Idées à explorer
- Export CSV des feedbacks (admin)