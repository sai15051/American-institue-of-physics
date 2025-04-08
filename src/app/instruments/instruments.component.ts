import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstrumentService } from '../services/instrument.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent {
  toppings = new FormControl();
  toppingList: string[] = ['wan Cheng', 'Bret lee', 'xin ping', 'lee chen'];
  instrumentForm!: FormGroup;
  instrumentId!: string
  id!: string
  selectedInstrument: string = '';
  instrumentName: string = '';
  showCorrectionInfo: boolean = false;
  selectedInstrumentToDelete: string | null = null;
  activeIndex: number = 0;
  selectedInstrumentCorrect: string | null = null;
  selectedRadio: string = '';
  instdata = {}

  constructor(private instrumentService: InstrumentService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.instrumentForm = new FormGroup({
      instrumentName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      // contributorName: new FormControl('', Validators.required), 
      facilityName: new FormControl('', Validators.required),
      facilityFunding: new FormControl('', Validators.required)
    });
    this.instrumentService.getInstruments().subscribe(instruments => {
      this.instrumentService.instruments = instruments;
      this.resetRadioButtons();
    });

    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.instrumentName = params.get('name') || '';
          return this.instrumentService.getInstrumentByName(this.instrumentName);
        })
      )
      .subscribe((instrument) => {
        if (instrument) {
          this.patchFormValues(instrument);
        }
      });
    this.resetRadioButtons();
  }
  patchFormValues(instrument: any) {
    this.instrumentForm.patchValue({
      instrumentName: instrument.instrumentName,
      facilityName: instrument.facilityName,
      facilityFunding: instrument.facilityFunding,
    });
    this.toppings.setValue(instrument.contributors);
    this.resetRadioButtons();
  }


  onSubmit() {
    if (this.instrumentForm.valid) {
      const instrumentData = {
        instrumentName: this.instrumentForm.value.instrumentName,
        contributors: this.toppings.value,
        facilityName: this.instrumentForm.value.facilityName,
        facilityFunding: this.instrumentForm.value.facilityFunding
      };
      this.instdata = instrumentData;
      if (this.selectedInstrumentToDelete) {
        this.instrumentService.deleteInstrument(this.selectedInstrumentToDelete);
        this.selectedInstrumentToDelete = null;
        this.navigateNext()
      }


      if (this.instrumentName && this.selectedRadio === 'No') {

        this.instrumentService.updateInstrument(this.instrumentName, instrumentData);
        this.instrumentService.setUpdatedInstrument(instrumentData.instrumentName);

        console.log('Updated instrument:', instrumentData);
        this.showCorrectionInfo = false;
        this.navigateNext()
      } else if (!this.instrumentName) {
        this.instrumentService.addInstrument(instrumentData);
        this.instrumentForm.reset();
        console.log('Submitted instrument:', instrumentData);
        this.navigateNext();
      }
      this.navigateNext()
    }
    this.resetRadioButtons();
  }

  loadInstrumentDetails(instrumentName: string) {
    this.instrumentService.getInstrumentByName(instrumentName).subscribe((instrument) => {
      if (instrument) {
        this.instrumentForm.patchValue({
          instrumentName: instrument.instrumentName,
          facilityName: instrument.facilityName,
          facilityFunding: instrument.facilityFunding,
        });
        this.toppings.setValue(instrument.contributors);
      }
    });

  }
  closeCorrectionInfo() {
    this.showCorrectionInfo = false;
  }
  onRadioChange(value: string) {
    if (value === 'No') {
      this.selectedRadio = 'No'
    }
    if (value == 'Yes') {
      this.selectedRadio = 'Yes'
    }
    if (value === 'Delete') {

      this.selectedRadio = 'Delete'
      this.onInstrumentSelectForDeletion(this.instrumentForm.value.instrumentName);
    }
    else {
      this.showCorrectionInfo = value === 'No';
    }

  }
  // deleteInstrument() {
  //   if (this.instrumentForm.value.instrumentName) {
  //     this.instrumentService.deleteInstrument(this.instrumentName);
  //     console.log('Deleted instrument:', this.instrumentName);
  //   }
  // }
  onInstrumentSelectForDeletion(instrumentName: string): void {
    this.selectedInstrumentToDelete = instrumentName;
  }
  resetRadioButtons() {
    const radioButtons = document.getElementsByName('instrumentCorrect') as NodeListOf<HTMLInputElement>;
    radioButtons.forEach(button => button.checked = false);
  }
  navigateNext() {



    const currentIndex = this.instrumentService.instruments.findIndex(inst => inst.instrumentName === this.instrumentForm.value.instrumentName);


    if (currentIndex !== -1 && currentIndex < this.instrumentService.instruments.length - 1) {
      const nextInstrument = this.instrumentService.instruments[currentIndex + 1];


      this.router.navigate(['/instruments', nextInstrument.instrumentName]);
    }
    this.resetRadioButtons();
  }


  navigatePrevious() {

    const currentIndex = this.instrumentService.instruments.findIndex(inst => inst.instrumentName === this.instrumentForm.value.instrumentName);


    if (currentIndex > 0) {
      const previousInstrument = this.instrumentService.instruments[currentIndex - 1];


      this.router.navigate(['/instruments', previousInstrument.instrumentName]);

    }
    this.resetRadioButtons();
  }







}  
