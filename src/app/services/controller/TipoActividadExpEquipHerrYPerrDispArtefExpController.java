//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoActividadExpEquipHerrYPerrDispArtefExpDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoActividadExpEquipHerrYPerrDispArtefExpService;
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
* @Since 01/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class TipoActividadExpEquipHerrYPerrDispArtefExpController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoActividadExpEquipHerrYPerrDispArtefExpService tipoActividadExpEquipHerrYPerrDispArtefExpService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //1. CONTADORES DE REGISTROS FILTRADOS.
    //CONTAR TOTAL DE REGISTROS (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO ACTIVIDAD):
    @GetMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/count")
    public ResponseEntity<Long> contarTotalTiposActividadesExpEquipHerrYPerrDispArtefExp(
            @RequestParam(required = false) Long idTipoActividadExpEquipHerrYPerrDispArtefExp,
            @RequestParam(required = false) String keyword
        ) {
        return new ResponseEntity<>(tipoActividadExpEquipHerrYPerrDispArtefExpService.contarTotalRegistros(idTipoActividadExpEquipHerrYPerrDispArtefExp, keyword), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS SIN PAGINACIÓN.
    //LISTAR REGISTROS (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO ACTIVIDAD):
    @GetMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/lista")
    public ResponseEntity<List<TipoActividadExpEquipHerrYPerrDispArtefExpDTO>> listarTiposActividadesExpEquipHerrYPerrDispArtefExpLista(
            @RequestParam(required = false) Long idTipoActividadExpEquipHerrYPerrDispArtefExp,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoActividadExpEquipHerrYPerrDispArtefExpService.listarTiposActividadesExpEquipHerrYPerrDispArtefExp(idTipoActividadExpEquipHerrYPerrDispArtefExp, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //1. LISTADO DE REGISTROS FILTRADOS CON PAGINACIÓN.
    //LISTAR REGISTROS CON PAGINACIÓN (CON FILTROS OPCIONALES POR KEYWORD/ID DE TIPO ACTIVIDAD):
    @GetMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/listaPag")
    public ResponseEntity<Slice<TipoActividadExpEquipHerrYPerrDispArtefExpDTO>> listarTiposActividadesExpEquipHerrYPerrDispArtefExpListaPag(
            @RequestParam(required = false) Long idTipoActividadExpEquipHerrYPerrDispArtefExp,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "id") String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoActividadExpEquipHerrYPerrDispArtefExpService.listarTiposActividadesExpEquipHerrYPerrDispArtefExpPag(pageable, idTipoActividadExpEquipHerrYPerrDispArtefExp, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoActividadExpEquipHerrYPerrDispArtefExp(@RequestBody TipoActividadExpEquipHerrYPerrDispArtefExpDTO tipoActividadExpEquipHerrYPerrDispArtefExpDTO){
        System.out.println(tipoActividadExpEquipHerrYPerrDispArtefExpDTO);
        return tipoActividadExpEquipHerrYPerrDispArtefExpService.crearTipoActividadExpEquipHerrYPerrDispArtefExp(tipoActividadExpEquipHerrYPerrDispArtefExpDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/{idTipoActividadExpEquipHerrYPerrDispArtefExp}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoActividadExpEquipHerrYPerrDispArtefExpbyId(@PathVariable Long idTipoActividadExpEquipHerrYPerrDispArtefExp){
        return tipoActividadExpEquipHerrYPerrDispArtefExpService.consultarTipoActividadExpEquipHerrYPerrDispArtefExpporId(idTipoActividadExpEquipHerrYPerrDispArtefExp);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/nombre/{nombreTipoActividadExpEquipHerrYPerrDispArtefExp}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoActividadExpEquipHerrYPerrDispArtefExpbyNombre(@PathVariable String nombreTipoActividadExpEquipHerrYPerrDispArtefExp){
        return tipoActividadExpEquipHerrYPerrDispArtefExpService.consultarTipoActividadExpEquipHerrYPerrDispArtefExpporNombre(nombreTipoActividadExpEquipHerrYPerrDispArtefExp);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoActividadExpEquipHerrYPerrDispArtefExp(@RequestBody TipoActividadExpEquipHerrYPerrDispArtefExpDTO tipoActividadExpEquipHerrYPerrDispArtefExpDTO){
        return tipoActividadExpEquipHerrYPerrDispArtefExpService.actualizarTipoActividadExpEquipHerrYPerrDispArtefExp(tipoActividadExpEquipHerrYPerrDispArtefExpDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposActividadesExpEquipHerrYPerrDispArtefExp/{idTipoActividadExpEquipHerrYPerrDispArtefExp}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoActividadExpEquipHerrYPerrDispArtefExp(@PathVariable Long idTipoActividadExpEquipHerrYPerrDispArtefExp){
        return tipoActividadExpEquipHerrYPerrDispArtefExpService.eliminarTipoActividadExpEquipHerrYPerrDispArtefExp(idTipoActividadExpEquipHerrYPerrDispArtefExp);
    }
}
