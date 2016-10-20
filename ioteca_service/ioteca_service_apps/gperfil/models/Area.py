"""Area Model.

Modelos uttilize
"""

from django.db import models
import uuid


class Area(models.Model):
    """Model Area.

    modelo area para registrar los areas que existe en la organizacion
    """

    nombre = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:

        verbose_name = "Area"
        verbose_name_plural = "Areas"

    def __str__(self):
        return self.nombre
