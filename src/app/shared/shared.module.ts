import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPreviewButtonComponent } from './components/person-preview-button/person-preview-button.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { QuoteComponent } from './components/quote/quote.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
    declarations: [
    PersonPreviewButtonComponent,
    QuoteComponent,
    ErrorAlertComponent
    ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [
    PersonPreviewButtonComponent,
    QuoteComponent,
    ErrorAlertComponent
  ]
})
export class SharedModule { }