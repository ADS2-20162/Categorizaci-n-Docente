from rest_framework import serializers
from ..models.Campo import Campo
from ..models.PropiedadForm import PropiedadForm
from ..models.CampoPropiedadForm import CampoPropiedadForm


class CampoPropiedadFormSerializer(serializers.ModelSerializer):
	campo = serializers.SlugRelatedField(slug_field='nombre', queryset=Campo.objects.all())
	propiedad_form = serializers.SlugRelatedField(slug_field='nombre', queryset=PropiedadForm.objects.all())

	class Meta:
		model = CampoPropiedadForm
		fields = ('id', 'nombre', 'campo', 'propiedad_form')
