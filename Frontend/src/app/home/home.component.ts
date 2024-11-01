// src/app/home/home.component.ts
import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VentasService } from '../services/ventas.service';
import { MatOptionModule } from '@angular/material/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);

  clientForm: FormGroup;
  commercialForm: FormGroup;
  orderForm: FormGroup;
  displayedColumns: string[] = ['id', 'clientName', 'commercialName', 'total', 'fecha'];
  orders: any[] = [];
  clients: any[] = [];
  commercials: any[] = [];
  errorMessage: string | null = null;

  lineChart: any;
  pieChart: any;

  constructor() {
    Chart.register(...registerables);  // Register Chart.js components

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

  ngAfterViewInit() {
    this.createCharts();
  }

  async cargarDatosIniciales() {
    await this.cargarClientes();
    await this.cargarComerciales();
    await this.cargarPedidos();
    this.updateCharts();
  }

  async crearCliente() {
    if (this.clientForm.valid) {
      try {
        await this.ventasService.crearCliente(this.clientForm.value);
        alert('Cliente creado con éxito');
        this.clientForm.reset();
        await this.cargarClientes();
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
        await this.cargarComerciales();
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
        await this.cargarPedidos();
        this.updateCharts();
      } catch (error) {
        alert('Error al crear pedido');
      }
    }
  }

  async cargarClientes() {
    try {
      this.clients = await this.ventasService.obtenerClientes();
    } catch (error) {
      alert('Error al cargar clientes');
    }
  }

  async cargarComerciales() {
    try {
      this.commercials = await this.ventasService.obtenerComerciales();
    } catch (error) {
      alert('Error al cargar comerciales');
    }
  }

  async cargarPedidos() {
    try {
      this.orders = await this.ventasService.obtenerPedidos();
    } catch (error) {
      alert('Error al cargar pedidos');
    }
  }

  // Método para inicializar y actualizar gráficos
  createCharts() {
    const ctxLine = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;

    // Gráfico de Serie de Tiempo (Línea)
    this.lineChart = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Total de Pedidos',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20, // Espaciado superior
            bottom: 10
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Serie de Tiempo',
            font: {
              size: 20, // Tamaño de letra del título
              weight: 'bold'
            },
            color: '#333' // Color del título
          },
          legend: {
            labels: {
              font: {
                size: 14 // Tamaño de letra de la leyenda
              },
              color: '#555' // Color de la leyenda
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha',
              font: {
                size: 16 // Tamaño de letra de los ejes
              },
              color: '#333'
            },
            ticks: {
              color: '#666' // Color de las etiquetas en el eje x
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total',
              font: {
                size: 16
              },
              color: '#333'
            },
            ticks: {
              color: '#666'
            }
          }
        }
      }
    });

    // Gráfico de Compras por Cliente (Pastel)
    this.pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: 'rgba(200, 200, 200, 0.3)', // Color del borde
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 40, // Espaciado superior
            bottom: 10
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Compras por Cliente',
            font: {
              size: 20, // Tamaño de letra del título
              weight: 'bold'
            },
            color: '#333'
          },
          legend: {
            position: 'bottom', // Posición de la leyenda (puede ser 'top', 'bottom', 'left', 'right')
            labels: {
              font: {
                size: 14
              },
              color: '#555'
            }
          }
        }
      }
    });
  }

  // Método para actualizar los datos de los gráficos
  updateCharts() {
    if (this.orders.length === 0) return;

    const dates = this.orders.map(order => order.fecha);
    const totals = this.orders.map(order => order.total);

    // Actualizar datos del gráfico de línea
    this.lineChart.data.labels = dates;
    this.lineChart.data.datasets[0].data = totals;
    this.lineChart.update();

    // Actualizar datos del gráfico de pastel
    const clientIds = [...new Set(this.orders.map(order => order.cliente))];
    const clientTotals = clientIds.map(id =>
      this.orders
        .filter(order => order.cliente === id)
        .reduce((sum, order) => sum + order.total, 0)
    );

    this.pieChart.data.labels = clientIds.map(id => `Cliente ${id}`);
    this.pieChart.data.datasets[0].data = clientTotals;
    this.pieChart.update();
  }
}
