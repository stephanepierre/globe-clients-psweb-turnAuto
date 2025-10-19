# 🌍 Globe 3D Clients – Next.js & Three.js

Ce projet est une **démonstration visuelle** réalisée avec **Next.js** et **Three.js**, qui affiche un **globe terrestre animé** tournant automatiquement entre différentes destinations à travers le monde pour montrer les endroits où PS-Web a des clients.

Le globe est accompagné d’un **effet lumineux doré** indiquant la position actuelle, ainsi que d’un **texte dynamique** affichant le nom du pays et le nombre de clients.

Ce projet n’a pas vocation à être parfait dans sa structure : il est avant tout un **exercice créatif et récréatif**, conçu pour expérimenter l’intégration de Three.js, React et GSAP dans un environnement Next.js moderne.

Créé par [**PS-Web**](https://psweb.fr)  
> “Soit on fait le job, soit on ne le prend pas.”

---

## ⚙️ Stack technique

- **Next.js** 15.3.1  
- **React / React-dom** 19.0.0  
- **Three.js** 0.176.0  
- **GSAP** 3.13.0  
- **@react-three/fiber** 9.1.2  
- **@react-three/drei** 10.0.7  

---

## 🚀 Installation


# Cloner le repository
```bash
git clone https://github.com/stephanepierre/globe-clients-psweb-turnAuto.git
```

---

# Installer les dépendances
```bash
npm install
```

## 🧭 Lancement du projet
```bash
npm run dev
```
## Puis ouvrir dans votre navigateur :
```bash
http://localhost:3000/
```
Le globe se chargera automatiquement et commencera à tourner entre les différentes destinations.

---

# 🌎 Gestion des destinations

Les destinations sont définies directement dans le fichier :
src/app/page.js

Chaque entrée contient :
{
  name: "France",
  lat: 48.8566,
  lng: 2.3522,
  clients: 15,
  flag: "🇫🇷"
}
Le globe oriente la caméra automatiquement vers chaque destination, toutes les 4 secondes.
Le texte dynamique s’actualise simultanément avec le nom du pays, le drapeau et le nombre de clients.

## Règle de coordonnées :
- Longitudes à l’**Ouest du méridien** de Greenwich → valeur **Positive**
- Longitudes à l’**Est du méridien** de Greenwich → valeur **Négative**
- Latitudes au **Sud de l’équateur** → valeur **négative**
- Latitudes au **Nord de l’équateur** → valeur **Positive**