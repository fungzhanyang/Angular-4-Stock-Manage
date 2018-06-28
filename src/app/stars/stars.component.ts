import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  rating: number;

  @Output()
  ratingChange:EventEmitter<number> = new EventEmitter();

  stars: boolean[];

  @Input()
  readonly: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }

  }

  clickStar(index:number){
    if (!this.readonly){
      this.rating = index + 1;

      this.stars = [];
      for (let i = 1; i <= 5; i++) {
        this.stars.push(i > this.rating);
      }

      this.ratingChange.emit(this.rating);
    }

  }

}
