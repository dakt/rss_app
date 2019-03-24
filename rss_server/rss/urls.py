from django.urls import path
from .views import ListSources, ListNews, ListNewsPerSource

urlpatterns = [
    path('sources/', ListSources.as_view()),
    path('sources/<int:id>/news/', ListNewsPerSource.as_view()),
    path('news/', ListNews.as_view()),
]
