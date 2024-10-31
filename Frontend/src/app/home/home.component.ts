// src/app/home/home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VentasService } from '../services/ventas.service';

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
        await this.ventasService.crearCliente(this.clientForm.value);
        alert('Cliente creado con éxito');
        this.clientForm.reset();
        await this.cargarClientes(); // Recargar lista de clientes
      } catch (error) {
        alert('Error al crear cliente');
      }
    }
  }

  // Crear comercial
  async crearComercial() {
    if (this.commercialForm.valid) {
      try {
        await this.ventasService.crearComercial(this.commercialForm.value);
        alert('Comercial creado con éxito');
        this.commercialForm.reset();
        await this.cargarComerciales(); // Recargar lista de comerciales
      } catch (error) {
        alert('Error al crear comercial');
      }
    }
  }

  // Crear pedido
  async crearPedido() {
    if (this.orderForm.valid) {
      try {
        console.log(this.orderForm.value)
        await this.ventasService.crearPedido(this.orderForm.value);
        alert('Pedido creado con éxito');
        this.orderForm.reset();
        await this.cargarPedidos(); // Recargar lista de pedidos
      } catch (error) {
        alert('Error al crear pedido');
      }
    }
  }

  // Cargar clientes
  async cargarClientes() {
    try {
      this.clients = await this.ventasService.obtenerClientes();
    } catch (error) {
      alert('Error al cargar clientes');
    }
  }

  // Cargar comerciales
  async cargarComerciales() {
    try {
      this.commercials = await this.ventasService.obtenerComerciales();
    } catch (error) {
      alert('Error al cargar comerciales');
    }
  }

  // Cargar pedidos
  async cargarPedidos() {
    try {
      this.orders = await this.ventasService.obtenerPedidos();
    } catch (error) {
      alert('Error al cargar pedidos');
    }
  }
}
