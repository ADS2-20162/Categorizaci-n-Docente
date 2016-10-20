from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.DataPropiedad import DataPropiedadSerializer
from ..models.DataPropiedad import DataPropiedad


class DataPropiedadViewSet(viewsets.ModelViewSet):
    queryset = DataPropiedad.objects.all()
    serializer_class = DataPropiedadSerializer

    def get_queryset(self):
        try:
            datapropiedad = self.request.GET.get('datapropiedad')
            if datapropiedad:
                queryset = DataPropiedad.objects.filter(data_propiedad__id=datapropiedad)
            else:
                queryset = DataPropiedad.objects.all()

        except Exception as e:
            queryset =  DataPropiedad.objects.all()

        return queryset
