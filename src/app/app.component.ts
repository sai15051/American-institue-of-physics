import { Component, Input, ViewChild } from '@angular/core';
import { InstrumentsComponent } from './instruments/instruments.component';
import { InstrumentService } from './services/instrument.service';
import { MaterialService } from './services/material.service';
import { TechniqueService } from './services/technique.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  instruments: any[] = [];
  isSidenavOpen = false;
  instrumentList: string[] = [];
  subMenuOpen: { [key: string]: boolean } = {
    instruments: false,
    material: false,
    techniques: false
  };
  deletedInstruments: Set<string> = new Set();
  updatedInstruments: Set<string> = new Set();
  updatedInstrumentName: string | null = null;

  
  materials: any[] = [];
  materialList: string[] = [];
  deletedMaterials: Set<string> = new Set();
  updatedMaterials: Set<string> = new Set();
  updatedMaterialName: string | null = null;

  techniques: any[] = [];
  updatedTechniqueName: string | null = null;
  updatedTechniques: Set<string> = new Set();
  deletedTechniques: Set<string> = new Set();
  techniqueList: string[] = [];


  @ViewChild(InstrumentsComponent) instrumentFormComponent!: InstrumentsComponent;

  constructor(private instrumentService:InstrumentService,private materialService: MaterialService,private techniqueService: TechniqueService) {}
  ngOnInit() {
    this.instrumentService.getInstruments().subscribe((instruments) => {
      this.instruments = instruments;
    });
    this.instrumentService.updatedInstrument$.subscribe(name => {
      this.updatedInstrumentName = name;
    });
    this.instrumentService.updatedInstruments$.subscribe(updatedInstruments => {
      this.updatedInstruments = updatedInstruments;
    });
    console.log("up"+this.updatedInstruments )
    this.instrumentService.deletedInstruments$.subscribe(deletedInstruments => {
      this.deletedInstruments = deletedInstruments;
    });

   
    this.materialService.getMaterials().subscribe((materials) => {
      this.materials = materials;
    });

    this.materialService.updatedMaterial$.subscribe(name => {
      this.updatedMaterialName = name;
    });

    this.materialService.updatedMaterials$.subscribe(updatedMaterials => {
      this.updatedMaterials = updatedMaterials;
    });

    this.materialService.deletedMaterials$.subscribe(deletedMaterials => {
      this.deletedMaterials = deletedMaterials;
    });


    // Subscribe to the techniques data
    this.techniqueService.getTechniques().subscribe((techniques) => {
      this.techniques = techniques;
    });

    // Subscribe to the updated technique
    this.techniqueService.updatedTechnique$.subscribe(name => {
      this.updatedTechniqueName = name;
    });

    
    this.techniqueService.updatedTechniques$.subscribe(updatedTechniques => {
      this.updatedTechniques = updatedTechniques;
    });

    
    this.techniqueService.deletedTechniques$.subscribe(deletedTechniques => {
      this.deletedTechniques = deletedTechniques;
    });
  }

 
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  // Toggle sub-menu open/close state
  toggleSubMenu(menu: string) {
    this.subMenuOpen[menu] = !this.subMenuOpen[menu];
  }
  onInstrumentAdded(instrumentName: string): void {
    // Add the instrument to the list
    this.instrumentList.push(instrumentName);
  }
  onMaterialAdded(materialName: string): void {
    this.materialList.push(materialName);
  }
  onTechniqueAdded(techniqueName: string): void {
    this.techniqueList.push(techniqueName);
  }
  

  
}
