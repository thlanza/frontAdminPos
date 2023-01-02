import React from 'react';
import { EventSettingsModel ,ViewsDirective, ViewDirective, Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda as AgendaSync } from '@syncfusion/ej2-react-schedule';
import { useDispatch, useSelector } from 'react-redux';
import { getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { useEffect } from 'react';
import { pegarDiasEntreDatas } from '../../utils/pegarDiasEntreDatas';
 
const Agenda = () => {
  
  let dataInicial;
  const umAnoDepois = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  // console.log(pegarDiasEntreDatas(dataInicial, umAnoDepois, 'wed', 14, 30));

  const dispatch = useDispatch();

  const modalidadesList = useSelector(state => state?.modalidades);
  const { modalidades, appErr, serverErr, loading } = modalidadesList;

  let dataSourceArray = [];
  modalidades?.forEach(element => {
    let dias = element?.dias;
    let horario = element?.horario;
    let nomeModalidade = element?.nomeModalidade;
    dataInicial = element?.dataDeCriacao;
    const traduzirDia = (dia) => {
      switch (dia) {
        case "Segunda":
          return 'mon';
        case "Terça":
          return 'tue';
        case "Quarta":
          return 'wed';
        case "Quinta":
          return 'thu';
        case "Sexta":
          return 'fri';
        case "Sábado":
          return 'sat';
        case "Domingo":
          return 'sun';
        default:
          console.log("Não existe esse dia.")
      }
    }
    dias.forEach(dia => {
      let traduzido = traduzirDia(dia);
      const [horas, minutos] = horario.split(':');
      let arrayDeDatas = pegarDiasEntreDatas(dataInicial, umAnoDepois, traduzido, horas, minutos);
      arrayDeDatas.forEach(data => {
        let objeto =  {
          EndTime: new Date(data.setHours(data.getHours() + 1)),
          StartTime: new Date(data),
          Subject: nomeModalidade,
          // Description: 'Alunos faltantes: Gilberto',
        }
        dataSourceArray.push(objeto);
      })
    });
  });


  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch]);

  return (
    <div>
        <ScheduleComponent 
        selectedDate={new Date()}
        currentView='Month'
        locale='pt'
        eventSettings={{ dataSource: dataSourceArray }}
        >
            <ViewsDirective>
                <ViewDirective option="Today" displayName="HojeSim"></ViewDirective>
                <ViewDirective option="Day" startHour="06:00" endHour="23:00" displayName="Dia"></ViewDirective>
                <ViewDirective option="Week" showWeekend={true} displayName="Semana"></ViewDirective>
                <ViewDirective option="Month" showWeekend={false} displayName="Mês"></ViewDirective>
                <ViewDirective option="WorkWeek" displayName='Semana de Trabalho'></ViewDirective>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, AgendaSync]} />
        </ScheduleComponent>
    </div>
  )
}

export default Agenda