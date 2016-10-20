from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.Idioma import Idioma


class IdiomaSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = Idioma
		fields = ('id', 'nombre', 'estado', 'campo_predefinido')
