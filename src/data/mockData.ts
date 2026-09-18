// DEMO DATA — everything in this file is fake and will be replaced by the back office / database.
import type { Category, Company, Message, Mission, Profile } from './types';
import { toIsoDate } from '../lib/format';

const companies = {
  ami: { name: 'AMI', logoText: 'ami', color: '#1f1f1f' },
  sezane: { name: 'Sézane', logoText: 'Sézane', color: '#2b2b2b' },
  decathlon: { name: 'Decathlon', logoText: 'DECATHLON', color: '#0082c3' },
  chocolat: { name: 'Chocolate Fair', logoText: 'CF', color: '#6b3a1e' },
  kiabi: { name: 'Kiabi', logoText: 'Kiabi', color: '#0ea5e9' },
  epicerie: { name: 'La Grande Épicerie', logoText: 'LGE', color: '#1f1f1f' },
  uniqlo: { name: 'Uniqlo', logoText: 'UNIQLO', color: '#e60012' },
  stationf: { name: 'Station F', logoText: 'F', color: '#1f1f1f' },
  snipes: { name: 'Snipes', logoText: 'snipes', color: '#111111' },
  testwe: { name: 'Testwe', logoText: 'testwe', color: '#e3242b' },
  eureka: { name: 'Eureka Vintage - Saint-Michel', logoText: 'EUREKA', color: '#1f6f4a' },
  fnac: { name: 'Fnac', logoText: 'fnac', color: '#e9a600' },
  sephora: { name: 'Sephora', logoText: 'SEPHORA', color: '#000000' },
  lush: { name: 'Lush', logoText: 'LUSH', color: '#1f1f1f' },
} satisfies Record<string, Company>;

const proposed: Mission[] = [
  {
    id: 'p1', company: companies.ami, category: 'Retail', price: 138.75, date: '2026-09-18',
    startTime: '10:00', endTime: '20:00', city: 'Paris 9th', address: '22 rue de Grenelle, 75009 Paris',
    workersCount: 1, contact: 'Fanny - The Good Workers',
    description: 'Extra help in store for the autumn collection launch. Welcoming customers, advising, restocking and checkout.',
    dressCode: 'Smart black outfit, closed shoes.', status: 'proposed',
  },
  {
    id: 'p2', company: companies.sezane, category: 'Retail', price: 92.5, date: '2026-09-19',
    startTime: '11:00', endTime: '19:00', city: 'Paris 3rd', address: '1 rue Saint-Fiacre, 75003 Paris',
    workersCount: 2, contact: 'Carla - The Good Workers',
    description: 'Looking after customers at the Sézane showroom: greeting, guiding to fitting rooms, managing the queue.',
    dressCode: 'Simple, neat outfit.', status: 'proposed',
  },
  {
    id: 'p3', company: companies.decathlon, category: 'Inventory', price: 71.2, date: '2026-09-21',
    startTime: '06:00', endTime: '12:00', city: 'Vélizy (78)', address: 'Vélizy 2 shopping centre, 78140 Vélizy-Villacoublay',
    workersCount: 6, contact: 'Shanaelle - The Good Workers',
    description: 'Annual store stocktake before opening. Scanning products aisle by aisle, paired with a team leader.',
    dressCode: 'Comfortable clothes, trainers.', status: 'proposed',
  },
  {
    id: 'p4', company: companies.chocolat, category: 'Events', price: 118, date: '2026-09-25',
    startTime: '09:00', endTime: '18:30', city: 'Paris 15th', address: 'Paris Expo Porte de Versailles, 75015 Paris',
    workersCount: 10, contact: 'Fanny - The Good Workers',
    description: 'Hosts and hostesses for the Chocolate Fair: welcoming visitors, checking tickets, guiding people around the aisles.',
    dressCode: 'Black trousers + t-shirt provided on site.', status: 'proposed',
  },
  {
    id: 'p5', company: companies.kiabi, category: 'Logistics', price: 64.8, date: '2026-09-22',
    startTime: '14:00', endTime: '20:00', city: 'Cergy (95)', address: '3 avenue des Trois Fontaines, 95000 Cergy',
    workersCount: 3, contact: 'Carla - The Good Workers',
    description: 'Receiving and shelving the weekly delivery. Light lifting (under 10 kg).',
    dressCode: 'Comfortable clothes.', status: 'proposed',
  },
  {
    id: 'p6', company: companies.epicerie, category: 'Catering', price: 88.4, date: '2026-09-20',
    startTime: '12:00', endTime: '20:00', city: 'Paris 7th', address: '38 rue de Sèvres, 75007 Paris',
    workersCount: 2, contact: 'Shanaelle - The Good Workers',
    description: 'Service at the deli counter: preparing orders, taking payments, cleaning down the station.',
    dressCode: 'White shirt, black trousers. Apron provided.', status: 'proposed',
  },
  {
    id: 'p7', company: companies.uniqlo, category: 'Retail', price: 105, date: '2026-09-26',
    startTime: '10:00', endTime: '19:00', city: 'Paris 4th', address: '39 rue des Francs-Bourgeois, 75004 Paris',
    workersCount: 4, contact: 'Fanny - The Good Workers',
    description: 'Extra help on tills and fitting rooms for the back-to-school weekend. 30 min training on arrival.',
    dressCode: 'Jeans + plain top, white trainers.', status: 'proposed',
  },
  {
    id: 'p8', company: companies.stationf, category: 'Reception', price: 76, date: '2026-09-24',
    startTime: '08:30', endTime: '14:30', city: 'Paris 13th', address: '5 parvis Alan Turing, 75013 Paris',
    workersCount: 2, contact: 'Carla - The Good Workers',
    description: 'Welcoming attendees at a tech conference: check-in, handing out badges, directing people to the rooms.',
    dressCode: 'Business casual.', status: 'proposed',
  },
];

const recentDone: Mission[] = [
  {
    id: 'd1', company: companies.snipes, category: 'Retail', price: 116.5, date: '2026-09-09',
    startTime: '09:00', endTime: '17:00', city: 'Cergy (95)', address: 'Les 3 Fontaines shopping centre, 95000 Cergy',
    workersCount: 2, contact: 'Carla - The Good Workers',
    description: 'Sales support for a sneaker collab launch.', dressCode: 'Black streetwear.',
    status: 'done', rating: 4, acceptedAt: '2026-09-02T10:12:00', completedAt: '2026-09-09T17:20:00',
  },
  {
    id: 'd2', company: companies.testwe, category: 'Reception', price: 34.2, date: '2026-09-08',
    startTime: '10:00', endTime: '12:00', city: 'Paris 8th', address: '10 rue de Penthièvre, 75008 Paris',
    workersCount: 1, contact: 'Fanny - The Good Workers',
    description: 'Invigilating an online exam at the Testwe offices.', dressCode: 'Simple outfit.',
    status: 'done', rating: 5, acceptedAt: '2026-09-01T18:40:00', completedAt: '2026-09-08T12:05:00',
  },
  {
    id: 'd3', company: companies.eureka, category: 'Retail', price: 83.36, date: '2026-09-04',
    startTime: '14:00', endTime: '19:45', city: 'Paris 5th', address: '12 rue de la Harpe, 75005 Paris',
    workersCount: 1, contact: 'Shanaelle - The Good Workers',
    description: 'Sales by weight: weighing, taking payments and restocking the rails.', dressCode: 'Your own clothes.',
    status: 'done', rating: 4, acceptedAt: '2026-08-30T09:00:00', completedAt: '2026-09-04T20:01:00',
  },
];

const historyCompanies = [companies.fnac, companies.sephora, companies.lush, companies.uniqlo, companies.kiabi, companies.decathlon];
const historyCategories: Category[] = ['Retail', 'Logistics', 'Events', 'Inventory', 'Reception', 'Catering'];
const historyPrices = [58.4, 92.1, 71.25, 84.6, 66.8, 87.25];
const historyCities = ['Paris 12th', 'Paris 8th', 'Paris 4th', 'Boulogne (92)', 'Paris 2nd', 'Saint-Denis (93)'];
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
      city: historyCities[k], address: `${historyCities[k]}`, workersCount: 1 + (k % 3), contact: 'Carla - The Good Workers',
      description: 'Past mission.', dressCode: 'Simple outfit.', status: 'done',
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
      workersCount: 2, contact: 'Fanny - The Good Workers', description: 'Mission cancelled by the client.', dressCode: '',
      status: 'cancelled', acceptedAt: `${iso}T08:00:00`,
    });
  }
  return missions;
}

const messages: Message[] = [
  { id: 'm1', missionId: 'd1', from: 'staff', author: 'Carla - The Good Workers', at: '2026-09-08T18:30:00', text: "Hi Julien! You're confirmed for the Snipes mission tomorrow. Meet at 8:50 am outside the store entrance and ask for Mehdi, the manager. Black streetwear please 🙂" },
  { id: 'm2', missionId: 'd1', from: 'worker', author: 'Julien', at: '2026-09-08T18:42:00', text: 'Perfect, thanks Carla! See you tomorrow.' },
  { id: 'm3', missionId: 'd1', from: 'staff', author: 'Carla - The Good Workers', at: '2026-09-09T17:05:00', text: 'Your mission is now complete! Remember to confirm the "All done" step in the app. Thanks for your hard work 🙌' },
  { id: 'm4', missionId: 'd2', from: 'staff', author: 'Fanny - The Good Workers', at: '2026-09-07T16:10:00', text: 'Hi Julien, quick reminder about the Testwe mission tomorrow at 10 am. Check in at the front desk, 10 rue de Penthièvre, with photo ID.' },
  { id: 'm5', missionId: 'd2', from: 'staff', author: 'Fanny - The Good Workers', at: '2026-09-08T12:02:00', text: 'Your mission is now complete! Remember to confirm the "All done" step in the app. Have a lovely day ☀️' },
  { id: 'm6', missionId: 'd3', from: 'staff', author: 'Shanaelle - The Good Workers', at: '2026-09-03T11:20:00', text: 'Hello! For the Eureka Vintage mission on Friday, meet at 1:50 pm in store. Léa will brief you on site.' },
  { id: 'm7', missionId: 'd3', from: 'worker', author: 'Julien', at: '2026-09-03T11:35:00', text: 'Great, thanks!' },
  { id: 'm8', missionId: 'd3', from: 'staff', author: 'Shanaelle - The Good Workers', at: '2026-09-04T19:50:00', text: 'Your mission is now complete! Remember to confirm the "All done" step in the app 🙏' },
];

const demoProfile: Profile = {
  firstName: 'Julien',
  lastName: 'Malherbe',
  siret: '95251547600010',
  phone: '06 12 34 56 78',
  email: 'demo@thegoodworkers.local',
  birthDate: '2001-05-12',
  school: 'Paris-Dauphine University',
  studyLevel: 'Year 5',
  city: 'Paris',
  regions: ['Île-de-France', 'Occitanie'],
  favoriteCategories: ['Retail', 'Events'],
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

// Arbitrary starting level ("Friendly") — to be replaced by a real business rule.
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
