from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.PropiedadForm import PropiedadFormSerializer
from ..models.PropiedadForm import PropiedadForm


class PropiedadFormViewSet(viewsets.ModelViewSet):
    queryset = PropiedadForm.objects.all()
    serializer_class = PropiedadFormSerializer

    def get_queryset(self):
        try:
            tipocampo = self.request.GET.get('tipocampo')
            if tipocampo:
                queryset = PropiedadForm.objects.filter(tipo_campo__id=tipocampo)
            else:
                queryset = PropiedadForm.objects.all()

        except Exception as e:
            queryset = PropiedadForm.objects.all()

        return queryset
