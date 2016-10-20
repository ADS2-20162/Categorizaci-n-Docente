from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.ElementoCampo import ElementoCampoSerializer
from ..models.ElementoCampo import ElementoCampo


class ElementoCampoViewSet(viewsets.ModelViewSet):
    queryset = ElementoCampo.objects.all()
    serializer_class = ElementoCampoSerializer

    def get_queryset(self):
        try:
            elemento = self.request.GET.get('elemento')
            campo = self.request.GET.get('campo')
            if elemento:
                queryset = ElementoCampo.objects.filter(elemento__id=elemento)
            elif campo:
                queryset = ElementoCampo.objects.filter(campo__id=campo)
            else:
                queryset = ElementoCampo.objects.all()

        except Exception as e:
            queryset =  ElementoCampo.objects.all()

        return queryset
