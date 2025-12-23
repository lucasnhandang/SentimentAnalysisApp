from django.urls import path
from base.views import chat_insight as insight

urlpatterns = [
    path('videos/<int:video_id>/insight/', insight.video_insight),
]
