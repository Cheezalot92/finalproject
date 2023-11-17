from .models import UserProfile, Shows, Reviews,Categories
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data["user_id"] = self.user.id
        data['groups'] = self.user.groups.values_list('name', flat=True)
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class ShowsSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category', required=False)
    class Meta:
        model = Shows
        fields = ['id','title','year', 'ratings', 'description', 'category',  'category_name', 'category_id']

class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

        

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('id', 'name')

