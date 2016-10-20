from rest_framework import viewsets
from ..serializers.Campo import CampoSerializer
from ..models.Campo import Campo

class CampoViewSet(viewsets.ModelViewSet):
    queryset = Campo.objects.all()
    serializer_class = CampoSerializer

    def get_queryset(self):
        try:
            tipocampo = self.request.GET.get('tipocampo')
            if tipocampo:

                queryset = Campo.objects.filter(tipo_campo__id=tipocampo)
            else:
                queryset = Campo.objects.all()

        except Exception as e:
            queryset = Campo.objects.all()

        return queryset
