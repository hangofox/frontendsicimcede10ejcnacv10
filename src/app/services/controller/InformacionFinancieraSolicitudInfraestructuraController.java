//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InformacionFinancieraSolicitudInfraestructuraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InformacionFinancieraSolicitudInfraestructuraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
* @Autor PD04. HERNAN ADOLFO NUÑEZ GONZALEZ.
* @Since 27/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class InformacionFinancieraSolicitudInfraestructuraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InformacionFinancieraSolicitudInfraestructuraService informacionFinancieraSolicitudInfraestructuraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS.
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/informacionesFinancierasSolicitudesInfraestructuras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura) {
        return new ResponseEntity<>(informacionFinancieraSolicitudInfraestructuraService.contarTotalRegistros(keyword, idSolicitudInfraestructura), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //ENDPOINT PARA LISTAR TODOS LOS REGISTROS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/informacionesFinancierasSolicitudesInfraestructuras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InformacionFinancieraSolicitudInfraestructuraDTO>> listarInformacionesFinancierasSolicitudesInfraestructurasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(informacionFinancieraSolicitudInfraestructuraService.listarInformacionesFinancierasSolicitudesInfraestructuras(keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/informacionesFinancierasSolicitudesInfraestructuras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InformacionFinancieraSolicitudInfraestructuraDTO>> listarInformacionesFinancierasSolicitudesInfraestructurasListaPag(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(informacionFinancieraSolicitudInfraestructuraService.listarInformacionesFinancierasSolicitudesInfraestructurasPag(pageable, keyword, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/informacionesFinancierasSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInformacionFinancieraSolicitudInfraestructura(@RequestBody InformacionFinancieraSolicitudInfraestructuraDTO informacionFinancieraSolicitudInfraestructuraDTO){
        System.out.println(informacionFinancieraSolicitudInfraestructuraDTO);
        return informacionFinancieraSolicitudInfraestructuraService.crearInformacionFinancieraSolicitudInfraestructura(informacionFinancieraSolicitudInfraestructuraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/informacionesFinancierasSolicitudesInfraestructuras/{idInformacionFinancieraSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInformacionFinancieraSolicitudInfraestructurabyId(@PathVariable Long idInformacionFinancieraSolicitudInfraestructura){
        return informacionFinancieraSolicitudInfraestructuraService.consultarInformacionFinancieraSolicitudInfraestructuraporId(idInformacionFinancieraSolicitudInfraestructura);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/informacionesFinancierasSolicitudesInfraestructuras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInformacionFinancieraSolicitudInfraestructura(@RequestBody InformacionFinancieraSolicitudInfraestructuraDTO informacionFinancieraSolicitudInfraestructuraDTO){
        return informacionFinancieraSolicitudInfraestructuraService.actualizarInformacionFinancieraSolicitudInfraestructura(informacionFinancieraSolicitudInfraestructuraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/informacionesFinancierasSolicitudesInfraestructuras/{idInformacionFinancieraSolicitudInfraestructura}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInformacionFinancieraSolicitudInfraestructura(@PathVariable Long idInformacionFinancieraSolicitudInfraestructura){
        return informacionFinancieraSolicitudInfraestructuraService.eliminarInformacionFinancieraSolicitudInfraestructura(idInformacionFinancieraSolicitudInfraestructura);
    }
}
