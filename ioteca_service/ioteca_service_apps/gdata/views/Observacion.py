from rest_framework import serializers, viewsets
from rest_framework.response import Response
from ..models.Observacion import Observacion
from ..serializers.Observacion import ObservacionSerializer


class ObservacionViewSet(viewsets.ModelViewSet):
    queryset = Observacion.objects.all()
    serializer_class = ObservacionSerializer
