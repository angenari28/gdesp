import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { GdI18nService } from '@gdesp/gd-i18n/gd-i18n.service';
import { NumeroParser } from '@gdesp/gd-i18n/parsers/numero.parser';

@Injectable()

export class GdValidacaoEspecificacoes {
    public interval: any;

    constructor(public i18n: GdI18nService, public router: Router) {

    }

    public required(control: any) {

        return this.isBlank(control.value) || (this.isString(control.value) && control.value.trim() === '') || control.value === false ?
            {
                'required': true,
                'errorMessage': 'ERRO_GENERICO_CAMPO_OBRIGATORIO_NAO_PREENCHIDO',
                'parseVals': ["fieldName"]
            } :
            null;
    }

    public minlength(minLength) {
        return (control) => {
            if (this.isPresent(this.required(control))){
                return null;
            }
            let valueControl = control.value;
            valueControl = +valueControl;
            return valueControl < minLength ?
                {
                    minlength: {
                        requiredLength: minLength,
                        actualLength: valueControl
                    },
                    errorMessage: 'ERRO_GENERICO_CAMPO_LIMITE_MINIMO_CARACTERES',
                    parseVals: ['fieldName', minLength]
                } :
                null;
        };
    }

    public maxlength(maxLength) {
        return (control) => {
            if (this.isPresent(this.required(control)))
                return null;
            var v = control.value;
            return v.length > maxLength ?
                {
                    'maxlength': {
                        'requiredLength': maxLength,
                        'actualLength': v.length
                    },
                    'errorMessage': "ERRO_GENERICO_CAMPO_EXCEDE_LIMITE_CARACTERES",
                    'parseVals': ["fieldName", maxLength]
                } :
                null;
        };
    };

    public pattern(pattern) {
        return function (control) {
            if (this.isPresent(this.required(control)))
                return null;
            var regex = new RegExp(pattern);
            var v = control.value;
            return regex.test(v) ? null :
                {
                    'pattern': {
                        'requiredPattern': pattern,
                        'actualValue': v
                    },
                    'errorMessage': "ERRO_GENERICO_CAMPO_FORMATO_INVALIDO",
                    'parseVals': ["fieldName"]
                };
        };
    };

    public range(param) {
        return (control) => {
            if (this.isPresent(this.required(control)))
                return null;
            var v = control.value;
            v = parseFloat(v);
            return !(this.isNumber(v) && v >= param.min && v <= param.max) ?
                {
                    'min': {
                        'min': param.min,
                        'actualValue': v
                    },
                    'max': {
                        'max': param.max,
                        'actualValue': v
                    },
                    'errorMessage': "ERRO_GENERICO_RANGE",
                    'parseVals': ["fieldName",
                        NumeroParser.parse(param.min.toString(), this.i18n.getConfig(), false, true, param.min.toString().split(".")[1] ? param.min.toString().split(".")[1].length : 0, true).toView,
                        NumeroParser.parse(param.max.toString(), this.i18n.getConfig(), false, true, param.max.toString().split(".")[1] ? param.max.toString().split(".")[1].length : 0, true).toView]
                } :
                null;
        };
    };

    public time(control: any) {
        if (this.isPresent(this.required(control)))
            return null;
        var regex = new RegExp("^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$");
        var v = control.value;
        return !regex.test(v) ?
            {
                'time': true,
                'errorMessage': "ERRO_GENERICO_RANGE",
                'parseVals': ["fieldName", "00:00", "23:59"]
            }
            : null;
    }

    public date(control: any) {
        if (this.isPresent(this.required(control)))
            return null;
        var regex = new RegExp("^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
        var v = control.value;
        return !regex.test(v) ?
            {
                'time': true,
                'errorMessage': "ERRO_GENERICO_DATA_INVALIDA",
                'parseVals': ["fieldName"]
            }
            : null;
    }

    public email(control: any) {
        if (this.isPresent(this.required(control)))
            return null;
        var regex = new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/);
        return regex.test(control.value) ?
            null :
            {
                'email': true,
                'errorMessage': "ERRO_GENERICO_EMAIL_INVALIDO",
                'parseVals': ["fieldName"]
            };
    }

    public ip(control: any) {
        if (this.isPresent(this.required(control)))
            return null;
        var regex = new RegExp(/^((?:(?:[0-9]|[0-9][0-9]|[0-1][0-9][0-9]|[0-2][0-4][0-9]|[0-2][5][0-5])\.){3}(?:[0-9]|[0-9][0-9]|[0-1][0-9][0-9]|[0-2][0-4][0-9]|[0-2][5][0-5]))$/);
        return regex.test(control.value) ?
            null :
            {
                'ip': true,
                'errorMessage': "ERRO_GENERICO_IP_INVALIDO",
                'parseVals': ["fieldName"]
            };
    }

    public dategreaterthantoday(control: FormControl) {
        if (this.isPresent(this.required(control)))
            return null;

        let date2 = new Date();
        let date1 = new Date(control.value);
        let datamaior = true;

        if (Date.parse(control.value)) {
            datamaior = parseInt(date1.toISOString().split("T")[0].replace(/\-/g, "")) > parseInt(date2.toISOString().split("T")[0].replace(/\-/g, ""));
        }

        //date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());
        return datamaior ?
            null :
            {
                'date': true,
                'errorMessage': "ERRO_GENERICO_DATA_MENOR_QUE_ATUAL",
                'parseVals': ["fieldName"]
            };
    }

    public dategreaterthanorequaltoday(control: FormControl) {
        if (this.isPresent(this.required(control)))
            return null;

        let date2 = new Date();
        let date1 = new Date(control.value);
        let datamaior = true;

        if (Date.parse(control.value)) {
            datamaior = parseInt(date1.toISOString().split("T")[0].replace(/\-/g, "")) >= parseInt(date2.toISOString().split("T")[0].replace(/\-/g, ""));
        }

        //date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());
        return datamaior ?
            null :
            {
                'date': true,
                'errorMessage': "ERRO_GENERICO_DATA_MENOR_QUE_ATUAL",
                'parseVals': ["fieldName"]
            };
    }

    public dategreaterthanorequalother(param) {
        return (control: FormControl) => {

            if (typeof param != "string") {
                return null;
            }

            if (this.isPresent(this.required(control)))
                return null;

            let dateControl = (<FormGroup>control.parent).controls[param] as FormControl;
            if (this.isPresent(this.dategreaterthantoday(dateControl))) return null;

            let date2 = new Date(dateControl.value);
            let date1 = new Date(control.value);
            let datamaior = true;
            let element = document.querySelector("input[formcontrolname=" + param + "]");
            let firstdate = '';

            if (element && element.closest(".form-group") && element.closest(".form-group").querySelector("label"))
                firstdate = element.closest(".form-group").querySelector("label").innerText;

            if (Date.parse(control.value)) {
                datamaior = parseInt(date1.toISOString().split("T")[0].replace(/\-/g, "")) >= parseInt(date2.toISOString().split("T")[0].replace(/\-/g, ""));
            }

            //date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());
            return datamaior ?
                null :
                {
                    'date': true,
                    'errorMessage': "ERRO_GENERICO_DATA_MENOR_QUE_OUTRA",
                    'parseVals': ["fieldName", firstdate]
                };
        }
    }

    public dategreaterthanorequalotherreport(param) {
        return (control: FormControl) => {

            if (typeof param != "string") {
                return null;
            }

            if (this.isPresent(this.required(control)))
                return null;

            let dateControl = (<FormGroup>control.parent).controls[param] as FormControl;

            let date2 = new Date(dateControl.value);
            let date1 = new Date(control.value);
            let datamaior = true;
            let element = document.querySelector("input[formcontrolname=" + param + "]");
            let firstdate = '';

            if (element && element.closest(".form-group") && element.closest(".form-group").querySelector("label"))
                firstdate = element.closest(".form-group").querySelector("label").innerText;

            if (Date.parse(control.value)) {
                datamaior = parseInt(date1.toISOString().split("T")[0].replace(/\-/g, "")) >= parseInt(date2.toISOString().split("T")[0].replace(/\-/g, ""));
            }

            return datamaior ?
                null :
                {
                    'date': true,
                    'errorMessage': "ERRO_GENERICO_DATA_MENOR_QUE_OUTRA",
                    'parseVals': ["fieldName", firstdate]
                };
        }
    }

    public dateperiodmustbelessthanorequalto(param) {
        return (control: FormControl) => {

            if (this.isPresent(this.required(control)))
                return null;

            let dateControl = (<FormGroup>control.parent).controls[param.firstdate] as FormControl;

            let date2 = new Date(dateControl.value);
            let date1 = new Date(control.value);
            let periodomaior = true;
            let element = document.querySelector("input[formcontrolname=" + param.firstdate + "]");
            let firstdate = '';

            if (element && element.closest(".form-group") && element.closest(".form-group").querySelector("label"))
                firstdate = element.closest(".form-group").querySelector("label").innerText;

            if (Date.parse(control.value)) {
                let periodoDatas = ((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
                periodomaior = param.maxperiod >= periodoDatas;
            }

            return periodomaior ?
                null :
                {
                    'date': true,
                    'errorMessage': "ERRO_GENERICO_PERIODO_ENTRE_DATAS_DEVE_SER_MENOR_IGUAL_A",
                    'parseVals': [firstdate, "fieldName", param.maxperiod]
                };
        }
    }

    public timegreaterthanorequalother(param) {
        return (control: FormControl) => {

            if (typeof param != "string") {
                return null;
            }

            if (this.isPresent(this.required(control)))
                return null;

            let timeControl = (<FormGroup>control.parent).controls[param] as FormControl;

            let element = document.querySelector("input[formcontrolname=" + param + "]");

            let fieldName2 = "";

            if (element && element.closest(".form-group") && element.closest(".form-group").querySelector("label")) {
                fieldName2 = element.closest(".form-group").querySelector("label").innerText;
            }

            let time2 = timeControl.value;
            let time1 = control.value;
            let horamaior = true;

            horamaior = parseInt(time1.replace(/\:/g, "")) >= parseInt(time2.replace(/\:/g, ""));

            return horamaior ?
                null :
                {
                    'hora': true,
                    'errorMessage': "ERRO_GENERICO_HORA_MENOR_OU_IGUAL_QUE_OUTRA",
                    'parseVals': ["fieldName", fieldName2]
                };
        }
    }

    public timegreaterthanother(param) {
        return (control: FormControl) => {

            if (typeof param != "string") {
                return null;
            }

            if (this.isPresent(this.required(control)))
                return null;

            let timeControl = (<FormGroup>control.parent).controls[param] as FormControl;

            let element = document.querySelector("input[formcontrolname='" + param + "']");

            let fieldName2 = "";

            if (element && element.closest(".form-group") && element.closest(".form-group").querySelector("label")) {
                fieldName2 = element.closest(".form-group").querySelector("label").innerText;
            }

            let time2 = timeControl.value;
            let time1 = control.value;
            let horamaior = true;

            horamaior = parseInt(time1.replace(/\:/g, "")) > parseInt(time2.replace(/\:/g, ""));

            return horamaior ?
                null :
                {
                    'hora': true,
                    'errorMessage': "ERRO_GENERICO_HORA_MENOR_QUE_OUTRA",
                    'parseVals': ["fieldName", fieldName2]
                };
        }
    }

    public timegreaterthannow(param) {
        return (control: FormControl) => {

            if (typeof param == "string") {
                let dateControl = (<FormGroup>control.parent).controls[param] as FormControl;
                if (this.isPresent(this.dategreaterthantoday(dateControl)))
                    return null;
            }

            if (this.isPresent(this.required(control)))
                return null;

            let date2 = new Date();
            let date1 = new Date(control.value);
            let datamaior = true;
            if (Date.parse(control.value)) {
                datamaior = parseInt(date1.toISOString().split("T")[1].substr(0, 5).replace(/\:/g, "")) >= parseInt(date2.toISOString().split("T")[1].substr(0, 5).replace(/\:/g, ""));
            }
            //date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());
            return datamaior ?
                null :
                {
                    'time': true,
                    'errorMessage': "ERRO_GENERICO_HORA_MENOR_QUE_ATUAL",
                    'parseVals': ["fieldName"]
                };
        }
    }

    public timerange(param) {
        return (control: FormControl) => {
            if (this.isPresent(this.required(control)))
                return null;
            let v = +control.value.replace(/:/g, "");
            let min = +param.min.replace(/:/g, "");
            let max = +param.max.replace(/:/g, "");
            return !(this.isNumber(v) && this.isNumber(min) && this.isNumber(max) && v >= min && v <= max) ?
                {
                    'min': {
                        'min': param.min,
                        'actualValue': v
                    },
                    'max': {
                        'max': param.max,
                        'actualValue': v
                    },
                    'errorMessage': "ERRO_GENERICO_RANGE",
                    'parseVals': ["fieldName", param.min, param.max]
                } :
                null;
        }
    }

    public greaterthanorequal(param) {
        return (control: FormControl) => {
            if (this.isPresent(this.required(control)))
                return null;

            if (typeof param == "string") {
                let otherControl = (<FormGroup>control.parent).controls[param] as FormControl;

                if (isNaN(otherControl.value) || isNaN(control.value)) {
                    return null;
                } else {
                    return control.value >= otherControl.value ?
                        null :
                        {
                            'greaterthanorequal': true,
                            'errorMessage': "ERRO_GENERICO_VALOR_MENOR_QUE_OUTRO",
                            'parseVals': ["fieldName"]
                        };
                }
            } else {
                return null;
            }
        }
    }

    public passwordequal(param) {
        return (control: FormControl) => {
            if (this.isPresent(this.required(control)))
                return null;

            if (typeof param == "string") {
                let otherControl = (<FormGroup>control.parent).controls[param] as FormControl;

                return control.value == otherControl.value ?
                    null :
                    {
                        'passwordequal': true,
                        'errorMessage': "ERRO_GENERICO_SENHA_DIFERENTE"
                    };

            } else {
                return null;
            }
        }
    }

    public cnpj(control: any) {

        if (this.isPresent(this.required(control)))
            return null;

        let retorno = this.isCnpjValido(control.value);

        return retorno ?
            null :
            {
                'cnpj': true,
                'errorMessage': "ERRO_GENERICO_CNPJ_INVALIDO",
                'parseVals': ["fieldName"]
            };
    }

    public file(param) {
        return (control: FormControl) => {

            if (this.isPresent(this.required(control)))
                return null;
            if (!control.value[0])
                return null;

            let fname = control.value[0].name;
            let type = fname.substr(fname.lastIndexOf(".")).replace(".", "");
            let size = control.value[0].size;
            let ret = null;

            if (param.mimetype && param.mimetype.replace(".", "").split("/").indexOf(type) < 0) {
                ret = {
                    'mimetype': {
                        'expectedType': param.mimetype,
                        'currentType': type
                    },
                    'errorMessage': "ERRO_GENERICO_FORMATO_ARQUIVO_INVALIDO",
                    'parseVals': ["fieldName", param.mimetype]
                }
            } else if (param.maxsize && !isNaN(param.maxsize) && (param.maxsize < size)) {

                let sulfix = "";
                let abrevSize = 0;
                switch (param.maxsize.toString().length) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        sulfix = "bytes";
                        abrevSize = param.maxsize;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        sulfix = "KB";
                        abrevSize = Math.round(parseFloat(param.maxsize) / 1000);
                        break;
                    default:
                        sulfix = "MB";
                        abrevSize = Math.round(parseFloat(param.maxsize) / 1000000);
                        break;
                }

                ret = {
                    'maxsize': {
                        'expectedSize': param.maxsize,
                        'currentSize': size
                    },
                    'errorMessage': "ERRO_GENERICO_TAMANHO_ARQUIVO_INVALIDO_DINAMICO",
                    'parseVals': ["fieldName", abrevSize, sulfix]
                }
            }

            return ret;
        };
    };

    public choice(param) {
        return (control: FormArray) => {


            let ret = null;
            let current = 0;
            if (param.field) {
                current = control.controls.filter(_ => _.value[param.field] == true).length;


                if (param.min && !isNaN(param.min) && param.min > 0 &&
                    param.max && !isNaN(param.max) && param.max > 0 &&
                    (current < param.min || current > param.max)) {
                    ret = {
                        'choice': {
                            'min': param.min,
                            'max': param.max
                        },
                        'errorMessage': "ERRO_GENERICO_CHOICE_MIN_MAX",
                        'parseVals': [param.min, param.max]
                    }
                } else if (param.min && !isNaN(param.min) && param.min > 0 && current < param.min) {
                    ret = {
                        'choice': {
                            'min': param.min
                        },
                        'errorMessage': "ERRO_GENERICO_CHOICE_MIN",
                        'parseVals': [param.min]
                    }
                } else if (param.max && !isNaN(param.max) && param.max > 0 && current > param.max) {
                    ret = {
                        'choice': {
                            'max': param.max
                        },
                        'errorMessage': "ERRO_GENERICO_CHOICE_MAX",
                        'parseVals': [param.max]
                    }
                }
            }

            return ret;
        };
    };

    public isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    public isBlank(obj) {
        return obj === undefined || obj === null;
    }
    public isBoolean(obj) {
        return typeof obj === 'boolean';
    }
    public isNumber(obj) {
        return typeof obj === 'number';
    }
    public isString(obj) {
        return typeof obj === 'string';
    }
    public isFunction(obj) {
        return typeof obj === 'function';
    }
    public isType(obj) {
        return this.isFunction(obj);
    }
    public isStringMap(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    public isArray(obj) {
        return Array.isArray(obj);
    }
    public isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
    }

    public isCnpjValido(obj) {

        let cnpj_ret = obj.replace(/[^\d]+/g, '');

        if (cnpj_ret == '') return false;

        if (cnpj_ret.length != 14) return false;

        // CNPJs invalidos
        if (cnpj_ret == "00000000000000" ||
            cnpj_ret == "11111111111111" ||
            cnpj_ret == "22222222222222" ||
            cnpj_ret == "33333333333333" ||
            cnpj_ret == "44444444444444" ||
            cnpj_ret == "55555555555555" ||
            cnpj_ret == "66666666666666" ||
            cnpj_ret == "77777777777777" ||
            cnpj_ret == "88888888888888" ||
            cnpj_ret == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj_ret.length - 2
        let numeros = cnpj_ret.substring(0, tamanho);
        let digitos = cnpj_ret.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj_ret.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    }
}
