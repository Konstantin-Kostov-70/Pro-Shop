from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def update_user(sender, instance, **kwargs):
    user = instance 

    if not user.email  == '' :
        user.username = user.email



pre_save.connect(update_user, sender=User)