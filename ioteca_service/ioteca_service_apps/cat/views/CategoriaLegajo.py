from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CategoriaLegajo import CategoriaLegajoSerializer
from ..models.CategoriaLegajo import CategoriaLegajo


class CategoriaLegajoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaLegajo.objects.all()
    serializer_class = CategoriaLegajoSerializer
