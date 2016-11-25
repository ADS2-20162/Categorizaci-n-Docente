from rest_framework import serializers, viewsets
from rest_framework.response import Response
from ..models.Registro import Registro
from ..serializers.Registro import RegistroSerializer


class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

    def get_queryset(self):
        queryset = Registro.objects.all()
        try:
            id_competencia = self.request.GET.get('compet')
            id_escala = self.request.GET.get('esc')

            if id_competencia:
                queryset = queryset.filter(
                    competenciaperfil_id=id_competencia,
                    escaladimension_id=id_escala)

        except Exception as e:
            raise e
        return queryset
