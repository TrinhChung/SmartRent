from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
def recommend_real_estate(request):
	view = request.data.get("view")
	print(view)
	try:
		return Response(
                {"message": "Get recommend real estate successfully"},
                status=status.HTTP_200_OK,
            )
	except Exception:
		return Response(
                {"message": "Get recommend real estate failure"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

@api_view(["POST"])
def contradiction(request):
	sentence = request.data.get("sentence")
	listTerm = request.data.get("listTerm")
	print(sentence)
	print(listTerm)
	try:
		return Response(
                {"message": "Get recommend real estate successfully"},
                status=status.HTTP_200_OK,
            )
	except Exception:
		return Response(
                {"message": "Get recommend real estate failure"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )