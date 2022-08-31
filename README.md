## Formation Node.js 31-02 septembre 2022

Contact : nicolas@chambrier.fr

### Ressources

- Les diagrammes ("tableau blanc") (lien inclus en fin de formation)
- Les slides dans le dossier "slides"
- Les quelques exemples isolés dans le dossier "samples"
- Le gros TP dans le dossier "app"

### Liens utiles

- https://kentcdodds.com/blog/write-tests
- https://12factor.net/fr/
- https://reflectoring.io/complete-guide-to-cors/
- Testing socket.io (no mock): https://socket.io/fr/docs/v4/testing/#example-with-jest
- Mocking socket.io: https://www.npmjs.com/package/socket.io-mock & https://www.npmjs.com/package/mock-socket
- https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport
- https://www.passportjs.org/
- Hosting Heroku & Mongodb: https://www.mongodb.com/developer/how-to/use-atlas-on-heroku/

### Le TP

- Messages type forum

#### Commandes npm de l'application

- Commandes standard : voir slides
- Démarrer en mode "watch" : `npm run dev`
- Build de production : `npm run build`
- Debug + mode "watch" : `npm run debugdev`
- Tests : `npm test`

#### Serveurs

- Mongo: `docker run --name mongo-formation -d -p 27017:27017 mongo`
- Redis: `docker run --name redis-formation -d -p 6379:6379 redis` (pas requis immédiatement, serait nécessaire pour le stockage des session & adapter socket.io)
