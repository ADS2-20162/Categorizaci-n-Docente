from rest_framework import serializers
from ..models.TipoCampo import TipoCampo


class TipoCampoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoCampo
