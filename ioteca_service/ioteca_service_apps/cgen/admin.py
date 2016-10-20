from django.contrib import admin
from .models.Item import Item
from .models.SubItem import SubItem
from .models.Seccion import Seccion


class ItemAdmin(admin.ModelAdmin):

    list_display = ('nombre', 'descripcion', 'estado')
# Register your models here.

admin.site.register(Item, ItemAdmin)
admin.site.register(SubItem)
admin.site.register(Seccion)
