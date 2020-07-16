import { DataHoraBaseParser } from "./data-hora-base.parser";

export class HoraParser extends DataHoraBaseParser {

    public static parse(date: string, config: any, fromPipe: boolean, triggerOnBlur?: boolean): any {
        if (!config || !config.config) {
            return date;
        }
        let pattern = config.config.hora.pattern;
        let dateObj = this.extractDateTime(date, config, pattern);
        let toView = (this.parseDateTime(dateObj, pattern, false) + (fromPipe ? config.config.sufixo : ""));
        let toModel = this.parseDateTime(dateObj, "hh:mm", true);

        if ((toView.length == pattern.length && !this.isValid("1970-01-01T" + toModel)) ||
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