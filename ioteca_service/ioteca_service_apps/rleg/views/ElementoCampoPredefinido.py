from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.ElementoCampoPredefinido import ElementoCampoPredefinidoSerializer
from ..models.ElementoCampoPredefinido import ElementoCampoPredefinido


class ElementoCampoPredefinidoViewSet(viewsets.ModelViewSet):
    queryset = ElementoCampoPredefinido.objects.all()
    serializer_class = ElementoCampoPredefinidoSerializer

    def get_queryset(self):
        try:
            elemento = self.request.GET.get('elemento')
            subitem = self.request.GET.get('subitem')
            if elemento:
                queryset = ElementoCampoPredefinido.objects.filter(elemento__id=elemento)
            elif subitem:
                queryset = ElementoCampoPredefinido.objects.filter(elemento__sub_item__nombre=subitem)
            else:
                queryset = ElementoCampoPredefinido.objects.all()

        except Exception as e:
            queryset =  ElementoCampoPredefinido.objects.all()

        return queryset
