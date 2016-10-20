from rest_framework import serializers
from ..models.Idioma import Idioma
from ..models.Dimension import Dimension


class DimensionSerializer(serializers.ModelSerializer):
	idioma= serializers.SlugRelatedField(slug_field='nombre', queryset=Idioma.objects.all())

	class Meta:
		model = Dimension
		fields = ('id', 'nombre', 'descripcion', 'idioma', 'estado')
