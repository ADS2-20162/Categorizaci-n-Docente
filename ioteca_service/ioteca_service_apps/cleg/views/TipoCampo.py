from rest_framework import serializers, viewsets
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.TipoCampo import TipoCampoSerializer
from ..models.TipoCampo import TipoCampo


class TipoCampoViewSet(viewsets.ModelViewSet):
	queryset = TipoCampo.objects.all()
	serializer_class = TipoCampoSerializer
