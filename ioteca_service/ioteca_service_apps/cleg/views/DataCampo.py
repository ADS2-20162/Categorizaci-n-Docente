from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.DataCampo import DataCampoSerializer
from ..models.DataCampo import DataCampo


class DataCampoViewSet(viewsets.ModelViewSet):
    queryset = DataCampo.objects.all()
    serializer_class = DataCampoSerializer

    def get_queryset(self):
        try:
            elementocampo = self.request.GET.get('elementocampo')
            if elementocampo:
                queryset = DataCampo.objects.filter(elemento_campo__id=elementocampo)
            else:
                queryset = DataCampo.objects.all()

        except Exception as e:
            queryset =  DataCampo.objects.all()

        return queryset
