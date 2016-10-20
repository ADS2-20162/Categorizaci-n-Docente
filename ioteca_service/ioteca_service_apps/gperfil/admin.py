from django.contrib import admin
from .models.Perfil import Perfil
from .models.Area import Area
from .models.AreaPerfil import AreaPerfil
from .models.Competencia import Competencia
from .models.CompetenciaPerfil import CompetenciaPerfil
from .models.Dimension import Dimension
from .models.DimensionPerfil import DimensionPerfil
from .models.EscalaDimension import EscalaDimension
from .models.Escala import Escala
from .models.Subarea import Subarea
from .models.SubareaPerfil import SubareaPerfil

# class PerfilAdmin(admin.ModelAdmin):

#     list_display = ("nombre", "descripcion", "estado")
#     search_fields = ("nombre",)
#     list_per_page = 3


# class AreaAdmin(admin.ModelAdmin):

#     list_display = ("nombre", "descripcion")
#     search_fields = ("nombre",)
#     list_per_page = 2

admin.site.register(Perfil)
admin.site.register(Area)
admin.site.register(AreaPerfil)
admin.site.register(Escala)
admin.site.register(EscalaDimension)
admin.site.register(Competencia)
admin.site.register(CompetenciaPerfil)
admin.site.register(Dimension)
admin.site.register(DimensionPerfil)
admin.site.register(Subarea)
admin.site.register(SubareaPerfil)
