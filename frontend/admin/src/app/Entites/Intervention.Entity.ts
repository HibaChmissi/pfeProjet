export interface Intervention {
  id: number;
  titre: string;
  type: string;
  statut?: 'en_cours' | 'en_attente' |'terminee' ,
  description: string;
  date: string;
  heure: string;
  createurEmployeId?: number;
  createurTechnicienId?: number;
  traiteurTechnicienId?: number;
}
