from rest_framework import serializers
from ioteca_service_apps.cleg.models.Elemento import Elemento
from ioteca_service_apps.cleg.models.CampoPredefinido import CampoPredefinido
from ..models.ElementoCampoPredefinido import ElementoCampoPredefinido


class ElementoCampoPredefinidoSerializer(serializers.ModelSerializer):
    elemento = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Elemento.objects.all())
    campo_predefinido = serializers.SlugRelatedField(
        slug_field='nombre', queryset=CampoPredefinido.objects.all())

    class Meta:
        model = ElementoCampoPredefinido
        fields = ('id', 'elemento', 'campo_predefinido')
