import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, forkJoin } from 'rxjs';
import { Intervention } from '../Entites/Intervention.Entity';
import { Employe } from '../Entites/Employe.Entity';
import { Technicien } from '../Entites/Technicien.Entity';
import { Message } from '../Entites/Message.Entity';
import { Responsable } from '../Entites/Responsable.Entity';
import { Alerte } from '../Entites/Alerte.Entity';
import { DroitAcces } from '../Entites/droits-acces.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  authService: any;

  private apiUrl = "http://localhost:8081/api";
  private loginEmployeUrl = "http://localhost:8081/api/employe/login";
  private loginTechnicienUrl = "http://localhost:8081/api/api/technicien/login";
  private loginResponsableurl ="http://localhost:8081/api/responsable/login";
  helper=new JwtHelperService()
  constructor(private http: HttpClient) {}

  // Interface pour les identifiants de connexion
  loginEmploye(employe:Employe){
    return this.http.post<any>(this.loginEmployeUrl , employe);
    
  }
  loginTechnicien(technicien:Technicien){
    return this.http.post<any>(this.loginTechnicienUrl, technicien);
  }
  
  loginResponsable(responsable:Responsable){
    console.log
     return this.http.post<any>(this.loginResponsableurl, responsable);
   }

  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  logout(): void {
    localStorage.removeItem("myToken");
    localStorage.removeItem("role");
  }
  updateEmploye(id: number, employe: Employe) {
    const url = `http://localhost:8081/api/employe/${id}`;
    return this.http.put<any>(url, employe);
  }
  findEmployeById(id : number): Observable<Employe> {
    const url = `${this.apiUrl}/employe/${id}`;
    return this.http.get<Employe>(url)
  }
  updateTechnicien(id: number, technicien: Technicien) {
    const url = `http://localhost:8081/api/api/technicien/${id}`;
    return this.http.put<any>(url, technicien);
  }
  findTechnicienById(id : number): Observable<Technicien> {
    const url = `http://localhost:8081/api/api/technicien/${id}`;
    return this.http.get<Technicien>(url)
  }

  findResponsableById(id: number): Observable<Responsable> {
    const url = `http://localhost:8081/api/responsable/${id}`;
    return this.http.get<Responsable>(url);
  }
  updateResponsableDetails(id: number, responsable: Responsable) {
    const url = `http://localhost:8081/api//updateDetails/${id}`;
    return this.http.put(url, responsable);
  }

  userDetails(): any {
    const token = localStorage.getItem('myToken');
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Erreur lors du décodage du token', e);
      return null;
    }
  }


  getInterventionByEmployeId(id: number): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.apiUrl + `/api/interventions/employe/${id}`);
  }
addIntervention(interventionDTO: any): Observable<any> {
  return this.http.post<any>("http://localhost:8081/api/api/interventions/create", interventionDTO);
}


getUtilisateurConnecte(): any {
  return JSON.parse(localStorage.getItem('utilisateur') || 'null');
}
getInterventionByTechnicienId(id: number): Observable<Intervention[]> {
  return this.http.get<Intervention[]>(this.apiUrl + `/api/interventions/technicien/${id}`);
}
getAllIntervention(): Observable<Intervention[]> {
  return this.http.get<Intervention[]>(this.apiUrl + "/api/interventions/all");
}



updateIntervention(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/api/interventions/${id}`, data);
}

addMessage(message: Message): Observable<Message> {
  return this.http.post<Message>(this.apiUrl+"/message", message);
}
traiterIntervention(id: number, traitementDTO: any) {
  return this.http.put<any>(`http://localhost:8081/api/api/interventions/traiter/${id}`, traitementDTO);
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

getAlertes(): Observable<Alerte[]> {
  return this.http.get<Alerte[]>(`${this.apiUrl}/alertes`);
}

marquerAlerteCommeVue(id: number): Observable<Alerte> {
  return this.http.post<Alerte>(`${this.apiUrl}/alertes/${id}/vue`, {});
}



}