from rest_framework import serializers
from ..models.SubItem import SubItem
from ..models.Item import Item
from .Seccion import SeccionSerializer


class SubItemSerializer(serializers.ModelSerializer):
    secciones = SeccionSerializer(many=True, read_only=True)
    item = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Item.objects.all())

    class Meta:
        model = SubItem
        fields = ('id', 'nombre', 'descripcion', 'estado',
                  'item', 'secciones', 'created_at', 'updated_at')
