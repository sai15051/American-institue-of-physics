import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './instruments/instruments.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import { InstrumentSummaryComponent } from './instruments/instrument-summary/instrument-summary.component';
import { MaterialSummaryComponent } from './materials/material-summary/material-summary.component';
import { MaterialsComponent } from './materials/materials.component';
import { TechniquesComponent } from './techniques/techniques.component';
import { TechniqueSummaryComponent } from './techniques/technique-summary/technique-summary.component';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: 'instruments', component: InstrumentsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'about', component: AboutComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'techniques', component: TechniquesComponent },
  { path: 'article-info', component: ArticleInfoComponent },
  
  { path: 'instruments/:name', component: InstrumentsComponent },
  { path: 'materials/:name', component: MaterialsComponent },
  { path: 'techniques/:name', component: TechniquesComponent },
  { path: 'instruments/:id', component: InstrumentsComponent }, 
  { path: 'todo', component: TodoCompComponent },
  { path: 'instruments-summary', component: InstrumentSummaryComponent },
  { path: 'technique-summary', component: TechniqueSummaryComponent },
  { path: 'material-summary', component: MaterialSummaryComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },  
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
