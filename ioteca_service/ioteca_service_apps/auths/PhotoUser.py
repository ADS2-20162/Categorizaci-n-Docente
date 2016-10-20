import uuid
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
from django.dispatch import receiver
from django.db.models import signals
from unicodedata import normalize
from django.core.exceptions import ValidationError
from django.core.exceptions import NON_FIELD_ERRORS
from .User import User
# models
# others


class PhotoUser(models.Model):

    """
    Tabla para fotos de usuarios
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    photo = models.ImageField(
        capfirst(_('photo')), upload_to='photousers',
        default='photouser/default.png', null=True, blank=True,
    )
    user = models.OneToOneField(User, related_name='photouser',blank=True,null=True)
    created_at = models.DateTimeField(
        _('created at'), auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('updated at'), auto_now=True, blank=True, null=True
    )

    class Meta:
        verbose_name = capfirst(_('photouser'))
        verbose_name_plural = capfirst(_('Fotos de Usuarios'))

    def __str__(self):
        a = self.user.username
        return('Foto del usuario {0}'.format(a))
