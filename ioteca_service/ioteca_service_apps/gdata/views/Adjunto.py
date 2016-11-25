from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework import status
from ..serializers.Adjunto import AdjuntoSerializer
from ..models.Adjunto import Adjunto


class AdjuntoViewSet(viewsets.ModelViewSet):
    queryset = Adjunto.objects.all()
    serializer_class = AdjuntoSerializer
