from rest_framework import serializers
from ..models.Competencia import *

class CompetenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competencia
