from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from main.models import Client, ServiceCompany, Manager

# Create your views here.
@api_view(["POST",])
def logout(request):
    if request.method == "POST":
        if hasattr(request.user, "auth_token"):
            request.user.auth_token.delete()
            return Response({"Message": "Logged out"}, status=status.HTTP_200_OK)
        else:
            return Response({"Message": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET",])
@permission_classes([IsAuthenticated])
def account_info(request):
    if request.method == "GET":
        user = request.user

        account_type = 'ACCOUNT_TYPE_OTHER'
        print(user)
        if user:
            name = ''
            if Client.is_own(user):
                account_type = 'ACCOUNT_TYPE_CLIENT'
                name = user.client.name
            elif ServiceCompany.is_own(user):
                account_type = 'ACCOUNT_TYPE_SERVICE_COMPANY'
                name = user.service_company.name
            elif Manager.is_own(user):
                account_type = 'ACCOUNT_TYPE_MANAGER'
                # name = user.manager.name
                name = user.first_name + ' ' + user.last_name
            elif user.is_staff:
                account_type = 'ACCOUNT_TYPE_ADMIN'
                name = user.username

            print("user = ", user, "account_type = ", account_type)

        return Response({
            "account_type": account_type,
            "name": name,
            "username": user.username
        })

