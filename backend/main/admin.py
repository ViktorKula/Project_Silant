from django.contrib import admin
from .models import CarModel, EngineModel, TransmissionModel, MainBridgeModel, SteerableBridgeModel,  \
    MaintenanceType, FailureNode, RecoveryMethod, Car, Maintenance, Reclamation

# Register your models here.
# admin.site.register(models.Reply)
admin.site.register(CarModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(MainBridgeModel)
admin.site.register(SteerableBridgeModel)
admin.site.register(MaintenanceType)
admin.site.register(FailureNode)
admin.site.register(RecoveryMethod)
admin.site.register(Car)
admin.site.register(Maintenance)
admin.site.register(Reclamation)