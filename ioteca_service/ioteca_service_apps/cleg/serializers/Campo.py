from rest_framework import serializers
from ..models.TipoCampo import TipoCampo
from ..models.Campo import Campo


class CampoSerializer(serializers.ModelSerializer):
    tipo_campo = serializers.SlugRelatedField(slug_field='nombre', queryset=TipoCampo.objects.all())

    class Meta:
        model = Campo
        fields = ('id', 'nombre', 'descripcion', 'estado', 'tipo_campo')
