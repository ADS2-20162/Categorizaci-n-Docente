from rest_framework import serializers
from ioteca_service_apps.rleg.models.ElementoCampo import ElementoCampo
from ..models.DataCampo import DataCampo


class DataCampoSerializer(serializers.ModelSerializer):
    elemento_campo = serializers.SlugRelatedField(
        slug_field='nombre', queryset=ElementoCampo.objects.all())

    class Meta:
        model = DataCampo
        fields = ('id', 'nombre', 'elemento_campo')
