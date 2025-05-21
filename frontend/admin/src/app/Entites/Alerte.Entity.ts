export interface Alerte {
    id?: number;
    message: string;
    niveau?: 'INFO' | 'WARNING' | 'CRITIQUE';
    dateHeure?: Date;
    vue: boolean;
  }