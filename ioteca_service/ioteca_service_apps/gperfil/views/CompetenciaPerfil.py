from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Q
from operator import __or__ as OR
from functools import reduce
from ..serializers.CompetenciaPerfil import CompetenciaPerfilSerializer
from ..models.CompetenciaPerfil import *


class CompetenciaPerfilViewSet(viewsets.ModelViewSet):
    queryset = CompetenciaPerfil.objects.all()
    serializer_class = CompetenciaPerfilSerializer

    # def get_queryset(self):
    #     query = self.request.query_params.get('query', '')
    #     queryall = (Q(nombre__icontains=query),)

    #     queryset = self.queryset.filter(reduce(OR, queryall))
    #     return queryset

    def get_queryset(self):
        try:
            subareaperfil = self.request.GET.get('subareaperfil')
            print("=======================")
            print(subareaperfil)
            print("=======================")
            if subareaperfil:

                queryset = CompetenciaPerfil.objects.filter(
                    subareaperfil__id=subareaperfil)
            else:
                queryset = CompetenciaPerfil.objects.all()

        except Exception as e:
            queryset = CompetenciaPerfil.objects.all()


        try:
            id_competencia = self.request.GET.get('competencia')
            print(id_competencia)
            print("=================================")

            if id_competencia:

                queryset = CompetenciaPerfil.objects.raw('SELECT cp.id, sa.nombre, cp.ponderado FROM gperfil_competenciaperfil cp '
                                                 'INNER JOIN gperfil_competencia c ON c.id = cp.competencia_id '
                                                 'INNER JOIN gperfil_subareaperfil sap ON sap.id = cp.subareaperfil_id '
                                                 'INNER JOIN gperfil_subarea sa ON sa.id = sap.subarea_id '
                                                 'INNER JOIN gperfil_areaperfil ap ON ap.id = sap.areaperfil_id '
                                                 'INNER JOIN gperfil_perfil p ON p.id = ap.perfil_id '
                                                 'INNER JOIN gperfil_area a ON a.id = ap.area_id '
                                                 'WHERE ap.id = %s' % (id_competencia,))
            else:
                queryset = CompetenciaPerfil.objects.all()

        except Exception as e:
            queryset = CompetenciaPerfil.objects.all()

        return queryset
