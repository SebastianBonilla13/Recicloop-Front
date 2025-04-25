/* import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-convocatorias',
  imports: [],
  templateUrl: './listar-convocatorias.component.html',
  styleUrl: './listar-convocatorias.component.css'
})
export class ListarConvocatoriasComponent {

}
 */

import { mockData } from "../../data/mock-convocatorias";

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DatatableCustomComponent } from "../../datatable-custom/datatable-custom.component";
/* 
import { TipoFinanciacion } from "../../../../service/convocatoria/domain/model/enum/tipoFinanciacion";
import { ConvocatoriaEstado } from "../../../../service/convocatoria/domain/model/enum/convocatoriaEstado";
import { DatatableCustomComponent } from "../../../shared/datatableCustomizable/datatable-custom.component";
import { FiltroInput } from "../../../../service/common/model/filtro/filtroInput";
import { FiltroComponent } from "../../../shared/filtro/filtro.component";
import { FiltroField } from "../../../../service/common/model/filtro/filtroField";
import { FiltroFieldTipo } from "../../../../service/common/model/filtro/filtroFieldTipo";
import { DatatableInput } from "../../../../service/common/model/datatableInput";
import { Paginacion } from "../../../../service/common/model/paginacion";
 */


class Paginacion<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;

  constructor() {
    this.content = [];
    this.pageable = {
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      unpaged: false,
      paged: false,
    };
    this.last = false;
    this.totalPages = 0;
    this.totalElements = 0;
    this.size = 0;
    this.number = 0;
    this.sort = {
      empty: false,
      sorted: false,
      unsorted: false,
    };
    this.numberOfElements = 0;
    this.first = false;
    this.empty = false;
  }
}

class DatatableInput {
  // Titulo Principal
  titulo: string;
  // Boton de accion principal
  /* acccionPrincipal: DatatableInputAction; */
  // Mensaje cuando no hay Elementos encontrados de la busqueda
  mensajeNoHayElementos: string;
  // Mensaje cuando aun no se ha realizado un filtro para la busqueda
  mensajeBusqueda: string;
  // Cuando realises la peticion al back cambia este dato por true
  searchPerformed: boolean;
  // Pon el nombre del Objeto o Entidad que estas mostrando en la tabla
  domain: string;
  // Que encabezados van en la tabla
  tableHeaders: string[];
  // La lista de atributos que contiene el Objeto o Entidad, es importante que el primer elemento de esta lista sea el ID de la entidad por ejemplo: id, apellido, correo, nombre
  // La lista de atributos debe estar en el mismo orden de tableHeaders
  dataAttributes: { name: string; type: any; enumType?: string; }[];
  // Enviar toda la paginacion recebida del Back esta paginacion contiene la Informacion la que vamos a popular la tabla
  paginacion: Paginacion<any>;
  //Acciones para poner al final de la Tabla
  /* acciones: DatatableInputAction[]; */
  // Desactivar controles de Paginacion porque no son necesarios
  quieresPaginar: boolean;

  constructor(domain = "", paginacion: Paginacion<any> = null as any) {
    this.titulo = "";
    /* this.acccionPrincipal = new DatatableInputAction("", "", ""); */
    this.mensajeNoHayElementos = "";
    this.mensajeBusqueda = "";
    this.searchPerformed = false;
    this.domain = domain;
    this.tableHeaders = [];
    this.dataAttributes = [];
    this.paginacion = paginacion;
    /* this.acciones = []; */
    this.quieresPaginar = false;
  }
}

export enum TipoFinanciacion {
  PROYECTOS_INTERNOS = "Proyectos Internos",
  PROYECTOS_EXTERNOS = "Proyectos Externos",
}

export interface ConvocatoriaListarConFiltroProyeccion {
  id: number;
  nombre: string;
  estado: string;
  tipoFinanciacion: string;
}

enum ConvocatoriaEstado {
  ABIERTA = "Abierta",
  CERRADA = "Cerrada",
  PROGRAMADA = "Programada",
}

interface ApiResponse<T> {
  status: number;
  userMessage: string;
  developerMessage: string;
  data: Paginacion<T>;
}

@Component({
  selector: "app-listar-convocatorias",
  imports: [DatatableCustomComponent],
  templateUrl: "./listar-convocatorias.component.html",
  styleUrl: "./listar-convocatorias.component.css",
})
export class ListarConvocatoriasComponent implements OnInit {

  private mockData = mockData;

  /* private mockData: ApiResponse<ConvocatoriaListarConFiltroProyeccion> = {
    status: 200,
    userMessage: "Ok",
    developerMessage: "",
    data: {
      content: [
        {
          id: 1,
          nombre: "Convocatoria de Innovación Tecnológica",
          estado: "ABIERTA",
          tipoFinanciacion: "PROYECTOS_INTERNOS"
        },
        {
          id: 2,
          nombre: "Desarrollo Sostenible 2024",
          estado: "PROGRAMADA",
          tipoFinanciacion: "PROYECTOS_EXTERNOS"
        },
        {
          id: 3,
          nombre: "Investigación en Energías Renovables",
          estado: "ABIERTA",
          tipoFinanciacion: "PROYECTOS_INTERNOS"
        },
        {
          id: 4,
          nombre: "Mejoras en Reciclaje Urbano",
          estado: "CERRADA",
          tipoFinanciacion: "PROYECTOS_EXTERNOS"
        },
        {
          id: 5,
          nombre: "Tecnologías para Economía Circular",
          estado: "ABIERTA",
          tipoFinanciacion: "PROYECTOS_INTERNOS"
        },
        {
          id: 6,
          nombre: "Gestión de Residuos Industriales",
          estado: "PROGRAMADA",
          tipoFinanciacion: "PROYECTOS_EXTERNOS"
        },
        {
          id: 7,
          nombre: "Innovación en Materiales Reciclables",
          estado: "ABIERTA",
          tipoFinanciacion: "PROYECTOS_INTERNOS"
        },
        {
          id: 8,
          nombre: "Educación Ambiental 2024",
          estado: "CERRADA",
          tipoFinanciacion: "PROYECTOS_EXTERNOS"
        },

      ],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalElements: 1,
      totalPages: 1,
      size: 10,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      first: true,
      numberOfElements: 1,
      empty: false
    }
  }; */

  // Bandera si queremos que el componente retorne el registro ID
  @Input() obtenerRegistroId!: boolean;

  // Emite el registro ID
  @Output() filtrarEmitter = new EventEmitter<unknown>();

  // Informacion necesaria para crear el filtro
  /* protected filtroInput: FiltroInput; */

  // Informacion necesaria para el datatable
  protected datatableInputs: DatatableInput;

  constructor() {
    // Inicialización de los datos que construyen el filtro
    /* this.filtroInput = new FiltroInput();
    this.filtroInput.filtroFields.push(
      new FiltroField(
        "ID Convocatoria",
        "id",
        "ID",
        FiltroFieldTipo.INPUT,
        "text",
        null,
        "",
        [],
        true,
        ""
      )
    );
    this.filtroInput.filtroFields.push(
      new FiltroField(
        "Nombre",
        "nombre",
        "Nombre",
        FiltroFieldTipo.INPUT,
        "text",
        null,
        "",
        [],
        true,
        ""
      )
    );
    this.filtroInput.filtroFields.push(
      new FiltroField(
        "Estado",
        "estado",
        "Estado de la Convocatoria",
        FiltroFieldTipo.ENUM,
        "",
        ConvocatoriaEstado,
        "",
        [],
        true,
        ""
      )
    );
    this.filtroInput.filtroFields.push(
      new FiltroField(
        "Financiación",
        "tipoFinanciacion",
        "Tipo de Financiación",
        FiltroFieldTipo.ENUM,
        "",
        TipoFinanciacion,
        "",
        [],
        true,
        ""
      )
    ); */

    // Inicialización de los datos que construyen el datatable
    this.datatableInputs = new DatatableInput(
      "Convocatorias",
      new Paginacion<ConvocatoriaListarConFiltroProyeccion>()
    );
    this.datatableInputs.quieresPaginar = true;
    /* this.datatableInputs.acciones = [new DatatableInputAction("visibility", "ver")]; */
    this.datatableInputs.mensajeNoHayElementos = "No hay Convocatorias asociadas a esta Busqueda";
    this.datatableInputs.mensajeBusqueda =
      "Visualiza registros de Convocatoria llenando los campos del formulario.";
    this.datatableInputs.tableHeaders = ["ID", "Nombre", "Estado", "Tipo Financiacion"];
    this.datatableInputs.dataAttributes = [
      { name: "id", type: String },
      { name: "nombre", type: String },
      { name: "estado", type: ConvocatoriaEstado },
      { name: "tipoFinanciacion", type: TipoFinanciacion },
    ];
  }

  ngOnInit() {
    /* if (this.obtenerRegistroId) {
      this.datatableInputs.acciones.push(new DatatableInputAction("add", "agregar"));
    } */
  }

  solicitarDatos() {
    // Simulamos un delay para hacer más realista la carga
    setTimeout(() => {
      this.datatableInputs.searchPerformed = true;
      this.datatableInputs.paginacion = this.mockData.data;
    }, 500);

  }

}
