from rest_framework import viewsets
from ..serializers.CompetenciaPerfil import CompetenciaPerfilSerializer
from ..models.CompetenciaPerfil import *


class CompetenciaPerfilViewSet(viewsets.ModelViewSet):
    queryset = CompetenciaPerfil.objects.all()
    serializer_class = CompetenciaPerfilSerializer

    def get_queryset(self):
        queryset = CompetenciaPerfil.objects.all()
        try:
            subareaperfil = self.request.GET.get('subareaperfil')
            id_competencia = self.request.GET.get('competencia')
            aperfil = self.request.GET.get('aperfil')
            subarea = self.request.GET.get('subarea')
            # print("***************************")
            # print(subarea)
            # print("***************************")

            if subareaperfil:

                queryset = queryset.filter(
                    subareaperfil__id=subareaperfil)

            if id_competencia:

                queryset = queryset.raw('SELECT cp.id, sa.nombre, cp.ponderado FROM gperfil_competenciaperfil cp '
                                        'INNER JOIN gperfil_competencia c ON c.id = cp.competencia_id '
                                        'INNER JOIN gperfil_subareaperfil sap ON sap.id = cp.subareaperfil_id '
                                        'INNER JOIN gperfil_subarea sa ON sa.id = sap.subarea_id '
                                        'INNER JOIN gperfil_areaperfil ap ON ap.id = sap.areaperfil_id '
                                        'INNER JOIN gperfil_perfil p ON p.id = ap.perfil_id '
                                        'INNER JOIN gperfil_area a ON a.id = ap.area_id '
                                        'WHERE ap.id = %s' % (id_competencia,))

            if aperfil:
                queryset = queryset.filter(
                    subareaperfil__areaperfil__id=aperfil)

        except Exception as e:
            raise e

        return queryset
