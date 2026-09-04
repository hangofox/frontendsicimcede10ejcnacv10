//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.InfraestructuraArrendadaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.InfraestructuraArrendadaService;
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
* @Since 08/04/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class InfraestructuraArrendadaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private InfraestructuraArrendadaService infraestructuraArrendadaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTADORES DE REGISTROS FILTRADOS:
    //ENDPOINT ÚNICO PARA CONTAR REGISTROS CON QUERY PARAMS:
    @GetMapping("/infraestructurasArrendadas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(infraestructuraArrendadaService.contarTotalRegistros(idInfraestructuraArrendada, keyword), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS INFRAESTRUCTURAS ARRENDADAS SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/infraestructurasArrendadas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<InfraestructuraArrendadaDTO>> listarInfraestructurasArrendasLista(
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(infraestructuraArrendadaService.listarInfraestructurasArrendadas(idInfraestructuraArrendada, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR INFRAESTRUCTURAS ARRENDADAS CON QUERY PARAMS:
    @GetMapping("/infraestructurasArrendadas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<InfraestructuraArrendadaDTO>> listarInfraestructurasArrendadasListaPag(
            @RequestParam(required = false) Long idInfraestructuraArrendada,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(infraestructuraArrendadaService.listarInfraestructurasArrendadasPag(pageable, idInfraestructuraArrendada, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/infraestructurasArrendadas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearInfraestructuraArrendada(@RequestBody InfraestructuraArrendadaDTO infraestructuraArrendadaDTO){
        System.out.println(infraestructuraArrendadaDTO);
        return infraestructuraArrendadaService.crearInfraestructuraArrendada(infraestructuraArrendadaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/infraestructurasArrendadas/{idInfraestructuraArrendada}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarInfraestructuraArrendadabyId(@PathVariable Long idInfraestructuraArrendada){
        return infraestructuraArrendadaService.consultarInfraestructuraArrendadaporId(idInfraestructuraArrendada);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/infraestructurasArrendadas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarInfraestructuraArrendada(@RequestBody InfraestructuraArrendadaDTO infraestructuraArrendadaDTO){
        return infraestructuraArrendadaService.actualizarInfraestructuraArrendada(infraestructuraArrendadaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/infraestructurasArrendadas/{idInfraestructuraArrendada}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarInfraestructuraArrendada(@PathVariable Long idInfraestructuraArrendada){
        return infraestructuraArrendadaService.eliminarInfraestructuraArrendada(idInfraestructuraArrendada);
    }
}
