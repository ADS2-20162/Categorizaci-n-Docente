from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CampoPredefinido import CampoPredefinidoSerializer
from ..models.CampoPredefinido import CampoPredefinido


class CampoPredefinidoViewSet(viewsets.ModelViewSet):
	queryset = CampoPredefinido.objects.all()
	serializer_class = CampoPredefinidoSerializer
