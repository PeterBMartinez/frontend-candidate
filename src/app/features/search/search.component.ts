import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public userService: UserService, public searchService: SearchService) { }
  public term: string = '';
  public color: string = '';
  public colorOptions: { label: string, value: string | null }[] = [
    { label: 'None', value: '' },
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Green', value: 'Green' }
  ];
  public loading = false;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.searchService.term$.subscribe({
      next: (term) => {
        this.term = term;
      }
    });
  }

  public search(): void {
    this.errorMessage = null;
    this.loading = true;
    this.searchService.searchForUsers().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        this.errorMessage = 'An error occurred while searching for users.';
        if (error?.error?.error) {
          this.errorMessage = error.error.error;
        }

        this.searchService.clearMatches();
      }
    });
  }

  public onTermChange(term: string): void {
    this.searchService.setTerm(term);
  }

  public onColorChange(color: string): void {
    this.searchService.setColor(color);
  }
}
