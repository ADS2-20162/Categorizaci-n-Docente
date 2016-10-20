from django.db import models
from .CampoPredefinido import CampoPredefinido


class ProcesoGradoAcademico(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=60)
    estado = models.BooleanField(default=True)
    campo_predefinido = models.ForeignKey(CampoPredefinido)

    class Meta:
        verbose_name = "Proceso de Grado Academico"
        verbose_name_plural = "Procesos de Grados Academicos"

    def __str__(self):
        return u'%s' % self.nombre
