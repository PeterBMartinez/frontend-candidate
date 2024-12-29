import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { User } from '../../shared/models/user.model';
import { Quote } from 'src/app/shared/models/quote.model';
import { UserResponse } from 'src/app/shared/models/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {
  public selectedUser$: Observable<User | null>;

  private selectedUserBS = new BehaviorSubject<User | null>(null);

  constructor(http: HttpClient) {
    super(http);
    this.selectedUser$ = this.selectedUserBS.asObservable();
  }

  public getDetailsById(id: string): Observable<User> {
    return this.get<UserResponse>(`http://localhost:5555/details/${id}`).pipe(
      switchMap((user) => {

        const convertedUser: User = { ...user, quotes: this.convertQuotesToArray(user.quotes) };

        return of(convertedUser);
      }),
      tap((user: User) => {
        this.setSelectedUser(user);
      })
    );
  }

  private convertQuotesToArray(quotes: { [likes: number]: string[] }): Quote[] {
    const sortedKeys = this.getSortedKeys(quotes);
    return this.createQuotesArray(quotes, sortedKeys);
  }

  private getSortedKeys(quotes: { [likes: number]: string[] }): string[] {
    return Object.keys(quotes).sort((a, b) => Number(b) - Number(a));
  }

  private createQuotesArray(quotes: { [likes: number]: string[] }, sortedKeys: string[]): Quote[] {
    const quotesArray: Quote[] = [];
    sortedKeys.forEach((key) => {
      this.sortQuotesByLength(quotes[key]);
      quotes[key].forEach((content) => {
        quotesArray.push({ content, likes: key });
      });
    });
    return quotesArray;
  }

  private sortQuotesByLength(quotes: string[]): void {
    quotes.sort((a, b) => b.length - a.length);
  }

  public setSelectedUser(user: User): void {
    this.selectedUserBS.next(user);
  }

  public clearSelectedUser(): void {
    this.selectedUserBS.next(null);
  }
}