/** Google reviews — sans dates (conformément au brief). */

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: "Charles H.",
    rating: 5,
    text: "À recommander autour de vous : outre la compétence du technicien, l'amabilité est de rigueur ici. On se sent en confiance et les prix sont mini. Réparation ou achat, c'est le top sur Toulouse.",
  },
  {
    author: "Dolly A.",
    rating: 5,
    text: "Accueil super. Aide assurée et prise en charge au top, je recommande !",
  },
  {
    author: "Salomon N.",
    rating: 5,
    text: "Un mec très serviable et gentil, franchement je vous le conseille — il est réglo et vous fait les choses à un bon prix.",
  },
  {
    author: "Amrane A.",
    rating: 5,
    text: "Accueil agréable, connaissances techniques appréciables, prix très raisonnable. J'y ai fait une bonne affaire suite à l'achat d'un Samsung. Je recommande.",
  },
  {
    author: "Qitout B.",
    rating: 5,
    text: "Une jolie boutique avec des propriétaires adorables, professionnels et à l'écoute. Je conseille pour tout ce qui est téléphone et autres.",
  },
  {
    author: "Lahouari E.",
    rating: 5,
    text: "Bonne réception, bon accueil professionnel. Mon iPhone 11 a été remis presque à neuf rapidement. J'ai pu récupérer toutes les fonctionnalités de mon précieux iPhone. Bravo, je recommande vivement.",
  },
  {
    author: "Esther R.",
    rating: 5,
    text: "J'ai amené mon iPhone X pour faire réparer l'écran. Entre le service client, les prix et la qualité du service, j'en suis ressortie entièrement satisfaite. Je recommande à 100%.",
  },
  {
    author: "Sharik O.",
    rating: 5,
    text: "Service excellent, rapide. Je conseille fortement. Je suis entièrement satisfait du résultat.",
  },
  {
    author: "Ben E.",
    rating: 5,
    text: "D'une gentillesse extrême, très serviable et très compétent : il a trouvé la solution en un instant là où d'autres n'avaient pas d'idée avant d'ouvrir le téléphone. Un grand merci.",
  },
  {
    author: "Brigitte E.",
    rating: 5,
    text: "Très satisfaite du travail fourni par cette boutique : téléphone débloqué en un rien de temps et pas cher. Je recommande fortement — accueil excellent et prise en charge au top. Merci pour votre professionnalisme.",
  },
];
