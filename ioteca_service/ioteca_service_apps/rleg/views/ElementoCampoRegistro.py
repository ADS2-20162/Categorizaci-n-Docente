from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import (
    FileUploadParser, FormParser, JSONParser, MultiPartParser
)
from django.shortcuts import render, get_object_or_404, render_to_response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from rest_framework.response import Response
from ioteca_service_apps.cat.models import Persona
from ..serializers.ElementoCampoRegistro import ElementoCampoRegistroSerializer
from ..models.ElementoCampoRegistro import ElementoCampoRegistro

class ElementoCampoRegistroViewSet(viewsets.ModelViewSet):
    queryset = ElementoCampoRegistro.objects.all()
    serializer_class = ElementoCampoRegistroSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get_queryset(self):
        try:
            subitem = self.request.GET.get('subitem')
            persona = self.request.GET.get('persona')
            print(subitem)
            if subitem:
                return ElementoCampoRegistro.objects.filter(elemento_campo__elemento__sub_item__nombre=subitem)
            elif persona:
                return ElementoCampoRegistro.objects.filter(persona__id=persona)

        except Exception as e:
            print(e)

        try:
            persona = self.request.GET.get('persona')
            if persona:
                queryset = ElementoCampoRegistro.objects.filter(persona__nombres=persona)
            else:
                queryset = ElementoCampoRegistro.objects.all()

        except Exception as e:
            queryset = ElementoCampoRegistro.objects.all()

        return queryset

    def create(self, request, *args, **kwargs):
        print(request.data)
        is_many = True if isinstance(request.data, list) else False

        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def delete(self, request, *args, **kwargs):
        # print(request.GET)
        # a = dict(request.GET)
        # for value in a.values():
        #     b = value[0]
        #     print(b)
        # for x in request.GET:
        #     myDict = request.GET.get("%s" % x)
        # ElementoCampoRegistro.objects.filter(id=myDict).delete()
        # return Response(status=status.HTTP_204_NO_CONTENT)
