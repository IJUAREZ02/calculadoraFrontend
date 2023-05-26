import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CalculadoraservicioService } from 'src/app/servicios/calculadoraservicio.service';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  columnas: string[] = ['anio', 'saldoInicial', 'aportacion', 'rendimiento', 'saldoFinal'];
  //columnas: string[] = ['codigo', 'descripcion', 'precio'];
  datos: Articulo[] = [];
  dataSource:any;
  
  gananciaInversion: any;

  mostrarTabla: boolean = true;
  montoFinal: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datosCalculadora: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private services: CalculadoraservicioService) { 
      this.datosCalculadora =this.formBuilder.group({
        inversionInicial: ['', [Validators.required, this.inversionIni]],
        aportacionAnual: ['0'],
        porcentajeIncrementoAnual:  ['0'],
        aniosInversion:  ['', [Validators.required, this.validAnios]],
        rendimientoInversion: ['', [Validators.required, this.validRendimiento]] 
    
      });
    }
  ngOnInit(): void {
    
  }




  get formulario() {
    return this.datosCalculadora.controls;
  }

  submit(data:any) {
    this.mostrarTabla = false;
    console.log(this.datosCalculadora.value);
    this.getData(data);
  }

  validarNumeros(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  inversionIni(control: AbstractControl): ValidationErrors | null {

    const inversionInicial = control.value;
    
    if(inversionInicial < 1000) {
      return {invalidInversionInicial: true};
    }

    return null;
  }

  validAnios(control: AbstractControl): ValidationErrors | null {

    const aniosInversion = control.value;
    if(aniosInversion  === '0') {
      return {invalidAniosInversion: true};
    }

    return null;
  }

  validRendimiento(control: AbstractControl): ValidationErrors | null {

    const rendimientoInversion = control.value;
   
    if(rendimientoInversion  === '0') {
      return {invalidRendimientoInversion: true};
    }

    return null;
  }

  getData(param: any): void {
    this.services.getResultadoCalculadora(param).toPromise()
    .then((res) => {

      let x = res['inversion'];
      console.log(x);
      this.dataSource = new MatTableDataSource<any>(res['inversion']);
      this.dataSource.paginator = this.paginator;

      this.gananciaInversion = res['resumen'][0]['gananciaInversion'];
      this.montoFinal =  res['resumen'][0]['montoFinal'];
      
    })
    .catch((error) => {
      console.log(error);
      
    });
  }
}


export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}