from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.TipoInstitucion import TipoInstitucionSerializer
from ..models.TipoInstitucion import TipoInstitucion


class TipoInstitucionViewSet(viewsets.ModelViewSet):
    queryset = TipoInstitucion.objects.all()
    serializer_class = TipoInstitucionSerializer
