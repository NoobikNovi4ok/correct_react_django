from django.urls import path
from core.views import home, todo_delete, todos_list

urlpatterns = [
    path("", home, name="home"),
    path("todos", todos_list, name="todos_list"),
    path("todos/<int:id>", todo_delete, name="todo_delete"),
]
