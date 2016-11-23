from rest_framework import serializers
from ioteca_service_apps.cat.models.Persona import Persona
from ioteca_service_apps.cat.serializers.Persona import PersonaSerializer
from ..models.ElementoCampo import ElementoCampo
from ..models.ElementoCampoRegistro import ElementoCampoRegistro
from .ElementoCampo import ElementoCampoSerializer

class ElementoCampoRegistroSerializer(serializers.ModelSerializer):
    elemento_campo = ElementoCampoSerializer(read_only = True)
    # persona = PersonaSerializer(read_only = True)
    set_elemento_campo = serializers.PrimaryKeyRelatedField(write_only=True,queryset=ElementoCampo.objects.all(),source='elemento_campo')
    # set_persona = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Persona.objects.all(), source='persona')
    # elemento_campo = serializers.SlugRelatedField(slug_field='nombre', queryset=ElementoCampo.objects.all())
    persona = serializers.SlugRelatedField(slug_field='nombres', queryset=Persona.objects.all())

    class Meta:
        # d_imagen = serializers.ImageField(use_url=True,allow_empty_file=True)
        # d_archivo = serializers.FileField(use_url=True,allow_empty_file=True)
        model = ElementoCampoRegistro
        # fields = '__all__'
