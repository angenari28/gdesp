import { BaseParser } from "./base.parser";

export class TempoParser extends BaseParser {
    public static parse(tempo: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return tempo;
        }
        tempo = tempo.replace(/[^a-zA-Z0-9]/g, "");

        let pattern = config.config.tempo.pattern;
        let toView = super.parse(tempo, pattern, fromPipe, true) + (fromPipe ? config.config.sufixo : "");
        let toModel = toView.replace(/[^a-zA-Z0-9]/g, "");

        if ((toView.length < pattern.length && triggerOnBlur) || 
            (toView.length == pattern.length && parseInt(toView.substr(toView.indexOf(":")+1, 1)) > 5)) {
            return {
                toView: "",
                toModel: ""
            }
        }

        return {
            toView: toView,
            toModel: toModel
        };
    }
}