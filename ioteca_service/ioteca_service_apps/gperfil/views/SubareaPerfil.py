from rest_framework import viewsets
from ..serializers.SubareaPerfil import *
from ..models.SubareaPerfil import *


class SubareaPerfilViewSet(viewsets.ModelViewSet):
    queryset = SubareaPerfil.objects.all()
    serializer_class = SubareaPerfilSerializer

    def get_queryset(self):
        queryset = SubareaPerfil.objects.all()
        try:
            aperfil_id = self.request.GET.get('areaperfil')
            perfil = self.request.GET.get('perfil')

            if perfil:
                queryset = queryset.filter(areaperfil__perfil__id=perfil)
            if aperfil_id:
                queryset = queryset.filter(areaperfil__id=aperfil_id)

        except Exception as e:
            raise e

        return queryset
