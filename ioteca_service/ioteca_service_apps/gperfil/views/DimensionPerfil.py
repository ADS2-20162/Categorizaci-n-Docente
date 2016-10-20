from rest_framework import  viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.DimensionPerfil import *
from ..models.DimensionPerfil import *

class DimensionPerfilViewSet(viewsets.ModelViewSet):
    queryset = DimensionPerfil.objects.all()
    serializer_class = DimensionPerfilSerializer

    # def get_queryset(self):
    #     query = self.request.query_params.get('query', '')
    #     queryall = (Q(nombre__icontains=query),)

    #     queryset = self.queryset.filter(reduce(OR, queryall))
    #     return queryset


    def get_queryset(self):
        try:
            perfil = self.request.GET.get('perfil')
            if perfil:

                queryset = DimensionPerfil.objects.filter(perfil__id=perfil)
            else:
                queryset = DimensionPerfil.objects.all()

        except Exception as e:
            queryset = DimensionPerfil.objects.all()

        return queryset
