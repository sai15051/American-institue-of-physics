import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instrument.service';

@Component({
  selector: 'app-instrument-summary',
  templateUrl: './instrument-summary.component.html',
  styleUrls: ['./instrument-summary.component.css']
})
export class InstrumentSummaryComponent {
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  dataSource: any[] = [];


  constructor(private router: Router, private instrumentService: InstrumentService) { }


  openAddEditEmpForm() {
    this.router.navigate(['/instruments']);
  }
  ngOnInit() {

    this.instrumentService.instruments$.subscribe(instruments => {
      this.dataSource = instruments.map((instrument, index) => ({
        id: index + 1,
        ...instrument
      }));
    });
  }

  displayedColumns: string[] = ['id',
    'instrumentname',
    'contributors',
    'facilityname',
    'facilityfunding',
    'action',];

  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openEditForm(_t75: any) {
    throw new Error('Method not implemented.');
  }


}
