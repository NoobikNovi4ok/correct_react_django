from rest_framework import serializers

from core.models import Todo


# class TodoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Todo
#         fields = "__all__"


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "name", "status", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        name = attrs.get("name", None)
        if name is None:
            raise serializers.ValidationError("Имя не может быть пустым.")
        return attrs
