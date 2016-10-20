from django.db import models
from .CategoriaLegajo import CategoriaLegajo
from ioteca_service_apps.cgen.models.Item import Item
from ioteca_service_apps.cgen.models.SubItem import SubItem
from ioteca_service_apps.cgen.models.Seccion import Seccion


class CategoriaLegajoDetalle(models.Model):
    categoria_legajo = models.ForeignKey(CategoriaLegajo)
    item = models.ForeignKey(Item)
    sub_item = models.ForeignKey(SubItem)
    seccion = models.ForeignKey(Seccion)

    class Meta:
        verbose_name = "Categoria de Legajo Detalle"
        verbose_name_plural = "Categorias de Legajos Detalles"

    def __str__(self):
        return u'%s' % self.categoria_legajo
