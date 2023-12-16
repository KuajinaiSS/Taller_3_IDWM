﻿# Taller_3_IDWM
### Requisitos previos

- SDK [.NET 7](https://dotnet.microsoft.com/es-es/download/dotnet/7.0).
- .NET [EF CLI](https://www.nuget.org/packages/dotnet-ef/)
- git [2.33.0](https://git-scm.com/downloads) o superior.
- Node.js y npm instalados

    
## BACKEND
### Pasos para clonar

1. Clona el repositorio:
```bash
https://github.com/KuajinaiSS/Taller_3_IDWM
```

2. accede a la carpeta
```bash
cd Backend/MobileHub
```

3. Instala las dependencias
```bash
npm install
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

## FRONTEND
#### Instalación del Frontend

1. Accede al directorio del frontend:
```bash
cd ..\..\frontend\MobileHub
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el frontend
```bash
npm run start
```
