# 🚀 Guía para Subir el Proyecto a GitHub

## 📋 Pasos para Subir a GitHub

### 1. Crear Repositorio en GitHub

1. **Ve a GitHub.com** y haz login en tu cuenta
2. **Haz clic en "New repository"** (botón verde)
3. **Configura el repositorio:**
   - **Repository name:** `youtube-sponsorship-manager`
   - **Description:** `Aplicación moderna de gestión de patrocinios de YouTube con IA y tablero Kanban`
   - **Visibility:** Public (recomendado) o Private
   - **NO marques** "Add a README file" (ya tenemos uno)
   - **NO marques** "Add .gitignore" (ya tenemos uno)
   - **NO marques** "Choose a license" (opcional)

4. **Haz clic en "Create repository"**

### 2. Conectar el Repositorio Local con GitHub

Ejecuta estos comandos en la terminal (ya estás en el directorio correcto):

```bash
# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/youtube-sponsorship-manager.git

# Cambiar a la rama main (si no estás ya en ella)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

### 3. Verificar la Subida

1. **Ve a tu repositorio** en GitHub: `https://github.com/TU_USUARIO/youtube-sponsorship-manager`
2. **Verifica que todos los archivos** estén presentes
3. **El README.md** debería mostrarse automáticamente

## 🎯 Configuración Adicional del Repositorio

### 1. Configurar GitHub Pages (Opcional)

Para tener una demo en vivo:

1. **Ve a Settings** del repositorio
2. **Scroll down a "Pages"**
3. **Source:** Deploy from a branch
4. **Branch:** main
5. **Folder:** / (root)
6. **Haz clic en "Save"**

### 2. Agregar Topics/Tags

En la página principal del repositorio:
1. **Haz clic en el ícono de engranaje** junto a "About"
2. **Agrega estos topics:**
   - `react`
   - `typescript`
   - `tailwindcss`
   - `shadcn-ui`
   - `kanban`
   - `youtube`
   - `sponsorship`
   - `ai`
   - `dashboard`

### 3. Configurar Issues y Projects

1. **Ve a "Issues"** y habilita el tablero
2. **Ve a "Projects"** y crea un nuevo proyecto
3. **Configura templates** para issues y pull requests

## 📝 Comandos Útiles para el Futuro

### Actualizar el Repositorio
```bash
# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push origin main
```

### Clonar el Repositorio (en otra máquina)
```bash
git clone https://github.com/TU_USUARIO/youtube-sponsorship-manager.git
cd youtube-sponsorship-manager
npm install
npm run dev
```

### Crear una Nueva Rama
```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "Agregar nueva funcionalidad"

# Subir la rama
git push origin feature/nueva-funcionalidad
```

## 🎉 ¡Listo!

Una vez que hayas seguido estos pasos, tu proyecto estará disponible en GitHub y podrás:

- **Compartir el código** con otros desarrolladores
- **Colaborar** en el desarrollo
- **Hacer deploy** automático con GitHub Actions
- **Crear releases** y versiones
- **Gestionar issues** y pull requests

## 🔗 Enlaces Útiles

- **Tu repositorio:** `https://github.com/TU_USUARIO/youtube-sponsorship-manager`
- **GitHub Pages:** `https://TU_USUARIO.github.io/youtube-sponsorship-manager` (si configuraste Pages)
- **Documentación:** Ver README.md en el repositorio

¡Tu aplicación de gestión de patrocinios de YouTube ya está en GitHub! 🚀
