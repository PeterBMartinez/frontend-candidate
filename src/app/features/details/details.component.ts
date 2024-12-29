import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public urlIdParam: string | null = null;
  public loading = true;
  public errorMessage: string | null = null;
  constructor(public userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.urlIdParam = this.route.snapshot.paramMap.get('id');
    if (this.urlIdParam) {
      this.userService.getDetailsById(this.urlIdParam).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while loading user details.';
          if (error?.error?.error) {
            this.errorMessage = error.error.error;
            this.loading = false;
          }
        }
      });
    }
  }

}
