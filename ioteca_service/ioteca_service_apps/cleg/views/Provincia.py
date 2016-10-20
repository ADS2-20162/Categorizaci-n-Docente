from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Provincia import ProvinciaSerializer
from ..models.Provincia import Provincia


class ProvinciaViewSet(viewsets.ModelViewSet):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer

    def get_queryset(self):
        try:
            departamento = self.request.GET.get('departamento')
            if departamento:
                queryset = Provincia.objects.filter(departamento__id=departamento)
            else:
                queryset = Provincia.objects.all()

        except Exception as e:
            queryset =  Provincia.objects.all()

        return queryset
