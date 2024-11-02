## Clonar el repositorio

1.  **Clonar el repositorio en la maquina local**
    ```bash
        git clone https://github.com/Klezya/WyB-ConsumoDeApi
    ```

2.  **Entrar a la carpeta del repositorio**
    ```bash
        cd WyB-ConsumoDeApi
    ```

## Levantar API Django

1.  **Comprobar las librerias de python**
    ```bash
        Django                  5.1.2
        django-cors-headers     4.6.0
        djangorestframework     3.15.2
        psycopg2                2.9.10 #psycopg2-binary si esta libreria casa errores
    ```
    
2.  **En caso de no tener las librerias**
    ```bash
        pip install Django
        pip install django-cors-headers
        pip install djangorestframework
    ```

3.  **Instalar psycopg2**

    Esta libreria es la encargada de compatibilizar la base de datos postgres con la api Django.

    **Para windows:**

    - Tener instalado [PostgreSQL](https://www.postgresql.org/download/windows/) V16.0 o superior 
    - Tener instalado [Microsoft C++ Build Tools 2015](https://visualstudio.microsoft.com/es/visual-cpp-build-tools/) o superior

    - Instalar psycopg2:
        ```bash
            pip install psycopg2
        ```
    **Para linux**

    - Instalar el paquete ```libpq-dev```
        ```bash
            sudo apt update
            sudo apt install libpq-dev
        ```
    - Instalar psycopg2:
        ```bash
            pip install psycopg2
        ```

    **Para macOS (No Testeado)**

    - Instalar ```postgresSQL```
        ```bash
            brew install postgresql
        ```

    - Instalar psycopg2:
        ```bash
            pip install psycopg2
        ```
    
Con esto deberian estar todos los requisitos de la api cumplidos.

4.  **Levantar la Api**
    ```bash
        #Desde la carpeta del repositorio (WyB-ConsumoDeApi)
        cd ventas
        python3 manage.py runserver
    ```

## Levantar Front Angular


1.  **Requisitos**:
    - [Node.js](https://nodejs.org/en/download/package-manager) (versión 20.17 LTS)
    - [Angular](https://angular.dev/installation) (versión 18.2)

2.  **Verificar los requisitos**:
    ```bash
    node --version
    ng --version
    npm --version
    ```
3.  **Levantar Frontend Angular**
    ```bash
        #Dentro de la carpeta del repositorio (WyB-ConsumoDeApi)
        cd Frontend
        npm install
        ng serve
    ```



--------------------------------------------------------------

# Modificaciones Realizadas en API

## Reemplazamos base de datos con "Supabase" en la nube

Se decidio utilizar una base de datos postgres en la nube gratuita, como supabase, para tener un control y conexion centralizado sobre la base de datos, evitando problemas de conexion con la base de datos entre los integrantes del equipo. Para esto se utiliza la libreria ```psycopg2```

1.  **reemplazar constante DATABASES en 'settings.py':**

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

Para evitar conflictos con el CORS (Cross-Origin Resource Sharing) se instalo la libreria ```django-cors-headers``` y se aplicaron las siguientes modificaciones

1.  **Aplicar las configuraciones a 'settings.py':**

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

-------------------------------------------------------
# Decisiones Tomadas

1.  Se utilizo Angular como Frontend en lugar de Django en favor de la experiencia del equipo utilizando este software, ademas de la mayor facilidad que ofrece angular para manejar vistas, asi como tailwindCSS y Boostrap

2.  Se creo una sola vista llamada "Home" con todos los parametros solicitados para la solemne 2, facilitando la codificacion del proyecto.

3.  Se utilizo una Base de Datos en la nube para evitar conflictos con la api/db, de esta forma el equipo se centraria solamente en la programacion y funcionamiento del Frontend

-------------------------------------------------------
## Integrantes
- **Nuñez Lara, Benjamin**
- **Estay Valdivia, Vicente**
- **Oyanedel Cortes, Luis**

Universidad Andres Bello 2024