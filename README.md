# 📝 Task Manager CLI

Una aplicación de línea de comandos interactiva para gestionar tareas, desarrollada en Node.js.

## 🚀 Características principales
- ✨ Interfaz interactiva de línea de comandos
- 💾 Almacenamiento persistente en JSON
- 🎯 Gestión completa de tareas (CRUD)
- 🎨 Interfaz amigable con emojis
- ⚡ Respuesta inmediata a comandos

## 📋 Requisitos previos
- Node.js (versión recomendada: 14.x o superior)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
 git clone <url-del-repositorio>
```
2. **Navegar directorio**
```bash
 cd tasklist
```
3. **Instalar depedencias**
```bash
  npm install
```
## 💻 Modo de uso
Iniciar aplicacion
```bash
  node main.js
```

📚 Comandos Disponibles
1. **Agregar**
```bash
  add <tarea>
```
2. **Lista de tareas**
  **Ver lista**
```bash
  list
```
  **Filtrar por estado**
  ```bash
    list pending
    list in-progress
    list done
  ```
3. **Actualizar estado**
   ```bash
    update [ID] [estado]
   ```
   **Estados disponibles**
     1.pending
     2.in-process
     3.done
**Ejemplo**
```bash
  update 1234567890 "in-progress"
```
4. **Eliminar tarea**
 ```bash
    delete [ID]
   ```
**Ejemplo**
```bash
  delete 1234567890
```
5. **Salir de la aplicacion**
```bash
  exit
```
