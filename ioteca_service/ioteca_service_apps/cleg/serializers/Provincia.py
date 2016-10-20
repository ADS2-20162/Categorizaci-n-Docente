from rest_framework import serializers
from ..models.Departamento import Departamento
from ..models.Provincia import Provincia


class ProvinciaSerializer(serializers.ModelSerializer):
	departamento = serializers.SlugRelatedField(slug_field='nombre', queryset=Departamento.objects.all())

	class Meta:
		model = Provincia
		fields = ('id', 'nombre', 'departamento')
