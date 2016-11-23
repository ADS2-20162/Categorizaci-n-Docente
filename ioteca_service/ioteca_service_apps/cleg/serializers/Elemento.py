from rest_framework import serializers
from ioteca_service_apps.cgen.models.Item import Item
from ioteca_service_apps.cgen.models.SubItem import SubItem
from ioteca_service_apps.cgen.models.Seccion import Seccion
from ..models.Elemento import Elemento


class ElementoSerializer(serializers.ModelSerializer):
    item = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Item.objects.all(), 
        required=False)
    sub_item = serializers.SlugRelatedField(
        slug_field='nombre', queryset=SubItem.objects.all())
    seccion = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Seccion.objects.all(), 
        required=False)

    class Meta:
        model = Elemento
        fields = ('id', 'nombre', 'item', 'sub_item', 'seccion')
