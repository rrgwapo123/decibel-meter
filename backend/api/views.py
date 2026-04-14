from rest_framework import generics, viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
from .models import DecibelReading, Violation
from .serializers import DecibelReadingSerializer, ViolationSerializer, UserSerializer

from rest_framework.reverse import reverse

class APIRootView(generics.GenericAPIView):
    """
    Explore the Smart IoT Decibel Monitoring API
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({
            'Authentication': {
                'register': reverse('register', request=request),
                'login': reverse('login', request=request),
                'profile': reverse('profile', request=request),
            },
            'Monitoring': {
                'all-readings': reverse('reading-list', request=request),
                'latest-reading': reverse('reading-latest', request=request),
            },
            'Enforcement': {
                'violations': reverse('violation-list', request=request),
            }
        })

class RegisterView(generics.CreateAPIView):
    """
    Handle new user registration. Returns user details and an auth token.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": UserSerializer(user).data,
                "token": token.key,
                "message": "User registered successfully."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(ObtainAuthToken):
    """
    Standard login endpoint. Returns a token for the provided credentials.
    """
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username
        })

class UserProfileView(generics.RetrieveAPIView):
    """
    Retrieve details for the currently authenticated user.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ReadingListAPIView(generics.ListCreateAPIView):
    """
    List all decibel readings or create a new one.
    """
    queryset = DecibelReading.objects.all()[:50]
    serializer_class = DecibelReadingSerializer

class ReadingLatestAPIView(generics.RetrieveAPIView):
    """
    Get the single most recent decibel reading.
    """
    serializer_class = DecibelReadingSerializer
    
    def get_object(self):
        return DecibelReading.objects.first()

class ViolationViewSet(viewsets.ModelViewSet):
    """
    Manage noise level violations (CRUD).
    """
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer
