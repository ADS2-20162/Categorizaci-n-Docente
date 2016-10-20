from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.GradoAcademico import GradoAcademico


class GradoAcademicoSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = GradoAcademico
		fields = ('id', 'nombre', 'descripcion', 'estado', 'campo_predefinido')
