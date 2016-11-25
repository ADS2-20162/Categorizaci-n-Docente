from django.contrib import admin
from .models.TipoInstitucion import TipoInstitucion
from .models.Institucion import Institucion
from .models.CategoriaAcademica import CategoriaAcademica
from .models.CargoOcupado import CargoOcupado
from .models.Pais import Pais
from .models.Departamento import Departamento
from .models.Provincia import Provincia
from .models.Distrito import Distrito
from .models.CodigoPostal import CodigoPostal
from .models.GradoAcademico import GradoAcademico
from .models.Especialidad import Especialidad
from .models.ProcesoGradoAcademico import ProcesoGradoAcademico
from .models.TipoNivel import TipoNivel
from .models.Idioma import Idioma
from .models.Dimension import Dimension
from .models.DimensionNivel import DimensionNivel
from .models.Nivel import Nivel
from .models.Elemento import Elemento
from .models.TipoCampo import TipoCampo
from .models.Campo import Campo
from .models.PropiedadForm import PropiedadForm
from .models.CampoPropiedadForm import CampoPropiedadForm
from .models.CampoPredefinido import CampoPredefinido
from .models.DataCampo import DataCampo
from .models.DataCampoOpcion import DataCampoOpcion
from .models.RegimenPension import RegimenPension

# Register your models here.

admin.site.register(Elemento)
admin.site.register(DataCampo)
admin.site.register(DataCampoOpcion)

admin.site.register(TipoCampo)
admin.site.register(Campo)
admin.site.register(PropiedadForm)
admin.site.register(CampoPropiedadForm)

admin.site.register(CampoPredefinido)
admin.site.register(TipoInstitucion)
admin.site.register(Institucion)
admin.site.register(CategoriaAcademica)
admin.site.register(RegimenPension)
admin.site.register(CargoOcupado)
admin.site.register(Pais)
admin.site.register(Departamento)
admin.site.register(Provincia)
admin.site.register(Distrito)
admin.site.register(CodigoPostal)
admin.site.register(GradoAcademico)
admin.site.register(Especialidad)
admin.site.register(ProcesoGradoAcademico)
admin.site.register(TipoNivel)
admin.site.register(Idioma)
admin.site.register(Dimension)
admin.site.register(DimensionNivel)
admin.site.register(Nivel)
