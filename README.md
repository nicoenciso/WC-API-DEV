# 🌐 **WeCode API Documentation** 🌐

## 📂 CRUD de Usuarios

### ➕ Crea un nuevo usuario
**POST: /api/v1/users** (automáticamente vía **Clerk**)

**Objeto Usuario**:
```json
{
    "id": type int not null,(serializados)
    "username": type string unique,
    "email": type string unique not null,
    "first_name": type string max 100,
    "last_name": type string max 100,
    "image_url": type string not null,
    "skills": type string max 500,
    "description": type string max 500,
    "created_at": type timestamp default current,
    "updated_at": type timestamp default current,
    "onboarding_state": type boolean default false
    "following_count": type int default 0,(añadido por consulta)
    "followers_count": type int default 0,(añadido por consulta)
}
```
**Response**: Objeto **Usuario** creado. ✅

### 🔄 Devuelve todos los usuarios
**GET: /api/v1/users**

### 🔍 Devuelve un usuario por su ID
**GET: /api/v1/users/:id**

### 🔍 Devuelve un usuario por su nombre de usuario  
**GET: /api/v1/users/user/:username**  

### ✏️ Actualiza un usuario por su ID
**PUT: /api/v1/users/update/:id**

**Campos actualizables**:
```json
{
    "username",
    "first_name",
    "last_name",
    "skills",
    "description",
    "onboarding_state",
    "image_url",
}
```
**Response**: Objeto **Usuario** actualizado. ✅

### 🗑️ Elimina un usuario por su ID
**DELETE: /api/v1/users/delete/:id**

## 📝 CRUD de Posts

### ➕ Publica un nuevo contenido
**POST: /api/v1/posts**

**Objeto Post**:
```json
{
    "id": type int not null,(serializados)
    "title": type string max 100 not null,
    "content": type string not null,
    "user_id": type string not null,(referenciado)
    "image_url": type string max 255,
    "tags": type string max 255,(tags separados por ",")
    "created_at": type timestamp default current,
    "updated_at": type timestamp default current,
    "autor_username": type string,(añadido por consulta)
    "autor_first_name": type string,(añadido por consulta)
    "autor_last_name": type string,(añadido por consulta)
    "autor_image_url": type string,(añadido por consulta)
}
```
**Response**: Objeto **Post** creado. ✅

### 🔄 Devuelve todos los posts
**GET: /api/v1/posts?limit=10&offset=0**

**Response**: Array de objetos **Posts** opcionalmente paginados del más reciente al más antiguo. 📄

### 🔍 Devuelve los posts por id del usuario
**GET: /api/v1/posts/user/:id?limit=10&offset=0**

**Response**: Array con objetos **Posts** de un usuario, opcionalmente paginados del más reciente al más antiguo. 📄

### 🔍 Devuelve los posts por un tag en específico
**GET: /api/v1/posts/tag/:tag?limit=10&offset=0**

**Response**: Array de objetos **Posts** con un tag, opcionalmente paginados del más reciente al más antiguo. 📄

### 🔍 Devuelve un post por su id
**GET: /api/v1/posts/:id**

### 🔍 Devuelve los posts mediante búsqueda incremental
**GET: /api/v1/posts/search/:searchParam**

### ✏️ Actualiza un post por su id
**PUT: /api/v1/posts/update/:id**

**Campos actualizables**:
```json
{
    "title",
    "content",
    "image_url",
    "tags"
}
```
**Response**: Objeto **Post** actualizado. ✅

### 🗑️ Elimina un post por su id
**DELETE: /api/v1/posts/delete/:id**

### 📊 Devuelve los tags ordenados por la cantidad de post creados con ese tag (opcionalmente con un límite de cantidad)
**GET: /api/v1/tags?limit=10**

**Response**: Array de objetos **Tags** ordenados por la cantidad de posts creados con cada tag, opcionalmente limitados en cantidad. 🔖

## 💬 CRUD de Comentarios

### ➕ Publica un nuevo comentario en un post específico
**POST: /api/v1/comments/:postId**

**Objeto Comentario**:
```json
{
    "id": type int not null,(serializados)
    "content": type string not null,
    "user_id": type string not null,(referenciado)
    "post_id": type int not null,(referenciado)
    "created_at": type timestamp default current,
    "updated_at": type timestamp default current
}
```
**Response**: Objeto **Comentario** creado. ✅

### 🔄 Obtiene todos los comentarios de un post específico
**GET: /api/v1/comments/:postId**

### ✏️ Actualiza un comentario por su id
**UPDATE: /api/v1/comments/update/:id**

**Campos actualizables**:
```json
{
    "content"
}
```
**Response**: Objeto **Comentario** actualizado. ✅

### 🗑️ Elimina un comentario por su id
**DELETE: /api/v1/comments/delete/:id**

## 👥 CRUD de Seguidores

### ➕ Seguir a un usuario
**POST: /api/v1/follow/:id**

**Response**: Usuario seguido. ✅

### ❌ Dejar de seguir a un usuario
**DELETE: /api/v1/followers/unfollow/:id**

**Response**: Usuario dejado de seguir. ✅


### 🔍 Obtener a quienes sigue un usuario
**GET: /api/v1/followers/:id/following**

**Response**: Array de objetos **Usuarios** que el usuario especificado sigue. 📄

### 🔍 Obtener los posts de los usuarios seguidos por un usuario
**GET: /api/v1/following/posts/:id**

**Response**: Array de objetos **Posts** de los usuarios seguidos por el usuario especificado. 📄

### 🔝 Obtener los cinco usuarios más seguidos
**GET: /api/v1/top-followed-users**

**Response**: Array de los cinco objetos **Usuarios** más seguidos. 📄

## 🏷️ CRUD de Tags

### 🔍 Devuelve los tags ordenados por la cantidad de post creados con ese tag (opcionalmente con un limite de cantidad)
**GET: /api/v1/tags?limit=10**

**Response**: Array de objetos **Tags** ordenados por la cantidad de posts creados con cada tag, opcionalmente limitados en cantidad. 🔖

## 🎣 Ruta Clerk Webhooks: /api/v1/webhooks

### 🎉 Webhooks para integración con Clerk
