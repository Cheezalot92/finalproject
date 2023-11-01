from django.contrib import admin
from .models import UserProfile, Shows, Reviews, UserReviewRelationship, User
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Shows)
admin.site.register(Reviews)
admin.site.register(UserReviewRelationship)