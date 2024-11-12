import express from 'express'
import mongoose from "mongoose"; //ODM (Object Data Modeling) library for MongoDB and NodeJs
import cors from 'cors'
import dotenv from 'dotenv'
import route from './route.js';
import cookieParser from 'cookie-parser'; // if the frontend use cookies for storing jwt

class ServerSetUp {
    constructor() {
        dotenv.config(); // loads environment variables using 'dotenv.config()'

        // instance variables
        /**
         * Instance variables (this.PORT, this.MONGO_URL) are used to store configuration values, keeping them private to the instance of the class.
         * Initializes this.PORT and this.MONGO_URL with values from the environment.
         * Set up your own environment file(it should be at the root directory and has .env extension)
         */
        this.PORT = process.env.PORT;
        this.MONGO_URL = process.env.MONGO_URL;

        /**
         * The instance method 'this.connectServer()' will be automatically called when the instance of the dependant class is created
         */
        this.connectServer();
        this.allowedOrigins = [process.env.ORIGIN1, process.env.ORIGIN2]; //multiple frontend urls
    }

    async connectDatabase() {
        try {
            await mongoose.connect(`${this.MONGO_URL}/your_endpoint`);
            console.log("Database connected succesfully! - backend");
        } catch (error) {
            console.log("Database cannot be connected!");
        }
    }

    async connectServer() {
        try {
            await this.connectDatabase();
            const app = express();

            // middlewares
            app.use(express.json()); // parses incoming JSON requests
            app.use(cors({ 
                origin: (origin, callback) => {
                    if (this.allowedOrigins.indexOf(origin) !== -1 || !origin) {
                        // Allow requests with no origin (like mobile apps or curl requests)
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS'));
                    }
                },
                credentials: true,
            })); // enables CORS for the application
            app.use("/api", route); // Sets up routing for the API

            app.listen(this.PORT || 3000, `0.0.0.0`, () => { // put '0.0.0.0' to accept incoming connections on all available network interfaces (server accessibility)
                console.log(`Database connected at port: ${this.PORT}`)
            })
            console.log("Server setup successfully! - backend");
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * The constructor method (constructor()) is called when an instance of the class is created. It initializes the instance variables and starts the server setup process by calling this.connectServer().
 */

new ServerSetUp(); // instance of the class ServerSetUp
