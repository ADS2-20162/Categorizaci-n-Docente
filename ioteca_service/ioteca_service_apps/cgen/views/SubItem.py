from rest_framework import viewsets
from ..serializers.SubItem import SubItemSerializer
from ..models.SubItem import SubItem


class SubItemViewSet(viewsets.ModelViewSet):
    queryset = SubItem.objects.all()
    serializer_class = SubItemSerializer

    def get_queryset(self):
        try:
            item = self.request.GET.get('item')
            if item:

                queryset = SubItem.objects.filter(item__id=item)
            else:
                queryset = SubItem.objects.all()

        except Exception as e:
            queryset = SubItem.objects.all()

        return queryset
