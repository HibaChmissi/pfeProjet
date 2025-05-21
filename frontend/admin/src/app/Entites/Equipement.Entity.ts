export class Equipement {
    constructor(
      public id?: number | null,
      public nom?: string | null,
      public etat?: 'Active' | 'Inactive' ,
    ) {}
  }
  