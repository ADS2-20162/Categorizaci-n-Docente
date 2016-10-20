from django.db import models
from .Persona import Persona
from .CategoriaLegajo import CategoriaLegajo


class PersonaCategoria(models.Model):

    persona = models.ForeignKey(Persona)
    categoria_legajo = models.ForeignKey(CategoriaLegajo)
    estado = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Persona Categoria"
        verbose_name_plural = "Personas Categorias"

    def __str__(self):
        return u'%s' % self.persona
