from django.db import models
from .SubItem import SubItem


class Seccion(models.Model):

    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=True)
    subitem = models.ForeignKey(SubItem, related_name='secciones')
    # related_name='secciones'

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Seccion"
        verbose_name_plural = "Secciones"

    def __str__(self):
        return self.nombre
