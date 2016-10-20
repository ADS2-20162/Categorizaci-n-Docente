from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CategoriaLegajoDetalle import CategoriaLegajoDetalleSerializer
from ..models.CategoriaLegajoDetalle import CategoriaLegajoDetalle


class CategoriaLegajoDetalleViewSet(viewsets.ModelViewSet):
    queryset = CategoriaLegajoDetalle.objects.all()
    serializer_class = CategoriaLegajoDetalleSerializer
