from rest_framework import serializers
from ..models.CampoPropiedadForm import CampoPropiedadForm
from ..models.DataPropiedad import DataPropiedad


class DataPropiedadSerializer(serializers.ModelSerializer):
	data_propiedad = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPropiedadForm.objects.all())

	class Meta:
		model = DataPropiedad
		fields = ('id', 'nombre', 'data_propiedad')
