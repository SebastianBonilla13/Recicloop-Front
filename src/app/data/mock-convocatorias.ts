
import { ConvocatoriaListarConFiltroProyeccion, Paginacion } from "./importsConvocatoria";

interface ApiResponse<T> {
    status: number;
    userMessage: string;
    developerMessage: string;
    data: Paginacion<T>;
}

export const mockData: ApiResponse<ConvocatoriaListarConFiltroProyeccion> = {
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
  };