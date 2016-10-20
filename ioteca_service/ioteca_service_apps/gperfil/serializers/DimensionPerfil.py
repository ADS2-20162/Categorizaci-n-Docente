from rest_framework import serializers
from ..models.Perfil import Perfil
from ..models.Dimension import Dimension
from ..models.DimensionPerfil import DimensionPerfil


class DimensionPerfilSerializer(serializers.ModelSerializer):
    perfil = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Perfil.objects.all())
    dimension = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Dimension.objects.all())

    class Meta:
        model = DimensionPerfil
        fields = ('id', 'perfil', 'dimension', 'created_at', 'updated_at')
