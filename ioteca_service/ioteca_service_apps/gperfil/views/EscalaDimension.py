from rest_framework import viewsets
from ..serializers.EscalaDimension import *
from ..models.EscalaDimension import *


class EscalaDimensionViewSet(viewsets.ModelViewSet):
    queryset = EscalaDimension.objects.all()
    serializer_class = EscalaDimensionSerializer

    def get_queryset(self):
        queryset = EscalaDimension.objects.all()
        try:
            dimensionperfil = self.request.GET.get('dimensionperfil')
            perfil = self.request.GET.get('perfil')

            if perfil:
                queryset = queryset.filter(dimensionperfil__perfil__id=perfil)
            if dimensionperfil:
                queryset = queryset.filter(dimensionperfil__id=dimensionperfil)

        except Exception as e:
            raise e

        return queryset
