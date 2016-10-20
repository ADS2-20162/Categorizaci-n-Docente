from rest_framework import serializers
from ..models.Registro import Registro
from ..models.Observacion import Observacion


class ObservacionSerializer(serializers.ModelSerializer):
    registro = serializers.SlugRelatedField(
        slug_field='id', queryset=Registro.objects.all())

    class Meta:
        model = Observacion
        fields = ('id', 'observacion', 'registro', 'estado')
