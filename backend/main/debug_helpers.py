from django.contrib.auth.models import Group
from django.contrib.auth.models import User

from .models import *


def create_client(name, username, email, password):
    # user = User.objects.create(username=username, password=password, email=email)
    user = User.objects.create_user(username=username, password=password, email=email)
    # user.set_password(password)
    clients_group = Group.objects.get(name='clients')
    user.groups.add(clients_group)

    return Client.objects.create(name=name, user=user)

def create_service_company(name, description, username, email, password):
    # user = User.objects.create(username=username, password=password, email=email)
    user = User.objects.create_user(username=username, password=password, email=email)
    # user.set_password(password)
    service_companies_group = Group.objects.get(name='service_companies')
    user.groups.add(service_companies_group)

    return ServiceCompany.objects.create(name=name, description=description, user=user)

def create_manager(first_name, last_name, username, email, password):
    # user = User.objects.create(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    user = User.objects.create_user(username=username, password=password, email=email)
    # user.set_password(password)
    managers_group = Group.objects.get(name='managers')
    user.groups.add(managers_group)

    return Manager.objects.create(user=user)