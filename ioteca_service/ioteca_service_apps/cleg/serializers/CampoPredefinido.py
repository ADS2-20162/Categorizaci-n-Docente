from rest_framework import serializers
from ..models.TipoCampo import TipoCampo
from ..models.CampoPredefinido import CampoPredefinido


class CampoPredefinidoSerializer(serializers.ModelSerializer):
    tipo_campo = serializers.SlugRelatedField(slug_field='nombre', queryset=TipoCampo.objects.all())

    class Meta:
        model = CampoPredefinido
        fields = ('id', 'nombre', 'descripcion', 'estado', 'tipo_campo')
