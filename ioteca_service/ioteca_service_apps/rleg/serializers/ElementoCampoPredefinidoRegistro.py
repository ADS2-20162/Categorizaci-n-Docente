from rest_framework import serializers
from ..models.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistro
from ..models.ElementoCampoPredefinido import ElementoCampoPredefinido
from ioteca_service_apps.cat.models.Persona import Persona

class ElementoCampoPredefinidoRegistroSerializer(serializers.ModelSerializer):
    elemento_campo_pred = serializers.SlugRelatedField(slug_field='elemento.nombre', queryset=ElementoCampoPredefinido)
    persona = serializers.SlugRelatedField(slug_field='nombres',queryset=Persona.objects.all())

    class Meta:
        model = ElementoCampoPredefinidoRegistro
        fields = ('id','elemento_campo_pred','persona','data')
