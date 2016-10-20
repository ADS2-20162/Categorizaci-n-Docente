from rest_framework import serializers
from ..models.AreaPerfil import AreaPerfil
from ..models.Perfil import Perfil
from ..models.Area import Area


class AreaPerfilSerializer(serializers.ModelSerializer):
    # perfil = serializers.CharField(source='perfil.nombre')
    # area = serializers.CharField(source='area.nombre')
    perfil = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Perfil.objects.all())
    area = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Area.objects.all())

    class Meta:
        model = AreaPerfil
        fields = ('id', 'perfil', 'area', 'ponderado',
                  'created_at', 'updated_at')
