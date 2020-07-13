import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { NpEventService } from '@gdesp/np-event/np-event.service';
import { GdValidacaoEspecificacoes } from './gd-validacao.especificacoes';

import { Subscription } from "rxjs";

export class GdValidacaoService {

    public formGroup: FormGroup;
    public form: any;
    public _model: any;
    public event: NpEventService;

    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
        this.createProperties(this._model);
    }

    constructor(public validators: GdValidacaoEspecificacoes, public ignoredFields?: string[]) {
        this.form = {
            controls: {}
        };
        this.formGroup = new FormGroup({});
        this.event = new NpEventService();
    }

    public createProperties(model) {
        for (let key in model) {

            let ignored: boolean = false;
            if (this.ignoredFields && this.ignoredFields.length > 0) {
                this.ignoredFields.forEach(_ => {
                    if (key == _) {
                        ignored = true;
                    }
                })
            }

            if (ignored)
                continue;

            let t: string = model[key] == null ? "CampoNulo" : model[key] instanceof Array ? "Array" : typeof model[key];
            switch (t) {
                case "Array":
                    Object.defineProperty(model, "_" + key, { value: model[key], writable: true });
                    model[key] = new Proxy(model["_" + key], {
                        get: (target, name) => target[name],
                        set: (target, name, value) => {
                            target[name] = value;
                            this.createProperties(target[name]);
                            return true;
                        }
                    });
                    break;
                case "object":
                    this.createProperties(model[key]);
                    break;
                case "function":
                    break;
                default:
                    Object.defineProperty(model, "_" + key, { value: model[key], writable: true });
                    Object.defineProperty(model, key, {
                        get: () => {
                            return model["_" + key];
                        },
                        set: (value) => {
                            model["_" + key] = value;
                            model[key + "_control"].setValue(value, {emitEvent: false});
                        }
                    });
                    break;
            }
        }

        this.parseModel(this._model);
    }

    public parseModel(model: any) {
        if (!this.form) {
            this.form = {
                controls: {}
            };
        }

        this.mapForm(this.form, this.formGroup, model);
    }

    public mapForm(form: any, formGroup: FormGroup, model: any, prefix: string = "") {
        for (let key in model) {
            let ignored: boolean = false;
            if (this.ignoredFields && this.ignoredFields.length > 0) {
                this.ignoredFields.forEach(_ => {
                    if (key == _) {
                        ignored = true;
                    }
                })
            }

            if (ignored)
                continue;

            let t: string = model[key] == null ? "CampoNulo" : model[key] instanceof Array ? "Array" : model[key] instanceof FileList ? "FileList" : typeof model[key];

            switch (t) {
                case "Array":
                    //if (!form.controls[prefix + key]) {
                        form.controls[prefix + key] = {
                            formArray: [],
                            validators: {}
                        }
                    //}
                    let list: FormGroup[] = [];

                    for (let i = 0; i < model[key].length; i++) {
                        let childForm = {
                            controls: {}
                        }

                        let childFormGroup = new FormGroup({});

                        this.mapForm(childForm, childFormGroup, model[key][i]);
                        form.controls[prefix + key].formArray.push(childForm);
                        list.push(childFormGroup);
                    }

                    formGroup.setControl(prefix + key, new FormArray(list));
                    Object.defineProperty(model, key + "_control", { value: (<FormArray>formGroup.controls[prefix + key]).controls, writable: true });
                    break;
                case "object":
                    this.mapForm(form, formGroup, model[key], prefix + key + ".");
                    break;
                case "function":
                    break;
                default:
                    if (!formGroup.controls[prefix + key]) {
                        let control = new FormControl(model[key]);
                        formGroup.addControl(prefix + key, control);
                    }

                    try {
                        formGroup.controls[prefix + key].setValue(model[key] == null ? "" : model[key]);
                    }
                    catch (e) {

                    }
                    Object.defineProperty(model, key + "_control", { value: formGroup.controls[prefix + key], writable: true });

                    if (!form.controls[prefix + key]) {
                        form.controls[prefix + key] = {
                            validators: {}
                        }
                    }

                    if (form.controls[prefix + key].subscription != null) {
                        form.controls[prefix + key].subscription.unsubscribe();
                        form.controls[prefix + key].subscription = null;
                    }

                    form.controls[prefix + key].subscription = formGroup.controls[prefix + key].valueChanges
                        .subscribe(res => {
                            if (model[key] != res) {
                                model[key] = res;
                            }
                        });
                    break;
            }
        }
    }

    public getFormGroup(model?: any) {
        if (model) {
            this.model = model;
        }
        this.event.broadcast("form-validation-updated", this.formGroup);
        return this.formGroup;
    }

    public getModel() {
        let model: any = {};
        this.getFormValues(model, this.formGroup);

        return model;
    }

    public getFormValues(model: any, formGroup: any) {
        if (!model) {
            model = {};
        }
        for (let key in formGroup.controls) {
            let keys = key.split(".");
            if (!keys || keys.length == 1) {
                if (!(formGroup.controls[key] instanceof FormArray)) {
                    model[key] = formGroup.controls[key].value;
                } else {
                    for (let i = 0; i < formGroup.controls[key].controls.length; i++) {
                        if (!model[key]) {
                            model[key] = [];
                        }
                        if (!model[key][i]) {
                            model[key][i] = {};

                            this.getFormValues(model[key][i], formGroup.controls[key].controls[i]);
                        }
                    }
                }
            } else {
                let innerObj = model;
                for (let i = 0; i < keys.length; i++) {
                    if (i == keys.length - 1) {
                        innerObj[keys[i]] = formGroup.controls[key].value;
                    } else {
                        if (!innerObj[keys[i]]) {
                            innerObj[keys[i]] = {};
                        }
                        innerObj = innerObj[keys[i]];
                    }
                }
            }
        }
    }

    public ignoreField(fieldName: string) {

    }

    public setValidators(fieldName: string, newValidators: any, model?: any) {

        // Cria o formGroup caso a model exista
        if (model) {
            this.parseModel(model);
        }

        let namespace = fieldName.split("[]").map(_ => _.replace(/^\./, ""));

        if (namespace.length == 1) {
            if (this.form.controls[namespace[0]]) {
                //Adiciona/altera os itens da validação atual com as novas validações
                for (let key in newValidators) {
                    this.form.controls[namespace[0]].validators[key] = newValidators[key];
                    //if (key == "required") {
                    //    this.event.broadcast("decorar-campo-required", namespace[0]);
                    //}
                }

                let fn: ValidatorFn[] = [];

                //Destroi a lista de validações atual do FormGroup e substitui pela nova com as validações atualizadas
                for (let key in this.form.controls[namespace[0]].validators) {
                    key = key.toLowerCase();
                    if (this.form.controls[namespace[0]].validators[key] === true) {
                        fn.push(this.validators[key].bind(this.validators));
                    } else if (this.form.controls[namespace[0]].validators[key] !== false) {

                        fn.push(this.validators[key](this.form.controls[namespace[0]].validators[key]).bind(this.validators));
                    }
                }

                this.formGroup.controls[namespace[0]].setValidators(fn);
                this.formGroup.controls[namespace[0]].updateValueAndValidity();
            }
        } else {
            let formPrefix = this.form;
            let formGroupPrefix = this.formGroup;

            this.setFormValidationList(formPrefix, namespace, 0, newValidators);
            this.setFormGroupValidationList(formPrefix, namespace, 0, formGroupPrefix);

        }
    }

    public setFormGroupValidationList(formPrefix: any, namespace: string[], index: number, formGroupPrefix: any) {

        if (formPrefix.controls[namespace[index]] && formPrefix.controls[namespace[index]].formArray &&
            formGroupPrefix.controls[namespace[index]] && formGroupPrefix.controls[namespace[index]].controls) {
            if (index == namespace.length - 2) {

                for (let i = 0; i < formPrefix.controls[namespace[index]].formArray.length; i++) {
                    let fn: ValidatorFn[] = [];
                    for (let key in formPrefix.controls[namespace[index]].formArray[i].controls[namespace[index + 1]].validators) {
                        key = key.toLowerCase();
                        if (formPrefix.controls[namespace[index]].formArray[i].controls[namespace[index + 1]].validators[key] === true) {

                            fn.push(this.validators[key].bind(this.validators));
                        } else if (formPrefix.controls[namespace[index]].formArray[i].controls[namespace[index + 1]].validators[key] !== false) {

                            fn.push(this.validators[key](formPrefix.controls[namespace[index]].formArray[i].controls[namespace[index + 1]].validators[key]).bind(this.validators));
                        }
                    }
                    if (formGroupPrefix.controls[namespace[index]].controls[i]) {
                        formGroupPrefix.controls[namespace[index]].controls[i].controls[namespace[index + 1]].setValidators(fn);
                        formGroupPrefix.controls[namespace[index]].controls[i].controls[namespace[index + 1]].updateValueAndValidity();
                    }
                }
            } else {
                for (let i = 0; i < formPrefix.controls[namespace[index]].formArray.length; i++) {
                    let item = formPrefix.controls[namespace[index]].formArray[i];
                    let itemFG = formGroupPrefix.controls[namespace[index]].controls[i];
                    this.setFormGroupValidationList(item, namespace, index + 1, itemFG);
                }
            }
        }
    }

    public setFormValidationList(prefix: any, namespace: string[], index: number, newValidators: any) {

        if (prefix.controls[namespace[index]] && prefix.controls[namespace[index]].formArray) {
            if (index == namespace.length - 2) {
                for (let key in newValidators) {
                    for (let i = 0; i < prefix.controls[namespace[index]].formArray.length; i++) {

                        prefix.controls[namespace[index]].formArray[i].controls[namespace[index + 1]].validators[key] = newValidators[key];
                    }
                }
            } else {
                for (let item of prefix.controls[namespace[index]].formArray) {
                    this.setFormValidationList(item, namespace, index + 1, newValidators);
                }
            }
        }
    }

    public clearValidations(fieldName: string, model?: any) {
        //Cria o formGroup caso a model exista
        if (model) {
            this.parseModel(model);
        }

        this.formGroup.controls[fieldName].clearValidators();
    }

    public clear() {
        //this.formGroup.reset();
        //this.form = {
        //    controls: {}
        //};
        this.formGroup = new FormGroup({});

        this.parseModel(this.model);
        this.event.broadcast("validation-clear");
    }
}
