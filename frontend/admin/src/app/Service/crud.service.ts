import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entites/Admin.Entity';
import { Employes } from '../Entites/Employes.Entity';
import { Observable, forkJoin, throwError } from 'rxjs';
import { Technicien } from '../Entites/Technicien.Entity';
import { Responsable } from '../Entites/Responsable.Entity';
import { Intervention } from '../Entites/Intervention.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DroitAcces } from '../Entites/droits-acces.Entity';
import { Equipement } from '../Entites/Equipement.Entity';
import { Message } from '../Entites/Message.Entity';
import { Alerte } from '../Entites/Alerte.Entity';
import { Maj } from '../Entites/MAJ.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  authService: any;
 
  crudService: any;

  
  
  
 
  apiUrl = "http://localhost:8081/api"
  loginUserUrl ="http://localhost:8081/api/admin/login"
  helper=new JwtHelperService()
  constructor(private http:HttpClient) { }

 updateAdmin(id: number, admin: Admin) {
    const url = `http://localhost:8081/api/admin/${id}`;
    return this.http.put<any>(url, admin);
  }



  findAdminById(id : number): Observable<Admin> {
    const url =`${this.apiUrl + "/admin"}/${id} ; `
    return this.http.get<Admin>(url)
  }


  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem("myToken");
    localStorage.removeItem("role");
  }


  getemployes(): Observable<Employes[]>{
    return this.http.get<Employes[]>(this.apiUrl + "/employe");
  }
  onDeleteEmploye(id : number){
    const url =`${this.apiUrl+"/employe"}/${id}` 
    return this.http.delete(url )
  }
  addEmploye(employe:Employes)
   {
    return this.http.post<any>(this.apiUrl+"/employe",employe);
   }


   gettechnicien(): Observable<Technicien[]>{
    return this.http.get<Technicien[]>(this.apiUrl + "/api/technicien");
  }
  onDeleteTechnicien(id : number){
    const url =`${this.apiUrl+"/api/technicien"}/${id}` 
    return this.http.delete(url )
  }
  addTechnicien(technicien:Technicien)
   {
    return this.http.post<any>(this.apiUrl+"/api/technicien",technicien);
   }

  
  getresponsable(): Observable<Responsable[]>{
    return this.http.get<Responsable[]>(this.apiUrl + "/responsable");
  }
  onDeleteResponsable(id : number){
    const url =`${this.apiUrl+"/responsable"}/${id}` 
    return this.http.delete(url )
  }
  addResponsable(responsable:Responsable)
   {
    return this.http.post<any>(this.apiUrl+ "/responsable",responsable);
   }


   userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }
   getDroitsAcces(): Observable<DroitAcces[]> {
    return this.http.get<DroitAcces[]>(this.apiUrl+"/api/droitsacc/all");
  }

  sauvegarderDroits(droits: DroitAcces[]): Observable<any> {
    // Envoi chaque droit un par un
    return forkJoin(
      droits.map(droit => 
        this.http.put(`${this.apiUrl}/api/droitsacc/${droit.id}`, droit)
      )
    );
  }

  
  
  getequipement(): Observable<Equipement[]>{
    return this.http.get<Equipement[]>(this.apiUrl + "/api/equipements");
  }
  onDeleteEquipement(id : number){
    const url =`${this.apiUrl+"/api/equipements"}/${id}` 
    return this.http.delete(url )
  }
  addEquipement(equipement:Equipement)
   {
    return this.http.post<any>(this.apiUrl+"/api/equipements",equipement);
   }


   updateEmployes(id:number,employe: Employes) {
    const url =`${this.apiUrl+"/employe"}/${id}` 
    return this.http.put<any>(url, employe);
  }

  findEmployesById(id : number): Observable<Employes> {
    const url =`${this.apiUrl + "/employe"}/${id} ; `
    return this.http.get<Employes>(url)
  }


  updateTechnicien(id:number,technicien: Technicien) {
    const url =`${this.apiUrl+"/api/technicien"}/${id}` 
    return this.http.put<any>(url, technicien);
  }

  findTechnicienById(id : number): Observable<Technicien> {
    const url =`${this.apiUrl + "/api/technicien"}/${id} ; `
    return this.http.get<Technicien>(url)
  }

  updateResponsable(id:number,responsable: Responsable) {
    const url =`${this.apiUrl+"/responsable"}/${id}` 
    return this.http.put<any>(url, responsable);
  }

  findResponsableById(id : number): Observable<Responsable> {
    const url =`${this.apiUrl + "/responsable"}/${id} ; `
    return this.http.get<Responsable>(url)
  }

  updateEquipement(id:number,equipement: Equipement) {
    const url =`${this.apiUrl+"/api/equipements"}/${id}` 
    return this.http.put<any>(url, equipement);
  }

  findEquipementById(id : number): Observable<Equipement> {
    const url =`${this.apiUrl + "/api/equipements"}/${id} ; `
    return this.http.get<Equipement>(url)
  }


// CRUD MAJ
getMajsByEquipement(equipementId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/api/maj/equipements/${equipementId}`);
}

ajouterMajPourEquipement(maj: Maj): Observable<any> {
  const adminId = localStorage.getItem('adminId');

  if (!adminId) {
    console.error("ID administrateur introuvable dans le localStorage.");
    return throwError(() => new Error("ID administrateur introuvable."));
  }

  const payload = {
    equipementId: maj.equipementId,       // 👈 on extrait juste l’ID
    description: maj.description,
    adminId: parseInt(adminId)             // 👈 bien convertir en number
  };

  console.log("✅ Payload envoyé :", payload);

  return this.http.post(`${this.apiUrl}/api/maj/automatiser`, payload);
}



getEquipementById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/api/equipements/${id}`);
}

searchEquipements(query: string): Observable<any[]> {
  const params = new HttpParams().set('query', query);
  return this.http.get<any[]>(`${this.apiUrl}/equipement/search`, { params });
}

getMessages(): Observable<Message[]> {
  return this.http.get<Message[]>(`${this.apiUrl}/message`);
}

onDeleteMessage(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/message/${id}`);
}

getMessageById(id: number): Observable<Message> {
  return this.http.get<Message>(`${this.apiUrl}/message/${id}`);
}
addMessage(message: Message): Observable<Message> {
  return this.http.post<Message>(this.apiUrl+"/message", message);
}
// Exemple dans crud.service.ts
ajouterAlerte(alerte: any): Observable<any> {
  return this.http.post('http://localhost:8081/api/alertes', alerte);
}
getAlertes(): Observable<Alerte[]> {
  return this.http.get<Alerte[]>(this.apiUrl);
}
getAlertesNonVues(): Observable<Alerte[]> {
  return this.http.get<Alerte[]>(`${this.apiUrl}/nonvues`);
}
marquerCommeVue(id: number): Observable<Alerte> {
  return this.http.post<Alerte>(`${this.apiUrl}/${id}/vue, {}`,{});
}
getAlertesParAdmin(adminId: number): Observable<Alerte[]> {
  return this.http.get<Alerte[]>(`${this.apiUrl}/alertes/admin/${adminId}`);
}


getAllIntervention(): Observable<Intervention[]> {
  return this.http.get<Intervention[]>(this.apiUrl + "/api/interventions/all");
}
}
