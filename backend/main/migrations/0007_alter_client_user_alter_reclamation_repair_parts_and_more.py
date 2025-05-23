# Generated by Django 5.2 on 2025-05-14 20:09

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_reclamation_service_company'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='client', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='reclamation',
            name='repair_parts',
            field=models.TextField(blank=True, default='', help_text='Repair parts', null=True),
        ),
        migrations.AlterField(
            model_name='servicecompany',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='service_company', to=settings.AUTH_USER_MODEL),
        ),
    ]
