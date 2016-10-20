from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Institucion import InstitucionSerializer
from ..models.Institucion import Institucion


class InstitucionViewSet(viewsets.ModelViewSet):
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer

    def get_queryset(self):
        try:
            tipoinst = self.request.GET.get('tipoinst')
            campopre = self.request.GET.get('campopre')
            if tipoinst:
                queryset = Institucion.objects.filter(tipo_institucion__id=tipoinst)
            elif campopre:
                queryset = Institucion.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = Institucion.objects.all()

        except Exception as e:
            queryset =  Institucion.objects.all()

        return queryset
