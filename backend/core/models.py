from django.db import models


class Todo(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя", blank=True)
    status = models.BooleanField(default=True, verbose_name="Статус")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата создания", blank=True, null=True
    )

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"
        ordering = ["-created_at"]
