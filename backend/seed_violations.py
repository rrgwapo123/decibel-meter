import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Violation

# Create sample violations
v1 = Violation.objects.create(
    title="Excessive Noise: Divisoria Night Market",
    status="PENDING",
    vehicle_type="Modified Motorcycle",
    db_level=98.5,
    location="Divisoria, CDO"
)

v2 = Violation.objects.create(
    title="Heavy Honking: Limketkai Mall",
    status="ACTION TAKEN",
    vehicle_type="SUV",
    db_level=102.0,
    location="Limketkai, CDO"
)

print(f"Created violation: {v1}")
print(f"Created violation: {v2}")
