from uuid import uuid4
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import ugettext_lazy as _
from django.utils.text import capfirst, get_text_list
# enums

# models
from .Person import Person
# managers
from .managers.UserManager import UserManager


class User(AbstractUser):
    """
    Tabla para usuarios
    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    class Meta:
        verbose_name = capfirst(_('user'))
        verbose_name_plural = capfirst(_('users'))
        permissions = (
            ('list_user', 'Can list user'),
            ('get_user', 'Can get user'),
        )

    # add nuevos campos al modelo User
    last_hierarchy_id = models.CharField(max_length=50, null=True, blank=True)
    last_module_id = models.CharField(max_length=50, null=True, blank=True)
    person = models.OneToOneField(
        Person, verbose_name=capfirst(_('person')), related_name='user',
        null=True, blank=True,  # solo User, para otro tipo de person, False
        # unique=True OneToOneField ya es unico
        # related_name='user'
    )
    updated_at = models.DateTimeField(
        _('updated at'), auto_now=True, blank=True, null=True
    )
    registered_by = models.TextField(
        blank=True, null=True
    )

    objects = UserManager()  # override the default manager

    def __str__(self):
        return self.username
