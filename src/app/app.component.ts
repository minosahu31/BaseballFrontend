import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as moment from 'moment';

am4core.options.commercialLicense = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  data: any = [];
  p: any;
  order: any = 'given_name';
  reverse: any = false;
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const subscription: Subscription =  this.apiService.getData().subscribe((response) => {
      this.data = response;
    }, () => {
       subscription.unsubscribe();
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

}
