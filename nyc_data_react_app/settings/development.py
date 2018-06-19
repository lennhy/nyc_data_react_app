from nyc_data_react_app.settings.base import *

# from .base import *


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'violations',
        'USER': 'lennhy@localhost',
        'PASSWORD': 'Prometheus',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '8000',
    }
}
