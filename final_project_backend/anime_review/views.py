from rest_framework import viewsets, status
from anime_review.models import UserProfile, Shows, Reviews
from .serializers import UserProfileSerializer, ShowsSerializer, ReviewsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

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


class LogoutView(APIView):
    #  permission_classes = [IsAuthenticated]
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)