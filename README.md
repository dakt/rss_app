# RSS READER

## Quick Start

## RSS list configration
RSS channels are defined inside constants.py file in rss django app

### Install and activate virtual environment
```
# cd project_root
# python3 -m venv .venv
# source .venv/bin/activate
```

### Client

  1) Install:
  ```
  # cd rss_client
  # npm install
  ```
  2) Run dev server:
  ```
  # npm start
  ```

### Server

  1) Install:
  ```
  # cd rss_server
  # pip install -r requirements.txt
  ```
  2) Run migrations
  ```
  # python manage.py migrate
  ```
  3) Run RSS parser
  ```
  # python manage.py parserssfeeds
  ```
  4) Run dev server
  ```
  # python manage.py runserver
  ```

## Versions
* python: 3.7.0
* pip 10.0.1
* npm: 6.4.1
* node: v8.15.0
