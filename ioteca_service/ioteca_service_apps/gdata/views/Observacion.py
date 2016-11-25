from rest_framework import serializers, viewsets
from rest_framework.response import Response
from ..models.Observacion import Observacion
from ..serializers.Observacion import ObservacionSerializer


class ObservacionViewSet(viewsets.ModelViewSet):
    queryset = Observacion.objects.all()
    serializer_class = ObservacionSerializer

    def get_queryset(self):
        try:
            id_competencia = self.request.GET.get('competencia')
            id_escala = self.request.GET.get('escala')

            if id_competencia:
                queryset = Observacion.objects.raw('SELECT o.id, o.observacion FROM gdata_observacion o '
                                                   'INNER JOIN gperfil_escaladimension ed ON ed.id = r.escaladimension_id '
                                                   'INNER JOIN gperfil_competenciaperfil cp ON cp.id = r.competenciaperfil_id '
                                                   'INNER JOIN gdata_registro r ON r.id = o.registro_id '
                                                   'WHERE cp.id = %s AND ed.id = %s' % (id_competencia, id_escala,))
            else:
                queryset = Observacion.objects.all()
        except Exception as e:
            queryset = Observacion.objects.all()
        return queryset
