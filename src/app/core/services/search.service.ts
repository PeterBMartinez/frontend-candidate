import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { User } from '../../shared/models/user.model';
import { SearchResults } from 'src/app/shared/models/search-results.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseHttpService {
    public matches$: Observable<User[]>;
    public term$: Observable<string>;
    public color$: Observable<string>;
    private matchesBS = new BehaviorSubject<User[]>([]);
    private termBS = new BehaviorSubject<string>('');
    private colorBS = new BehaviorSubject<string>('');

  constructor(http: HttpClient) {
    super(http);
    this.matches$ = this.matchesBS.asObservable();
    this.term$ = this.termBS.asObservable();    
    this.color$ = this.colorBS.asObservable();
  }

  public searchForUsers(): Observable<User[]> {
    const url = this.generateUrlForSearchResults({term: this.termBS.value, color: this.colorBS.value});
    return this.get<SearchResults>(url).pipe(
      tap((results: SearchResults) => {
        this.setMatches(results.matches);
      }),
      map((results: SearchResults) => results.matches)
    );
  }

  private generateUrlForSearchResults({term, color}:{term?: string, color?: string}): string {
    let url = 'http://localhost:5555/search';
    if (!term && !color) {
      return url;
    }
    if (!term) {
      return url + `?color=${color}`;
    }
    if (!color) {
      return url + `?term=${term}`;
    }

    return url + `?term=${term}&color=${color}`;
  }

  public setTerm(term: string): void {
    this.termBS.next(term);
  }

  public setColor(color: string): void {
    this.colorBS.next(color);
  }

  public setMatches(users: User[]): void {
    this.matchesBS.next(users);
  }

  public clearMatches(): void {
    this.matchesBS.next([]);
  }
}