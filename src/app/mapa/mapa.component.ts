import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {
  private map: any;
  private usuarios: any[] = [];

  constructor(private apiService: ApiService) { };

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {

    // Inicializa el mapa mostrando todo
    this.map = L.map('mapa').fitWorld();

    // Inicializa la imagen del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Realiza petición GET a la URL y crea un marcador para cada usuario con su latitud y longitud
    this.apiService.getUsers().subscribe((data) => {
      this.usuarios = data;
      for(let usuario of this.usuarios) {
        this.addMarker(usuario.address.geo.lat, usuario.address.geo.lng, usuario.name);
      }
    })
  }

  // Método para agregar marcadores al mapa con latitud y longitud
  public addMarker(lat: number, lng: number, usuarioNombre: string): void {
    L.marker(L.latLng(lat, lng)).addTo(this.map)
      .bindPopup(usuarioNombre)
      .openPopup();
  }
}
