from rest_framework import  viewsets
from ..serializers.AreaPerfil import AreaPerfilSerializer
from ..models.AreaPerfil import AreaPerfil

class AreaPerfilViewSet(viewsets.ModelViewSet):
    queryset = AreaPerfil.objects.all()
    serializer_class = AreaPerfilSerializer

    def get_queryset(self):
        try:
            perfil = self.request.GET.get('perfil')
            if perfil:

                queryset = AreaPerfil.objects.filter(perfil__id=perfil)
            else:
                queryset = AreaPerfil.objects.all()

        except Exception as e:
            queryset = AreaPerfil.objects.all()

        return queryset
