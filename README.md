# 🚀 Servicio de Asistentes Xicam

## 📜 Descripción

El Servicio de Asistentes Xicam es una solución backend revolucionaria que integra el Modelo de Lenguaje de OpenAI. Este servicio, construido con Node.js, Express y Socket.io, se especializa en procesar y responder a consultas de clientes de forma eficiente y efectiva.

## 🔧 Instalación

Para comenzar:

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar todas las dependencias.

## 🚀 Uso

- Inicia el servidor con `npm start`.
- Accede a la interfaz en `http://localhost:3000`.

## 💡 Características Clave

- **Comunicación en Tiempo Real:** Utiliza Socket.io para interactuar dinámicamente con los clientes.
- **Integración con OpenAI:** Aprovecha la API de OpenAI para un procesamiento de consultas avanzado.
- **Respuestas JSON Estructuradas:** Facilita la organización y categorización de las respuestas de los clientes.
- **Variables de Entorno:** Configura claves API y personaliza el servicio según tus necesidades.
- **Gestión de Reservas:** Automatiza la reserva y recolección de datos de los clientes.
- **Servicios de Ubicación:** Ofrece direcciones y detalles de ubicación precisos.
- **Respuestas Asíncronas:** Maneja las consultas en segundo plano para una mayor eficiencia.

## 🌐 Puntos de Acceso

- **/newAssistant:** Crea un nuevo asistente y gestiona consultas.
- **/newMessage:** Procesa y responde a mensajes de clientes utilizando la API de OpenAI.

## ⚙️ Configuración Personalizada

- Adapta los prompts para contextos de proyecto específicos.
- Desarrolla documentos de conocimiento personalizados para mejorar la precisión.

## 🌍 Variables de Entorno

Configura las siguientes variables en un archivo `.env`:

- `OPENAI_API_KEY`: Clave de API de OpenAI.
- `THREAD_ID`: ID para las conversaciones de OpenAI.
- `ASSISTANT_ID`: ID del asistente.
- `USER`: Usuario para la creación del asistente.
- `PASSWORD`: Contraseña del asistente.

## 🔄 Registro de Cambios

- **Versión 1.1:** Implementación de servicios de reserva y localización.
- **Versión 1.0:** Lanzamiento inicial con funcionalidades básicas.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
