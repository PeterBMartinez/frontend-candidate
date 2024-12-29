import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(private http: HttpClient) {}

  private getHeaderOptions(type: string): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': type,
      })
    };
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, this.getHeaderOptions('application/json')).pipe(
      catchError(error => {
        console.error('GET request error:', error);
        return throwError(() => error);
      })
    );
  }

  public put<T>(url: string, obj: any): Observable<T> {
    return this.http.put<T>(url, obj, this.getHeaderOptions('application/json')).pipe(
      catchError(error => {
        console.error('PUT request error:', error);
        return throwError(() => error);
      })
    );
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, this.getHeaderOptions('application/json')).pipe(
      catchError(error => {
        console.error('DELETE request error:', error);
        return throwError(() => error);
      })
    );
  }
}