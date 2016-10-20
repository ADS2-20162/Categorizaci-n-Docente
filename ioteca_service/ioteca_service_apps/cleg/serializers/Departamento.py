from rest_framework import serializers
from ..models.Pais import Pais
from ..models.Departamento import Departamento


class DepartamentoSerializer(serializers.ModelSerializer):
	pais = serializers.SlugRelatedField(slug_field='nombre', queryset=Pais.objects.all())

	class Meta:
		model = Departamento
		fields = ('id', 'nombre', 'pais', 'estado')
