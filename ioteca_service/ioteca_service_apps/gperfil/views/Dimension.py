from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce

from ..models.Dimension import Dimension
from ..serializers.Dimension import DimensionSerializer


class DimensionViewSet(viewsets.ModelViewSet):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

    def get_queryset(self):
        try:
            id_dimension = self.request.GET.get('dimension')
            print(id_dimension)

            if id_dimension:

                queryset = Dimension.objects.raw('SELECT d.id, d.nombre FROM gperfil_dimension d '
                                                 'INNER JOIN gperfil_perfil p ON p.id = dp.perfil_id '
                                                 'INNER JOIN gperfil_dimensionperfil dp ON dp.dimension_id = d.id '
                                                 'INNER JOIN gperfil_areaperfil ap ON ap.perfil_id = p.id '
                                                 'INNER JOIN gperfil_area a ON a.id = ap.area_id '
                                                 'WHERE ap.id = %s' % (id_dimension,))
            else:
                queryset = Dimension.objects.all()

        except Exception as e:
            queryset = Dimension.objects.all()

        return queryset
