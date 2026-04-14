from rest_framework import serializers
from django.contrib.auth.models import User
from .models import DecibelReading, Violation

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, handling registration and profile data.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class DecibelReadingSerializer(serializers.ModelSerializer):
    """
    Serializer for real-time sensor decibel readings.
    """
    class Meta:
        model = DecibelReading
        fields = '__all__'

class ViolationSerializer(serializers.ModelSerializer):
    """
    Serializer for logged noise violations.
    """
    class Meta:
        model = Violation
        fields = '__all__'