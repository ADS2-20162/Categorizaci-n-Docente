from rest_framework import serializers
from ..models.Persona import Persona
from ..models.EstadoCivil import EstadoCivil
from ..models.Nacionalidad import Nacionalidad


class PersonaSerializer(serializers.ModelSerializer):
    estado_civil = serializers.SlugRelatedField(
        slug_field='nombre', queryset=EstadoCivil.objects.all())
    nacionalidad = serializers.SlugRelatedField(
        slug_field='nombre', queryset=Nacionalidad.objects.all())

    class Meta:
        model = Persona
        fields = ('id', 'nombres', 'ap_paterno', 'ap_materno', 'direccion', 'doc_ident', 'celular',
                  'email', 'fecha_nac', 'lugar_nac', 'estado_civil', 'nacionalidad', 'created_at', 'updated_at')
