from django.db import models
from ioteca_service_apps.cgen.models.Item import Item
from ioteca_service_apps.cgen.models.SubItem import SubItem
from ioteca_service_apps.cgen.models.Seccion import Seccion


class Elemento(models.Model):

    nombre = models.CharField(max_length=60)
    item = models.ForeignKey(Item, null=True, blank=True)
    sub_item = models.ForeignKey(SubItem, null=True, blank=True)
    seccion = models.ForeignKey(Seccion, null=True, blank=True)

    class Meta:
        verbose_name = "Elemento"
        verbose_name_plural = "Elementos"

    def __str__(self):
        return u'%s' % self.nombre
