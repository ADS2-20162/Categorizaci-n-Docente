from rest_framework import serializers
from ..models.CategoriaLegajoDetalle import CategoriaLegajoDetalle
from ioteca_service_apps.cgen.models.Item import Item
from ioteca_service_apps.cgen.models.SubItem import SubItem
from ioteca_service_apps.cgen.models.Seccion import Seccion


class CategoriaLegajoDetalleSerializer(serializers.ModelSerializer):
    item = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Item.objects.all())
    sub_item = serializers.SlugRelatedField(
        slug_field='nombre', queryset=SubItem.objects.all())
    seccion = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Seccion.objects.all())

    class Meta:
        model = CategoriaLegajoDetalle
        fields = ('id', 'categoria_legajo', 'item', 'sub_item',
                  'seccion')
