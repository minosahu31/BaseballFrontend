import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get(`${environment.apiEndPoint}get_players`)
    .pipe(
      map ((response) => {
        return response['players'];
      })
    );
}


}

