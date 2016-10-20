from rest_framework import serializers
from ..models.Perfil import Perfil

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
