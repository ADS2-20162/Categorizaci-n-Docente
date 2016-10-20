from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.ProcesoGradoAcademico import ProcesoGradoAcademico


class ProcesoGradoAcademicoSerializer(serializers.ModelSerializer):
	campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

	class Meta:
		model = ProcesoGradoAcademico
		fields = ('id', 'nombre', 'descripcion', 'estado', 'campo_predefinido')
