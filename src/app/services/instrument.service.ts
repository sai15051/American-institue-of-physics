import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  instruments: any[] = [];
  private instrumentsSource = new BehaviorSubject<any[]>([]);
  instruments$ = this.instrumentsSource.asObservable();
  private instrumentsSubject = new BehaviorSubject<any[]>([]);
  private updatedInstrumentSource = new BehaviorSubject<string | null>(null);
  private updatedInstrumentsSource = new BehaviorSubject<Set<string>>(new Set());
  private deletedInstrumentsSource = new BehaviorSubject<Set<string>>(new Set());
  deletedInstruments$ = this.deletedInstrumentsSource.asObservable();

  
  updatedInstrument$ = this.updatedInstrumentSource.asObservable();
  updatedInstruments$ = this.updatedInstrumentsSource.asObservable();
  
  setUpdatedInstrument(instrumentName: string) {
    this.updatedInstrumentSource.next(instrumentName);
    
  }

  
  addInstrument(instrument: any) {
    this.instruments.push(instrument);
    const currentInstruments = this.instrumentsSource.getValue();
    this.instrumentsSource.next([...currentInstruments, instrument]);
    this.instrumentsSubject.next(this.instruments);
  }

 
  getInstruments():Observable<any[]> {
    return this.instrumentsSubject.asObservable();
  }
  getInstrumentById(id: string): Observable<any> {
    const instrument = this.instruments.find(inst => inst.id === id);
    return new BehaviorSubject(instrument).asObservable();
  }
  getInstrumentByName(name: string): Observable<any> {
    const instrument = this.instruments.find(inst => inst.instrumentName === name);
    return new BehaviorSubject(instrument).asObservable();
  }
  updateInstrument(name: string, updatedInstrument: any): void {
    const instrument = this.instruments.find(inst => inst.instrumentName === name);
    if (instrument) {
     
      Object.assign(instrument, updatedInstrument);
      this.instrumentsSource.next(this.instruments); 
      this.instrumentsSubject.next(this.instruments);

      const updatedInstruments = this.updatedInstrumentsSource.getValue();
      updatedInstruments.add(updatedInstrument.instrumentName);
      this.updatedInstrumentsSource.next(updatedInstruments);
    } else {
      console.error('Instrument not found with name:', name);
    }
  }
  deleteInstrument(name: string): void {

      // this.instruments = this.instruments.filter(instrument => instrument.instrumentName !== name);
      // this.instrumentsSource.next(this.instruments); 
      
    
      const deletedInstruments = this.deletedInstrumentsSource.getValue();
      deletedInstruments.add(name);
      this.deletedInstrumentsSource.next(deletedInstruments); 
      
      console.log('Instrument deleted:', name);
    
  }
  
  

  constructor() { }
}
