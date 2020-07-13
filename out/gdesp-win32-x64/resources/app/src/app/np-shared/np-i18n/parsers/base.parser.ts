export class BaseParser {
    public static padLeft(str: string, char: string): string {
        if (!str || !char) return "";
        str = str.toString();
        char = char.toString();
        return (char + str).substring(str.length);
    }

    public static padRight(str: string, char: string): string {
        if (!str || !char) return "";
        str = str.toString();
        char = char.toString();
        return (str + char).substring(0, char.length);
    }

    public static distinct(arr: any[]): any[] {
        let ret = [];

        arr.forEach(_ => {
            if (ret.indexOf(_) < 0) {
                ret.push(_);
            }
        });

        return ret;
    }

    public static parse(str: string, pattern: string, fromPipe: boolean, leftToRight: boolean, arg?: string): any {
        let s = str.replace(/[^a-zA-Z0-9]/g, "").split("");
        let p = pattern.split("");
        let ret = "";
        let offset = 0;
        let regexPatterns =
            {
                "0": "[0-9]",
                "9": "[0-9]",
                "#": "[a-zA-Z0-9]",
                "S": "[a-zA-Z]"
            }

        let startCount = 0;
        let endCount = p.length

        for (let i = startCount; i < endCount; i++) {
            let l = "";
            if (!s[i + offset]) {
                s[i + offset] = "";
            }

            switch (p[i]) {
                case "0":
                    if (new RegExp(regexPatterns["0"]).test(s[i + offset])) {
                        l = s[i + offset];
                    }
                    break;
                case "9":
                    if (new RegExp(regexPatterns["9"]).test(s[i + offset])) {
                        l = s[i + offset];
                    }
                    break;
                case "#":
                    if (new RegExp(regexPatterns["#"]).test(s[i + offset])) {
                        l = s[i + offset];
                    }
                    break;
                case "S":
                    if (new RegExp(regexPatterns["S"]).test(s[i + offset])) {
                        l = s[i + offset];
                    }
                    break;
                default:
                    if (s[i + offset]) {
                        l = p[i];
                        offset--;
                    }
                    break;
            }
            ret += l;

        }
        return ret;
    }
}