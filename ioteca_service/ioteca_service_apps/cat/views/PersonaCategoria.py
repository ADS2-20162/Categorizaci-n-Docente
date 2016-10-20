from rest_framework import serializers, viewsets
from ..serializers.PersonaCategoria import PersonaCategoriaSerializer
from ..models.PersonaCategoria import PersonaCategoria


class PersonaCategoriaViewSet(viewsets.ModelViewSet):
    queryset = PersonaCategoria.objects.all()
    serializer_class = PersonaCategoriaSerializer
