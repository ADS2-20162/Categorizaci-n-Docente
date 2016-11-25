from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.DataCampoOpcion import DataCampoOpcionSerializer
from ..models.DataCampoOpcion import DataCampoOpcion

class DataCampoOpcionViewSet(viewsets.ModelViewSet):
    queryset = DataCampoOpcion.objects.all()
    serializer_class = DataCampoOpcionSerializer

    def get_queryset(self):
        try:
            datacampo = self.request.GET.get('data_campo')
            if datacampo:
                queryset = DataCampoOpcion.objects.filter(data_campo__nombre=datacampo)
            else:
                queryset = DataCampoOpcion.objects.all()
        except Exception as e:
            queryset =  DataCampoOpcion.objects.all()

        return queryset
