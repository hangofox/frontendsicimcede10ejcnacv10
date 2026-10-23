//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.LineaMandoUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.LineaMandoUnidadMilitarService;
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
public class LineaMandoUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private LineaMandoUnidadMilitarService lineaMandoUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/lineasMandosUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(lineaMandoUnidadMilitarService.contarTotalRegistros(idLineaMandoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //ENDPOINT LISTAR TODAS LAS LÍNEAS DE MANDOS DE UNIDADES MILITARES SIN PAGINACIÓN (PARA SELECTS DEL FRONTEND):
    @GetMapping("/lineasMandosUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<LineaMandoUnidadMilitarDTO>> listarLineasMandosUnidadesMilitaresLista(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(lineaMandoUnidadMilitarService.listarLineasMandosUnidadesMilitares(idLineaMandoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //ENDPOINT ÚNICO PARA LISTAR/FILTRAR/ORDENAR/PAGINAR LÍNEAS DE MANDOS DE UNIDADES MILITARES CON QUERY PARAMS:
    @GetMapping("/lineasMandosUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<LineaMandoUnidadMilitarDTO>> listarLineasMandosUnidadesMilitares(
            @RequestParam(required = false) Long idLineaMandoUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(lineaMandoUnidadMilitarService.listarLineasMandosUnidadesMilitaresPag(pageable, idLineaMandoUnidadMilitar, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/lineasMandosUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearLineaMandoUnidadMilitar(@RequestBody LineaMandoUnidadMilitarDTO lineaMandoUnidadMilitarDTO) {
        System.out.println(lineaMandoUnidadMilitarDTO);
        return lineaMandoUnidadMilitarService.crearLineaMandoUnidadMilitar(lineaMandoUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/lineasMandosUnidadesMilitares/{idLineaMandoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaMandoUnidadMilitarporId(@PathVariable Long idLineaMandoUnidadMilitar) {
        return lineaMandoUnidadMilitarService.consultarLineaMandoUnidadMilitarporId(idLineaMandoUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR LÍNEA DE MANDO Y SIGLA O ACRONIMO DE LA UNIDAD MILITAR:
    @GetMapping("/lineasMandosUnidadesMilitares/lineaMando/{lineaMandoUnidadMilitar}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarLineaMandoUnidadMilitarporLineaMandoySiglaoAcronimoUnidadMilitar(@PathVariable String lineaMandoUnidadMilitar, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return lineaMandoUnidadMilitarService.consultarLineaMandoUnidadMilitarporLineaMandoySiglaoAcronimoUnidadMilitar(lineaMandoUnidadMilitar, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/lineasMandosUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarLineaMandoUnidadMilitar(@RequestBody LineaMandoUnidadMilitarDTO lineaMandoUnidadMilitarDTO) {
        return lineaMandoUnidadMilitarService.actualizarLineaMandoUnidadMilitar(lineaMandoUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/lineasMandosUnidadesMilitares/{idLineaMandoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarLineaMandoUnidadMilitar(@PathVariable Long idLineaMandoUnidadMilitar) {
        return lineaMandoUnidadMilitarService.eliminarLineaMandoUnidadMilitar(idLineaMandoUnidadMilitar);
    }
}
