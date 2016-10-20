from django.db import models


class CategoriaLegajo(models.Model):
    nombre_categoria = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Categoria de Legajo"
        verbose_name_plural = "Categorias de Legajos"

    def __str__(self):
        return u'%s' % self.nombre_categoria
