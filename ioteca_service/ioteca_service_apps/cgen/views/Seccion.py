from rest_framework import serializers, viewsets
from rest_framework.response import Response
from ..serializers.Seccion import SeccionSerializer
from ..models.Seccion import Seccion


class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    serializer_class = SeccionSerializer

    def get_queryset(self):
        try:
            subitem = self.request.GET.get('subitem')
            if subitem:

                queryset = Seccion.objects.filter(subitem__id=subitem)
            else:
                queryset = Seccion.objects.all()

        except Exception as e:
            queryset = Seccion.objects.all()

        return queryset