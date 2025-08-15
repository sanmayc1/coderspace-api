
import express ,{Application} from "express"
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser"
import { config } from "../../shared/config.js"
import { AuthRoute } from "./routes/auth/auth.route.js"


export class Server {
    private _app: Application
    private _server:http.Server | null 

    constructor(){
        this._app = express()
        this._server = null
        this.configureMiddleware()
        this.configureRouter()
    }

    private configureMiddleware():void{
      this._app.use(cors({origin:config.client.uri,credentials:true}))
      this._app.use(express.json())
      this._app.use(express.urlencoded({extended:true}))
      this._app.use(cookieParser())
    }

    private configureRouter():void{
      this._app.use("/api/v1/auth",new AuthRoute().router)
      
    }

   public start():void{
       this._server = this._app.listen(config.server.port,()=>{
            console.log(`Server running on http://${config.server.host}:${config.server.port}`)
        })
    }
}


