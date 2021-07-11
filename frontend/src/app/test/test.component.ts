import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div class="ml-4">

      <div *ngFor="let color of colors; even as e">

        <h2 [style.color]="color">
          {{e}} This is {{color}}
        </h2>

      </div>

    </div>
    
  `,
  styles: [`

  `]
})
export class TestComponent implements OnInit {

  colors = ['red', 'green', 'blue', 'orange']

  constructor() { }

  ngOnInit() {
  }

}
