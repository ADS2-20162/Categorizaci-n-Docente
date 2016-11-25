from django.contrib import admin
from .models.Registro import Registro
from .models.Adjunto import Adjunto
from .models.Observacion import Observacion
from .models.RegistroDetalle import RegistroDetalle

# Register your models here.
admin.site.register(Registro)
admin.site.register(Adjunto)
admin.site.register(Observacion)
admin.site.register(RegistroDetalle)
