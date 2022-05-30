import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, ProjectService, ConfigService, LocalStorageService } from '@app/_services';

declare var $: any;
@Component({
  templateUrl: './project-add-edit.component.html'
})
export class ProjectAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  dependenciaList: any[] = [
    'DESPACHO DEL GOBERNADOR',
    'SECRETARIA GENERAL',
    'TALENTO HUMANO',
    'CONTRATACIÓN',
    'SERVICIOS ADMINISTRATIVOS',
    'ARCHIVO',
    'PQRSD',
    'ALMACEN',
    'PENSIONES',
    'PASAPORTES',
    'PROYECTOS ESPECIALES',
    'PRENSA',
    'SECRETARIA JURIDICA',
    'SECRETARIA DE AGUAS',
    'SECRETARIA DE CULTURA',
    'SECRETARIA DE GOBIERNO',
    'SECRETARIA DE MINAS',
    'SECRETARIA DE LA MUJER',
    'SECRETARIA PRIVADA',
    'SECRETARIA DE VICTIMAS',
    'SECRETARIA DE DESARROLLO SOCIAL',
    'SECRETARIA DESARROLLO ECONOMICO',
    'SECRETARIA DE FRONTERAS',
    'SECRETARIA DE TRANSITO',
    'SECRETARIA DE VIVIENDA',
    'SECRETARIA DE PLANEACION',
    'SECRETARIA DE VIAS',
    'SECRETARIA DE INFRAESTRUCTURA',
    'SECRETARIA DE HACIENDA',
    'SECRETARIA TICS',
    'GESTION DEL RIESGO',
    'SECRETARIA DE EDUCACION',
    'CONTROL INTERNO DISCIPLINARIO',
    'CONTROL INTERNO DE GESTION',
    'SECRETARIA DE DISCAPACIDAD',
    'RENTAS OCAÑA',
    'RENTAS PAMPLONA',
    'ATENCIÓN AL CIUDADANO',
    'TESORERIA',
    'CONTABILIDAD'
  ];

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private projectService: ProjectService,
      private alertService: AlertService,
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;

      this.form = this.formBuilder.group({
        bpin: ['', Validators.required],
        municipio: ['', Validators.required],
        proyecto: ['', Validators.required],
        objeto: [''],
        ideas: [''],
        tipoProyecto: ['', Validators.required],
        valorInicial: [0, Validators.required],
        valorFinal: [0],
        tipoFuente: ['', Validators.required],
        valorFuentesPropias: [0],
        valorFuentesRegalias: [0],
        valorFuentesOtros: [0],
        cofinanciacion: [''],
        secretaria: ['', Validators.required],
        supervisor: ['', Validators.required],
        numContratacion: [''],
        contratista: [''],
        nit: [''],
        fechaSuscripcion: [''],
        tiempoEjecucionMeses: [0],
        fechaInicio: [''],
        fechaTerminacionPrevista: [''],
        numeroAdicionales: [0],
        valorAdicional: [0],
        tiempoAdicionMeses: [0],
        tiempoSuspensionMeses: [0],
        fechaFinalizacionEstimada: ['0'],
        alcanceFisico: ['0'],
        avanceFisico: ['0'],
        porcentajeAvanceFisico: [],
        tiempoAtrasoMeses: [0],
        pagosRealizados: [0],
        porcentajeAvanceFinanciero: [0],
        estadoActual: ['', Validators.required],
        fechaEstado: [''],
        observaciones: [''],
        poblacionBeneficiada: [''],
        impactoGenerado: ['']
      });

      if (!this.isAddMode) {
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
                this.form.patchValue(x);
              });
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
        console.log('Ok');
          return;
      }

      this.loading = true;

      if (this.isAddMode) {
          this.createProject();
      } else {
          this.updateProject();
      }
  }

  private createProject() {
      this.projectService.create(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Proyecto creado exitosamente.', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private updateProject() {
      this.projectService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Proyecto actualizado exitosamente.', { keepAfterRouteChange: true });
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}