from django.db import models


class Adjunto(models.Model):

    nombre = models.CharField(max_length=200)
    url = models.FileField(upload_to="adjunto/files")
    descripcion = models.CharField(max_length=100)
    priorizar = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Adjunto"
        verbose_name_plural = "Adjuntos"

    def __str__(self):
        return self.nombre
