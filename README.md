# Taller_3_IDWM
### Requisitos previos

- SDK [.NET 7](https://dotnet.microsoft.com/es-es/download/dotnet/7.0).
- .NET [EF CLI](https://www.nuget.org/packages/dotnet-ef/)
- git [2.33.0](https://git-scm.com/downloads) o superior.
- Node.js y npm instalados
- Puerto 5148 Libre

    
## BACKEND
### Pasos para clonar

1. Clona el repositorio:
```bash
git clone https://github.com/KuajinaiSS/Taller_3_IDWM
```

2. accede a la carpeta
```bash
cd .\Taller_3_IDWM\Backend\MobileHub\
```

3. Instala las dependencias
```bash
dotnet restore
```

4. Configura el .env con tus valores
```bash
copy .env.example .env
```

5. Migra la base de datos
```bash
dotnet ef database update
```

6. Inicia el servidor de desarrollo
```bash
dotnet watch --no-hot-reload
```
NO CIERRES LA TERMINAL

## FRONTEND
#### Instalación del Frontend
Abrimos otra terminal y nos dirijiremos al MobileHub del frontend

1. Accede al directorio del frontend:
```bash
cd .\Taller_3_IDWM\Frontend\MobileHub\
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el frontend
```bash
npm run start
```

### en el LoginScreen.tsx y en el registerScreen.tsx tienes que colocar tu url como corresponde segun tu ipconfig

#### igual mencionar que el metodo del frontend que obtiene los commits por repositorios no funciona
#### NO LO INTENTES HACER FUNCIONAR, perdi mi token de Github, PERO FUNCIONA BIEN EN POSTMAN Y SWAGGER
