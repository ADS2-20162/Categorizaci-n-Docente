from rest_framework import serializers
from ..models.Area import Area


class AreaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Area
