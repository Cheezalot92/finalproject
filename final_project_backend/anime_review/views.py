from rest_framework import viewsets, status
from anime_review.models import UserProfile, Shows, Reviews
from .serializers import UserProfileSerializer, ShowsSerializer, ReviewsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
   

class ShowsViewSet(viewsets.ModelViewSet):
    queryset = Shows.objects.all()
    serializer_class = ShowsSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    pass



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_view(request):
    content = {'message': 'Hello, world!'}
    return Response(content)


class LogoutView(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)