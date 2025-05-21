export class DroitAcces {
    constructor(
      public id: number | null = null,         // ID de l'accès
      public role: string | null = null,       // Le rôle associé à l'accès
      public ressource: string | null = null,  // La ressource pour laquelle les droits sont définis
      public voir: boolean = false,           // Droit de voir
      public creer: boolean = false,          // Droit de créer
      public modifier: boolean = false,       // Droit de modifier
      public supprimer: boolean = false,     // Droit de supprimer
      public traiter: boolean = false,      // Droit de traitement 

    ) {}
  }