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
    ReactiveFormsModule, // <-- Agregado aquí
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
  orders = [];

  constructor() {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      ciudad: ['', Validators.required],
      categoria: ['', Validators.required],
    });

    this.commercialForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      comision: ['', Validators.required],
    });

    this.orderForm = this.fb.group({
      id_cliente: ['', Validators.required],
      id_comercial: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarPedidos();
  }

  async crearCliente() {
    if (this.clientForm.valid) {
      try {
        await this.ventasService.crearCliente(this.clientForm.value);
        alert('Cliente creado con éxito');
        this.clientForm.reset();
      } catch (error) {
        alert('Error al crear cliente');
      }
    }
  }

  async crearComercial() {
    if (this.commercialForm.valid) {
      try {
        await this.ventasService.crearComercial(this.commercialForm.value);
        alert('Comercial creado con éxito');
        this.commercialForm.reset();
      } catch (error) {
        alert('Error al crear comercial');
      }
    }
  }

  async crearPedido() {
    if (this.orderForm.valid) {
      try {
        await this.ventasService.crearPedido(this.orderForm.value);
        alert('Pedido creado con éxito');
        this.orderForm.reset();
        this.cargarPedidos();
      } catch (error) {
        alert('Error al crear pedido');
      }
    }
  }

  async cargarPedidos() {
    try {
      this.orders = await this.ventasService.obtenerPedidos();
    } catch (error) {
      alert('Error al cargar pedidos');
    }
  }
}
