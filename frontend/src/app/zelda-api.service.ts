import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {API_URL} from './env';



@Injectable()
export class EndpointApiService {

  constructor(private http: HttpClient) {
  }

  // posting behaviors and times
  getNewLevel(sessionID: string, experiment: string): Observable<any> {
    return this.http.post(`${API_URL}/level`, {
                "session_id": sessionID,
                "experiment": experiment
                }).pipe(
                      map(data => {
                          return data
                      }),
                      catchError(error => {
                        // TODO: define a default level here.
                          return Observable.throw(`Something went wrong: ${error}`);
                      })
                  )
  }

  saveTrial(sessionID: string, experiment: string, level: Array<Array<string>>, behavior: Array<number>, time: number, won: boolean): Observable<any> {
    return this.http.post(`${API_URL}/trials`, {
      "session_id": sessionID,
      "exp_name": experiment,
      "level": level,
      "behavior": behavior,
      "time": time,
      "won": won 
      }).pipe(
        map(data => {
            return data
        }),
        catchError(error => {
          // TODO: define a default level here.
            return Observable.throw(`Something went wrong: ${error}`);
        })
    )
  }

  savePlaytrace(sessionID: string, experiment: string,  levels: Array<Array<Array<string>>>, actions: Array<string>): Observable<any> {
    return this.http.post(`${API_URL}/playtraces`, {
      "session_id": sessionID,
      "experiment": experiment,
      "levels": levels,
      "actions": actions
      }).pipe(
        map(data => {
            return data
        }),
        catchError(error => {
          // TODO: define a default level here.
            return Observable.throw(`Something went wrong: ${error}`);
        })
    )
  }
}