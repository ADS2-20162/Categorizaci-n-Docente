from django.db import models
from .Item import Item


class SubItem(models.Model):

    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=True)
    item = models.ForeignKey(Item, related_name='subitems')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "SubItem"
        verbose_name_plural = "SubItems"

    def __str__(self):
        return "%s :> %s" % (self.nombre, self.item)
