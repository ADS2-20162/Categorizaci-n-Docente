from django.db import models

class TipoCampo(models.Model):

    nombre = models.CharField(max_length=60)
    descripcion = models.TextField(max_length=60)
    estado =  models.BooleanField(default=True)
    codigo = models.CharField(max_length=10)

    class Meta:
        verbose_name = "Tipo Campo"
        verbose_name_plural = "Tipo de Campos"

    def __str__(self):
        return u'%s' % self.nombre
