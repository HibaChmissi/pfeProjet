export class Employe {
    constructor(
      public id?: number | null,
      public nom?: string | null,
      public prenom?: string | null,
      public email?: string,
      public mot_de_passe?: string,
      public role?: string | null,
      public etat?: boolean | null
    ) {}
  }