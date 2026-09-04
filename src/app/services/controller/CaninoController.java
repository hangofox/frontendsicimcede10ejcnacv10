//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.CaninoDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.CaninoService;
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
* @Since 20/03/2026.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class CaninoController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private CaninoService caninoService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/caninos/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idCanino,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo) {
        return new ResponseEntity<>(caninoService.contarTotalRegistros(idCanino, keyword, nombreCompaniaUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/caninos/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<CaninoDTO>> listarCaninosLista(
            @RequestParam(required = false) Long idCanino,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(caninoService.listarCaninos(idCanino, keyword, nombreCompaniaUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/caninos/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<CaninoDTO>> listarCaninos(
            @RequestParam(required = false) Long idCanino,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String nombreCompaniaUnidadMilitar,
            @RequestParam(required = false) String nombreTipoDespejeMilitarArtefactoExplosivo,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(caninoService.listarCaninosPag(pageable, idCanino, keyword, nombreCompaniaUnidadMilitar, nombreTipoDespejeMilitarArtefactoExplosivo, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/caninos")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearCanino(@RequestBody CaninoDTO caninoDTO) {
        System.out.println(caninoDTO);
        return caninoService.crearCanino(caninoDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/caninos/{idCanino}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarCaninoporId(@PathVariable Long idCanino) {
        return caninoService.consultarCaninoporId(idCanino);
    }
    
    //LEER CONSULTA DE REGISTRO POR NUMERO CHIP, NUMERO INVENTARIO Y NUMERO ACTIVO FIJO (CAMPOS ÚNICOS COMBINADOS):
    @GetMapping("/caninos/numero")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPOS ÚNICOS COMBINADOS.
    public RespuestaDTO consultarCaninoporNumeroChipNumeroInventarioNumeroActivoFijo(
            @RequestParam(required = false) String numeroChipCanino,
            @RequestParam(required = false) String numeroInventarioCanino,
            @RequestParam(required = false) String numeroActivoFijoCanino) {
        return caninoService.consultarCaninoporNumeroChipNumeroInventarioNumeroActivoFijo(numeroChipCanino, numeroInventarioCanino, numeroActivoFijoCanino);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/caninos")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarCanino(@RequestBody CaninoDTO caninoDTO) {
        return caninoService.actualizarCanino(caninoDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/caninos/{idCanino}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarCanino(@PathVariable Long idCanino) {
        return caninoService.eliminarCanino(idCanino);
    }
}
