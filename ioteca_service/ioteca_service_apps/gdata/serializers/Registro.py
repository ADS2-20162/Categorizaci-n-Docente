from rest_framework import serializers
from ..models.Registro import Registro
from ioteca_service_apps.gperfil.models.EscalaDimension import EscalaDimension
from ioteca_service_apps.gperfil.models.CompetenciaPerfil import CompetenciaPerfil


class RegistroSerializer(serializers.ModelSerializer):

    escaladimension = serializers.SlugRelatedField(
        slug_field='id', queryset=EscalaDimension.objects.all())
    escdim_puntaje= serializers.IntegerField(source="escaladimension.puntaje", read_only=True)
    competenciaperfil = serializers.SlugRelatedField(
        slug_field='id', queryset=CompetenciaPerfil.objects.all())
    comperfil_puntaje= serializers.IntegerField(source="competenciaperfil.ponderado", read_only=True)

    class Meta:
        model = Registro
        fields = ('id', 'estado_data', 'escaladimension', 'escdim_puntaje', 'comperfil_puntaje',
                  'competenciaperfil', 'estado')
