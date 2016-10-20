from rest_framework import serializers
from ..models.DimensionPerfil import DimensionPerfil
from ..models.Escala import Escala
from ..models.EscalaDimension import EscalaDimension

class EscalaDimensionSerializer(serializers.ModelSerializer):
    dimensionperfil = serializers.SlugRelatedField(slug_field='id', queryset=DimensionPerfil.objects.all())
    escala = serializers.SlugRelatedField(slug_field='nombre', queryset=Escala.objects.all())
    class Meta:
        model = EscalaDimension
        fields =('id','dimensionperfil','escala','puntaje','created_at','updated_at')

