from rest_framework import serializers, viewsets
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

