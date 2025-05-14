"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view

from main.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/accounts/", include("accounts.urls")),

    path('api/v1/clients/', ClientView.as_view(), name='api_clients'),
    path('api/v1/service_companies/', ServiceCompanyView.as_view(), name='api_service_companies'),
    path('api/v1/car_models/', CarModelView.as_view(), name='api_car_models'),
    path('api/v1/car_models/<int:pk>', SingleCarModelView.as_view(), name='api_single_car_model'),
    path('api/v1/engine_models/', EngineModelView.as_view(), name='api_engine_models'),
    path('api/v1/engine_models/<int:pk>', SingleEngineModelView.as_view(), name='api_single_engine_model'),
    path('api/v1/transmission_models/', TransmissionModelView.as_view(), name='api_transmission_models'),
    path('api/v1/transmission_models/<int:pk>', SingleTransmissionModelView.as_view(), name='api_single_transmission_model'),
    path('api/v1/main_bridge_models/', MainBridgeModelView.as_view(), name='api_main_bridge_models'),
    path('api/v1/main_bridge_models/<int:pk>', SingleMainBridgeModelView.as_view(), name='api_single_main_bridge_model'),
    path('api/v1/steerable_bridge_models/', SteerableBridgeModelView.as_view(), name='api_steerable_bridge_models'),
    path('api/v1/steerable_bridge_models/<int:pk>', SingleSteerableBridgeModelView.as_view(), name='api_single_steerable_bridge_model'),
    path('api/v1/maintenance_types/', MaintenanceTypeView.as_view(), name='api_maintenance_types'),
    path('api/v1/maintenance_types/<int:pk>', SingleMaintenanceTypeView.as_view(), name='api_single_maintenance_type'),
    path('api/v1/failure_nodes/', FailureNodeView.as_view(), name='api_failure_nodes'),
    path('api/v1/failure_nodes/<int:pk>', SingleFailureNodeView.as_view(), name='api_single_failure_node'),
    path('api/v1/recovery_methods/', RecoveryMethodView.as_view(), name='api_recovery_methods'),
    path('api/v1/recovery_methods/<int:pk>', SingleRecoveryMethodView.as_view(), name='api_single_recovery_method'),

    path('api/v1/simple_cars/', CarSimpleListAPIView.as_view(), name='api_simple_cars'),    
    path('api/v1/cars/', CarView.as_view(), name='api_cars'),
    path('api/v1/cars/<int:pk>', SingleCarView.as_view(), name='api_single_car'),
    path('api/v1/maintenances/', MaintenanceView.as_view(), name='api_maintenances'),
    path('api/v1/maintenances/<int:pk>', SingleMaintenanceView.as_view(), name='api_single_maintenance'),
    path('api/v1/reclamations/', ReclamationView.as_view(), name='api_reclamations'),
    path('api/v1/reclamations/<int:pk>', SingleReclamationView.as_view(), name='api_single_reclamation'),
    
    path('openapi', get_schema_view(
        title="Silant",
        description="API for Silant"
    ), name='openapi-schema'),
]
