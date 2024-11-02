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
  Message: string | null = null;

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
        this.Message = 'Cliente creado con éxito';
        this.clientForm.reset();
        await this.cargarClientes();
      } catch (error) {
        this.errorMessage = 'Error al crear al cliente';
      }
    }
  }

  async crearComercial() {
    if (this.commercialForm.valid) {
      try {
        await this.ventasService.crearComercial(this.commercialForm.value);
        this.Message = 'Comercial creado con éxito';
        this.commercialForm.reset();
        await this.cargarComerciales();
      } catch (error) {
        this.errorMessage = 'Error al cargar el comercial';
      }
    }
  }

  async crearPedido() {
    if (this.orderForm.valid) {
      try {
        await this.ventasService.crearPedido(this.orderForm.value);
        this.Message = 'Pedido creado con éxito';
        this.orderForm.reset();
        await this.cargarPedidos();
        this.updateCharts();
      } catch (error) {
        this.errorMessage = 'Error al cargar el pedido';
      }
    }
  }

  async cargarClientes() {
    try {
      this.clients = await this.ventasService.obtenerClientes();
    } catch (error) {
      this.errorMessage = 'Error al cargar los clientes';
    }
  }

  async cargarComerciales() {
    try {
      this.commercials = await this.ventasService.obtenerComerciales();
    } catch (error) {
      this.errorMessage = 'Error al cargar los comerciales';
    }
  }

  async cargarPedidos() {
    try {
        const pedidos = await this.ventasService.obtenerPedidos();
        this.orders = pedidos.map((pedido: any) => {
            // Encontrar el cliente y el comercial según el ID
            const cliente = this.clients.find(c => c.id === pedido.cliente);
            const comercial = this.commercials.find(c => c.id === pedido.comercial);

            return {
                ...pedido,
                // Formato "nombre apellido1" para el cliente
                cliente: cliente ? `${cliente.nombre} ${cliente.apellido1}` : 'N/A', 
                // Formato "nombre apellido1" para el comercial
                comercial: comercial ? `${comercial.nombre} ${comercial.apellido1}` : 'N/A' 
            };
        });
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
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4A90E2', '#50E3C2', '#B8E986',
        '#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#2ECC71', '#F1C40F', '#E67E22', '#E91E63', '#3F51B5', '#FF5722'
      ],
      borderColor: 'rgba(200, 200, 200, 0.3)',
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
          size: 20,
          weight: 'bold'
        },
        color: '#333'
      },
      legend: {
        position: 'bottom',
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
  // Método para actualizar los datos de los gráficos
updateCharts() {
  if (this.orders.length === 0) return;

  // Ordenar los pedidos por fecha en orden ascendente
  const sortedOrders = [...this.orders].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  // Extraer las fechas y totales de los pedidos ordenados
  const dates = sortedOrders.map(order => order.fecha);
  const totals = sortedOrders.map(order => order.total);

  // Actualizar datos del gráfico de línea
  this.lineChart.data.labels = dates;
  this.lineChart.data.datasets[0].data = totals;
  this.lineChart.update();

  // Actualizar datos del gráfico de pastel
  const clientNames = [...new Set(this.orders.map(order => order.cliente))];
    const clientTotals = clientNames.map(name =>
      this.orders
        .filter(order => order.cliente === name)
        .reduce((sum, order) => sum + order.total, 0)
    );

  // Asigna solo los nombres en lugar de "Cliente Nombre"
  this.pieChart.data.labels = clientNames;
  this.pieChart.data.datasets[0].data = clientTotals;
  this.pieChart.update();
}
}
