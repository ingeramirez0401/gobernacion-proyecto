import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '@app/_services';
import { first } from 'rxjs/operators';

declare var $: any;
declare var Chart: any;
@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.less']
})
export class ProjectViewComponent implements OnInit {
  id: string;
  projectData: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id != null) {
      this.getProjectData();
    }
  }

  getProjectData() {
    this.projectService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
        console.log(x);
        if(x.fechaSuscripcion != null) {
            x.fechaSuscripcion = x.fechaSuscripcion.split('T')[0];
        }
        if(x.fechaInicio != null) {
            x.fechaInicio = x.fechaInicio.split('T')[0];
        }
        if(x.fechaTerminacionPrevista != null) {
            x.fechaTerminacionPrevista = x.fechaTerminacionPrevista.split('T')[0];
        }
        if(x.fechaFinalizacionEstimada != null) {
            x.fechaFinalizacionEstimada = x.fechaFinalizacionEstimada.split('T')[0];
        }
        if(x.fechaEstado != null) {
            x.fechaEstado = x.fechaEstado.split('T')[0];
        }
        if(x.updated != null) {
          x.updated = x.updated.split('T')[0];
      }

        this.projectData = x;
        setTimeout(() => {
          this.circleFuncFisico(this.projectData.porcentajeAvanceFisico);
          this.circleFuncFinanciero(this.projectData.porcentajeAvanceFinanciero);
        }, 100);
        console.log(this.projectData);
      });
  }

  print() {
    setTimeout(() => {
      $('.demo').printThis({
        debug: false,
        importCss: true,
        importStyle: true,
        canvas: true,
        pageTitle: this.projectData.bpin
      });
    }, 500);
  }

  goToList() {
    this.router.navigate(['/proyectos','list']);
  }

  circleFuncFisico(perc: number) {
    let number = document.getElementById('number1');
    let counter = 0;
    setInterval(() => {
      if (counter == perc) {
        clearInterval();
      } else {
        counter += 1;
        number.innerHTML = "<span style='font-size: 28px !important; font-weight: bold;'>" + counter + "%</span>";
      }
    }, 20);
  }

  circleFuncFinanciero(perc: number) {
    let number = document.getElementById('number2');
    let counter = 0;
    setInterval(() => {
      if (counter == perc) {
        clearInterval();
      } else {
        counter += 1;
        number.innerHTML = "<span style='font-size: 28px !important; font-weight: bold;'>" + counter + "%</span>";
      }
    }, 20);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
