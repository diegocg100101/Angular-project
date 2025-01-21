import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from "./formulario/formulario.component";
import { MapaComponent } from './mapa/mapa.component';

@Component({
  selector: 'app-root',
  imports: [FormularioComponent, MapaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
