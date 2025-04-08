import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { TodoItemComponent } from './MyComponents/todo-item/todo-item.component';
import { AddTodoComponent } from './MyComponents/add-todo/add-todo.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { InstrumentSummaryComponent } from './instruments/instrument-summary/instrument-summary.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialSummaryComponent } from './materials/material-summary/material-summary.component';
import { MaterialService } from './services/material.service';
import { TechniquesComponent } from './techniques/techniques.component';
import { TechniqueSummaryComponent } from './techniques/technique-summary/technique-summary.component';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoComponent,
    InstrumentsComponent,
    TodoCompComponent,
    InstrumentSummaryComponent,
    MaterialsComponent,
    MaterialSummaryComponent,
    TechniquesComponent,
    TechniqueSummaryComponent,
    ArticleInfoComponent,
    AboutComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule ,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [MaterialService],
  bootstrap: [AppComponent],
  
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
