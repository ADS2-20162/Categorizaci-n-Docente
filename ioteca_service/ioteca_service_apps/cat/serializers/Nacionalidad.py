from rest_framework import serializers
from ..models.Nacionalidad import Nacionalidad


class NacionalidadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nacionalidad
