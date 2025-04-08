import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css']
})
export class ArticleInfoComponent {
  isArticleInfoCorrect: boolean | null = null; 
  name: string = '';
  email: string = '';

  
  toggleFields(): void {
   
  }
}
