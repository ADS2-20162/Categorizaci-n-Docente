from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Elemento import ElementoSerializer
from ..models.Elemento import Elemento


class ElementoViewSet(viewsets.ModelViewSet):
    queryset = Elemento.objects.all()
    serializer_class = ElementoSerializer

    def get_queryset(self):
        try:
            item = self.request.GET.get('item')
            subitem = self.request.GET.get('subitem')
            seccion = self.request.GET.get('seccion')
            if item:
                queryset = Elemento.objects.filter(item__id=item)
            elif subitem:
                queryset = Elemento.objects.filter(sub_item__id=subitem)
            elif seccion:
                queryset = Elemento.objects.filter(seccion__id=seccion)
            else:
                queryset = Elemento.objects.all()

        except Exception as e:
            queryset =  Elemento.objects.all()

        return queryset
