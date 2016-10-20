from django.conf.urls import url, include
from rest_framework import routers
from .views.ElementoCampo import ElementoCampoViewSet
from .views.ElementoCampoPredefinido import ElementoCampoPredefinidoViewSet
from .views.ElementoCampoRegistro import ElementoCampoRegistroViewSet
from .views.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistroViewSet

router = routers.DefaultRouter()
router.register(r'elementoCampos', ElementoCampoViewSet)
router.register(r'elementoCampoPredefinidos', ElementoCampoPredefinidoViewSet)
router.register(r'elementoCampoRegistro', ElementoCampoRegistroViewSet)
router.register(r'elementoCampoPredefinidoRegistro',ElementoCampoPredefinidoRegistroViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
]
