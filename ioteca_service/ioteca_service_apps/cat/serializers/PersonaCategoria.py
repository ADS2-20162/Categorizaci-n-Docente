from rest_framework import serializers
from ..models.PersonaCategoria import PersonaCategoria
from ..models.Persona import Persona
from ..models.CategoriaLegajo import CategoriaLegajo


class PersonaCategoriaSerializer(serializers.ModelSerializer):
    persona = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Persona.objects.all())
    categoria_legajo = serializers.SlugRelatedField(
        slug_field='nombre_categoria', queryset=CategoriaLegajo.objects.all())

    class Meta:
        model = PersonaCategoria
        fields = ('id', 'persona', 'categoria_legajo',
                  'estado')
