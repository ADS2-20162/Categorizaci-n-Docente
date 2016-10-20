from django.db import models
from .Competencia import Competencia
import uuid

class Subarea(models.Model):

    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Subarea"
        verbose_name_plural = "Subareas"

    def __str__(self):
        return self.nombre

