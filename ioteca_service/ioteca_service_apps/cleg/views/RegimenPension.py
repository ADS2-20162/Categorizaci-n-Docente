from rest_framework import viewsets
from ..serializers.RegimenPension import RegimenPensionSerializer
from ..models.RegimenPension import RegimenPension

class RegimenPensionViewSet(viewsets.ModelViewSet):
    queryset = RegimenPension.objects.all()
    serializer_class = RegimenPensionSerializer

    def get_queryset(self):
        try:
            campo_predefinido = self.request.GET.get('campo_predefinido')
            if campo_predefinido:
                queryset = RegimenPension.objects.filter(campo_predefinido__id=campo_predefinido)
            else:
                queryset = RegimenPension.objects.all()

        except Exception as e:
            queryset = RegimenPension.objects.all()

        return queryset
