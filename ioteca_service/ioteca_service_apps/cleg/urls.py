from django.conf.urls import url, include
from rest_framework import routers
from .views.TipoCampo import TipoCampoViewSet
from .views.Campo import CampoViewSet
from .views.CampoPredefinido import CampoPredefinidoViewSet
from .views.CategoriaAcademica import CategoriaAcademicaViewSet
from .views.RegimenPension import RegimenPensionViewSet
from .views.PropiedadForm import PropiedadFormViewSet
from .views.CargoOcupado import CargoOcupadoViewSet
from .views.CodigoPostal import CodigoPostalViewSet
from .views.Elemento import ElementoViewSet
from .views.DataCampo import DataCampoViewSet
from .views.DataCampoOpcion import DataCampoOpcionViewSet
from .views.CampoPropiedadForm import CampoPropiedadFormViewSet
from .views.Distrito import DistritoViewSet
from .views.Provincia import ProvinciaViewSet
from .views.Departamento import DepartamentoViewSet
from .views.Pais import PaisViewSet
from .views.TipoNivel import TipoNivelViewSet
from .views.Nivel import NivelViewSet
from .views.DimensionNivel import DimensionNivelViewSet
from .views.Dimension import DimensionViewSet
from .views.Idioma import IdiomaViewSet
from .views.Especialidad import EspecialidadViewSet
from .views.TipoInstitucion import TipoInstitucionViewSet
from .views.Institucion import InstitucionViewSet
from .views.GradoAcademico import GradoAcademicoViewSet
from .views.ProcesoGradoAcademico import ProcesoGradoAcademicoViewSet

router = routers.DefaultRouter()
router.register(r'tipoCampos', TipoCampoViewSet)
router.register(r'campos', CampoViewSet)
router.register(r'campoPredefinidos', CampoPredefinidoViewSet)
router.register(r'categoriaAcademicas', CategoriaAcademicaViewSet)
router.register(r'regimenPension', RegimenPensionViewSet)
router.register(r'propiedadForms', PropiedadFormViewSet)
router.register(r'cargoOcupados', CargoOcupadoViewSet)
router.register(r'codigoPostales', CodigoPostalViewSet)
router.register(r'elementos', ElementoViewSet)
router.register(r'dataCampos', DataCampoViewSet)
router.register(r'dataCamposOpciones', DataCampoOpcionViewSet)
router.register(r'campoPropiedadForms', CampoPropiedadFormViewSet)
router.register(r'distritos', DistritoViewSet)
router.register(r'provincias', ProvinciaViewSet)
router.register(r'departamentos', DepartamentoViewSet)
router.register(r'paises', PaisViewSet)
router.register(r'tipoNiveles', TipoNivelViewSet)
router.register(r'niveles', NivelViewSet)
router.register(r'dimensionNiveles', DimensionNivelViewSet)
router.register(r'dimensiones', DimensionViewSet)
router.register(r'idiomas', IdiomaViewSet)
router.register(r'especialidades', EspecialidadViewSet)
router.register(r'tipoInstituciones', TipoInstitucionViewSet)
router.register(r'instituciones', InstitucionViewSet)
router.register(r'gradoAcademicos', GradoAcademicoViewSet)
router.register(r'procesoGradoAcademicos', ProcesoGradoAcademicoViewSet)
urlpatterns = [
    url(r'^', include(router.urls)),
    ]
