from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
)

from core.models import Todo
from core.serializers import TodoSerializer


def home(request):
    return render(request, "home.html")


@api_view(["GET", "POST"])
def todos_list(request):
    if request.method == "GET":
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(["GET", "DELETE", "PATCH"])
def todo_delete(request, id):
    if request.method == "GET":
        try:
            todo = Todo.objects.get(id=id)
            serializer = TodoSerializer(todo, many=True)
            return Response(serializer.data)
        except Todo.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
    if request.method == "DELETE":
        try:
            todo = Todo.objects.get(id=id)
            todo.delete()
            return Response(status=HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
    if request.method == "PATCH":
        try:
            todo = Todo.objects.get(id=id)
            serializer = TodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Todo.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
