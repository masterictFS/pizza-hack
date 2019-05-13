import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  @Input() errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (!this.errorMessage) {
        this.errorMessage = data['message'];
      }
    });
  }

}
