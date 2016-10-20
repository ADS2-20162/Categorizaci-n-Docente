from rest_framework import serializers
from ..models.Subarea import *

class SubareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subarea
