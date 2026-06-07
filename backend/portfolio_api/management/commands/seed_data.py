from django.core.management.base import BaseCommand
from portfolio_api.models import Skill, Project, Education, Certification


class Command(BaseCommand):
    help = 'Seeds the database with Rahmatullah Wahdat portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding portfolio data...')

        # Skills
        skills_data = [
            # Programming Languages
            ('Python', 'language', 90, 1),
            ('JavaScript', 'language', 80, 2),
            ('TypeScript', 'language', 70, 3),
            ('HTML5', 'language', 90, 4),
            ('CSS3', 'language', 85, 5),
            # Frameworks
            ('Django', 'framework', 85, 1),
            ('Django REST Framework', 'framework', 85, 2),
            ('React.js', 'framework', 70, 3),
            ('Angular', 'framework', 50, 4),
            # Databases
            ('MySQL', 'database', 75, 1),
            ('SQLite', 'database', 80, 2),
            # DevOps & Tools
            ('Git', 'devops', 85, 1),
            ('GitHub', 'devops', 85, 2),
            ('Linux (Ubuntu)', 'devops', 75, 3),
            ('VS Code', 'devops', 90, 4),
            # Spoken Languages
            ('Persisch', 'language_spoken', 100, 1),
            ('Deutsch (B2)', 'language_spoken', 70, 2),
            ('Englisch (B2)', 'language_spoken', 70, 3),
        ]

        for name, category, proficiency, order in skills_data:
            Skill.objects.get_or_create(
                name=name,
                defaults={'category': category, 'proficiency': proficiency, 'order': order}
            )

        # Projects
        projects_data = [
            {
                'title': 'Fullstack Todo App',
                'description': 'A complete fullstack Todo application with Django REST Framework backend and React frontend. Features token-based authentication, full CRUD operations, and deployment to Render (backend) and Vercel (frontend).',
                'tech_stack': 'Django, Django REST Framework, React.js, Python, JavaScript, SQLite',
                'github_url': 'https://github.com/rahmat530',
                'status': 'wip',
                'featured': True,
                'order': 1,
            },
            {
                'title': 'Portfolio Website',
                'description': 'A modern, full-stack developer portfolio built with React.js and Django. Features a responsive sidebar navigation, admin panel for content management, and dynamic CRUD for all sections.',
                'tech_stack': 'React.js, Django, Django REST Framework, Python, CSS3',
                'github_url': 'https://github.com/rahmat530',
                'status': 'wip',
                'featured': True,
                'order': 2,
            },
        ]

        for p in projects_data:
            Project.objects.get_or_create(title=p['title'], defaults=p)

        # Education
        education_data = [
            {
                'institution': 'IBB Institut für Berufliche Bildung AG',
                'degree': 'Umschulung: Fachinformatiker Anwendungsentwicklung',
                'field': 'Softwareentwicklung, Datenbanken, Webentwicklung',
                'location': 'Oldenburg, DE',
                'start_date': '09.2025',
                'end_date': 'Present',
                'is_current': True,
                'order': 1,
            },
            {
                'institution': 'Volksschochschule (VHS)',
                'degree': 'Deutschkurs für den Beruf – B2 Zertifikat',
                'location': 'Oldenburg, DE',
                'start_date': '10.2024',
                'end_date': '03.2025',
                'order': 2,
            },
            {
                'institution': 'Volkshochschule (VHS)',
                'degree': 'Deutsch Integrationskurs – B1 Zertifikat',
                'location': 'Oldenburg, DE',
                'start_date': '02.2024',
                'end_date': '06.2024',
                'order': 3,
            },
            {
                'institution': 'Kabul Polytechnik Universität',
                'degree': 'Bachelor of Science (B.Sc.)',
                'field': 'Geologisches Ingenieurwesen und Bergbauerkundung',
                'location': 'Kabul, Afghanistan',
                'start_date': '04.2016',
                'end_date': '10.2020',
                'order': 4,
            },
        ]

        for e in education_data:
            Education.objects.get_or_create(
                institution=e['institution'], degree=e['degree'],
                defaults=e
            )

        # Certifications
        certs_data = [
            {
                'name': 'Deutsch B2 Zertifikat',
                'issuer': 'Volkshochschule Oldenburg',
                'date_obtained': '03.2025',
                'description': 'Deutschkurs für den Beruf – B2 Level',
                'order': 1,
            },
            {
                'name': 'Deutsch B1 Zertifikat',
                'issuer': 'Volkshochschule Oldenburg',
                'date_obtained': '06.2024',
                'description': 'Deutsch Integrationskurs – B1 Level',
                'order': 2,
            },
            {
                'name': 'Basic Gemology',
                'issuer': 'Kabul Polytechnic University',
                'date_obtained': '06.2019',
                'order': 3,
            },
            {
                'name': 'English for Academic Purposes (TOEFL Prep)',
                'issuer': 'The TOEFL House, Kabul',
                'date_obtained': '10.2018',
                'order': 4,
            },
        ]

        for c in certs_data:
            Certification.objects.get_or_create(name=c['name'], defaults=c)

        self.stdout.write(self.style.SUCCESS('✅ Data seeded successfully!'))
