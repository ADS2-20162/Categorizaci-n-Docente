from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.TipoNivel import TipoNivelSerializer
from ..models.TipoNivel import TipoNivel


class TipoNivelViewSet(viewsets.ModelViewSet):
    queryset = TipoNivel.objects.all()
    serializer_class = TipoNivelSerializer
