from rest_framework import serializers
from ..models.SubareaPerfil import SubareaPerfil
from ..models.Competencia import Competencia
from ..models.CompetenciaPerfil import CompetenciaPerfil

class CompetenciaPerfilSerializer(serializers.ModelSerializer):
    # subareaperfil = serializers.CharField(source='subareaperfil.subarea')
    subarea_nombre = serializers.CharField(source='subareaperfil.subarea.nombre', read_only=True)
    subareaperfil = serializers.SlugRelatedField(slug_field='id', queryset=SubareaPerfil.objects.all())
    competencia = serializers.SlugRelatedField(slug_field='nombre', queryset=Competencia.objects.all())
    class Meta:
        model = CompetenciaPerfil
        fields =('id','subareaperfil','subarea_nombre' ,'competencia','ponderado','created_at','updated_at')

