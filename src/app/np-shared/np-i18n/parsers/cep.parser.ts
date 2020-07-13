import { BaseParser } from "./base.parser";

export class CepParser extends BaseParser {
    public static parse(cep: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return cep;
        }
        cep = cep.replace(/[^a-zA-Z0-9]/g, "");

        let pattern = config.config.cep.pattern;
        let toView = super.parse(cep, pattern, fromPipe, true) + (fromPipe ? config.config.sufixo : "");
        let toModel = super.parse(cep, pattern, fromPipe, true).replace(/[^a-zA-Z0-9]/g, "");

        if (toView.length < pattern.length && triggerOnBlur) {
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