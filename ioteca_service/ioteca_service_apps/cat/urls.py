from django.conf.urls import url, include
from rest_framework import routers
from .views.Persona import PersonaViewSet
from .views.Nacionalidad import NacionalidadViewSet
from .views.EstadoCivil import EstadoCivilViewSet
from .views.PersonaCategoria import PersonaCategoriaViewSet
from .views.CategoriaLegajoDetalle import CategoriaLegajoDetalleViewSet
from .views.CategoriaLegajo import CategoriaLegajoViewSet

router = routers.DefaultRouter()
router.register(r'estadoCiviles', EstadoCivilViewSet)
router.register(r'nacionalidades', NacionalidadViewSet)
router.register(r'personas', PersonaViewSet)
router.register(r'personaCategorias', PersonaCategoriaViewSet)
router.register(r'categoriaLegajoDetalles', CategoriaLegajoDetalleViewSet)
router.register(r'categoriaLegajos', CategoriaLegajoViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
]
