from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.GradoAcademico import GradoAcademicoSerializer
from ..models.GradoAcademico import GradoAcademico


class GradoAcademicoViewSet(viewsets.ModelViewSet):
    queryset = GradoAcademico.objects.all()
    serializer_class = GradoAcademicoSerializer

    def get_queryset(self):
        try:
            campopre = self.request.GET.get('campopre')
            if campopre:
                queryset = GradoAcademico.objects.filter(campo_predefinido__id=campopre)
            else:
                queryset = GradoAcademico.objects.all()

        except Exception as e:
            queryset =  GradoAcademico.objects.all()

        return queryset
