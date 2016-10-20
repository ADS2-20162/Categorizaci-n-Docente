from rest_framework import serializers
from ..models.Escala import *

class EscalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escala
