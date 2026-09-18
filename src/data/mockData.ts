// DONNÉES DE DÉMO — tout ce fichier est factice et sera remplacé par le back office / la base de données.
import type { Category, Company, Message, Mission, Profile } from './types';
import { toIsoDate } from '../lib/format';

const companies = {
  ami: { name: 'AMI', logoText: 'ami', color: '#1f1f1f' },
  sezane: { name: 'Sézane', logoText: 'Sézane', color: '#2b2b2b' },
  decathlon: { name: 'Decathlon', logoText: 'DECATHLON', color: '#0082c3' },
  chocolat: { name: 'Salon du Chocolat', logoText: 'SdC', color: '#6b3a1e' },
  kiabi: { name: 'Kiabi', logoText: 'Kiabi', color: '#0ea5e9' },
  epicerie: { name: 'La Grande Épicerie', logoText: 'LGE', color: '#1f1f1f' },
  uniqlo: { name: 'Uniqlo', logoText: 'UNIQLO', color: '#e60012' },
  stationf: { name: 'Station F', logoText: 'F', color: '#1f1f1f' },
  snipes: { name: 'Snipes', logoText: 'snipes', color: '#111111' },
  testwe: { name: 'Testwe', logoText: 'testwe', color: '#e3242b' },
  eureka: { name: 'Eureka Fripe - Kiloshop Saint-Michel', logoText: 'EUREKA', color: '#1f6f4a' },
  fnac: { name: 'Fnac', logoText: 'fnac', color: '#e9a600' },
  sephora: { name: 'Sephora', logoText: 'SEPHORA', color: '#000000' },
  lush: { name: 'Lush', logoText: 'LUSH', color: '#1f1f1f' },
} satisfies Record<string, Company>;

const proposed: Mission[] = [
  {
    id: 'p1', company: companies.ami, category: 'Vente', price: 138.75, date: '2026-09-18',
    startTime: '10:00', endTime: '20:00', city: 'Paris 9e', address: '22 rue de Grenelle, 75009 Paris',
    studentsCount: 1, contact: 'Fanny - The Good Worker',
    description: 'Renfort en boutique pour le lancement de la collection automne. Accueil client, conseil, réassort et encaissement.',
    dressCode: 'Tenue noire élégante, chaussures fermées.', status: 'proposed',
  },
  {
    id: 'p2', company: companies.sezane, category: 'Vente', price: 92.5, date: '2026-09-19',
    startTime: '11:00', endTime: '19:00', city: 'Paris 3e', address: "1 rue Saint-Fiacre, 75003 Paris",
    studentsCount: 2, contact: 'Carla - The Good Worker',
    description: "Accompagnement des clientes à l'Appartement Sézane : accueil, orientation en cabine, gestion des files d'attente.",
    dressCode: 'Tenue sobre et soignée.', status: 'proposed',
  },
  {
    id: 'p3', company: companies.decathlon, category: 'Inventaire', price: 71.2, date: '2026-09-21',
    startTime: '06:00', endTime: '12:00', city: 'Vélizy (78)', address: 'Centre commercial Vélizy 2, 78140 Vélizy-Villacoublay',
    studentsCount: 6, contact: 'Shanaelle - The Good Worker',
    description: 'Inventaire annuel du magasin avant ouverture. Scan des produits par rayon, en binôme avec un responsable.',
    dressCode: 'Tenue confortable, baskets.', status: 'proposed',
  },
  {
    id: 'p4', company: companies.chocolat, category: 'Événementiel', price: 118, date: '2026-09-25',
    startTime: '09:00', endTime: '18:30', city: 'Paris 15e', address: 'Paris Expo Porte de Versailles, 75015 Paris',
    studentsCount: 10, contact: 'Fanny - The Good Worker',
    description: 'Hôtes et hôtesses pour le Salon du Chocolat : accueil des visiteurs, contrôle des billets, orientation dans les allées.',
    dressCode: 'Pantalon noir + t-shirt fourni sur place.', status: 'proposed',
  },
  {
    id: 'p5', company: companies.kiabi, category: 'Logistique', price: 64.8, date: '2026-09-22',
    startTime: '14:00', endTime: '20:00', city: 'Cergy (95)', address: '3 avenue des Trois Fontaines, 95000 Cergy',
    studentsCount: 3, contact: 'Carla - The Good Worker',
    description: 'Réception et mise en rayon de la livraison hebdomadaire. Port de charges légères (< 10 kg).',
    dressCode: 'Tenue confortable.', status: 'proposed',
  },
  {
    id: 'p6', company: companies.epicerie, category: 'Restauration', price: 88.4, date: '2026-09-20',
    startTime: '12:00', endTime: '20:00', city: 'Paris 7e', address: '38 rue de Sèvres, 75007 Paris',
    studentsCount: 2, contact: 'Shanaelle - The Good Worker',
    description: 'Service au comptoir traiteur : préparation des commandes, encaissement, remise en état du poste.',
    dressCode: 'Chemise blanche, pantalon noir. Tablier fourni.', status: 'proposed',
  },
  {
    id: 'p7', company: companies.uniqlo, category: 'Vente', price: 105, date: '2026-09-26',
    startTime: '10:00', endTime: '19:00', city: 'Paris 1er', address: '39 rue des Francs-Bourgeois, 75004 Paris',
    studentsCount: 4, contact: 'Fanny - The Good Worker',
    description: 'Renfort caisse et cabines pour le week-end de rentrée. Formation de 30 min à l\'arrivée.',
    dressCode: 'Jean + haut uni, baskets blanches.', status: 'proposed',
  },
  {
    id: 'p8', company: companies.stationf, category: 'Accueil', price: 76, date: '2026-09-24',
    startTime: '08:30', endTime: '14:30', city: 'Paris 13e', address: '5 parvis Alan Turing, 75013 Paris',
    studentsCount: 2, contact: 'Carla - The Good Worker',
    description: "Accueil des participants d'une conférence tech : émargement, remise des badges, orientation vers les salles.",
    dressCode: 'Tenue business casual.', status: 'proposed',
  },
];

const recentDone: Mission[] = [
  {
    id: 'd1', company: companies.snipes, category: 'Vente', price: 116.5, date: '2026-09-09',
    startTime: '09:00', endTime: '17:00', city: 'Cergy (95)', address: 'Centre commercial Les 3 Fontaines, 95000 Cergy',
    studentsCount: 2, contact: 'Carla - The Good Worker',
    description: 'Renfort vente pour le lancement d\'une collab sneakers.', dressCode: 'Tenue streetwear noire.',
    status: 'done', rating: 4, acceptedAt: '2026-09-02T10:12:00', completedAt: '2026-09-09T17:20:00',
  },
  {
    id: 'd2', company: companies.testwe, category: 'Accueil', price: 34.2, date: '2026-09-08',
    startTime: '10:00', endTime: '12:00', city: 'Paris 8e', address: '10 rue de Penthièvre, 75008 Paris',
    studentsCount: 1, contact: 'Fanny - The Good Worker',
    description: 'Surveillance d\'un examen en ligne dans les locaux Testwe.', dressCode: 'Tenue sobre.',
    status: 'done', rating: 5, acceptedAt: '2026-09-01T18:40:00', completedAt: '2026-09-08T12:05:00',
  },
  {
    id: 'd3', company: companies.eureka, category: 'Vente', price: 83.36, date: '2026-09-04',
    startTime: '14:00', endTime: '19:45', city: 'Paris 5e', address: '12 rue de la Harpe, 75005 Paris',
    studentsCount: 1, contact: 'Shanaelle - The Good Worker',
    description: 'Vente au kilo : pesée, encaissement et réassort des portants.', dressCode: 'Tenue libre.',
    status: 'done', rating: 4, acceptedAt: '2026-08-30T09:00:00', completedAt: '2026-09-04T20:01:00',
  },
];

const historyCompanies = [companies.fnac, companies.sephora, companies.lush, companies.uniqlo, companies.kiabi, companies.decathlon];
const historyCategories: Category[] = ['Vente', 'Logistique', 'Événementiel', 'Inventaire', 'Accueil', 'Restauration'];
const historyPrices = [58.4, 92.1, 71.25, 84.6, 66.8, 87.25];
const historyCities = ['Paris 12e', 'Paris 8e', 'Paris 4e', 'Boulogne (92)', 'Paris 2e', 'Saint-Denis (93)'];
const historyRatings: Record<number, number> = { 2: 3, 7: 4, 13: 3, 21: 4 };

function buildHistory(): Mission[] {
  const missions: Mission[] = [];
  const start = new Date('2026-08-28T00:00:00');
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() - i * 9);
    const iso = toIsoDate(d);
    const k = i % 6;
    missions.push({
      id: `h${i}`, company: historyCompanies[k], category: historyCategories[k], price: historyPrices[k],
      date: iso, startTime: k % 2 === 0 ? '09:00' : '13:00', endTime: k % 2 === 0 ? '17:00' : '20:00',
      city: historyCities[k], address: `${historyCities[k]}`, studentsCount: 1 + (k % 3), contact: 'Carla - The Good Worker',
      description: 'Mission passée.', dressCode: 'Tenue sobre.', status: 'done',
      rating: historyRatings[i], acceptedAt: `${iso}T08:00:00`, completedAt: `${iso}T21:00:00`,
    });
  }
  for (let i = 0; i < 5; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() - i * 41 - 4);
    const iso = toIsoDate(d);
    missions.push({
      id: `c${i}`, company: historyCompanies[(i + 2) % 6], category: historyCategories[(i + 2) % 6], price: historyPrices[(i + 2) % 6],
      date: iso, startTime: '10:00', endTime: '18:00', city: historyCities[(i + 2) % 6], address: historyCities[(i + 2) % 6],
      studentsCount: 2, contact: 'Fanny - The Good Worker', description: 'Mission annulée par le client.', dressCode: '',
      status: 'cancelled', acceptedAt: `${iso}T08:00:00`,
    });
  }
  return missions;
}

const messages: Message[] = [
  { id: 'm1', missionId: 'd1', from: 'staff', author: 'Carla - The Good Worker', at: '2026-09-08T18:30:00', text: 'Hello Julien ! Tu es bien confirmé sur la mission Snipes de demain. RDV à 8h50 devant l\'entrée du magasin, demande Mehdi le responsable. Tenue streetwear noire 🙂' },
  { id: 'm2', missionId: 'd1', from: 'student', author: 'Julien', at: '2026-09-08T18:42:00', text: 'Parfait, merci Carla ! À demain.' },
  { id: 'm3', missionId: 'd1', from: 'staff', author: 'Carla - The Good Worker', at: '2026-09-09T17:05:00', text: 'Votre mission est maintenant terminée ! Pensez bien à valider l\'étape "c\'est terminé" dans l\'application. Merci pour ton implication 🙌' },
  { id: 'm4', missionId: 'd2', from: 'staff', author: 'Fanny - The Good Worker', at: '2026-09-07T16:10:00', text: 'Bonjour Julien, petit rappel pour la mission Testwe demain à 10h. Présente-toi à l\'accueil du 10 rue de Penthièvre avec une pièce d\'identité.' },
  { id: 'm5', missionId: 'd2', from: 'staff', author: 'Fanny - The Good Worker', at: '2026-09-08T12:02:00', text: 'Votre mission est maintenant terminée ! Pensez bien à valider l\'étape "c\'est terminé" dans l\'application. Belle journée ☀️' },
  { id: 'm6', missionId: 'd3', from: 'staff', author: 'Shanaelle - The Good Worker', at: '2026-09-03T11:20:00', text: 'Hello ! Pour la mission Eureka Fripe vendredi, RDV 13h50 en boutique. Le brief se fait sur place avec Léa.' },
  { id: 'm7', missionId: 'd3', from: 'student', author: 'Julien', at: '2026-09-03T11:35:00', text: 'Top, merci !' },
  { id: 'm8', missionId: 'd3', from: 'staff', author: 'Shanaelle - The Good Worker', at: '2026-09-04T19:50:00', text: 'Votre mission est maintenant terminée ! Pensez bien à valider l\'étape "c\'est terminé" dans l\'application 🙏' },
];

const demoProfile: Profile = {
  firstName: 'Julien',
  lastName: 'Malherbe',
  siret: '95251547600010',
  phone: '06 12 34 56 78',
  email: 'demo@thegoodworker.local',
  birthDate: '2001-05-12',
  school: 'Université Paris-Dauphine',
  studyLevel: 'Bac+5',
  city: 'Paris',
  regions: ['Île-de-France', 'Occitanie'],
  favoriteCategories: ['Vente', 'Événementiel'],
  balance: 0,
  memberSince: '2023-03-15',
  available: true,
  notifications: true,
  motivationLevel: 8,
  validationStatus: 'validated',
};

export function seedState() {
  return {
    missions: [...proposed, ...recentDone, ...buildHistory()],
    messages,
    profile: demoProfile,
  };
}

// Niveau de départ arbitraire ("Sympa") — à remplacer par une vraie règle métier.
const NEW_USER_MOTIVATION = 4;

export function newProfile(patch: Partial<Profile>): Profile {
  return {
    firstName: '',
    lastName: '',
    siret: '',
    phone: '',
    email: '',
    birthDate: '',
    school: '',
    studyLevel: '',
    city: '',
    regions: [],
    favoriteCategories: [],
    balance: 0,
    memberSince: toIsoDate(new Date()),
    available: true,
    notifications: true,
    motivationLevel: NEW_USER_MOTIVATION,
    validationStatus: 'pending',
    ...patch,
  };
}

export function newUserState(profile: Profile) {
  return {
    missions: proposed.map((m) => ({ ...m })),
    messages: [] as Message[],
    profile,
  };
}
