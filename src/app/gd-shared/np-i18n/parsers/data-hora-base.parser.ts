import { BaseParser } from "./base.parser";

export class DataHoraBaseParser extends BaseParser{
    public static extractDateTime(date: string, config: any, pattern: string): any[] {
        
        if (date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,7})?(-\d{2}:\d{2})?(Z)?$/)) {
            let parsedDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(date);
            let ret = [
                { yyyy: parsedDate[1] },
                { MM: this.padLeft(parsedDate[2], "00") },
                { dd: this.padLeft(parsedDate[3], "00") },
                { hh: this.padLeft(parsedDate[4], "00") },
                { mm: this.padLeft(parsedDate[5], "00") },
                { ss: this.padLeft(parsedDate[6], "00") }
            ]
            return ret;
        }

        if (!config || !pattern)
            return [];
        
        let unparsedDatePattern = this.padRight(date.replace(/[^0-9]/g, ""), pattern.replace(/[^a-zA-Z0-9]/g, "").replace(/[a-zA-Z0-9]/g, " "));

        let maskedDate = super.parse(unparsedDatePattern, pattern.replace(/[a-zA-Z0-9]/g, "0"), false, true);

        let splittedDate = maskedDate.replace(/[^0-9]/g, "_").split("_");
        let splittedPattern = pattern.replace(/[^a-zA-Z0-9]/g, "_").split("_");

        return [
            { yyyy: splittedDate[splittedPattern.indexOf("yyyy")] || "" },
            { MM: splittedDate[splittedPattern.indexOf("MM")] || "" },
            { dd: splittedDate[splittedPattern.indexOf("dd")] || "" },
            { hh: splittedDate[splittedPattern.indexOf("hh")] || "" },
            { mm: splittedDate[splittedPattern.indexOf("mm")] || "" },
            { ss: splittedDate[splittedPattern.indexOf("ss")] || "" }
        ]
    }

    public static parseDateTime(date: any[], pattern: string, toModel: boolean): string {
        let ret = pattern;
        date.forEach(_ => {
            let key = Object.keys(_)[0];

            if (toModel) {
                ret = _[key] ? ret.replace(key, this.padRight(_[key], key.replace(/\./g, "0"))) : ret;
            } else {
                ret = ret.replace(key, _[key]);
            }
        });
        return toModel ? this.dateToModel(ret): this.dateToView(ret);
    }

    public static isValid(date:string) {
        try{
            let d = new Date(date);

            //if (parseInt(date.substr(5, 2)) != (d.getUTCMonth() + 1) ||
            //    parseInt(date.substr(11, 2)) > 23){
            //    return false;
            //}
            return (d.toString() != "Invalid Date");
        }catch(e) {
            return false;
        }
    }

    public static dateToView(date: any) {
        return date.replace(/[^0-9](?!\d)/g, "");
    }

    public static dateToModel(date: any) {        
        return date.replace(/[yMdhms]/g, "0");
    }

    public static transformTimeZone(minutos) {
        return BaseParser.padLeft((minutos / 60).toFixed(0).toString(), "00") + ":" + this.padLeft((minutos % 60).toString(), "00");
    }
}
