import django.core.validators
from django.db import migrations, models

import recipes.models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=recipes.models.recipe_image_upload_path),
        ),
        migrations.AddField(
            model_name='recipe',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='name',
            field=models.CharField(
                max_length=100,
                validators=[django.core.validators.MinLengthValidator(2)],
            ),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
