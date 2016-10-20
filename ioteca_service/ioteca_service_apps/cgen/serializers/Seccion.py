from rest_framework import serializers
from ..models.SubItem import SubItem
from ..models.Seccion import Seccion


class SeccionSerializer(serializers.ModelSerializer):
    subitem = serializers.SlugRelatedField(
        slug_field='nombre', queryset=SubItem.objects.all())

    class Meta:
        model = Seccion
        fields = ('id', 'nombre', 'descripcion', 'estado',
                  'subitem', 'created_at', 'updated_at')
