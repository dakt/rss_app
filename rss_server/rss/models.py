from django.db import models


class Source(models.Model):
    title = models.CharField(max_length=120)
    url = models.CharField(max_length=500)

    def __repr__(self):
        return self.title

    def __str__(self):
        return self.title


class News(models.Model):
    guid = models.CharField(primary_key=True, unique=True, max_length=500)
    title = models.CharField(max_length=120)
    link = models.CharField(max_length=120)
    description = models.TextField()
    image_url = models.CharField(blank=True, null=True, max_length=100)
    publish_date = models.DateTimeField()
    category = models.CharField(max_length=30)
    sources = models.ManyToManyField(Source)

    def __repr__(self):
        return self.title

    def __str__(self):
        return self.title
