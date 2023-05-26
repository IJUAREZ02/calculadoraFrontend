import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';


export class Datos { 
  anio?: number;
  saldoInicial?: number;
  aportacion?: number;
  rendimiento?: number;
  saldoFinal?: number;

}


@Injectable({
  providedIn: 'root'
})
export class CalculadoraservicioService {
  public servicio;

  constructor(private httpClient: HttpClient) {
    this.servicio = environment.backendUrl+"/inversion";
  }

  public getResultadoCalculadora(data:any): Observable<any> {
    console.log("xxxxxxxxx", data)
    let url = this.servicio;

    const encabezados = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json;charset=UTF-8')
    let response = this.httpClient.post<any>(url,data, {
      headers: encabezados
    });
    console.log("xxxxxxxx", response);
    
    return response;
  }
  

}
