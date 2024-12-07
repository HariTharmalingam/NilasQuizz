const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/NilasQuizz' : '';


export const questions = [
  {
    id: 1,
    text: "Quelle est la date de naissance de Nila ?",
    options: ["5 Décembre", "6 Décembre", "7 Décembre", "8 Décembre"],
    correct: "5 Décembre"
  },
  {
    id: 2,
    text: "Trouver la chanson de Rajini",
    //
    imageOptions: true, // Indique que les options sont des images
    options: [
      { 
        id: 1, 
        image: process.env.NODE_ENV === 'production' 
          ? '/NilasQuizz/images/1.jpg' 
          : '/images/1.jpg'
      },
      { 
        id: 2, 
        image: process.env.NODE_ENV === 'production' 
          ? '/NilasQuizz/images/2.jpg' 
          : '/images/2.jpg'
      },
      { 
        id: 3, 
        image: process.env.NODE_ENV === 'production' 
          ? '/NilasQuizz/images/3.jpg' 
          : '/images/3.jpg'
      },
      { 
        id: 4, 
        image: process.env.NODE_ENV === 'production' 
          ? '/NilasQuizz/images/4.jpg' 
          : '/images/4.jpg'
      }
    ],
    correct: 4
  },
  {
    id: 3,
    text: "Quelle est la danse traditionnelle Tamoul ?",
    options: ["Bharatanatyam", "Kathak", "Kuchipudi", "Garba"],
    correct: "Bharatanatyam"
  },
  {
    id: 4,
    text: "Combien de lettres comporte l’alphabet tamil ?",
    options: ["246", "247", "248", "256"],
    correct: "247"
  },
  {
    id: 5,
    text: "Lequel de ces aliments n’a pas de date de péremption ?",
    options: ["Le beurre", "Le miel", "L’avoine", "Le riz"],
    correct: "Le riz"
  },
  {
    id: 6,
    text: "Quel est le nom du prochain film d’Ajith ?",
    options: ["Rajakili", "Viduthalai", "Vaasivasal", "Vidaamuyarchi"],
    correct: "Vidaamuyarchi"
  },
  {
    id: 7,
    text: "Quel est l’emblème national de la France ?",
    options: ["Le coq", "Le lion", "L’aigle", "L’ours"],
    correct: "Le coq"
  },
  {
    id: 7,
    text: "Quel est le poème Tamil le plus ancien ?",
    options: ["Tirukkural", "Silappatikaram", "Manimekalai", "Tolkappiyam"],
    correct: "Tolkappiyam"
  },
  {
    id: 9,
    text: "Combien y a-t-il de métro en France actuellement ?",
    options: ["16", "15", "14", "18"],
    correct: "16"
  },
  {
    id: 10,
    text: "Quel Arbre est sacré dans la culture tamoul ?",
    options: ["Neem", "Banyan", "Tulsi", "Tamarind"],
    correct: "Banyan"
  },
  {
    id: 11,
    text: "Combien de fois par jour l’horloge passe sur le « 4 »?",
    options: ["24 fois", "12 fois", "2 fois", "8 fois "],
    correct: "24 fois"
  },
  {
    id: 12,
    text: "Quelle couleur est traditionnellement portée pour Pongal ?",
    options: ["Rouge", "Blanc", "Jaune", "Bleu"],
    correct: "Blanc"
  },
  {
    id: 13,
    text: "Combien y’a t’il d’océan ?",
    options: ["5", "6", "7", "8"],
    correct: "5"
  },
  {
    id: 14,
    text: "Quel livre n’est pas issu de la culture Tamil ?",
    options: ["Shilapadikaram", "Ettuthokai", "Tholkapiram", "Thirukkural"],
    correct: "Tholkapiram"
  },
  {
    id: 15,
    text: "Le Sri Lanka est connu pour sa production de quoi ?",
    options: ["Café", "Vanille", "Thé", "Soie"],
    correct: "Thé"
  },
  {
    id: 16,
    text: "Quelle partie du corps est complètement développée à la naissance ?",
    options: ["Les yeux", "Le crâne", "Le bassin", "Les intestins"],
    correct: "Les yeux"
  },
  {
    id: 17,
    text: "Le sous sol de la terre du Sri Lanka est riche en quoi ?",
    options: ["Or", "Saphir", "Fer", "Pétrole"],
    correct: "Saphir"
  },
  {
    id: 18,
    text: "Combien y’a t’il de cœurs dans une pieuvre ?",
    options: ["1", "2", "3", "4"],
    correct: "3"
  },
  {
    id: 19,
    text: "Quelle est la rivière la plus longue du Sri Lanka ?",
    options: ["Kelani ganga", "Mahaweli", "Kalu ganga", "Madu ganga"],
    correct: "Mahaweli"
  },
  {
    id: 20,
    text: "Quel légume a été créé par l’homme ?",
    options: ["Salade", "Tomate", "Asperge ", "Brocoli"],
    correct: "Brocoli"
  },
];