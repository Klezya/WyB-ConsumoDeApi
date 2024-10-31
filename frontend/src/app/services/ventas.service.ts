// src/app/services/ventas.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  // Obtener clientes
  async obtenerClientes() {
    const response = await axios.get(`${this.apiUrl}/clientes`);
    return response.data;
  }

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
  }
}
