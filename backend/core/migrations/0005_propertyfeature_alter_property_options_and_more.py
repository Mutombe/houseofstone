# Generated by Django 5.1.7 on 2025-05-15 02:47

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_adminactionlog"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="PropertyFeature",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("feature", models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterModelOptions(
            name="property",
            options={
                "ordering": ["-created_at"],
                "verbose_name": "Property",
                "verbose_name_plural": "Properties",
            },
        ),
        migrations.AddField(
            model_name="property",
            name="baths",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="property",
            name="beds",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="property",
            name="garage",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="lot_size",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="sqft",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="property",
            name="year_built",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="property",
            name="property_type",
            field=models.CharField(
                choices=[
                    ("house", "House"),
                    ("apartment", "Apartment"),
                    ("land", "Land"),
                    ("commercial", "Commercial"),
                    ("villa", "Villa"),
                ],
                max_length=20,
            ),
        ),
        migrations.AddIndex(
            model_name="property",
            index=models.Index(
                fields=["location", "property_type", "price"],
                name="core_proper_locatio_931c48_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="property",
            index=models.Index(
                fields=["beds", "baths", "price"], name="core_proper_beds_916ab7_idx"
            ),
        ),
        migrations.AddField(
            model_name="propertyfeature",
            name="property",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="features",
                to="core.property",
            ),
        ),
    ]
