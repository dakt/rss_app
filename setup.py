#!/usr/bin/env python
# coding: utf-8
import os

project_root = os.getcwd()
#os.chdir(os.path.join(project_root, 'rss_client'))

#print('Installing rss client...')
#os.system('npm install')
#os.system('npm run build')


def install_server():
    print('Installing rss server...')
    os.chdir(os.path.join(project_root, 'rss_server'))
    os.system('python3 -m venv .venv')
    os.system('source .venv/bin/activate')

    # os.system('pip install -r requirements.txt')
    # print('Running initial migrations...')
    # os.system('python manage.py migrate')


install_server()
