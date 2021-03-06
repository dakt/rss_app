# Generated by Django 2.1.7 on 2019-03-23 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rss', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='source',
            name='date_parsed',
        ),
        migrations.AddField(
            model_name='news',
            name='image_url',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='news',
            name='category',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='news',
            name='guid',
            field=models.CharField(max_length=500, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='news',
            name='link',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='news',
            name='title',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='source',
            name='title',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='source',
            name='url',
            field=models.CharField(max_length=500),
        ),
    ]
