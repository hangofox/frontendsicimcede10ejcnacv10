//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.UnidadMedidaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.UnidadMedidaService;
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
* @Since 17/12/2025.
* Declaración del controlador.
*/
@RestController//DECLARACIÓN DEL CONTROLADOR PARA LOS CRUDS.
@RequestMapping("")//DECLARACIÓN DE LA RESPUESTA PRINCIPAL DEL MAPEO DE LOS CRUDS.
public class UnidadMedidaController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private UnidadMedidaService unidadMedidaService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/unidadesMedidas/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) String keyword) {
        return new ResponseEntity<>(unidadMedidaService.contarTotalRegistros(keyword), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/unidadesMedidas/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<UnidadMedidaDTO>> listarUnidadesMedidasLista(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(unidadMedidaService.listarUnidadesMedidas(keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/unidadesMedidas/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<UnidadMedidaDTO>> listarUnidadesMedidas(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(unidadMedidaService.listarUnidadesMedidasPag(pageable, keyword, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/unidadesMedidas")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearUnidadMedida(@RequestBody UnidadMedidaDTO unidadMedidaDTO){
        System.out.println(unidadMedidaDTO);
        return unidadMedidaService.crearUnidadMedida(unidadMedidaDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/unidadesMedidas/{idUnidadMedida}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarUnidadMedidaporId(@PathVariable Long idUnidadMedida){
        return unidadMedidaService.consultarUnidadMedidaporId(idUnidadMedida);
    }
    
    //LEER CONSULTA DE REGISTRO POR NOMBRE:
    @GetMapping("/unidadesMedidas/nombre/{nombreUnidadMedida}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarUnidadMedidaporNombre(@PathVariable String nombreUnidadMedida){
        return unidadMedidaService.consultarUnidadMedidaporNombre(nombreUnidadMedida);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/unidadesMedidas")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarUnidadMedida(@RequestBody UnidadMedidaDTO unidadMedidaDTO){
        return unidadMedidaService.actualizarUnidadMedida(unidadMedidaDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/unidadesMedidas/{idUnidadMedida}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarUnidadMedida(@PathVariable Long idUnidadMedida){
        return unidadMedidaService.eliminarUnidadMedida(idUnidadMedida);
    }
}
