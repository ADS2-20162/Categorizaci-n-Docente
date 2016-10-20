from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.CodigoPostal import CodigoPostal


class CodigoPostalSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = CodigoPostal
		fields = ('id', 'nombre', 'descripcion', 'estado', 'campo_predefinido')
