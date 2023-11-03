from rest_framework import viewsets, status
from .models import UserProfile, Shows, Reviews, Categories
from .serializers import UserProfileSerializer, ShowsSerializer, ReviewsSerializer, CustomTokenObtainPairSerializer, CategoriesSerializer, TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect




# Create your views here.


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

class ShowsViewSet(viewsets.ModelViewSet):
    queryset = Shows.objects.all()
    serializer_class = ShowsSerializer
    permission_classes = [IsAuthenticated]

class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsAuthenticated]

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticated]

class MyTokenObtainPairView(TokenObtainPairSerializer):
    serializer_class = MyTokenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)