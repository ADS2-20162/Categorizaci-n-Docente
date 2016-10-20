from rest_framework import serializers
from ..models.TipoNivel import TipoNivel


class TipoNivelSerializer(serializers.ModelSerializer):

	class Meta:
		model = TipoNivel
