import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import DecibelReading

reading = DecibelReading.objects.create(db_value=85.5, location="Cogon Market")
print(f"Created reading: {reading}")