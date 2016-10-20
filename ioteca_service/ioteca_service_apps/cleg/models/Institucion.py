from django.db import models
from .TipoInstitucion import TipoInstitucion
from .CampoPredefinido import CampoPredefinido


class Institucion(models.Model):

    nombre = models.CharField(max_length=60)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=10)
    email = models.EmailField()
    descripcion = models.TextField()
    estado = models.BooleanField(default=True)
    tipo_isntitucion = models.ForeignKey(TipoInstitucion)
    campo_predefinido = models.ForeignKey(CampoPredefinido)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Institucion"
        verbose_name_plural = "Instituciones"

    def __str__(self):
        return u'%s' % self.nombre

