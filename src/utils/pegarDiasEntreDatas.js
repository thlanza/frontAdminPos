import { atualizarModalidadeAction } from "../redux/slices/modalidades/modalidadeSlices";

export function pegarDiasEntreDatas(comeco, fim, nomeDoDia, horas, minutos) {
    var resultado = [];
    var dias = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
    var dia = dias[nomeDoDia.toLowerCase().substr(0,3)];
    // Copy start date
    var atual = new Date(comeco);
    // Shift to next of required days
    atual.setDate(atual.getDate() + (dia - atual.getDay() + 7) % 7);
    atual.setHours(horas, minutos, 0);
    // While less than end date, add dates to result array
    while (atual < fim) {
      resultado.push(new Date(+atual));
      atual.setDate(atual.getDate() + 7);
      atual.setHours(horas, minutos, 0);
    }
    return resultado;  
  }