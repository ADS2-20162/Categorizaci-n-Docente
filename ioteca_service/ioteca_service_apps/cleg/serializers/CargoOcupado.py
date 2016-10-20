from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.CargoOcupado import CargoOcupado


class CargoOcupadoSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = CargoOcupado
		fields = ('id', 'nombre', 'descripcion', 'estado', 'campo_predefinido')
