import { BaseParser } from "./base.parser";

export class TelefoneParser extends BaseParser {
    public static parse(phone: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return phone;
        }

        let num = phone.replace(/[^a-zA-Z0-9]/g, "");

        let ret = "";
        let mask: string[] = [
            config.config.telefone.patternFixo,            
            config.config.telefone.patternCelular,
            config.config.telefone.patternFixoComDDD,            
            config.config.telefone.patternCelularComDDD,
            config.config.telefone.patternFixoComDDDeDDI,
            config.config.telefone.patternCelularComDDDeDDI
        ]

        for (let i = 0; i < mask.length; i++){
            let SoLetrasENumeros = mask[i].replace(/[^a-zA-Z0-9]/g, "");
            if ((i == 0 && num.length <= SoLetrasENumeros.length) ||
                (num.length == SoLetrasENumeros.length) ||
                (i == mask.length - 1 && num.length >= SoLetrasENumeros.length)) {
                ret = super.parse(num, mask[i], fromPipe, true);
                break;
            }
        }

        let toView: string = ret + (fromPipe ? config.config.sufixo : "");
        let toModel: string = ret.replace(/[^a-zA-Z0-9]/g, "");

        if (toView.length < ret.length && triggerOnBlur) {
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
}