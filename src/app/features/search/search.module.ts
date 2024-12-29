import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorAlertComponent } from "../../shared/components/error-alert/error-alert.component";

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
],
  exports: [SearchComponent],
})
export class SearchModule {}