# Build container
echo "Building web container"
docker-compose -f devel/docker/flashcube/docker-compose.yml build web

# Start application
echo "Starting Application"
docker-compose -f devel/docker/flashcube/docker-compose.yml up -d web

# Create superuser
echo "Create Superuser"
docker-compose -f devel/docker/flashcube/docker-compose.yml run web python manage.py createsuperuser