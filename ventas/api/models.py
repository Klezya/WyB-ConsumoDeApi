from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, null=True, blank=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    categoria = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido1}"

class Comercial(models.Model):
    nombre = models.CharField(max_length=100)
    apellido1 = models.CharField(max_length=100)
    apellido2 = models.CharField(max_length=100, null=True, blank=True)
    comision = models.FloatField()

    def __str__(self):
        return f"{self.nombre} {self.apellido1}"

class Pedido(models.Model):
    total = models.FloatField()
    fecha = models.DateField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    comercial = models.ForeignKey(Comercial, on_delete=models.CASCADE)

    def __str__(self):
        return f"Pedido {self.id} - Total: {self.total}"
