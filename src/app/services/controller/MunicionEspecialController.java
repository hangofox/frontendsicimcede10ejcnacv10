//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.MunicionEspecialDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.MunicionEspecialService;
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
* @Since 24/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class MunicionEspecialController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private MunicionEspecialService municionEspecialService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/municionesEspeciales/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idMunicionEspecial,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo) {
        return new ResponseEntity<>(municionEspecialService.contarTotalRegistros(idMunicionEspecial, keyword, nombrePelotonUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/municionesEspeciales/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<MunicionEspecialDTO>> listarMunicionesEspecialesLista(
            @RequestParam(required = false) Long idMunicionEspecial,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(municionEspecialService.listarMunicionesEspeciales(idMunicionEspecial, keyword, nombrePelotonUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/municionesEspeciales/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<MunicionEspecialDTO>> listarMunicionesEspeciales(
            @RequestParam(required = false) Long idMunicionEspecial,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombrePelotonUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(municionEspecialService.listarMunicionesEspecialesPag(pageable, idMunicionEspecial, keyword, nombrePelotonUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/municionesEspeciales")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearMunicionEspecial(@RequestBody MunicionEspecialDTO municionEspecialDTO) {
        System.out.println(municionEspecialDTO);
        return municionEspecialService.crearMunicionEspecial(municionEspecialDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/municionesEspeciales/{idMunicionEspecial}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarMunicionEspecialporId(@PathVariable Long idMunicionEspecial) {
        return municionEspecialService.consultarMunicionEspecialporId(idMunicionEspecial);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE Y LOTE:
    @GetMapping("/municionesEspeciales/nombre/{nombreMunicionEspecial}/{loteMunicionEspecial}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarMunicionEspecialporNombreYLote(@PathVariable String nombreMunicionEspecial, @PathVariable String loteMunicionEspecial) {
        return municionEspecialService.consultarMunicionEspecialporNombreYLote(nombreMunicionEspecial, loteMunicionEspecial);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/municionesEspeciales")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarMunicionEspecial(@RequestBody MunicionEspecialDTO municionEspecialDTO) {
        return municionEspecialService.actualizarMunicionEspecial(municionEspecialDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/municionesEspeciales/{idMunicionEspecial}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarMunicionEspecial(@PathVariable Long idMunicionEspecial) {
        return municionEspecialService.eliminarMunicionEspecial(idMunicionEspecial);
    }
}
