from rest_framework import serializers
from ..models.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistro
from ..models.ElementoCampoPredefinido import ElementoCampoPredefinido
from .ElementoCampoPredefinido import ElementoCampoPredefinidoSerializer
from ioteca_service_apps.cat.models.Persona import Persona

class ElementoCampoPredefinidoRegistroSerializer(serializers.ModelSerializer):
    elemento_campo_pred = ElementoCampoPredefinidoSerializer(read_only = True)
    set_elemento_campo_pred = serializers.PrimaryKeyRelatedField(write_only=True, queryset=ElementoCampoPredefinido.objects.all(), source='elemento_campo_pred')
    persona = serializers.SlugRelatedField(slug_field='nombres',queryset=Persona.objects.all())

    class Meta:
        model = ElementoCampoPredefinidoRegistro
