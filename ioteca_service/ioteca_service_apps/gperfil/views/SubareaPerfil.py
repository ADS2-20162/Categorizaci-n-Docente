from rest_framework import viewsets
from ..serializers.SubareaPerfil import *
from ..models.SubareaPerfil import *


class SubareaPerfilViewSet(viewsets.ModelViewSet):
    queryset = SubareaPerfil.objects.all()
    serializer_class = SubareaPerfilSerializer

    def get_queryset(self):
        try:
            areaperfil = self.request.GET.get('areaperfil')

            if areaperfil:
                queryset = SubareaPerfil.objects.filter(
                    areaperfil__id=areaperfil)
            else:
                queryset = SubareaPerfil.objects.all()

        except Exception as e:
            queryset = SubareaPerfil.objects.all()

        return queryset
