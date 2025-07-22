# Arquitectura Técnica del Backend - Gestor de Tareas

## Resumen Ejecutivo

Este proyecto implementa una API REST para gestión de tareas utilizando una arquitectura en capas con Node.js y Express.js. El sistema utiliza almacenamiento en memoria y sigue patrones de diseño establecidos para mantenibilidad y escalabilidad.

## Stack Tecnológico

### Runtime y Framework
- **Node.js v20.19.3**: Runtime de JavaScript del lado del servidor
- **Express.js v5.1.0**: Framework web minimalista y flexible para Node.js
- **JavaScript ES6+**: Lenguaje de programación principal (sin TypeScript en producción)

### Dependencias de Producción
```json
{
  "cors": "^2.8.5",           // Cross-Origin Resource Sharing
  "express": "^5.1.0"         // Framework web
}
```

### Dependencias de Desarrollo
```json
{
  "@types/*": "Definiciones TypeScript para desarrollo",
  "jest": "^30.0.4",                    // Framework de testing
  "swagger-jsdoc": "^6.2.8",           // Generación de documentación OpenAPI
  "swagger-ui-express": "^5.0.1",      // UI para documentación API
  "ts-jest": "^29.4.0",                // Preset Jest para TypeScript
  "ts-node-dev": "^2.0.0",             // Development server con hot reload
  "typescript": "^5.8.3"               // Compilador TypeScript
}
```

## Arquitectura del Sistema

### Patrón Arquitectónico: Layered Architecture (Arquitectura en Capas)

```
┌─────────────────────────────────────┐
│           CLIENT LAYER              │
│      (HTTP Requests/Responses)      │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│         PRESENTATION LAYER          │
│    ├── routes/task.routes.js        │
│    └── swagger.js                   │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│         CONTROLLER LAYER            │
│    └── controllers/task.controller.js│
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│          SERVICE LAYER              │
│    └── services/task.service.js     │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│           DATA LAYER                │
│    └── models/task.model.js         │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│         STORAGE LAYER               │
│      (In-Memory Array Storage)      │
└─────────────────────────────────────┘
```

## Descripción Detallada de Capas

### 1. Application Layer (app.js)
**Responsabilidad**: Configuración y bootstrap de la aplicación

```javascript
// Configuración del servidor Express
- Body parser middleware (JSON)
- CORS configuration
- Route mounting (/api)
- Swagger UI mounting (/api-docs)
- Server initialization (Puerto 3000)
```

**Características Técnicas**:
- Inicialización centralizada de middleware
- Separación de concerns entre configuración y lógica de negocio
- Configuración de documentación automática

### 2. Presentation Layer (Routes)
**Archivo**: `src/routes/task.routes.js`
**Responsabilidad**: Definición de endpoints y documentación OpenAPI

```javascript
Endpoints implementados:
- GET    /api/tasks           // Obtener todas las tareas
- POST   /api/tasks           // Crear nueva tarea
- PUT    /api/tasks/:id       // Actualizar tarea completa
- PATCH  /api/tasks/:id/toggle // Cambiar estado de completado
- DELETE /api/tasks/:id       // Eliminar tarea
```

**Características Técnicas**:
- Documentación Swagger/OpenAPI 3.0 embebida
- Validación de parámetros definida en JSDoc
- Separación clara entre routing y lógica de negocio
- Uso de middlewares de Express Router

### 3. Controller Layer
**Archivo**: `src/controllers/task.controller.js`
**Responsabilidad**: Manejo de HTTP requests/responses y orquestación

```javascript
Funciones implementadas:
- getTasks(req, res)      // Controlador para listar tareas
- createTask(req, res)    // Controlador para crear tarea
- updateTask(req, res)    // Controlador para actualizar tarea
- toggleTask(req, res)    // Controlador para cambiar estado
- deleteTask(req, res)    // Controlador para eliminar tarea
```

**Características Técnicas**:
- Manejo de códigos de estado HTTP apropiados
- Validación básica de parámetros de entrada
- Transformación de datos entre capa de servicio y HTTP
- Manejo de errores con respuestas HTTP apropiadas

### 4. Service Layer (Business Logic)
**Archivo**: `src/services/task.service.js`
**Responsabilidad**: Lógica de negocio y orquestación de modelos

```javascript
Servicios implementados:
- getTasks()                          // Obtener todas las tareas
- createTask(title, desc, priority)   // Crear nueva tarea
- modifyTask(id, title, desc, priority) // Modificar tarea existente
- changeTaskStatus(id)                // Toggle del estado completed
- removeTask(id)                      // Eliminar tarea por ID
```

**Características Técnicas**:
- Abstracción de la lógica de negocio
- Interfaz limpia entre controladores y modelos
- Manejo de validaciones de negocio
- Transformación y enriquecimiento de datos

### 5. Data Access Layer (Models)
**Archivo**: `src/models/task.model.js`
**Responsabilidad**: Gestión de datos y operaciones CRUD

```javascript
Modelo de datos Task:
{
  id: number,           // Auto-incremental
  title: string,        // Título de la tarea
  description: string,  // Descripción detallada
  completed: boolean,   // Estado de completado
  createdAt: Date,      // Fecha de creación
  updatedAt: Date,      // Fecha de última modificación
  priority: string      // Prioridad: 'low' | 'medium' | 'high'
}
```

**Operaciones CRUD**:
- `getAllTasks()`: Retorna array completo de tareas
- `createTask()`: Crea nueva instancia con ID auto-incremental
- `updateTask()`: Actualiza tarea existente por ID
- `toggleTask()`: Alterna estado completed
- `deleteTask()`: Elimina tarea por ID
- `resetTasks()`: Limpia array (para testing)

### 6. Storage Layer
**Tipo**: In-Memory Storage
**Implementación**: Array JavaScript + contador de ID

```javascript
let tasks = [];           // Array principal de almacenamiento
let idCounter = 1;        // Contador auto-incremental para IDs
```

**Características**:
- Almacenamiento volátil (se pierde al reiniciar)
- O(n) para búsquedas por ID
- O(1) para inserción
- No requiere configuración externa
- Ideal para desarrollo y testing

## Patrones de Diseño Implementados

### 1. Separation of Concerns
Cada capa tiene responsabilidades bien definidas y no se mezclan.

### 2. Dependency Injection (Básico)
Los controladores dependen de servicios, los servicios de modelos.

### 3. Factory Pattern (Modelo Task)
Constructor de clase para crear instancias consistentes.

### 4. Repository Pattern (Implícito)
El modelo actúa como repository abstracto para operaciones de datos.

## Flujo de Datos

### Request Flow (Flujo de Petición)
```
1. HTTP Request → Express Router
2. Router → Controller específico
3. Controller → Service layer
4. Service → Model/Data Access
5. Model → In-Memory Storage
```

### Response Flow (Flujo de Respuesta)
```
1. Storage → Model (data transformation)
2. Model → Service (business logic)
3. Service → Controller (HTTP formatting)
4. Controller → Express Response
5. Express → HTTP Response
```

## API Design

### Convenciones REST
- **GET**: Operaciones de lectura (idempotentes)
- **POST**: Creación de recursos
- **PUT**: Actualización completa de recursos
- **PATCH**: Actualización parcial
- **DELETE**: Eliminación de recursos

### Status Codes
- `200`: OK (GET, PUT, PATCH exitosos)
- `201`: Created (POST exitoso)
- `204`: No Content (DELETE exitoso)
- `404`: Not Found (recurso no encontrado)

### Content Type
- Request: `application/json`
- Response: `application/json`

## Documentación API

### OpenAPI 3.0 Specification
- **Herramienta**: Swagger/OpenAPI
- **Endpoint**: `http://localhost:3000/api-docs`
- **Generación**: Automática desde JSDoc comments
- **Formato**: JSON/YAML compatible

### Estructura de Documentación
```javascript
{
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0'
  },
  servers: [{ url: 'http://localhost:3000' }],
  paths: { /* definiciones de endpoints */ }
}
```

## Testing Strategy

### Framework: Jest
**Configuración**: `jest.config.js`
```javascript
{
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/tests/**/*.test.js']
}
```

### Test Structure
```
src/tests/
└── task.service.test.js    // Unit tests para service layer
```

### Test Coverage Actual
- **Service Layer**: ✅ Covered
- **Controller Layer**: ❌ No covered
- **Model Layer**: ❌ No covered  
- **Integration Tests**: ❌ No covered

### Testing Patterns
- **Unit Testing**: Servicios individuales
- **Setup/Teardown**: `beforeEach()` para reset de datos
- **Assertions**: Jest matchers para validación

## Build & Development Process

### Scripts NPM
```json
{
  "start": "node src/app.js",        // Producción
  "dev": "ts-node-dev src/app.js",   // Desarrollo con hot reload
  "test": "jest"                     // Ejecutar tests
}
```

### Development Workflow
1. **Development**: `npm run dev` (auto-reload)
2. **Testing**: `npm test` 
3. **Production**: `npm start`

### Hot Reload
- **Herramienta**: `ts-node-dev`
- **Función**: Reinicio automático en cambios de código
- **Configuración**: Proceso background con watch

## Consideraciones de Scalabilidad

### Limitaciones Actuales
1. **Storage**: In-memory (no persistente)
2. **Concurrency**: Single-threaded Node.js
3. **State**: No distributed state management
4. **Caching**: No implementado

### Recomendaciones para Escalabilidad
1. **Database**: Migrar a MongoDB/PostgreSQL
2. **Caching**: Implementar Redis
3. **Load Balancing**: Cluster mode o Load Balancer
4. **State Management**: Session store externo
5. **Monitoring**: Logging structured y métricas

## Security Considerations

### Implementado
- **CORS**: Configurado para cross-origin requests
- **JSON Parsing**: Body parser con límites implícitos

### No Implementado (Recomendaciones)
- **Authentication**: JWT/OAuth
- **Authorization**: Role-based access
- **Rate Limiting**: Express-rate-limit
- **Input Validation**: Joi/express-validator
- **Security Headers**: Helmet.js
- **HTTPS**: SSL/TLS configuration

## Deployment Architecture

### Current Setup
- **Environment**: Development local
- **Port**: 3000 (hardcoded)
- **Process Manager**: None

### Production Recommendations
```
┌─────────────────┐
│   Load Balancer │ (nginx/HAProxy)
└─────────────────┘
         │
┌─────────────────┐
│   Node.js App   │ (PM2 cluster)
└─────────────────┘
         │
┌─────────────────┐
│    Database     │ (MongoDB/PostgreSQL)
└─────────────────┘
```

## Conclusiones Técnicas

### Fortalezas
1. **Arquitectura Clara**: Separación bien definida de responsabilidades
2. **Documentación**: Swagger automático y completo
3. **Testing**: Framework configurado y funcionando
4. **Maintainability**: Código modular y organizado

### Áreas de Mejora
1. **Persistencia**: Implementar database real
2. **Testing**: Ampliar cobertura de tests
3. **Security**: Implementar autenticación y validación
4. **Error Handling**: Middleware centralizado de errores
5. **Logging**: Sistema de logs estructurado
6. **Environment Configuration**: Variables de entorno
7. **Type Safety**: Migración completa a TypeScript

### Complejidad Ciclomática
- **Baja**: Funciones pequeñas y enfocadas
- **Mantenible**: Estructura modular
- **Extensible**: Fácil agregar nuevas funcionalidades