export interface Alerte {
  id: number;
  type: string;
  message: string;
  niveau: 'INFO' | 'WARNING' | 'CRITIQUE';
  vue: boolean;
  dateHeure: string; // 👈 ajoute cette ligne
}
