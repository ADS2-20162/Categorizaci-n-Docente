from django.contrib import admin
from .models.ElementoCampo import ElementoCampo
from .models.ElementoCampoPredefinido import ElementoCampoPredefinido
from .models.ElementoCampoPredefinidoRegistro import ElementoCampoPredefinidoRegistro
from .models.ElementoCampoRegistro import ElementoCampoRegistro

# Register your models here.
admin.site.register(ElementoCampo)
admin.site.register(ElementoCampoPredefinido)
admin.site.register(ElementoCampoRegistro)
admin.site.register(ElementoCampoPredefinidoRegistro)
