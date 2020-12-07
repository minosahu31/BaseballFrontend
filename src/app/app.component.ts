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
  page: any = 1;
  count: any = 0;
  propertyName: any = 'avg';
  reverse: any = true;

  getRequestParams(page): any {
    let params = {};
    if (page) {
      params[`page`] = page;
    }
    
    return params;
  }

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const params = this.getRequestParams(this.page);
    const subscription: Subscription =  this.apiService.getData(params).subscribe((response) => {
      this.data = response['players'];
      this.count = response['totalItems'];
    }, () => {
       subscription.unsubscribe();
    });
  }

  handlePageChange(event): void {
    this.page = event;
    this.getData();
  }

  setOrder(value: string) {
    this.reverse = (this.propertyName === value) ? !this.reverse : false;
    // if (this.propertyName === value) {
    //   this.reverse = !this.reverse;
    // }

    this.propertyName = value;
  }

}
