//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.TipoResponsabilidadContractualDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.TipoResponsabilidadContractualService;
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
public class TipoResponsabilidadContractualController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private TipoResponsabilidadContractualService tipoResponsabilidadContractualService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/tiposResponsabilidadesContractuales/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idTipoResponsabilidadContractual,
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(tipoResponsabilidadContractualService.contarTotalRegistros(idTipoResponsabilidadContractual, keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/tiposResponsabilidadesContractuales/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<TipoResponsabilidadContractualDTO>> listarTiposResponsabilidadesContractualesLista(
            @RequestParam(required = false) Long idTipoResponsabilidadContractual,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(tipoResponsabilidadContractualService.listarTiposResponsabilidadesContractuales(idTipoResponsabilidadContractual, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/tiposResponsabilidadesContractuales/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<TipoResponsabilidadContractualDTO>> listarTiposResponsabilidadesContractuales(
            @RequestParam(required = false) Long idTipoResponsabilidadContractual,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(tipoResponsabilidadContractualService.listarTiposResponsabilidadesContractualesPag(pageable, idTipoResponsabilidadContractual, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/tiposResponsabilidadesContractuales")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearTipoResponsabilidadContractual(@RequestBody TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO){
        System.out.println(tipoResponsabilidadContractualDTO);
        return tipoResponsabilidadContractualService.crearTipoResponsabilidadContractual(tipoResponsabilidadContractualDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/tiposResponsabilidadesContractuales/{idTipoResponsabilidadContractual}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoResponsabilidadContractualporId(@PathVariable Long idTipoResponsabilidadContractual){
        return tipoResponsabilidadContractualService.consultarTipoResponsabilidadContractualporId(idTipoResponsabilidadContractual);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/tiposResponsabilidadesContractuales/nombre/{nombreTipoResponsabilidadContractual}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarTipoResponsabilidadContractualporNombre(@PathVariable String nombreTipoResponsabilidadContractual){
        return tipoResponsabilidadContractualService.consultarTipoResponsabilidadContractualporNombre(nombreTipoResponsabilidadContractual);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/tiposResponsabilidadesContractuales")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarTipoResponsabilidadContractual(@RequestBody TipoResponsabilidadContractualDTO tipoResponsabilidadContractualDTO){
        return tipoResponsabilidadContractualService.actualizarTipoResponsabilidadContractual(tipoResponsabilidadContractualDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/tiposResponsabilidadesContractuales/{idTipoResponsabilidadContractual}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarTipoResponsabilidadContractual(@PathVariable Long idTipoResponsabilidadContractual){
        return tipoResponsabilidadContractualService.eliminarTipoResponsabilidadContractual(idTipoResponsabilidadContractual);
    }
}
