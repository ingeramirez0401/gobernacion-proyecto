import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ProjectService } from '@app/_services';
import { Project } from '../../_models/project';

declare var $: any;

@Component({
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  table: any;
  tableConfig = {
    language: {
      url: './assets/plugins/Datatables/lang.json',
    },
    dom: 'QBfrtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Imprimir Reporte',
        className: 'excel-option',
      }
    ],
    searchBuilder: {
      columns: [1, 2, 5, 6, 9, 14, 15, 17, 34],
      greyscale: true,
    },
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    if (this.table !== undefined) {
      this.table.destroy();
      this.table = undefined;
    }

      this.projectService.getAll()
          .pipe(first())
          .subscribe((projects) => {
            this.projects = projects
            if (this.table === undefined) {
              setTimeout(() => {
                this.table = $('#table').DataTable(this.tableConfig);
              }, 500);
            }

          });
  }

  deleteProject(id: string) {
      const project = this.projects.find(x => x.id === id);
      project.isDeleting = true;
      this.projectService.delete(id)
          .pipe(first())
          .subscribe(() => {
              this.projects = this.projects.filter(x => x.id !== id) 
          });
  }
}
