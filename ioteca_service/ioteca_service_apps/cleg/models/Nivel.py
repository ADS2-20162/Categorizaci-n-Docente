from django.db import models
from .TipoNivel import TipoNivel

class Nivel(models.Model):

    nombre = models.CharField(max_length=60)
    sigla = models.CharField(max_length=10)
    descripcion = models.TextField(max_length=60)
    tipo_nivel = models.ForeignKey(TipoNivel)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Nivel"
        verbose_name_plural = "Niveles"

    def __str__(self):
        return u'%s' % self.nombre
