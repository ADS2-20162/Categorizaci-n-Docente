from rest_framework import serializers
from ..models.TipoCampo import TipoCampo
from ..models.PropiedadForm import PropiedadForm


class PropiedadFormSerializer(serializers.ModelSerializer):
	tipo_campo = serializers.SlugRelatedField(slug_field='nombre', queryset=TipoCampo.objects.all())

	class Meta:
		model = PropiedadForm
		fields = ('id', 'nombre', 'descripcion', 'estado', 'tipo_campo')
