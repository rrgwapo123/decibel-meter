from django.db import models

class DecibelReading(models.Model):
    sensor_id = models.CharField(max_length=50, default="Sensor-001")
    db_value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=100, default="Cagayan De Oro City")

    def __str__(self):
        return f"{self.sensor_id}: {self.db_value} dB at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']

class Violation(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('PENDING', 'Pending'), ('ACTION TAKEN', 'Action Taken')], default='PENDING')
    vehicle_type = models.CharField(max_length=50)
    db_level = models.FloatField()
    location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.title} - {self.status}"

    class Meta:
        ordering = ['-date']
