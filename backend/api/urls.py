from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    APIRootView,
    ReadingListAPIView, 
    ReadingLatestAPIView, 
    ViolationViewSet,
    RegisterView,
    LoginView,
    UserProfileView
)

router = DefaultRouter()
router.register(r'violations', ViolationViewSet, basename='violation')

urlpatterns = [
    # API Discovery Root
    path('', APIRootView.as_view(), name='api-root'),

    # Authentication System
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),

    # Monitoring & Sensors
    path('readings/', ReadingListAPIView.as_view(), name='reading-list'),
    path('readings/latest/', ReadingLatestAPIView.as_view(), name='reading-latest'),

    # Enforcement & Violations (Router based)
    path('', include(router.urls)),
]