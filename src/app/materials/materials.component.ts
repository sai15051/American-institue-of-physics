import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../services/material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {


  materialForm!: FormGroup;
  materialId!: string;
  id!: string;
  selectedMaterial: string = '';
  materialName: string = '';
  showCorrectionInfo: boolean = false;
  selectedMaterialToDelete: string | null = null;
  activeIndex: number = 0;
  selectedMaterialCorrect: string | null = null;
  selectedRadio: string = '';
  materialData = {};

  constructor(private materialService: MaterialService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.materialForm = new FormGroup({
      materialName: new FormControl('', [
        Validators.required, 
        Validators.minLength(4)
      ]),
      materialsource: new FormControl('', Validators.required),
      
    });

    this.materialService.getMaterials().subscribe(materials => {
      this.materialService.materials = materials;
      this.resetRadioButtons();
    });

    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.materialName = params.get('name') || '';
          return this.materialService.getMaterialByName(this.materialName);
        })
      )
      .subscribe((material) => {
        if (material) {
          this.patchFormValues(material);
        }
      });
    this.resetRadioButtons();
  }

  patchFormValues(material: any) {
    this.materialForm.patchValue({
      materialName: material.materialName,
      materialsource: material.materialsource,

    });
    this.resetRadioButtons();
  }

  onSubmit() {
    if (this.materialForm.valid) {
      const materialData = {
        materialName: this.materialForm.value.materialName,
        materialsource: this.materialForm.value.materialsource,
    
      };
      this.materialData = materialData;

      if (this.selectedMaterialToDelete) {
        this.materialService.deleteMaterial(this.selectedMaterialToDelete);
        this.selectedMaterialToDelete = null;
        this.navigateNext();
      }

      if (this.materialName && this.selectedRadio === 'No') {
        this.materialService.updateMaterial(this.materialName, materialData);
        this.materialService.setUpdatedMaterial(materialData.materialName);

        console.log('Updated material:', materialData);
        this.showCorrectionInfo = false;
        this.navigateNext();
      } else if (!this.materialName) {
        this.materialService.addMaterial(materialData);
        this.materialForm.reset();
        console.log('Submitted material:', materialData);
        this.navigateNext();
      }

      this.navigateNext();
    }
    this.resetRadioButtons();
  }

  loadMaterialDetails(materialName: string) {
    this.materialService.getMaterialByName(materialName).subscribe((material) => {
      if (material) {
        this.materialForm.patchValue({
          materialName: material.materialName,
          materialsource: material.materialsource,
      
        });
    
      }
    });
  }

  closeCorrectionInfo() {
    this.showCorrectionInfo = false;
  }

  onRadioChange(value: string) {
    if (value === 'No') {
      this.selectedRadio = 'No';
    }
    if (value === 'Yes') {
      this.selectedRadio = 'Yes';
    }
    if (value === 'Delete') {
      this.selectedRadio = 'Delete';
      this.onMaterialSelectForDeletion(this.materialForm.value.materialName);
    } else {
      this.showCorrectionInfo = value === 'No';
    }
  }

  onMaterialSelectForDeletion(materialName: string): void {
    this.selectedMaterialToDelete = materialName;
  }

  resetRadioButtons() {
    const radioButtons = document.getElementsByName('materialCorrect') as NodeListOf<HTMLInputElement>;
    radioButtons.forEach(button => button.checked = false);
  }

  navigateNext() {
    const currentIndex = this.materialService.materials.findIndex(mat => mat.materialName === this.materialForm.value.materialName);
    if (currentIndex !== -1 && currentIndex < this.materialService.materials.length - 1) {
      const nextMaterial = this.materialService.materials[currentIndex + 1];
      this.router.navigate(['/materials', nextMaterial.materialName]);
    }
    this.resetRadioButtons();
  }

  navigatePrevious() {
    const currentIndex = this.materialService.materials.findIndex(mat => mat.materialName === this.materialForm.value.materialName);
    if (currentIndex > 0) {
      const previousMaterial = this.materialService.materials[currentIndex - 1];
      this.router.navigate(['/materials', previousMaterial.materialName]);
    }
    this.resetRadioButtons();
  }
}
