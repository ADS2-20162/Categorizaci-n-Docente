from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ..models.Subarea import Subarea
from ..serializers.Subarea import SubareaSerializer

class SubareaViewSet(viewsets.ModelViewSet):
    queryset = Subarea.objects.all()
    serializer_class = SubareaSerializer

