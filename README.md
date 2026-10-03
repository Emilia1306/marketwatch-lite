# MarketWatch Lite

Aplicación web desarrollada como SPA para visualizar información de mercado de criptomonedas utilizando la API pública de CoinGecko.

## Tecnologías utilizadas

- Angular CLI 20.3.8
- Angular 20
- TypeScript
- Bootstrap
- CoinGecko API

El proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión `20.3.8`.

## Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```text
marketwatch-lite/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── crypto-card/
│   │   │   │   ├── crypto-card.component.html
│   │   │   │   ├── crypto-card.component.scss
│   │   │   │   └── crypto-card.component.ts
│   │   │   │
│   │   │   └── crypto-detail/
│   │   │       ├── crypto-detail.component.html
│   │   │       ├── crypto-detail.component.scss
│   │   │       └── crypto-detail.component.ts
│   │   │
│   │   ├── models/
│   │   │   └── crypto.model.ts
│   │   │
│   │   ├── services/
│   │   │   └── crypto.service.ts
│   │   │
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   └── app.ts
│   │
│   ├── environments/
│   │   └── environment.example.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Organización de la aplicación

El proyecto se encuentra dividido en diferentes partes:

### `components`

Contiene los componentes reutilizables de la aplicación.

#### `crypto-card`

Se encarga de mostrar la información resumida de cada criptomoneda.

Incluye:

- imagen
- nombre
- símbolo
- precio
- variación de las últimas 24 horas
- estado de favorito

#### `crypto-detail`

Se encarga de mostrar información adicional de la criptomoneda seleccionada.

Incluye:

- precio actual
- capitalización de mercado
- ranking
- variación de las últimas 24 horas

### `models`

Contiene las interfaces utilizadas para tipar la información recibida desde la API.

### `services`

Contiene la lógica para consumir el servicio.


### `environments`

Contiene la configuración necesaria para conectarse con la API de CoinGecko.

Por motivos de seguridad, el archivo local `environment.ts`, que contiene la API Key utilizada por la aplicación, no se encuentra almacenado en el repositorio.

En su lugar se incluye `environment.example.ts`, que contiene la estructura necesaria para crear la configuración local del proyecto.

Para ejecutar la aplicación, se debe copiar o renombrar el archivo `environment.example.ts` como `environment.ts`.

De esta forma, la carpeta debe quedar localmente de la siguiente manera:

```text
environments/
├── environment.example.ts
└── environment.ts
```

# Instalación

## Requisitos previos

Antes de ejecutar el proyecto es necesario contar con:

- Node.js
- npm
- Angular CLI

## 1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>

Ingresar al proyecto:

cd marketwatch-lite

## 2. Instalar dependencias

npm install

Esto instalará todas las dependencias de `package.json`.

## 3. Bootstrap

El proyecto utiliza Bootstrap para el diseño responsivo y los componentes visuales.

Si Bootstrap no se encuentra instalado, ejecutar:

npm install bootstrap

Bootstrap se carga globalmente desde:

src/styles.scss



## 4. Configurar CoinGecko

La aplicación utiliza la Demo API de CoinGecko.

El repositorio contiene el archivo:

```text
src/environments/environment.example.ts
```

con la estructura necesaria para configurar la API.

Su contenido es similar a:

```ts
export const environment = {
  production: false,
  coingeckoApiUrl: 'https://api.coingecko.com/api/v3',
  coingeckoApiKey: 'DEMO_API_KEY'
};
```

Debe crear una copia llamada:

```text
src/environments/environment.ts
```

y agregar su API Key de CoinGecko.

Ejemplo:

```ts
export const environment = {
  production: false,
  coingeckoApiUrl: 'https://api.coingecko.com/api/v3',
  coingeckoApiKey: 'YOUR_API_KEY'
};
```

Puede obtener una Demo API Key desde el sitio de CoinGecko.

### Importante

El archivo:

```text
src/environments/environment.ts
```

se encuentra incluido en `.gitignore` y no debe almacenarse en el repositorio.

Esto evita publicar la API Key directamente en GitHub.

El archivo:

```text
environment.example.ts
```


# Ejecutar el proyecto

Una vez instaladas las dependencias y configurado el archivo `environment.ts`, ejecutar:

```bash
ng serve
```

si el script correspondiente se encuentra configurado en `package.json`.

Cuando el servidor esté disponible, abrir:

```text
http://localhost:4200/
```