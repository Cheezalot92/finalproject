from django.db import models
from django.conf import settings
# Create your models here.

class Users(models.Model):
    username = models.CharField(max_length=256)
    password = models.CharField(max_length=256) 
    avatar = models.ImageField(default='default.jpg', upload_to='profile_images')
    bio = models.TextField()
    slug = models.CharField(max_length=256)

    def __str__(self):
        return self.username
    
class Shows(models.Model):
    title = models.CharField(max_length=256)
    type = models.CharField(max_length=256)
    description = models.Charfield()
    cover_art = models.ImageField