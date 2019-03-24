#!/usr/bin/env python
# coding: utf-8
import os

project_root = os.getcwd()
os.chdir(os.path.join(project_root, "rss_client"))
os.system("npm install")
os.system("npm run build")
os.system("npm run serve")

os.chdir(os.path.join(project_root, "rss_server"))
os.system("pip install -r requirements.txt")
os.system("python manage.py migrate")
os.system("python manage.py runserver")
