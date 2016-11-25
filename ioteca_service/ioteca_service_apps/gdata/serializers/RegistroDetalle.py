from rest_framework import serializers
from ..models.RegistroDetalle import RegistroDetalle
from ..models.Adjunto import Adjunto
from ..models.Registro import Registro


class RegistroDetalleSerializer(serializers.ModelSerializer):
    registro = serializers.SlugRelatedField(
        slug_field='id', queryset=Registro.objects.all())
    adjunto = serializers.SlugRelatedField(
        slug_field='url', queryset=Adjunto.objects.all())

    class Meta:
        model = RegistroDetalle
        fields = ('id', 'registro', 'adjunto')
