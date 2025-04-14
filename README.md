# Coworking Booking

Full Stack application and dockerized. Platform to simplify the booking for desks or meeting rooms in coworking spaces.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Coworking Booking**
| :label: Tecnologias | React, NodeJS, TypeORM, PostgreSQL, Tailwind, Docker
| :rocket: URL         | Not live

![](https://user-images.githubusercontent.com/64661100/204069261-7b1a4259-8db6-4031-a885-533e6093114d.png#vitrinedev)


<!-- Inserir imagem com a #vitrinedev ao final do link -->
![](https://user-images.githubusercontent.com/64661100/203874519-a0974abe-6df9-45e9-9340-e45fdf72f14c.mp4)

https://user-images.githubusercontent.com/64661100/203874519-a0974abe-6df9-45e9-9340-e45fdf72f14c.mp4

## Live
   You can use the platform [Coworking Booking](http://15.228.154.83:5137/) deployed on AWS EC2.

## ▶️ Running Locally
### Prerequisites:
   - Have Docker installed on your machine, as the entire application will be uploaded in Docker containers.
   - Configure your own file /coworkingbook/server/.env to create the environment variables used by the server-side application (see the .env.example file).
   
   ![image](https://user-images.githubusercontent.com/64661100/204067987-d80d6e85-7c32-4a76-97b2-d606be2cb530.png)


### Steps:
   - Clone this repository:
   ```
   git clone https://github.com/yujisoyama/coworkingbook.git
   ```
   - Enter in the folder project:
   ```
   cd coworkingbook
   ```
   - Let's build the containers for the server-side application and the client-side application. To do this, run the two commands below:
   ```
   docker compose build node
   ```
   ```
   docker compose build web
   ```
   - Finishing building the two containers, run the following command to run the entire application:
   ```
   docker compose up
   ```
   - To access the web interface after uploading the containers, enter the address below: 
   ```
   http://localhost:5137/
   ```

## 🛠 Stacks

> Front-end: 

- <strong>React</strong>
- <strong>TypeScript</strong>
- <strong>TailwindCSS</strong>
- <strong>Axios</strong>

> Back-end: 

- <strong>Node e Express</strong>
- <strong>TypeScript</strong>
- <strong>TypeORM</strong>
- <strong>JWT</strong>
- <strong>Bcrypt</strong>
- <strong>Nodemailer</strong>
