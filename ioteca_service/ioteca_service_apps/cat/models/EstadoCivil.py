from django.db import models

class EstadoCivil(models.Model):

    nombre = models.CharField(max_length=60)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Estado Civil"
        verbose_name_plural = "Estados Civiles"

    def __str__(self):
	    return u'%s' % self.nombre
