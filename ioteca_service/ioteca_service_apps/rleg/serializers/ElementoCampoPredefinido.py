from rest_framework import serializers
from ioteca_service_apps.cleg.models.Elemento import Elemento
from ioteca_service_apps.cleg.models.CampoPredefinido import CampoPredefinido
from ioteca_service_apps.cleg.serializers.Elemento import ElementoSerializer
from ioteca_service_apps.cleg.serializers.CampoPredefinido import CampoPredefinidoSerializer
from ..models.ElementoCampoPredefinido import ElementoCampoPredefinido


class ElementoCampoPredefinidoSerializer(serializers.ModelSerializer):
    # elemento = serializers.SlugRelatedField(
    #     slug_field='nombre', queryset=Elemento.objects.all())
    elemento = ElementoSerializer(read_only = True)
    set_elemento = serializers.PrimaryKeyRelatedField(write_only=True,queryset=Elemento.objects.all(),source='elemento')
    campo_predefinido = CampoPredefinidoSerializer(read_only = True)
    set_campo_predefinido = serializers.PrimaryKeyRelatedField(write_only=True,queryset=CampoPredefinido.objects.all(),source='campo_predefinido')
    # campo_predefinido = serializers.SlugRelatedField(
    #     slug_field='nombre', queryset=CampoPredefinido.objects.all())

    class Meta:
        model = ElementoCampoPredefinido
        # fields = ('id', 'elemento', 'campo_predefinido','elem')
