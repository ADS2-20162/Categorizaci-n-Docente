from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Dimension import DimensionSerializer
from ..models.Dimension import Dimension


class DimensionViewSet(viewsets.ModelViewSet):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

    def get_queryset(self):
        try:
            idioma = self.request.GET.get('idioma')
            if idioma:
                queryset = Dimension.objects.filter(idioma__id=idioma)
            else:
                queryset = Dimension.objects.all()

        except Exception as e:
            queryset =  Dimension.objects.all()

        return queryset
