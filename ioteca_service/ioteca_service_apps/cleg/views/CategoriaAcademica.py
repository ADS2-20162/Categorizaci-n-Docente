from rest_framework import viewsets
from ..serializers.CategoriaAcademica import CategoriaAcademicaSerializer
from ..models.CategoriaAcademica import CategoriaAcademica

class CategoriaAcademicaViewSet(viewsets.ModelViewSet):
    queryset = CategoriaAcademica.objects.all()
    serializer_class = CategoriaAcademicaSerializer

    def get_queryset(self):
        try:
            campo_predefinido = self.request.GET.get('campopre')
            if campo_predefinido:
                queryset = CategoriaAcademica.objects.filter(campo_predefinido__id=campo_predefinido)
            else:
                queryset = CategoriaAcademica.objects.all()

        except Exception as e:
            queryset = CategoriaAcademica.objects.all()

        return queryset
