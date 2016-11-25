from rest_framework import serializers
from ..models.Adjunto import Adjunto


class AdjuntoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Adjunto
        fields = '__all__'
