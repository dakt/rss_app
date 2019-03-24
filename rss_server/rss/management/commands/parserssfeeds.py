import os
import requests
import xml.etree.ElementTree as ET
from datetime import datetime
from django.core.management.base import BaseCommand
from rss.models import Source, News


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Parsing XSS feeds...')
        total_news = self._parse()
        print('{0}Done. Total News: {1}'.format(os.linesep, total_news))

    def _parse(self):
        total_news = 0

        for source in Source.objects.all():
            response = requests.get(source.url)
            root = ET.fromstring(response.text)

            for item in root.iter('item'):
                title_node = item.find('title')
                link_node = item.find('link')
                desc_node = item.find('description')
                publish_date_node = item.find('pubDate')
                guid_node = item.find('guid')
                category_node = item.find('category')

                # Additional parsing required:
                publish_date = self._parse_publish_date_node(publish_date_node)
                description, image_url = self._parse_description_node(desc_node)

                news = News(
                    guid=guid_node.text,
                    title=title_node.text,
                    link=link_node.text,
                    description=description,
                    image_url=image_url,
                    publish_date=publish_date,
                    category=category_node.text,
                )

                news.save()
                news.sources.add(source)
                total_news += 1
                print('.', end='')

        return total_news

    def _parse_publish_date_node(self, publish_date_node):
        """Parses string and returns datetime object"""
        return datetime.strptime(
            publish_date_node.text,
            '%a, %d %b %Y %H:%M:%S %z'
        )

    def _parse_description_node(self, desc_node):
        """Parses XML node and returns pair of description and image url"""
        if desc_node.text.find("<img") is not -1:
            split_index = desc_node.text.find('/>') + 2
            image_html_tag = desc_node.text[0: split_index]
            description = desc_node.text[split_index:]
            image_node = ET.fromstring(image_html_tag)
            image_url = image_node.get('src')
            return description.strip(), image_url
        else:
            return desc_node.text, None
