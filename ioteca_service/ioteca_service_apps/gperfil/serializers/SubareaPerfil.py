from rest_framework import serializers
from ..models.AreaPerfil import AreaPerfil
from ..models.Subarea import Subarea
from ..models.SubareaPerfil import SubareaPerfil


class SubareaPerfilSerializer(serializers.ModelSerializer):
    areaperfil = serializers.SlugRelatedField(
        slug_field='id', queryset=AreaPerfil.objects.all())
    subarea = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Subarea.objects.all())
    subarea_id = serializers.CharField(
        source="subarea.id", read_only=True)

    class Meta:
        model = SubareaPerfil
        fields = ('id', 'areaperfil', 'subarea_id', 'subarea', 'created_at', 'updated_at')
