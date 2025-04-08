import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  starStatus: boolean[] = [false, false, false, false, false];

  toggleStar(index: number): void {
    this.starStatus[index] = !this.starStatus[index];
  }

}
