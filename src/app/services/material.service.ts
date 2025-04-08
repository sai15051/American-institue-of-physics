import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export class MaterialService {
  materials: any[] = [];
  private materialsSource = new BehaviorSubject<any[]>([]);
  materials$ = this.materialsSource.asObservable();
  private materialsSubject = new BehaviorSubject<any[]>([]);
  private updatedMaterialSource = new BehaviorSubject<string | null>(null);
  private updatedMaterialsSource = new BehaviorSubject<Set<string>>(new Set());
  private deletedMaterialsSource = new BehaviorSubject<Set<string>>(new Set());
  deletedMaterials$ = this.deletedMaterialsSource.asObservable();

 
  updatedMaterial$ = this.updatedMaterialSource.asObservable();
  updatedMaterials$ = this.updatedMaterialsSource.asObservable();

  
  setUpdatedMaterial(materialName: string) {
    this.updatedMaterialSource.next(materialName);
  }


  addMaterial(material: any) {
    this.materials.push(material);
    const currentMaterials = this.materialsSource.getValue();
    this.materialsSource.next([...currentMaterials, material]);
    this.materialsSubject.next(this.materials);
  }


  getMaterials(): Observable<any[]> {
    return this.materialsSubject.asObservable();
  }

  getMaterialById(id: string): Observable<any> {
    const material = this.materials.find(mat => mat.id === id);
    return new BehaviorSubject(material).asObservable();
  }

  getMaterialByName(name: string): Observable<any> {
    const material = this.materials.find(mat => mat.materialName === name);
    return new BehaviorSubject(material).asObservable();
  }

  updateMaterial(name: string, updatedMaterial: any): void {
    const material = this.materials.find(mat => mat.materialName === name);
    if (material) {
      Object.assign(material, updatedMaterial);
      this.materialsSource.next(this.materials); 
      this.materialsSubject.next(this.materials); 

      const updatedMaterials = this.updatedMaterialsSource.getValue();
      updatedMaterials.add(updatedMaterial.materialName);
      this.updatedMaterialsSource.next(updatedMaterials);
    } else {
      console.error('Material not found with name:', name);
    }
  }

  deleteMaterial(name: string): void {
    const deletedMaterials = this.deletedMaterialsSource.getValue();
    deletedMaterials.add(name);
    this.deletedMaterialsSource.next(deletedMaterials); 

    console.log('Material deleted:', name);
  }

  constructor() {}
}
