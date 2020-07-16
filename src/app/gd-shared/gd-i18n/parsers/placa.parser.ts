import { BaseParser } from "./base.parser";

export class PlacaParser extends BaseParser {
    public static parse(plate: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return plate;
        }

        plate = plate.replace(/[^a-zA-Z0-9]/g, "");

        let pattern = config.config.placa.pattern;

        let toView: string = super.parse(plate, pattern, fromPipe, true).replace(/[^a-zA-Z0-9]/g, "") + (fromPipe ? config.config.sufixo : "");
        let toModel:string = super.parse(plate, pattern, fromPipe, true).replace(/[^a-zA-Z0-9]/g, "");

        if (toView.length < pattern.length && triggerOnBlur) {
            return {
                toView: "",
                toModel: ""
            }
        }

        return {
            toView: toView.toUpperCase(),
            toModel: toModel.toUpperCase()
        };
    }

    public validate(plate: string) {
        let valida = false;
        let regex = new RegExp("^(([\\w]{3}\\w{4})|([\\w]{3}\\-\\w{4}))$");

        valida = regex.test(plate);

        return valida;
    }
    
}