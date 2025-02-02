import {NgModule} from '@angular/core';
import {SiteLogoDirective} from './directives/site-logo.directive';
import {RbacDirective} from './directives/rbac.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { GenericErrorDialogComponent } from './generic-error-dialog/generic-error-dialog.component';
import {DatepickerComponent} from './datepicker-component/datepicker.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import { CopyToClipboardButtonComponent } from './components/copy-to-clipboard-button/copy-to-clipboard-button.component';
import {MatButtonModule} from '@angular/material/button';
import {SideNavComponent} from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { HideableTextComponent } from './components/hideable-text/hideable-text.component';
import {USAPhoneMaskDirective} from './directives/usa-phone-mask.directive';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import { ReadonlyCheckboxComponent } from './components/readonly-checkbox/readonly-checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    DatepickerComponent,
    GenericErrorDialogComponent,
    USAPhoneMaskDirective,
    RbacDirective,
    SiteLogoDirective,
    CopyToClipboardButtonComponent,
    SideNavComponent,
    HideableTextComponent,
    ReadonlyCheckboxComponent,
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
    MatListModule,
    MatCheckboxModule,
  ],
  exports: [
    BreadcrumbsComponent,
    DatepickerComponent,
    USAPhoneMaskDirective,
    RbacDirective,
    SiteLogoDirective,
    CopyToClipboardButtonComponent,
    SideNavComponent,
    HideableTextComponent,
    ReadonlyCheckboxComponent,
  ]
})
export class SharedModule {

}
