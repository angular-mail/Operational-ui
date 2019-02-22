# OperationalClientUi

## Login Page

* Username could be any email adress, except _error@gmail.com_
* After logout all data about created apps will be removed

## User Page
* Users list only in memory
* Server requests to add / remove user are mocked


## Configuration (not all files include, only Operational partly)
 1. Upload format - json
 2. Download format - zip

## Server
* There is no server in the project. All requests are intercepted by custom "mockBackendInterceptor".
* JWTtoken authorization is also mocked (token adds to every request after sign in).
* There is only 1 configuration file on "server".





This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.2.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

