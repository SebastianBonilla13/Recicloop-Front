import { Component, EventEmitter, Injectable, Input, Output } from "@angular/core";
/* 

import { DatatableInput } from "../../../service/common/model/datatableInput";
import { DatatableInputAction } from "../../../service/common/model/datatableAction";
 */
/* import { EnumTranslationService } from "../../../service/common/enum-translation.service"; */

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
  dataAttributes: { name: string; type: any }[];
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

@Injectable({
  providedIn: 'root'
})
class EnumTranslationService {
  constructor() {}

  isEnumType(type: any): boolean {
    return type !== String && type !== Number;
  }

  getEnumKeys(enumObject: any): string[] {
    return Object.keys(enumObject);
  }

  getEnumValueByKey(enumObject: any, key: string): string {
    return enumObject[key];
  }

  getKeyByValue(enumObject: any, value: string): string | undefined {
    for (const key in enumObject) {
      if (Object.prototype.hasOwnProperty.call(enumObject, key) && enumObject[key] === value) {
        return key;
      }
    }
    return undefined;
  }
}


@Component({
  selector: "app-datatable-custom",
  imports: [],
  templateUrl: "./datatable-custom.component.html",
  styleUrl: "./datatable-custom.component.css",
})
export class DatatableCustomComponent {
  paginas: number[] = [10, 20, 50];
  @Input() datatableInputs: DatatableInput = new DatatableInput();
  /* @Output() accionEmitter = new EventEmitter<any>(); */
  @Output() changePageEmitter = new EventEmitter<number>();
  @Output() movePageEmitter = new EventEmitter<number>();
  @Output() changePageSizeEmitter = new EventEmitter<number>();

  constructor(protected enumTranslationService: EnumTranslationService) {}

  onPageSizeChange(pageSize: Event): void {
    const newSize = (pageSize.target as HTMLSelectElement).value;
    this.changePageSizeEmitter.emit(parseInt(newSize, 10));
  }

  /**
   * Calcula el texto que indica qué elementos se están visualizando actualmente.
   * @param pageNumber El número de página actual.
   * @param pageSize El tamaño de página actual.
   * @param totalElements El número total de elementos.
   * @returns El texto que describe qué elementos se están visualizando.
   */
  calcularTextoVisualizacion(): string {
    const pageNumber = this.datatableInputs.paginacion.number + 1;
    const pageSize = this.datatableInputs.paginacion.size;
    const totalElements = this.datatableInputs.paginacion.totalElements;

    const elementosVisualizadosHasta = pageNumber * pageSize - (pageSize - 1);
    const elementosVisualizadosHastaFinal = Math.min(
      elementosVisualizadosHasta + pageSize - 1,
      totalElements
    );

    return (
      "Visualizando " +
      elementosVisualizadosHasta +
      " a " +
      elementosVisualizadosHastaFinal +
      " de " +
      totalElements +
      " Registros"
    );
  }

  /**
   * Genera un array de números de página basado en el número total de páginas.
   * @returns Un array de números de página.
   */
  getPageNumbers(): number[] {
    const totalPages = this.datatableInputs.paginacion.totalPages;
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  /**
   * Cambia la página de resultados de acuerdo al número de página especificado.
   * @param pageNumber El número de página al que se debe cambiar.
   */
  changePage(pageNumber: number): void {
    // Asegurarse de que newPage no sea menor que 0
    const nextPage = Math.max(pageNumber - 1, 0);

    // Enviar el valor de la nueva pagina al componente padre
    this.changePageEmitter.emit(nextPage);
  }

  /**
   * Mueve la página de resultados hacia adelante o hacia atrás según la dirección especificada.
   * @param newPage La dirección hacia la que se debe mover la página ('adelante' o 'atras').
   */
  movePage(newPage: string): void {
    if (newPage === "atras") {
      // Enviar la disminucion del valor de la pagina al componente padre
      this.movePageEmitter.emit(-1);
    } else {
      // Enviar el incremento del valor de la pagina al componente padre
      this.movePageEmitter.emit(1);
    }
  }

  /* ejecutarAccion(accion: DatatableInputAction, data: any): void {
    this.accionEmitter.emit({ accion, data });
  } */

  /* ejecutarAccionPrincipal(data: any): void {
    this.accionEmitter.emit(data);
  } */
}
