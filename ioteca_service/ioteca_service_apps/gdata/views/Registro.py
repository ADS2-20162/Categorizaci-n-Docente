from rest_framework import serializers, viewsets
from rest_framework.response import Response
from ..models.Registro import Registro
from ..serializers.Registro import RegistroSerializer


class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
