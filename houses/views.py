from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
# Create your views here.
from .models import Building

def home(request):
    # buildings = Building.objects.all()
    # return render(request, 'index.html', {'buildings': buildings})
    return render(request, 'index.html')

# def building(request, id):
#     try:
#         building = Building.objects.get(id=id)
#     except Building.DoesNotExists:
#         raise Http404('Buidling not found')
#     return render(request, 'building.html', {'building': building})
