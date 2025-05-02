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
- Aller dans le fichier page.js src > app > page.js
- Dans la constante destinations, rentrer entre crochet { name: le nom de la destination, lat: la latitude, lng: la longitude ]
- ⚠ Attention, si la longitude est à l'EST du méridien de greenwich, mettre un - devant. Si la latitude est au sud de l'équateur mettre un - devant

## Calculs
Les calculs se font dans le fichier src > components > GlobeCalculs.jsx

## Gestion boutons destinations
La gestion des boutons des destinations se fait dans src > components > GlobeDestinationsButtons.jsx