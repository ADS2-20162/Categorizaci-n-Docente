from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.ElementoCampo import ElementoCampoSerializer
from ..models.ElementoCampo import ElementoCampo

class ElementoCampoViewSet(viewsets.ModelViewSet):
    queryset = ElementoCampo.objects.all()
    serializer_class = ElementoCampoSerializer

    def get_queryset(self):
        try:
            elemento_sub_item = self.request.GET.get('elemento_sub_item')
            elemento_nombre = self.request.GET.get('elemento_nombre')
            # campo = self.request.GET.get('campo')
            if sub_item:
                queryset = ElementoCampo.objects.filter(elemento__sub_item=elemento_sub_item,
                                                        elemento__nombre=elemento_nombre)
            # elif campo:
            #     queryset = ElementoCampo.objects.filter(campo__id=campo)
            else:
                queryset = ElementoCampo.objects.all()

        except Exception as e:
            queryset =  ElementoCampo.objects.all()

        return queryset
