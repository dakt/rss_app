from django.contrib import admin
from .models import News, Source

admin.site.register(Source)
admin.site.register(News)