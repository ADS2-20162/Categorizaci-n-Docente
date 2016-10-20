from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.DimensionNivel import DimensionNivelSerializer
from ..models.DimensionNivel import DimensionNivel


class DimensionNivelViewSet(viewsets.ModelViewSet):
    queryset = DimensionNivel.objects.all()
    serializer_class = DimensionNivelSerializer

    def get_queryset(self):
        try:
            dimension = self.request.GET.get('dimension')
            nivel = self.request.GET.get('nivel')
            if dimension:
                queryset = DimensionNivel.objects.filter(dimension__id=dimension)
            elif nivel:
                queryset = DimensionNivel.objects.filter(nivel__id=nivel)
            else:
                queryset = DimensionNivel.objects.all()

        except Exception as e:
            queryset =  DimensionNivel.objects.all()

        return queryset
