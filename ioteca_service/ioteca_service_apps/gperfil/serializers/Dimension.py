from rest_framework import serializers
from ..models.Dimension import *


class DimensionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dimension
