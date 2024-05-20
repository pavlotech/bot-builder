import { Context, Scenes as TelegrafScenes } from "telegraf";
import { SceneContext, SceneContextScene } from "telegraf/typings/scenes";

export interface IBotContext extends Context {
  session: SessionData;
  scene: SceneContextScene<SceneContext<SceneSessionData>, SceneSessionData>;
}

interface SessionData extends TelegrafScenes.SceneSession<SceneSessionData> {
  
}

interface SceneSessionData extends TelegrafScenes.SceneSessionData {
  state: {
    lang: string;
  };
}