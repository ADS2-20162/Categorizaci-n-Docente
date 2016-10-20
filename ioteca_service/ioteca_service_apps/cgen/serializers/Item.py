from rest_framework import serializers
from ..models.Item import Item
from .SubItem import SubItemSerializer


class ItemSerializer(serializers.ModelSerializer):
    subitems = SubItemSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ('id', 'nombre', 'descripcion', 'estado',
                  'subitems', 'created_at', 'updated_at')
