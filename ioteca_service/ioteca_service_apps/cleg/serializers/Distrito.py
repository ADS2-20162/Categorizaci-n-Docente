from rest_framework import serializers
from ..models.Provincia import Provincia
from ..models.Distrito import Distrito


class DistritoSerializer(serializers.ModelSerializer):
	provincia = serializers.SlugRelatedField(slug_field='nombre', queryset=Provincia.objects.all())

	class Meta:
		model = Distrito
		fields = ('id', 'nombre', 'provincia')
