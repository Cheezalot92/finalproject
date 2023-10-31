from django.shortcuts import render
from anime_review.models import UserProfile, Shows, Reviews
from django.http import HttpResponse
# Create your views here.

def index(request):
    shows = Shows.objects.all()
    return render(request, 'index.html', {'shows': shows})

def show_details(request, show_id):
    show = Shows.objects.get(id=show_id)
    reviews = Reviews.objects.filter(show=show)
    return render(request, 'show_detail.html', {'show': show, 'reviews':reviews})


def user_profile(request, user_id):
    user_profile = UserProfile.objects.get(id=user_id)
    return render(request, 'user_profile.html', {'user_profile': user_profile})