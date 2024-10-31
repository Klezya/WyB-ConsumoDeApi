// src/app/home/home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VentasService } from '../services/ventas.service';
import { VentasTestService } from '../services/ventastest.service';
import { HttpClient } from '@angular/common/http';

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
  template: '',
  //templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HttpClient]
})
export class HomeComponent implements OnInit {
  
  //private ventasService = inject(VentasService);  
  private data: any[] = [];

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarData()
  }
  
  cargarData(){
    this.ventasService.getData().subscribe( data => {
      this.data = data;
      console.log(this.data);
    })
  }
  
  
  
  
  /*private fb = inject(FormBuilder);
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
    try {
      await Promise.all([
        this.cargarClientes(),
        //this.cargarComerciales(),
        //this.cargarPedidos()
      ]);
    } catch (error) {
      console.log('Error al cargar datos: ', error)
      alert('Error al cargar datos iniciales');
    }
  }

  // Crear cliente
  async crearCliente() {
    if (this.clientForm.valid) {
      try {
        //await this.ventasService.crearCliente(this.clientForm.value);
        //alert('Cliente creado con éxito');
        //this.clientForm.reset();
        //await this.cargarClientes(); // Recargar lista de clientes
      } catch (error) {
        //alert('Error al crear cliente');
      }
    }
  }

  // Crear comercial
  async crearComercial() {
    if (this.commercialForm.valid) {
      try {
        //await this.ventasService.crearComercial(this.commercialForm.value);
        //alert('Comercial creado con éxito');
        //this.commercialForm.reset();
        //await this.cargarComerciales(); // Recargar lista de comerciales
      } catch (error) {
        //alert('Error al crear comercial');
      }
    }
  }

  // Crear pedido
  async crearPedido() {
    if (this.orderForm.valid) {
      try {
        //await this.ventasService.crearPedido(this.orderForm.value);
        //alert('Pedido creado con éxito');
        //this.orderForm.reset();
        //await this.cargarPedidos(); // Recargar lista de pedidos
      } catch (error) {
        //alert('Error al crear pedido');
      }
    }
  }

  // Cargar clientes
  async cargarClientes() {
    try {
      this.clients = await this.ventasService.obtenerClientes();
      console.log(this.clients)
    } catch (error) {
      console.log('Error clientes: ', error)
      //alert('Error al cargar clientes');
    }
  }

  // Cargar comerciales
  async cargarComerciales() {
    try {
      //this.commercials = await this.ventasService.obtenerComerciales();
      console.log(this.commercials)
    } catch (error) {
      console.log('Error comerciales: ', error)
      //alert('Error al cargar comerciales');
    }
  }

  // Cargar pedidos
  async cargarPedidos() {
    try {
      //this.orders = await this.ventasService.obtenerPedidos();
      console.log(this.orders)
    } catch (error) {
      console.log('Error ordenes: ', error)
      //alert('Error al cargar pedidos');
    }
  }*/
}
