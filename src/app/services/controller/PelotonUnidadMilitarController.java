//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.PelotonUnidadMilitarDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.PelotonUnidadMilitarService;
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
* @Since 21/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class PelotonUnidadMilitarController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private PelotonUnidadMilitarService pelotonUnidadMilitarService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/pelotonesUnidadesMilitares/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar) {
        return new ResponseEntity<>(pelotonUnidadMilitarService.contarTotalRegistros(idPelotonUnidadMilitar, keyword, nombreCompaniaUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/pelotonesUnidadesMilitares/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<PelotonUnidadMilitarDTO>> listarPelotonesUnidadesMilitaresLista(
            @RequestParam(required = false) Long idPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(pelotonUnidadMilitarService.listarPelotonesUnidadesMilitares(idPelotonUnidadMilitar, keyword, nombreCompaniaUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/pelotonesUnidadesMilitares/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<PelotonUnidadMilitarDTO>> listarPelotonesUnidadesMilitares(
            @RequestParam(required = false) Long idPelotonUnidadMilitar,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(pelotonUnidadMilitarService.listarPelotonesUnidadesMilitaresPag(pageable, idPelotonUnidadMilitar, keyword, nombreCompaniaUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/pelotonesUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearPelotonUnidadMilitar(@RequestBody PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO) {
        System.out.println(pelotonUnidadMilitarDTO);
        return pelotonUnidadMilitarService.crearPelotonUnidadMilitar(pelotonUnidadMilitarDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/pelotonesUnidadesMilitares/{idPelotonUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPelotonUnidadMilitarporId(@PathVariable Long idPelotonUnidadMilitar) {
        return pelotonUnidadMilitarService.consultarPelotonUnidadMilitarporId(idPelotonUnidadMilitar);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE, NOMBRE COMPAÑIA UNIDAD MILITAR Y SIGLA O ACRÓNIMO DE LA UNIDAD MILITAR:
    @GetMapping("/pelotonesUnidadesMilitares/nombre/{nombrePelotonUnidadMilitar}/{nombreCompaniaUnidadMilitar}/{siglaoAcronimoUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarPelotonUnidadMilitarporNombreYNombreCompaniaUnidadMilitar(@PathVariable String nombrePelotonUnidadMilitar, @PathVariable String nombreCompaniaUnidadMilitar, @PathVariable String siglaoAcronimoUnidadMilitar) {
        return pelotonUnidadMilitarService.consultarPelotonUnidadMilitarporNombreYNombreCompaniaUnidadMilitar(nombrePelotonUnidadMilitar, nombreCompaniaUnidadMilitar, siglaoAcronimoUnidadMilitar);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/pelotonesUnidadesMilitares")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarPelotonUnidadMilitar(@RequestBody PelotonUnidadMilitarDTO pelotonUnidadMilitarDTO) {
        return pelotonUnidadMilitarService.actualizarPelotonUnidadMilitar(pelotonUnidadMilitarDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/pelotonesUnidadesMilitares/{idPelotonUnidadMilitar}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarPelotonUnidadMilitar(@PathVariable Long idPelotonUnidadMilitar) {
        return pelotonUnidadMilitarService.eliminarPelotonUnidadMilitar(idPelotonUnidadMilitar);
    }
}
