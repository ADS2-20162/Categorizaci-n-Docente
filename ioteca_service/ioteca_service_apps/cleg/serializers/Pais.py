from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.Pais import Pais


class PaisSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = Pais
		fields = ('id', 'nombre', 'estado', 'campo_predefinido')
