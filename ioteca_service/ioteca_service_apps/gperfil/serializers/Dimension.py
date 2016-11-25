from rest_framework import serializers
from ..models.Dimension import *
from .DimensionPerfil import DimensionPerfilSerializer


class DimensionSerializer(serializers.ModelSerializer):
    dimperfils = DimensionPerfilSerializer(many=True, read_only=True)

    class Meta:
        model = Dimension
