from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=256) 
    avatar = models.ImageField(default='default.jpg', upload_to='profile_images')
    bio = models.TextField(256)

    def __str__(self):
        return self.user.username
    
class Shows(models.Model):
    title = models.CharField(max_length=256)
    category = models.CharField(max_length=50)
    year = models.IntegerField()
    description = models.TextField()
    ratings = models.FloatField()
    cover_art = models.ImageField

    def __str__(self):
        return self.title
    

class Reviews(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    show = models.ForeignKey(Shows, on_delete=models.CASCADE)
    rating = models.FloatField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.user.username}'s Review of {self.show.title}"
    

class UserReviewRelationship(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    show = models.ForeignKey(Shows, on_delete=models.CASCADE)
    has_watched = models.BooleanField(default=False)
    review = models.ForeignKey(Reviews, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('user', 'show')
    
    def __str__(self):
        return f"{self.user.user.username}" - {self.show.title}