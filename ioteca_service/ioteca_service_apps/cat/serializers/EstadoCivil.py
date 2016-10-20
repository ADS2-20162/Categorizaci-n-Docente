from rest_framework import serializers
from ..models.EstadoCivil import EstadoCivil


class EstadoCivilSerializer(serializers.ModelSerializer):

	class Meta:
		model = EstadoCivil
