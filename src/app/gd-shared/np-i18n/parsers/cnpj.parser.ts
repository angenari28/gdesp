import { BaseParser } from "./base.parser";

export class CnpjParser extends BaseParser {
    public static parse(cnpj: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return cnpj;
        }
        cnpj = cnpj.replace(/[^a-zA-Z0-9]/g, "");


        let pattern = config.config.cnpj.pattern;
        let toView = super.parse(cnpj, pattern, fromPipe, true) + (fromPipe ? config.config.sufixo : "");
        let toModel = super.parse(cnpj, pattern, fromPipe, true).replace(/[^a-zA-Z0-9]/g, "");

        return {
            toView: toView,
            toModel: toModel
        };
    }
}