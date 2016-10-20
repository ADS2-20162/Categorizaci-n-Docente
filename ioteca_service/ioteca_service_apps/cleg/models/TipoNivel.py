from django.db import models

class TipoNivel(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=60)
    estado =  models.BooleanField(default=True)

    class Meta:
        verbose_name = "Tipo Nivel"
        verbose_name_plural = "Tipos Niveles"

    def __str__(self):
        return u'%s' % self.nombre
