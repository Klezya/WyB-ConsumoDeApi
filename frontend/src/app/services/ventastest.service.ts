import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VentasTestService {

  constructor() {}

  // Función que usa fetch para hacer una solicitud GET
  obtenerClientes() {
    fetch('http://127.0.0.1:8000/api/clientes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Lista de clientes:', data);
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
      });
  }
}
