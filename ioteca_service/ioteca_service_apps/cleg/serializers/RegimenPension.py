from rest_framework import serializers
from ..models.RegimenPension import RegimenPension
from ..models.CampoPredefinido import CampoPredefinido

class RegimenPensionSerializer(serializers.ModelSerializer):
    campo_predefinido = serializers.SlugRelatedField(slug_field='nombre', queryset=CampoPredefinido.objects.all())

    class Meta:
        model = RegimenPension
