from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CampoPropiedadForm import CampoPropiedadFormSerializer
from ..models.CampoPropiedadForm import CampoPropiedadForm


class CampoPropiedadFormViewSet(viewsets.ModelViewSet):
    queryset = CampoPropiedadForm.objects.all()
    serializer_class = CampoPropiedadFormSerializer

    def get_queryset(self):
        try:
            campo = self.request.GET.get('campo')
            propiedadform = self.request.GET.get('propiedadform')
            if campo:
                queryset = CampoPropiedadForm.objects.filter(campo__id=campo)
            elif propiedadform:
                queryset = CampoPropiedadForm.objects.filter(propiedad_form__id=propiedadform)
            else:
                queryset = CampoPropiedadForm.objects.all()

        except Exception as e:
            queryset =  CampoPropiedadForm.objects.all()

        return queryset
