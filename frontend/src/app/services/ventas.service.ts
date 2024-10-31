// src/app/services/ventas.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia la URL según tu configuración de Django

  constructor() {}

  async crearCliente(clienteData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/cliente/`, clienteData);
      return response.data;
    } catch (error) {
      console.error('Error creando cliente', error);
      throw error;
    }
  }

  async crearComercial(comercialData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/comercial/`, comercialData);
      return response.data;
    } catch (error) {
      console.error('Error creando comercial', error);
      throw error;
    }
  }

  async crearPedido(pedidoData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/pedido/`, pedidoData);
      return response.data;
    } catch (error) {
      console.error('Error creando pedido', error);
      throw error;
    }
  }

  async obtenerPedidos() {
    try {
      const response = await axios.get(`${this.apiUrl}/pedido/`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pedidos', error);
      throw error;
    }
  }
}
