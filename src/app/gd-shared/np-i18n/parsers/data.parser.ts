import { DataHoraBaseParser } from "./data-hora-base.parser";

export class DataParser extends DataHoraBaseParser {

    public static parse(date: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return date;
        }
        let pattern = config.config.data.pattern;
        let dateObj = this.extractDateTime(date, config, pattern);
        let toView = (this.parseDateTime(dateObj, pattern, false) + (fromPipe ? config.config.sufixo : ""));
        let toModel = this.parseDateTime(dateObj, "yyyy-MM-ddThh:mm:ss", true);

        if((toView.length == pattern.length && !this.isValid(toModel)) ||
            (toView.length < pattern.length && triggerOnBlur)) {
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