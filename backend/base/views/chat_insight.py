from rest_framework.decorators import api_view
from rest_framework.response import Response

from  base.models import Chat, Comment
from  base.prompts import build_insight_prompt
from  base.services import generate_insight

@api_view(["GET"])
def video_insight(request, video_id):
    video = Chat.objects.get(_id=video_id)

    comments = Comment.objects.filter(chat=video)

    prompt = build_insight_prompt(video.name, comments)

    insight = generate_insight(prompt)

    return Response({
        "insight": insight
    })
 