from rest_framework import viewsets
from ..serializers.RegistroDetalle import RegistroDetalleSerializer
from ..models.RegistroDetalle import RegistroDetalle


class RegistroDetalleViewSet(viewsets. ModelViewSet):
    queryset = RegistroDetalle.objects.all()
    serializer_class = RegistroDetalleSerializer
