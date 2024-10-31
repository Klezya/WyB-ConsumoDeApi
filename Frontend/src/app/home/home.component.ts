// src/app/home/home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VentasService } from '../services/ventas.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);
  
  clientForm: FormGroup;
  commercialForm: FormGroup;
  orderForm: FormGroup;

  displayedColumns: string[] = ['id', 'clientName', 'commercialName', 'total', 'fecha'];
  orders: any[] = [];
  clients: any[] = [];
  commercials: any[] = [];
  errorMessage: string | null = null; // Para manejar mensajes de error

  constructor() {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      ciudad: ['', Validators.required],
      categoria: [0, Validators.required],
    });

    this.commercialForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      comision: [0, Validators.required],
    });

    this.orderForm = this.fb.group({
      cliente: ['', Validators.required],
      comercial: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required],
    });
  }

  async ngOnInit() {
    await this.cargarDatosIniciales();
  }

  // Cargar todos los datos al inicio
  async cargarDatosIniciales() {
    await this.cargarClientes();
    await this.cargarComerciales();
    await this.cargarPedidos();
  }

  // Crear cliente
  async crearCliente() {
    if (this.clientForm.valid) {
      try {
        // Obtener solo los datos necesarios
        const clienteData = {
          nombre: this.clientForm.value.nombre,
          apellido1: this.clientForm.value.apellido1,
          apellido2: this.clientForm.value.apellido2,
          ciudad: this.clientForm.value.ciudad,
          categoria: this.clientForm.value.categoria
        };
        
        await this.ventasService.crearCliente(clienteData);
        alert('Cliente creado con éxito');
        this.clientForm.reset();
        await this.cargarClientes(); // Recargar lista de clientes
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  // Crear comercial
  async crearComercial() {
    if (this.commercialForm.valid) {
      try {
        // Obtener solo los datos necesarios
        const comercialData = {
          nombre: this.commercialForm.value.nombre,
          apellido1: this.commercialForm.value.apellido1,
          apellido2: this.commercialForm.value.apellido2,
          comision: this.commercialForm.value.comision,
        };
        
        await this.ventasService.crearComercial(comercialData);
        alert('Comercial creado con éxito');
        this.commercialForm.reset();
        await this.cargarComerciales(); // Recargar lista de comerciales
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  // Crear pedido
  async crearPedido() {
    if (this.orderForm.valid) {
      try {
        // Obtener solo los datos necesarios
        const pedidoData = {
          cliente: this.orderForm.value.cliente,
          comercial: this.orderForm.value.comercial,
          total: this.orderForm.value.total,
          fecha: this.orderForm.value.fecha,
        };
        
        await this.ventasService.crearPedido(pedidoData);
        alert('Pedido creado con éxito');
        this.orderForm.reset();
        await this.cargarPedidos(); // Recargar lista de pedidos
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  // Cargar clientes
  async cargarClientes() {
    try {
      this.clients = await this.ventasService.obtenerClientes();
    } catch (error) {
      this.handleError(error);
    }
  }

  // Cargar comerciales
  async cargarComerciales() {
    try {
      this.commercials = await this.ventasService.obtenerComerciales();
    } catch (error) {
      this.handleError(error);
    }
  }

  // Cargar pedidos
  async cargarPedidos() {
    try {
      this.orders = await this.ventasService.obtenerPedidos();
    } catch (error) {
      this.handleError(error);
    }
  }

  // Manejar errores
  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      this.errorMessage = error.response?.data?.message || 'Error inesperado';
    } else {
      this.errorMessage = 'Error inesperado';
    }
    console.error(this.errorMessage);
    alert(this.errorMessage);
  }
}
