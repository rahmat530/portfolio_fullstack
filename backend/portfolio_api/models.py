from django.db import models


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('language', 'Programming Language'),
        ('framework', 'Framework / Library'),
        ('database', 'Database'),
        ('devops', 'Tools & DevOps'),
        ('network', 'Network'),
        ('pr_management', 'Project Management'),
        ('language_spoken', 'Spoken Language'),
        ('network', 'Network'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    proficiency = models.IntegerField(default=80, help_text="Percentage 0–100")
    icon = models.CharField(max_length=50, blank=True, help_text="Devicon class or emoji")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"


class Project(models.Model):
    STATUS_CHOICES = [
        ('live', 'Live'),
        ('wip', 'Work in Progress'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=300, help_text="Comma-separated list")
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wip')
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-featured', 'order', '-created_at']

    def __str__(self):
        return self.title

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20, blank=True, default='Present')
    description = models.TextField(blank=True)
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-is_current', 'order']

    def __str__(self):
        return f"{self.degree} – {self.institution}"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_obtained = models.CharField(max_length=20)
    expiry_date = models.CharField(max_length=20, blank=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} – {self.issuer}"


class Resume(models.Model):
    version = models.CharField(max_length=50, default='latest')
    file = models.FileField(upload_to='resume/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-uploaded_at']

    def save(self, *args, **kwargs):
        # Only one resume can be active at a time
        if self.is_active:
            Resume.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Resume v{self.version} ({self.uploaded_at.date() if self.uploaded_at else 'new'})"
