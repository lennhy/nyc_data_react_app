import os
from nyc_data_react_app.settings.base import *

# from .base import *


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['VIOLATIONS_APP_DATABASE_NAME'],
        'USER': os.environ['VIOLATIONS_APP_USERNAME'],
        'PASSWORD': os.environ['VIOLATIONS_APP_PASSWORD'],
        'HOST': os.environ['VIOLATIONS_APP_HOST'],
        'PORT': os.environ['VIOLATIONS_APP_PORT']
    }
}
