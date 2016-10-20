from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Especialidad import EspecialidadSerializer
from ..models.Especialidad import Especialidad


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = Especialidad.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = Especialidad.objects.all()

        except Exception as e:
            queryset =  Especialidad.objects.all()

        return queryset
