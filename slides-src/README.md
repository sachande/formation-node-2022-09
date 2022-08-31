## Mode d'emploi

```sh
# Installer les dépendances
npm install

# Générer la présentation Reveal
npm run build

# Lancer le serveur en mode watch pour bosser pénard
npm run watch

# Générer les slides en PDF (ne pas utiliser prez --print qui fait du caca)
npm run watch
npm run pdf # ouvre Chrome → Ctrl+P, enregistrer en PDF
```

## Impression directe

### Pré-requis

* Installer `chromium-browser`
* Si ce n'est pas déjà fait ou que les préférences d'impression ont déjà été modifiée, ouvrir une page et lancer le dialogue d'impression, sélectionner :
  * Orientation : paysage
  * Marges : aucunes
  * Taille : A4

### Lancement de l'impression directe

```sh
npm run print
```

Il suffit de valider le nom du fichier (cette étape ne peut pas être automatisée facilement), that's all folks :)
