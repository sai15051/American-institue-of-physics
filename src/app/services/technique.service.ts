import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechniqueService {
  techniques: any[] = [];
  private techniquesSource = new BehaviorSubject<any[]>([]);
  techniques$ = this.techniquesSource.asObservable();
  private techniquesSubject = new BehaviorSubject<any[]>([]);
  private updatedTechniqueSource = new BehaviorSubject<string | null>(null);
  private updatedTechniquesSource = new BehaviorSubject<Set<string>>(new Set());
  private deletedTechniquesSource = new BehaviorSubject<Set<string>>(new Set());
  deletedTechniques$ = this.deletedTechniquesSource.asObservable();

 
  updatedTechnique$ = this.updatedTechniqueSource.asObservable();
  updatedTechniques$ = this.updatedTechniquesSource.asObservable();

 
  setUpdatedTechnique(techniqueName: string) {
    this.updatedTechniqueSource.next(techniqueName);
  }

  addTechnique(technique: any) {
    this.techniques.push(technique);
    const currentTechniques = this.techniquesSource.getValue();
    this.techniquesSource.next([...currentTechniques, technique]);
    this.techniquesSubject.next(this.techniques);
  }

 
  getTechniques(): Observable<any[]> {
    return this.techniquesSubject.asObservable();
  }

 
  getTechniqueById(id: string): Observable<any> {
    const technique = this.techniques.find(tech => tech.id === id);
    return new BehaviorSubject(technique).asObservable();
  }


  getTechniqueByName(name: string): Observable<any> {
    const technique = this.techniques.find(tech => tech.techniqueName === name);
    return new BehaviorSubject(technique).asObservable();
  }

  
  updateTechnique(name: string, updatedTechnique: any): void {
    const technique = this.techniques.find(tech => tech.techniqueName === name);
    if (technique) {
      Object.assign(technique, updatedTechnique);
      this.techniquesSource.next(this.techniques);
      this.techniquesSubject.next(this.techniques);

      const updatedTechniques = this.updatedTechniquesSource.getValue();
      updatedTechniques.add(updatedTechnique.techniqueName);
      this.updatedTechniquesSource.next(updatedTechniques);
    } else {
      console.error('Technique not found with name:', name);
    }
  }


  deleteTechnique(name: string): void {
    const deletedTechniques = this.deletedTechniquesSource.getValue();
    deletedTechniques.add(name);
    this.deletedTechniquesSource.next(deletedTechniques);

    console.log('Technique deleted:', name);
  }

  constructor() {}
}
