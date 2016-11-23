from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistroSerializer
from ..models.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistro

class ElementoCampoPredefinidoRegistroViewSet(viewsets.ModelViewSet):
    queryset = ElementoCampoPredefinidoRegistro.objects.all()
    serializer_class = ElementoCampoPredefinidoRegistroSerializer

    def get_queryset(self):
        try:
            elemento_campo_pred = self.request.GET.get('elemento_campo_pred')
            persona = self.request.GET.get('persona')

            if elemento_campo_pred:
                queryset = ElementoCampoPredefinidoRegistro.objects.filter(elemento_campo_pred__id=elemento_campo_pred)
            elif persona:
                queryset = ElementoCampoPredefinidoRegistro.objects.filter(persona__id=persona)
            else:
                queryset = ElementoCampoPredefinidoRegistro.objects.all()

        except Exception as e:
            queryset = ElementoCampoPredefinidoRegistro.objects.all()

        return queryset

    def create(self, request, pk=None):
        print(request.data)
        is_many = True if isinstance(request.data, list) else False
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
