from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.Persona import PersonaSerializer
from ..models.Persona import Persona
import json
from django.core.serializers.json import DjangoJSONEncoder

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

    def get_queryset(self):
        queryset = super(PersonaViewSet,self).get_queryset()
        if self.request.user.is_anonymous():
            return queryset
        else:
            return queryset.filter(person__id = self.request.user.person.id)
        # try:
        #     estadocivil = self.request.GET.get('estadocivil')
        #     if estadocivil:
        #         queryset = Persona.objects.filter(estado_civil__id=estadocivil)
        #         # if not(queryset):
        #         #     queryset = Persona.objects.all()
        #     else:
        #         queryset = Persona.objects.all()

        # except Exception as e:
        #     queryset = Persona.objects.all()
