from django.db.models import Q
from rest_framework.generics import ListAPIView

from .models import Source, News
from .serializers import NewsSerializer, SourceSerializer


class ListSources(ListAPIView):
    serializer_class = SourceSerializer
    queryset = Source.objects.all()


class ListNews(ListAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        search_text = self.request.GET.get('search')

        if not search_text:
            return News.objects.all()

        return News.objects.filter(
            Q(title__icontains=search_text) |
            Q(description__icontains=search_text)
        )


class ListNewsPerSource(ListAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        search_text = self.request.GET.get('search')
        id = self.kwargs['id']

        if not search_text:
            return News.objects.filter(sources__in=[id])

        return News.objects.filter(
            Q(title__icontains=search_text) |
            Q(description__icontains=search_text),
            sources__in=[id],
        )
