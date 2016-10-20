from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Distrito import DistritoSerializer
from ..models.Distrito import Distrito


class DistritoViewSet(viewsets.ModelViewSet):
    queryset = Distrito.objects.all()
    serializer_class = DistritoSerializer

    def get_queryset(self):
        try:
            provincia = self.request.GET.get('provincia')
            if provincia:
                queryset = Distrito.objects.filter(provincia__id=provincia)
            else:
                queryset = Distrito.objects.all()

        except Exception as e:
            queryset =  Distrito.objects.all()

        return queryset
