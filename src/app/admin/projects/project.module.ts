import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectAddEditComponent } from './project-add-edit.component';
import { MapsComponent } from '@app/_components';

import { NgxCurrencyModule } from "ngx-currency";
import { PowerbiComponent } from './powerbi/powerbi.component';
import { ProjectViewComponent } from './project-view/project-view.component';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    ProjectListComponent,
    ProjectAddEditComponent,
    MapsComponent,
    PowerbiComponent,
    ProjectViewComponent
  ]
})
export class ProjectsModule { }
