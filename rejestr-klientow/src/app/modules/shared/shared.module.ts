import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { PhoneControlComponent } from './controls/phone-control/phone-control.component';
// import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';

@NgModule({
  declarations: [
    AlertComponent,
    PhoneControlComponent,
    // HighlightDirective,
    UnlessDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    PhoneControlComponent,
    // HighlightDirective,
    UnlessDirective,
  ],
})
export class SharedModule {}
