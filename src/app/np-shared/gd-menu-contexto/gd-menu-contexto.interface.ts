export interface GdMenuContextoInterface {
  url?: string;
  callback?: Function;
  titulo: string;
  disabled?: boolean;
  disableMenuContexto?: boolean;
  separador?: boolean;
  condicao?: Function;
  aplicarMassivo?: boolean;
  endPoint?: string;
  tipoComponenteEspecifico?: any;
}
