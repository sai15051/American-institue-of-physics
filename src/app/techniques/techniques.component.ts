import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TechniqueService } from '../services/technique.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-techniques',
  templateUrl: './techniques.component.html',
  styleUrls: ['./techniques.component.css']
})
export class TechniquesComponent {

  techniqueForm!: FormGroup;
  techniqueId!: string;
  selectedTechnique: string = '';
  techniqueName: string = '';
  showCorrectionInfo: boolean = false;
  selectedTechniqueToDelete: string | null = null;
  activeIndex: number = 0;
  selectedTechniqueCorrect: string | null = null;
  selectedRadio: string = '';
  techniqueData = {};

  constructor(private techniqueService: TechniqueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.techniqueForm = new FormGroup({
      techniqueName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
    });

    this.techniqueService.getTechniques().subscribe(techniques => {
      this.techniqueService.techniques = techniques;
      this.resetRadioButtons();
    });

    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.techniqueName = params.get('name') || '';
          return this.techniqueService.getTechniqueByName(this.techniqueName);
        })
      )
      .subscribe((technique) => {
        if (technique) {
          this.patchFormValues(technique);
        }
      });
    this.resetRadioButtons();
  }

  patchFormValues(technique: any) {
    this.techniqueForm.patchValue({
      techniqueName: technique.techniqueName,
    });
    this.resetRadioButtons();
  }

  onSubmit() {
    if (this.techniqueForm.valid) {
      const techniqueData = {
        techniqueName: this.techniqueForm.value.techniqueName,
      };
      this.techniqueData = techniqueData;

      if (this.selectedTechniqueToDelete) {
        this.techniqueService.deleteTechnique(this.selectedTechniqueToDelete);
        this.selectedTechniqueToDelete = null;
        this.navigateNext();
      }

      if (this.techniqueName && this.selectedRadio === 'No') {
        this.techniqueService.updateTechnique(this.techniqueName, techniqueData);
        this.techniqueService.setUpdatedTechnique(techniqueData.techniqueName);
        console.log('Updated technique:', techniqueData);
        this.showCorrectionInfo = false;
        this.navigateNext();
      } else if (!this.techniqueName) {
        this.techniqueService.addTechnique(techniqueData);
        this.techniqueForm.reset();
        console.log('Submitted technique:', techniqueData);
        this.navigateNext();
      }

      this.navigateNext();
    }
    this.resetRadioButtons();
  }

  loadTechniqueDetails(techniqueName: string) {
    this.techniqueService.getTechniqueByName(techniqueName).subscribe((technique) => {
      if (technique) {
        this.techniqueForm.patchValue({
          techniqueName: technique.techniqueName,
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
      this.onTechniqueSelectForDeletion(this.techniqueForm.value.techniqueName);
    } else {
      this.showCorrectionInfo = value === 'No';
    }
  }

  onTechniqueSelectForDeletion(techniqueName: string): void {
    this.selectedTechniqueToDelete = techniqueName;
  }

  resetRadioButtons() {
    const radioButtons = document.getElementsByName('techniqueCorrect') as NodeListOf<HTMLInputElement>;
    radioButtons.forEach(button => button.checked = false);
  }

  navigateNext() {
    const currentIndex = this.techniqueService.techniques.findIndex(tech => tech.techniqueName === this.techniqueForm.value.techniqueName);
    if (currentIndex !== -1 && currentIndex < this.techniqueService.techniques.length - 1) {
      const nextTechnique = this.techniqueService.techniques[currentIndex + 1];
      this.router.navigate(['/techniques', nextTechnique.techniqueName]);
    }
    this.resetRadioButtons();
  }

  navigatePrevious() {
    const currentIndex = this.techniqueService.techniques.findIndex(tech => tech.techniqueName === this.techniqueForm.value.techniqueName);
    if (currentIndex > 0) {
      const previousTechnique = this.techniqueService.techniques[currentIndex - 1];
      this.router.navigate(['/techniques', previousTechnique.techniqueName]);
    }
    this.resetRadioButtons();
  }
}
