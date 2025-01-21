import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'formulario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  // Lista que almacena el objeto que devuelve la petición GET
  usuarios: any[] = [];

  // Mensaje y título para el popup
  mensajeTitulo: String = '';
  mensaje: String = '';

  // Variable para identificar si se trata de un caso exitoso o no
  success: boolean = false;

  // Atributo para realizar la petición del API
  constructor(private apiService: ApiService) { };

  // Formulario con sus respectivas validaciones de los campos y el formato JSON requerido
  formulario = new FormGroup({
    "infoUsuario": new FormGroup({
      'nombre': new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
      'apellido1': new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
      'apellido2': new FormControl('', Validators.compose([Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
      'curp': new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9]*$'),
      Validators.minLength(18),
      Validators.maxLength(18)])),
      'rfc': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]))
    }),
    "domicilio": new FormGroup({
      'cp': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      'calle': new FormControl('', Validators.required),
      'exterior': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(5)
      ])),
      'interior': new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-ZÑñ0-9]*$'),
        Validators.maxLength(10)
      ])),
      'estado': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
      'municipio': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
      'colonia': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$')])),
    })
  })

  // Método para realizar la petición GET en cuanto inicialice la aplicación
  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.usuarios = data;
    })
  }

  // Método para enviar los datos al URL POST
  enviar() {
    // Validación de los campos
    if (this.formulario.valid) {

      // Mensaje exitoso en la validación
      this.mensajeTitulo = '¡Exitoso!'
      this.mensaje = 'Campos validados correctamente'
      this.success = true;

      // Valida que se hayan enviado y recibido correctamente los datos
      this.apiService.postData(this.formulario.value).subscribe({
        next: (response) => {
          if (response.json) {
            console.log('Envío exitoso');
            console.log(response);
          } else {
            console.log('El servidor no devolvió datos válidos.');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });

    } else {
      // Mensaje no exitoso en la validación
      this.mensajeTitulo = '¡Mal!'
      this.mensaje = 'Existen campos por validar'
      this.success = false;
    }
  }

  // Método para eliminar un usuario de la lista por medio de su id
  eliminar(id: String) {
    this.usuarios.forEach((usuario, index) => {
      if (usuario.id === id) this.usuarios.splice(index, 1);
    })
  }


  editar(id: String) {
    console.log(id)
  }

  // Getters para simplificar el archivo HTML
  get nombre() {
    return this.formulario.get('infoUsuario.nombre')
  }

  get apellido1() {
    return this.formulario.get('infoUsuario.apellido1')
  }

  get apellido2() {
    return this.formulario.get('infoUsuario.apellido2')
  }

  get curp() {
    return this.formulario.get('infoUsuario.curp')
  }

  get rfc() {
    return this.formulario.get('infoUsuario.rfc')
  }

  get cp() {
    return this.formulario.get('domicilio.cp')
  }

  get calle() {
    return this.formulario.get('domicilio.calle')
  }

  get exterior() {
    return this.formulario.get('domicilio.exterior')
  }

  get interior() {
    return this.formulario.get('domicilio.interior')
  }

  get estado() {
    return this.formulario.get('domicilio.estado')
  }

  get municipio() {
    return this.formulario.get('domicilio.municipio')
  }

  get colonia() {
    return this.formulario.get('domicilio.colonia')
  }
}
