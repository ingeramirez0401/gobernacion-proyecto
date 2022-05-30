import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddEditComponent } from './project-add-edit.component';
import { ProjectListComponent } from './project-list.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: 'add', component: ProjectAddEditComponent },
    { path: 'edit/:id', component: ProjectAddEditComponent },
    { path: 'view/:id', component: ProjectViewComponent },
    { path: 'reporte', component: PowerbiComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }