from django.db import models
from .Dimension import Dimension
from .Nivel import Nivel

class DimensionNivel(models.Model):

    nombre = models.CharField(max_length=60)
    dimension = models.ForeignKey(Dimension)
    nivel = models.ForeignKey(Nivel)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Dimension Nivel"
        verbose_name_plural = "Dimensiones Niveles"

    def __str__(self):
        return u'%s' % self.nombre
