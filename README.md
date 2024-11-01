# Iniciar el proyecto

## Clonar el repositorio

1.  **Clonar el repositorio en la maquina local**
```bash
    git clone https://github.com/Klezya/WyB-ConsumoDeApi
```

2.  **Entrar a la carpeta del repositorio**
```bash
    cd WyB-ConsumoDeApi
```
## Levantar los servidores

3.  **Levantar la Api django**
```bash
    #Desde la carpeta del repositorio
    cd ventas
    python3 manage.py runserver
```

4.  **En caso de no tener las siguientes librerias de python**
```bash
    Django                          5.1.2
    django-cors-headers             4.6.0
    djangorestframework             3.15.2
    psycopg2                        2.9.10 #psycopg2 o psycopg2-binary 
    psycopg2-binary                 2.9.10 #psycopg2 o psycopg2-binary


```
    1. **

***

# Modificaciones Realizadas en API

## Reemplazamos base de datos con "Supabase" en la nube

1.  **Instalar manejador de base de datos Postgres:**
```bash
    pip install psycopg2-binary
```

2.  **reemplazar constante DATABASES en 'settings.py':**
```bash
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': 'postgres.xorfosumkeqjdwcvfjhv',
            'PASSWORD': 'z68epwtmCtFeZPvI',
            'HOST': 'aws-0-sa-east-1.pooler.supabase.com',
            'PORT': '6543',
        }
    }
```

## Configuramos CORS

**1. Instalar 'django-cors-headers':**
```bash
    python -m pip install django-cors-headers
```

**2. Aplicar las configuraciones a 'settings.py':**

```bash
    INSTALLED_APPS = [
        ...,
        "corsheaders",
        ...,
    ]

    MIDDLEWARE = [
        ...,
        "corsheaders.middleware.CorsMiddleware",
        "django.middleware.common.CommonMiddleware",
        ...,
    ]

    CORS_ALLOW_ALL_ORIGINS = True

    CORS_ALLOW_METHODS = (
        "DELETE",
        "GET",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
    )

    CORS_ALLOW_HEADERS = (
        "accept",
        "authorization",
        "content-type",
        "user-agent",
        "x-csrftoken",
        "x-requested-with",
    )
```

