Ceci est un site de démo en Next.js et threejs pour faire tourner un globe terrestre en fonctions de destinations. 
Ce n'est qu'une démo et il est perfectible nottament dans la structure mais ce n'est pas ce qui est important ici 😊 .
Cette démo a été créé a des fins récréatives par [PS-Web](https://psweb.fr)

Vous êtes libre d'utiliser cette démo à votre convenance.

## Stack technique
- Next.js 15.3.1
- React, React-dom 19.0.0
- Three.js 0.176.0
- gsap 3.13.0
- React-three/fiber 9.1.2
- React-three/drei 10.0.7

## Installation
- Cloner le repository
- npm install

## Lancement du visuel
- npm run dev
- aller sur : http://localhost:3000/

## Ajout de destination
- Les destination sont récupérées depuis un fichier JSON en interne au projet pour plus de rapidité et pouvoir facilement modifier des lat ou long incorrecte
- Aller dans le fichier public/data/city_more_1M5.json
- Toutes les informations doivent être entrées comme les autres y compris capitale: true ou false
- ⚠ Attention, si la longitude est à l'EST du méridien de greenwich, mettre un - devant. Si la latitude est au sud de l'équateur mettre un - devant
- le fichier est récupé et utilisé dans GlobeCalculs.jsx dans les components

## Texture de la carte (le visuel de la carte)
- l'image de la carte se trouve dans public/textures c'est le fichier texture_globe.jpg
- Si vous voulez en ajouter une autre il faut aussi changer dans GlobeCalculs.jsx le nom de la nouvelle carte.

## Calculs
Les calculs se font dans le fichier src > components > GlobeCalculs.jsx

## Gestion bouton destinations
La gestion du bouton des destinations se fait dans src > components > GlobeDestinationsButtons.jsx

## Style
Le fichier css gérant le style de l'app se trouve dans src/style/style.css