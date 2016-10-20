from rest_framework import serializers
from ..models.Nivel import Nivel
from ..models.Dimension import Dimension
from ..models.DimensionNivel import DimensionNivel


class DimensionNivelSerializer(serializers.ModelSerializer):
	dimension = serializers.SlugRelatedField(slug_field='nombre', queryset=Dimension.objects.all())
	nivel = serializers.SlugRelatedField(slug_field='nombre', queryset=Nivel.objects.all())

	class Meta:
		model = DimensionNivel
		fields = ('id', 'nombre', 'dimension', 'nivel', 'estado')
