import logging
from django.utils.encoding import force_text
from rest_framework import serializers, viewsets
# from django.db.models import Q
# from operator import __or__ as OR
# from functools import reduce
from rest_framework.response import Response
# from rest_framework.decorators import detail_route, list_route
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework import status
from ioteca_service_apps.utils.security import log_params
from rest_framework.parsers import (
    FileUploadParser, FormParser, JSONParser, MultiPartParser
)
from ioteca_service_apps.utils.permissions import ModelPermission

from ioteca_service_apps.auths.PhotoUser import PhotoUser
from ioteca_service_apps.auths.User import User
from .UserView import UserSerializer
# Get an instance of a logger
log = logging.getLogger(__name__)


class PhotoUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    # user = UserSerializer(read_only=True)
    class Meta:
        photo = serializers.ImageField(use_url=True,allow_empty_file=True)
        model = PhotoUser
        fields = ('id','photo','user','created_at','updated_at')

class PhotoUserViewSet(viewsets.ModelViewSet):
    queryset = PhotoUser.objects.all()
    serializer_class = PhotoUserSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get_queryset(self):
        queryset = super(PhotoUserViewSet,self).get_queryset()
        if self.request.user.is_anonymous():
            return queryset
        else:
            return queryset.filter(user__username = self.request.user)
    # def get_queryset(self):
    #     queryset = super(PhotoUserViewSet,self).get_queryset()
    #     serializer = self.serializer_class(queryset, many=True)
    #     for dic in serializer.data:
    #         print(dic.get('id'))
    #         for i in dic.get('users'):
    #             # print(i.get('username'))
    #             if self.request.user.is_anonymous():
    #                 return queryset
    #             else:
    #                 return queryset.filter(id=self.request.user)

    # def list(self, request, *args):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.serializer_class(queryset, many=True)
    #     for dic in serializer.data:
    #         print(dic.get('users')[0].get('username'))
    #         print(request.user)
    #         if dic.get('users')[0].get('username') == request.user:
    #             s = []
    #             s.append(dic)
    #             serializer = s
    #             return Response(serializer)
    #         else:
    #             return Response(serializer.data)
            # for i in dic.get('users'):
            #     print(i.get('username'))
            #     if i.get('username') == self.request.user:
            #         s = []
            #         s.append(dic)
            #         serializer = s
                    # print(serializer)
                    # return Response(serializer)
                # else:
                    # print(serializer.data)
