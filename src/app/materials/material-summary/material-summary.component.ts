import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-summary',
  templateUrl: './material-summary.component.html',
  styleUrls: ['./material-summary.component.css']
})
export class MaterialSummaryComponent {
  dataSource: any[] = [];
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router, private materialService: MaterialService) {

  }
  ngOnInit() {
    
    this.materialService.materials$.subscribe(materials => {
      this.dataSource = materials.map((material, index) => ({
        id: index + 1,
        ...material
      }));
    });
  }


  displayedColumns: string[] = ['id',
    'materialname',
    'materialsource',
    'action'];

  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openEditForm(_t75: any) {
    throw new Error('Method not implemented.');
  }

  openAddEditEmpForm() {
    this.router.navigate(['/materials']);
  }

}
