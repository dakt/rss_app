from rest_framework import serializers
from .models import News, Source


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ('__all__')


class NewsSerializer(serializers.ModelSerializer):

    sources = SourceSerializer(many=True)

    class Meta:
        model = News
        fields = ('__all__')
