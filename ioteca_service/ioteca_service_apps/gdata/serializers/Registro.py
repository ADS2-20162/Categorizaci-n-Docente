from rest_framework import serializers
from ..models.Registro import Registro
from ioteca_service_apps.gperfil.models.EscalaDimension import EscalaDimension
from ioteca_service_apps.gperfil.models.CompetenciaPerfil import CompetenciaPerfil


class RegistroSerializer(serializers.ModelSerializer):

    escaladimension = serializers.SlugRelatedField(
        slug_field='id', queryset=EscalaDimension.objects.all())
    competenciaperfil = serializers.SlugRelatedField(
        slug_field='id', queryset=CompetenciaPerfil.objects.all())

    class Meta:
        model = Registro
        fields = ('id', 'estado_data', 'escaladimension',
                  'competenciaperfil', 'estado')
