from rest_framework import serializers
from ..models.Perfil import Perfil
from ..models.Dimension import Dimension
from ..models.DimensionPerfil import DimensionPerfil
from .EscalaDimension import EscalaDimensionSerializer


class DimensionPerfilSerializer(serializers.ModelSerializer):
    perfil = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Perfil.objects.all())
    perfil_id = serializers.CharField(source="perfil.id", read_only=True)
    dimension = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Dimension.objects.all())

    escsdims = EscalaDimensionSerializer(many=True, read_only=True)

    class Meta:
        model = DimensionPerfil
        fields = ('id', 'perfil_id', 'perfil', 'dimension',
                  'escsdims', 'created_at', 'updated_at')
