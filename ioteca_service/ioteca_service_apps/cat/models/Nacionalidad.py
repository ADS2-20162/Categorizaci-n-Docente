from django.db import models

class Nacionalidad(models.Model):

    nombre = models.CharField(max_length=60)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Nacionalidad"
        verbose_name_plural = "Nacionalidades"

    def __str__(self):
        return u'%s' % self.nombre
