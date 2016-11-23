from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.Especialidad import Especialidad


class EspecialidadSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', 
		queryset=CampoPredefinido.objects.all())

	class Meta:
		model = Especialidad
		fields = ('id', 'nombre', 'descripcion', 'estado', 'campo_predefinido')
