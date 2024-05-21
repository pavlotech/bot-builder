// index.ts
import App from "./src/app";
import { ConfigService } from "./src/config/config.service";

new App(new ConfigService());