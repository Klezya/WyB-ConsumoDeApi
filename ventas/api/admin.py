from django.contrib import admin
from .models import Cliente, Comercial, Pedido

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido1', 'apellido2', 'ciudad', 'categoria')

@admin.register(Comercial)
class ComercialAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido1', 'apellido2', 'comision')

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'total', 'fecha', 'cliente', 'comercial')
    
    