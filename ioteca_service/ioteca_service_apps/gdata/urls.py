from django.conf.urls import url, include
from rest_framework import routers
from .views.Registro import RegistroViewSet
from .views.Adjunto import AdjuntoViewSet
from .views.Observacion import ObservacionViewSet
from .views.RegistroDetalle import RegistroDetalleViewSet

router = routers.DefaultRouter()
router.register(r'registros', RegistroViewSet)
router.register(r'adjuntos', AdjuntoViewSet)
router.register(r'observaciones', ObservacionViewSet)
router.register(r'registrodetalles', RegistroDetalleViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
]
