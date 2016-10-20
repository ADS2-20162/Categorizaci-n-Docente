from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Nivel import NivelSerializer
from ..models.Nivel import Nivel


class NivelViewSet(viewsets.ModelViewSet):
    queryset = Nivel.objects.all()
    serializer_class = NivelSerializer

    def get_queryset(self):
        try:
            tiponivel = self.request.GET.get('tiponivel')
            if tiponivel:
                queryset = Nivel.objects.filter(tipo_nivel__id=tiponivel)
            else:
                queryset = Nivel.objects.all()

        except Exception as e:
            queryset =  Nivel.objects.all()

        return queryset
