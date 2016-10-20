from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Pais import PaisSerializer
from ..models.Pais import Pais


class PaisViewSet(viewsets.ModelViewSet):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = Pais.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = Pais.objects.all()

        except Exception as e:
            queryset =  Pais.objects.all()

        return queryset
