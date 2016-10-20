from rest_framework import serializers
from ..models.CategoriaAcademica import CategoriaAcademica
from ..models.CampoPredefinido import CampoPredefinido


class CategoriaAcademicaSerializer(serializers.ModelSerializer):
    campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

    class Meta:
        model = CategoriaAcademica
        fields = ('id', 'nombre', 'sigla', 'descripcion', 'estado', 'campo_predefinido')
