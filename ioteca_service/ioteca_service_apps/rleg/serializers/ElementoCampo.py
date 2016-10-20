from rest_framework import serializers
from ioteca_service_apps.cleg.models.Elemento import Elemento
from ioteca_service_apps.cleg.serializers.Elemento import ElementoSerializer
from ioteca_service_apps.cleg.models.Campo import Campo
from ..models.ElementoCampo import ElementoCampo


class ElementoCampoSerializer(serializers.ModelSerializer):
    elemento = ElementoSerializer(read_only=True)
    set_elemento = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Elemento.objects.all(),source='elemento')
    campo = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Campo.objects.all())
    # elemento = ElementoSerializer(read_only=True)
    class Meta:
        model = ElementoCampo
        fields = ('id', 'nombre', 'set_elemento', 'elemento','campo')
