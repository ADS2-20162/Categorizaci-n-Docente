from rest_framework import serializers
from ..models.CampoPredefinido import CampoPredefinido
from ..models.TipoInstitucion import TipoInstitucion
from ..models.Institucion import Institucion


class InstitucionSerializer(serializers.ModelSerializer):
    tipo_isntitucion = serializers.SlugRelatedField(slug_field='nombre', queryset=TipoInstitucion.objects.all())
    campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

    class Meta:
        model = Institucion
        fields = ('id', 'nombre','direccion', 'telefono', 'email', 'descripcion', 'estado', 'tipo_isntitucion', 'campo_predefinido')
