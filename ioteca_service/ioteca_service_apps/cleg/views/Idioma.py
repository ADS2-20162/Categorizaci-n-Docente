from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Idioma import IdiomaSerializer
from ..models.Idioma import Idioma


class IdiomaViewSet(viewsets.ModelViewSet):
    queryset = Idioma.objects.all()
    serializer_class = IdiomaSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = Idioma.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = Idioma.objects.all()

        except Exception as e:
            queryset =  Idioma.objects.all()

        return queryset
