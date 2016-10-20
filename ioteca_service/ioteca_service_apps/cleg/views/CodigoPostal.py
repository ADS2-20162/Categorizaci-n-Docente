from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CodigoPostal import CodigoPostalSerializer
from ..models.CodigoPostal import CodigoPostal


class CodigoPostalViewSet(viewsets.ModelViewSet):
    queryset = CodigoPostal.objects.all()
    serializer_class = CodigoPostalSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = CodigoPostal.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = CodigoPostal.objects.all()

        except Exception as e:
            queryset =  CodigoPostal.objects.all()

        return queryset
