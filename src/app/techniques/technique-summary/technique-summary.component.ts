import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TechniqueService } from 'src/app/services/technique.service';

@Component({
  selector: 'app-technique-summary',
  templateUrl: './technique-summary.component.html',
  styleUrls: ['./technique-summary.component.css']
})
export class TechniqueSummaryComponent {
  dataSource: any[] = [];
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router,private techniqueService:TechniqueService) {

  }
  ngOnInit() {
    // Subscribe to the materialService to get the materials list
    this.techniqueService.techniques$.subscribe(techniques => {
      this.dataSource = techniques.map((technique, index) => ({
        id: index + 1,
        ...technique
      }));
    });
  }


  displayedColumns: string[] = ['id',
    'techniquename',
    'action'];

  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openEditForm(_t75: any) {
    throw new Error('Method not implemented.');
  }

  openAddEditEmpForm() {
    this.router.navigate(['/techniques']);
  }

}
