from rest_framework import serializers
from ..models.Adjunto import Adjunto
from ..models.Registro import Registro


class AdjuntoSerializer(serializers.ModelSerializer):
    registro = serializers.SlugRelatedField(
        slug_field='id', queryset=Registro.objects.all())

    class Meta:
        model = Adjunto
        fields = ('id', 'url', 'registro')
