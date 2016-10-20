from django.db import models
from uuid import uuid4
from django.utils.text import capfirst, get_text_list
# from ioteca_main import settings
from .EstadoCivil import EstadoCivil
from .Nacionalidad import Nacionalidad
from django.utils.translation import ugettext_lazy as _
from ioteca_service_apps.auths.Person import Person

class Persona(models.Model):

    nombres = models.CharField(max_length=60, null=True, blank=True)
    ap_paterno = models.CharField(max_length=60, null=True, blank=True)
    ap_materno = models.CharField(max_length=60, null=True, blank=True)
    direccion = models.CharField(max_length=200)
    doc_ident = models.CharField(max_length=10, null=True, blank=True)
    celular = models.CharField(max_length=10)
    email = models.EmailField()
    person = models.OneToOneField(Person, verbose_name=capfirst(_('person')),null=True,blank=True)
    # usuario = models.OneToOneField(settings.AUTH_USER_MODEL)
    fecha_nac = models.DateField(null=True, blank=True)
    lugar_nac = models.CharField(max_length=100)
    # foto = models.ImageField(upload_to='img',null=True, blank=True)
    estado_civil = models.ForeignKey(EstadoCivil)
    nacionalidad = models.ForeignKey(Nacionalidad)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Persona"
        verbose_name_plural = "Personas"

    def __str__(self):
        return u'%s' % self.nombres

    def save(self, *args, **kwargs):
        nombre = "{0} {1}".format(self.person.first_name,self.person.other_names)
        self.nombres = nombre.strip()
        self.ap_paterno = self.person.last_name
        self.ap_materno = self.person.mother_last_name
        self.doc_ident = self.person.national_id_doc
        self.fecha_nac = self.person.birth_date
        # self.foto = self.person.photo
        super(Persona, self).save(*args,**kwargs)

    # def image_img(self):
    #     if self.foto:
    #         return(u'<img src="%s" width="50" height="50" />'.format(self.foto.url))
    #     else:
    #         return('(Sin imagen)')
    # image_img.short_description = 'Thumb'
    # image_img.allow_tags = True

