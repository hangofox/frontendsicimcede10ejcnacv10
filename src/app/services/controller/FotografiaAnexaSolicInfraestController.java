//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.FotografiaAnexaSolicInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.FotografiaAnexaSolicInfraestService;
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
* @Since 31/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class FotografiaAnexaSolicInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private FotografiaAnexaSolicInfraestService fotografiaAnexaSolicInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/fotografiasAnexasSolicInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idFotografiasAnexasSolicInfraest,
            @RequestParam(required = false) Long idSolicitudInfraestructura) {
        return new ResponseEntity<>(fotografiaAnexaSolicInfraestService.contarTotalRegistros(idFotografiasAnexasSolicInfraest, idSolicitudInfraestructura), HttpStatus.OK);
    }

    //ENDPOINT LISTAR TODAS LAS FOTOGRAFIAS ANEXAS SOLIC INFRAEST SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/fotografiasAnexasSolicInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<FotografiaAnexaSolicInfraestDTO>> listarFotografiasAnexasSolicInfraest(
            @RequestParam(required = false) Long idFotografiasAnexasSolicInfraest,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(fotografiaAnexaSolicInfraestService.listarFotografiasAnexasSolicInfraest(idFotografiasAnexasSolicInfraest, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }

    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR FOTOGRAFIAS ANEXAS SOLIC INFRAEST CON QUERY PARAMS:
    @GetMapping("/fotografiasAnexasSolicInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<FotografiaAnexaSolicInfraestDTO>> listarFotografiasAnexasSolicInfraestPag(
            @RequestParam(required = false) Long idFotografiasAnexasSolicInfraest,
            @RequestParam(required = false) Long idSolicitudInfraestructura,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(fotografiaAnexaSolicInfraestService.listarFotografiasAnexasSolicInfraestPag(pageable, idFotografiasAnexasSolicInfraest, idSolicitudInfraestructura, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/fotografiasAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    //@PutMapping("/fotografiasAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearFotografiaAnexaSolicInfraest(@RequestBody FotografiaAnexaSolicInfraestDTO fotografiaAnexaSolicInfraestDTO){
        System.out.println(fotografiaAnexaSolicInfraestDTO);
        return fotografiaAnexaSolicInfraestService.crearFotografiaAnexaSolicInfraest(fotografiaAnexaSolicInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/fotografiasAnexasSolicInfraest/{idFotografiasAnexasSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarFotografiaAnexaSolicInfraestbyId(@PathVariable Long idFotografiasAnexasSolicInfraest){
        return fotografiaAnexaSolicInfraestService.consultarFotografiaAnexaSolicInfraestporId(idFotografiasAnexasSolicInfraest);
    }
    
    //MODIFICAR REGISTRO:
    //@PostMapping("/fotografiasAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    @PutMapping("/fotografiasAnexasSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarFotografiaAnexaSolicInfraest(@RequestBody FotografiaAnexaSolicInfraestDTO fotografiaAnexaSolicInfraestDTO){
        return fotografiaAnexaSolicInfraestService.actualizarFotografiaAnexaSolicInfraest(fotografiaAnexaSolicInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/fotografiasAnexasSolicInfraest/{idFotografiasAnexasSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarFotografiaAnexaSolicInfraest(@PathVariable Long idFotografiasAnexasSolicInfraest){
        return fotografiaAnexaSolicInfraestService.eliminarFotografiaAnexaSolicInfraest(idFotografiasAnexasSolicInfraest);
    }
}
