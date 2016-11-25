from django.contrib import admin
from .models.Nacionalidad import Nacionalidad
from .models.EstadoCivil import EstadoCivil
from .models.Persona import Persona
from .models.CategoriaLegajo import CategoriaLegajo
from .models.PersonaCategoria import PersonaCategoria
from .models.CategoriaLegajoDetalle import CategoriaLegajoDetalle


class PersonaAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Datos Principales', {'fields': ['person','lugar_nac','estado_civil','nacionalidad']}),
        ('Datos Extras',               {'fields': ['direccion','email','celular']}),  #, 'classes': ['collapse']
    ]

    # list_display = ('nombres', 'ap_paterno', 'ap_materno')

admin.site.register(EstadoCivil)
admin.site.register(Persona, PersonaAdmin)
admin.site.register(Nacionalidad)
admin.site.register(CategoriaLegajo)
admin.site.register(CategoriaLegajoDetalle)
admin.site.register(PersonaCategoria)
