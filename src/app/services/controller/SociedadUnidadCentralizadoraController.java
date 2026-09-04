//DECLARACIÓN DE PAQUETES:
package com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.web.controller;

//IMPORTACIÓN DE LIBRERIAS:
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.SociedadUnidadCentralizadoraDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.dto.RespuestaDTO;
import com.backendsicimcede10ejcnacv10.mil.co.backendsicimcede10ejcnacv10.dominio.service.SociedadUnidadCentralizadoraService;
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
public class SociedadUnidadCentralizadoraController {
    
    @Autowired//INYECTAMOS EL SERVICIO.
    private SociedadUnidadCentralizadoraService sociedadUnidadCentralizadoraService;
    
    //CONTROLADORES DE CRUDS (CREACIÓN, LECTURA (LISTAR Y CONSULTAR), EDICIÓN Y ELIMINACIÓN DE UN REGISTRO).
    
    //CONTAR TOTAL DE REGISTROS:
    @GetMapping("/sociedadesUnidadesCentralizadoras/count")//DECLARACIÓN DEL MAPEO DEL CRUD CONTAR REGISTROS.
    public ResponseEntity<Long> contarTotalRegistros(
            @RequestParam(required = false) Long idSociedadUnidadCentralizadora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar) {
        return new ResponseEntity<>(sociedadUnidadCentralizadoraService.contarTotalRegistros(idSociedadUnidadCentralizadora, keyword, siglaoAcronimoUnidadMilitar), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS:
    @GetMapping("/sociedadesUnidadesCentralizadoras/lista")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS.
    public ResponseEntity<List<SociedadUnidadCentralizadoraDTO>> listarSociedadesUnidadesCentralizadorasLista(
            @RequestParam(required = false) Long idSociedadUnidadCentralizadora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode) {
        return new ResponseEntity<>(sociedadUnidadCentralizadoraService.listarSociedadesUnidadesCentralizadoras(idSociedadUnidadCentralizadora, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //LISTAR REGISTROS PAGINADOS:
    @GetMapping("/sociedadesUnidadesCentralizadoras/listaPag")//DECLARACIÓN DEL MAPEO DEL CRUD LISTAR REGISTROS PAGINADOS.
    public ResponseEntity<Slice<SociedadUnidadCentralizadoraDTO>> listarSociedadesUnidadesCentralizadoras(
            @RequestParam(required = false) Long idSociedadUnidadCentralizadora,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String siglaoAcronimoUnidadMilitar,
            @RequestParam(required = false) String orderBy,
            @RequestParam(required = false, defaultValue = "ASC") String orderMode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(sociedadUnidadCentralizadoraService.listarSociedadesUnidadesCentralizadorasPag(pageable, idSociedadUnidadCentralizadora, keyword, siglaoAcronimoUnidadMilitar, orderBy, orderMode), HttpStatus.OK);
    }
    
    //CREAR REGISTRO:
    @PostMapping("/sociedadesUnidadesCentralizadoras")//DECLARACIÓN DEL MAPEO DEL CRUD CREAR REGISTRO.
    public RespuestaDTO crearSociedadUnidadCentralizadora(@RequestBody SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO) {
        System.out.println(sociedadUnidadCentralizadoraDTO);
        return sociedadUnidadCentralizadoraService.crearSociedadUnidadCentralizadora(sociedadUnidadCentralizadoraDTO);
    }
    
    //LEER CONSULTA DE REGISTRO POR ID:
    @GetMapping("/sociedadesUnidadesCentralizadoras/{idSociedadUnidadCentralizadora}")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO.
    public RespuestaDTO consultarSociedadUnidadCentralizadoraporId(@PathVariable Long idSociedadUnidadCentralizadora) {
        return sociedadUnidadCentralizadoraService.consultarSociedadUnidadCentralizadoraporId(idSociedadUnidadCentralizadora);
    }
    
    //LEER CONSULTA DE REGISTRO POR CODIGO DE LA SOCIEDAD DE UNIDAD CENTRALIZADORA (CAMPO ÚNICO):
    @GetMapping("/sociedadesUnidadesCentralizadoras/codigo")//DECLARACIÓN DEL MAPEO DEL CRUD CONSULTAR REGISTRO POR CAMPO ÚNICO.
    public RespuestaDTO consultarSociedadUnidadCentralizadoraporCodigo(
            @RequestParam(required = false) String codigoSociedadUnidadCentralizadora) {
        return sociedadUnidadCentralizadoraService.consultarSociedadUnidadCentralizadoraporCodigo(codigoSociedadUnidadCentralizadora);
    }
    
    //MODIFICAR REGISTRO:
    @PutMapping("/sociedadesUnidadesCentralizadoras")//DECLARACIÓN DEL MAPEO DEL CRUD MODIFICAR REGISTRO.
    public RespuestaDTO actualizarSociedadUnidadCentralizadora(@RequestBody SociedadUnidadCentralizadoraDTO sociedadUnidadCentralizadoraDTO) {
        return sociedadUnidadCentralizadoraService.actualizarSociedadUnidadCentralizadora(sociedadUnidadCentralizadoraDTO);
    }
    
    //ELIMINAR REGISTRO:
    @DeleteMapping("/sociedadesUnidadesCentralizadoras/{idSociedadUnidadCentralizadora}")//DECLARACIÓN DEL MAPEO DEL CRUD ELIMINAR REGISTRO.
    public RespuestaDTO eliminarSociedadUnidadCentralizadora(@PathVariable Long idSociedadUnidadCentralizadora) {
        return sociedadUnidadCentralizadoraService.eliminarSociedadUnidadCentralizadora(idSociedadUnidadCentralizadora);
    }
}
