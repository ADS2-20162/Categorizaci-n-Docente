from django.conf.urls import url, include
from rest_framework import routers
from .views.Area import AreaViewSet
from .views.AreaPerfil import AreaPerfilViewSet
from .views.Competencia import CompetenciaViewSet
from .views.CompetenciaPerfil import CompetenciaPerfilViewSet
from .views.Dimension import DimensionViewSet
from .views.DimensionPerfil import DimensionPerfilViewSet
from .views.Escala import EscalaViewSet
from .views.EscalaDimension import EscalaDimensionViewSet
from .views.Perfil import PerfilViewSet
from .views.Subarea import SubareaViewSet
from .views.SubareaPerfil import SubareaPerfilViewSet


router = routers.DefaultRouter()
router.register(r'areas', AreaViewSet)
router.register(r'areaperfiles', AreaPerfilViewSet)
router.register(r'competencias', CompetenciaViewSet)
router.register(r'competenciaperfiles', CompetenciaPerfilViewSet)
router.register(r'dimensiones', DimensionViewSet)
router.register(r'dimensionperfiles', DimensionPerfilViewSet)
router.register(r'escalas', EscalaViewSet)
router.register(r'escaladimensiones', EscalaDimensionViewSet)
router.register(r'perfiles', PerfilViewSet)
router.register(r'subareas', SubareaViewSet)
router.register(r'subareaperfiles', SubareaPerfilViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
