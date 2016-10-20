from django.db import models

class TipoInstitucion(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField()
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Tipo Institucion"
        verbose_name_plural = "Tipo Instituciones"

    def __str__(self):
        return u'%s' % self.nombre
