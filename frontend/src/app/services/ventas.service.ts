// src/app/services/ventas.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://127.0.0.1:8000/api/clientes';
  
  constructor(private http: HttpClient = inject(HttpClient)) {}

  public getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  
  /*
  // Obtener clientes
  async obtenerClientes() {
    try {
      const response = await axios.get(`${this.apiUrl}/clientes`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      throw error;
    }
  } */

  /*
  // Obtener comerciales
  async obtenerComerciales() {
    const response = await axios.get(`${this.apiUrl}/comerciales`);
    return response.data;
  }

  // Obtener pedidos
  async obtenerPedidos() {
    const response = await axios.get(`${this.apiUrl}/pedidos`);
    return response.data;
  }

  // Crear cliente
  async crearCliente(clienteData: any) {
    const response = await axios.post(`${this.apiUrl}/clientes/`, clienteData);
    return response.data;
  }

  // Crear comercial
  async crearComercial(comercialData: any) {
    const response = await axios.post(`${this.apiUrl}/comerciales/`, comercialData);
    return response.data;
  }

  // Crear pedido
  async crearPedido(pedidoData: any) {
    const response = await axios.post(`${this.apiUrl}/pedidos/`, pedidoData);
    return response.data;
  }*/
}
