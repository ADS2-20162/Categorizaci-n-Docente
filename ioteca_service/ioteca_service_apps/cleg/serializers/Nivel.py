from rest_framework import serializers
from ..models.TipoNivel import TipoNivel
from ..models.Nivel import Nivel


class NivelSerializer(serializers.ModelSerializer):
	tipo_nivel = serializers.SlugRelatedField(slug_field='nombre', queryset=TipoNivel.objects.all())

	class Meta:
		model = Nivel
		fields = ('id', 'nombre', 'sigla', 'descripcion','tipo_nivel', 'estado')
