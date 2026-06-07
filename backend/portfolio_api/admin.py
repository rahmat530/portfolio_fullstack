from django.contrib import admin
from .models import Skill, Project, Education, Certification, Resume


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category']
    ordering = ['category', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'featured', 'order']
    list_filter = ['status', 'featured']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_date', 'end_date', 'is_current']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuer', 'date_obtained']


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['version', 'uploaded_at', 'is_active']
    readonly_fields = ['uploaded_at']
