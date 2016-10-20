from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Departamento import DepartamentoSerializer
from ..models.Departamento import Departamento


class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

    def get_queryset(self):
        try:
            pais = self.request.GET.get('pais')
            if pais:
                queryset = Departamento.objects.filter(pais__id=pais)
            else:
                queryset = Departamento.objects.all()

        except Exception as e:
            queryset =  Departamento.objects.all()

        return queryset
