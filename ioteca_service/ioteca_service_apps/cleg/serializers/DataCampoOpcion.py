from rest_framework import serializers
from ..models.DataCampo import DataCampo
from ..models.DataCampoOpcion import DataCampoOpcion
from ..serializers.DataCampo import DataCampoSerializer

class DataCampoOpcionSerializer(serializers.ModelSerializer):
    # data_campo = DataCampoSerializer(read_only = True)
    # set_data_campo = serializers.PrimaryKeyRelatedField(write_only=True, queryset=DataCampo.objects.all(),source='data_campo')
    data_campo = serializers.SlugRelatedField(slug_field='nombre', queryset=DataCampo.objects.all())

    class Meta:
        model = DataCampoOpcion
        fields = '__all__'
