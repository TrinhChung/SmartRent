from django.urls import path
from . import views

urlpatterns = [
    path('api/recommend', views.recommend_real_estate, name="recommend-real-estate"),
	path('api/contradiction', views.contradiction, name="contradiction-smart-contradiction"),
]
