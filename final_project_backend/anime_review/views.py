from rest_framework import viewsets , permissions
from anime_review.models import UserProfile, Shows, Reviews
from .serializers import UserProfileSerializer, ShowsSerializer, ReviewsSerializer
# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # permission_classes = [permissions.IsAuthenticated]
   

class ShowsViewSet(viewsets.ModelViewSet):
    queryset = Shows.objects.all()
    serializer_class = ShowsSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
    # permission_classes = [permissions.IsAuthenticated]