from django.contrib import admin
from django.urls import path
from houses import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    url(r'^', TemplateView.as_view(template_name="index.html")),
    # path('/buildings/<int:building>', views.building, name='building'),
]
