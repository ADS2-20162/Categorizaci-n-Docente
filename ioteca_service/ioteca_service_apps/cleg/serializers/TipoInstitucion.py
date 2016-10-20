from rest_framework import serializers
from ..models.TipoInstitucion import TipoInstitucion


class TipoInstitucionSerializer(serializers.ModelSerializer):

	class Meta:
		model = TipoInstitucion
