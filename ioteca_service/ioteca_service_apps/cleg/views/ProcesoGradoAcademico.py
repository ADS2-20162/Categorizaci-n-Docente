from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.ProcesoGradoAcademico import ProcesoGradoAcademicoSerializer
from ..models.ProcesoGradoAcademico import ProcesoGradoAcademico


class ProcesoGradoAcademicoViewSet(viewsets.ModelViewSet):
    queryset = ProcesoGradoAcademico.objects.all()
    serializer_class = ProcesoGradoAcademicoSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = ProcesoGradoAcademico.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = ProcesoGradoAcademico.objects.all()

        except Exception as e:
            queryset =  ProcesoGradoAcademico.objects.all()

        return queryset
