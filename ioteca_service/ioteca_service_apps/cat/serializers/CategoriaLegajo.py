from rest_framework import serializers
from ..models.CategoriaLegajo import CategoriaLegajo


class CategoriaLegajoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoriaLegajo
