export interface Intervention {
    id: number;
    titre: string;
    type: string;
    statut: string;
    description: string;
   
    createurEmployeId?: number;
    createurTechnicienId?: number;
    traiteurTechnicienId?: number;
  }
  