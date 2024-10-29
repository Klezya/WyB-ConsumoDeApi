from rest_framework import generics
from .models import Cliente, Comercial, Pedido
from .serializers import ClienteSerializer, ComercialSerializer, PedidoSerializer

class ClienteListCreate(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ClienteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ComercialListCreate(generics.ListCreateAPIView):
    queryset = Comercial.objects.all()
    serializer_class = ComercialSerializer

class ComercialRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comercial.objects.all()
    serializer_class = ComercialSerializer

class PedidoListCreate(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class PedidoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
