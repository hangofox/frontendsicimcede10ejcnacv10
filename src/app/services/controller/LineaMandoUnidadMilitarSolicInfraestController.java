//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.LineaMandoUnidadMilitarSolicInfraestDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.LineaMandoUnidadMilitarSolicInfraestService;
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
* @Since 20/10/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class LineaMandoUnidadMilitarSolicInfraestController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private LineaMandoUnidadMilitarSolicInfraestService lineaMandoUnidadMilitarSolicInfraestService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/lineasMandosUnidadesMilitaresSolicInfraest/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitarSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(lineaMandoUnidadMilitarSolicInfraestService.contarTotalRegistros(idLineaMandoUnidadMilitarSolicInfraest, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS LÍNEAS DE MANDOS DE UNIDADES MILITARES DE SOLICITUDES DE INFRAESTRUCTURA SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/lineasMandosUnidadesMilitaresSolicInfraest/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<LineaMandoUnidadMilitarSolicInfraestDTO>> listarLineasMandosUnidadesMilitaresSolicInfraestLista(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitarSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(lineaMandoUnidadMilitarSolicInfraestService.listarLineasMandosUnidadesMilitaresSolicInfraest(idLineaMandoUnidadMilitarSolicInfraest, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR LÍNEAS DE MANDOS DE UNIDADES MILITARES DE SOLICITUDES DE INFRAESTRUCTURA CON QUERY PARAMS:
    @GetMapping("/lineasMandosUnidadesMilitaresSolicInfraest/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<LineaMandoUnidadMilitarSolicInfraestDTO>> listarLineasMandosUnidadesMilitaresSolicInfraest(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitarSolicInfraest,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(lineaMandoUnidadMilitarSolicInfraestService.listarLineasMandosUnidadesMilitaresSolicInfraestPag(pageable, idLineaMandoUnidadMilitarSolicInfraest, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/lineasMandosUnidadesMilitaresSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearLineaMandoUnidadMilitarSolicInfraest(@RequestBody LineaMandoUnidadMilitarSolicInfraestDTO lineaMandoUnidadMilitarSolicInfraestDTO) {
        System.out.println(lineaMandoUnidadMilitarSolicInfraestDTO);
        return lineaMandoUnidadMilitarSolicInfraestService.crearLineaMandoUnidadMilitarSolicInfraest(lineaMandoUnidadMilitarSolicInfraestDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/lineasMandosUnidadesMilitaresSolicInfraest/{idLineaMandoUnidadMilitarSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaMandoUnidadMilitarSolicInfraestporId(@PathVariable Long idLineaMandoUnidadMilitarSolicInfraest) {
        return lineaMandoUnidadMilitarSolicInfraestService.consultarLineaMandoUnidadMilitarSolicInfraestporId(idLineaMandoUnidadMilitarSolicInfraest);
    }
    
    //LEER CONSULTA DE REGISTRO POR LÍNEA DE MANDO Y SIGLA O ACRONIMO DE LA UNIDAD MILITAR:
    @GetMapping("/lineasMandosUnidadesMilitaresSolicInfraest/lineaMando/{lineaMandoUnidadMilitarSolicInfraest}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaMandoUnidadMilitarSolicInfraestporLineaMandoySiglaoAcronimoUnidadMilitar(@PathVariable String lineaMandoUnidadMilitarSolicInfraest, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return lineaMandoUnidadMilitarSolicInfraestService.consultarLineaMandoUnidadMilitarSolicInfraestporLineaMandoySiglaoAcronimoUnidadMilitar(lineaMandoUnidadMilitarSolicInfraest, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/lineasMandosUnidadesMilitaresSolicInfraest")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarLineaMandoUnidadMilitarSolicInfraest(@RequestBody LineaMandoUnidadMilitarSolicInfraestDTO lineaMandoUnidadMilitarSolicInfraestDTO) {
        return lineaMandoUnidadMilitarSolicInfraestService.actualizarLineaMandoUnidadMilitarSolicInfraest(lineaMandoUnidadMilitarSolicInfraestDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/lineasMandosUnidadesMilitaresSolicInfraest/{idLineaMandoUnidadMilitarSolicInfraest}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarLineaMandoUnidadMilitarSolicInfraest(@PathVariable Long idLineaMandoUnidadMilitarSolicInfraest) {
        return lineaMandoUnidadMilitarSolicInfraestService.eliminarLineaMandoUnidadMilitarSolicInfraest(idLineaMandoUnidadMilitarSolicInfraest);
    }
}
