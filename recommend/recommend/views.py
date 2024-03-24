from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from recommend.recommend_process import recommend, load_data, create_similarity_matrix
import json

numericals = ['acreage', 'isPet', 'facade', 'directionHouse', 'isInterior', 
              'floorTotal', 'toiletTotal', 'bedroomTotal', 'cost']

@api_view(["POST"])
def recommend_real_estate(request):
    try:
        view = request.data.get("view")
        print("data input", view)
        df = load_data('./data/real-estate.json')
        numerical_df = df[numericals]
        nearest_neighbor, indices = create_similarity_matrix(numerical_df, numericals)
        recommendations = recommend(id_=view, indices=indices, nearest_neighbor=nearest_neighbor, df=df, top_n=10)

        print("Result: \n",recommendations)

        return Response(
            {"message": "Get recommend real estate successfully","data": recommendations},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        print(str(e))
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