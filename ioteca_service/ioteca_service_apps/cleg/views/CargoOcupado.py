from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CargoOcupado import CargoOcupadoSerializer
from ..models.CargoOcupado import CargoOcupado


class CargoOcupadoViewSet(viewsets.ModelViewSet):
    queryset = CargoOcupado.objects.all()
    serializer_class = CargoOcupadoSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = CargoOcupado.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = CargoOcupado.objects.all()

        except Exception as e:
            queryset =  CargoOcupado.objects.all()

        return queryset
