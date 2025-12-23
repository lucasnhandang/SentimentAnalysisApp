def build_insight_prompt(video_title, comments):
    comment_text = "\n".join(
        f"- {c.content}" for c in comments[:15]
    )

    return f"""
You are an AI that analyzes YouTube comments.

Video title: "{video_title}"

Comments:
{comment_text}

Write ONE short paragraph in English summarizing:
- overall audience opinion
- general feedback

Do not list comments.
Keep it concise.
"""
