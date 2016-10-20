from rest_framework import  viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.EscalaDimension import *
from ..models.EscalaDimension import *

class EscalaDimensionViewSet(viewsets.ModelViewSet):
    queryset = EscalaDimension.objects.all()
    serializer_class = EscalaDimensionSerializer

    def get_queryset(self):
        try:
            dimensionperfil = self.request.GET.get('dimensionperfil')
            print(dimensionperfil)
            if dimensionperfil:
                queryset = EscalaDimension.objects.filter(dimensionperfil__id=dimensionperfil)
            else:
                queryset = EscalaDimension.objects.all()

        except Exception as e:
            queryset = EscalaDimension.objects.all()

        return queryset

