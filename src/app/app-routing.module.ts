import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalculadoraComponent } from './features/calculadora/calculadora.component';


const routes: Routes = [ 
    {
        path: 'calculadora',
        pathMatch: 'full',
        component: CalculadoraComponent
    }
    
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  