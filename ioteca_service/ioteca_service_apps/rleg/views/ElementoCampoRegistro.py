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
    # parser_classes = (MultiPartParser, FormParser,)

    def get_queryset(self):
        try:
            elemento_campo = self.request.GET.get('elemento_campo_id')
            print(elemento_campo)
            if elemento_campo:
                return ElementoCampoRegistro.objects.filter(elemento_campo_id=elemento_campo)

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

    # def post(self, request, format=None, *args, **kwargs):
    #     return Response({'raw': request.data, 'data': request._request.POST,
    #                      'files': str(request._request.FILES)})
        # return sub_item
    def create(self, request, pk=None):
        print(request.data)
        is_many = True if isinstance(request.data, list) else False
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    # def delete(self, request, *args, **kwargs):
    #     for x in request.GET:
    #         myDict = request.GET.get("%s" % x)
    #         ElementoCampoRegistro.objects.filter(id=myDict).delete()
    #         # self.perform_destroy(Dimension_Categoria.objects.filter(id=myDict))
    #         return Response(status=status.HTTP_204_NO_CONTENT)
