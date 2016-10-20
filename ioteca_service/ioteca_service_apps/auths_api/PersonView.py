import logging
from django.utils.encoding import force_text
from rest_framework import serializers, viewsets
# from django.db.models import Q
# from operator import __or__ as OR
# from functools import reduce
from rest_framework.response import Response
# from rest_framework.decorators import detail_route, list_route
from rest_framework import permissions
# from rest_framework import decorators
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework import status
# from ioteca_service_apps.utils.serializers import RecursiveSerializer
# from ioteca_service_apps.utils.pagination import LocalPagination
from ioteca_service_apps.utils.security import log_params
from ioteca_service_apps.utils.permissions import ModelPermission

from ioteca_service_apps.auths.Person import Person
# from ioteca_service_apps.cat.serializers.Persona import PersonaSerializer
# Get an instance of a logger
log = logging.getLogger(__name__)


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id','national_id_doc','first_name','other_names','last_name','mother_last_name','birth_date','created_at','updated_at','registered_by')

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
