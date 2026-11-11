package cl.musicmania.repository;

import cl.musicmania.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
    List<Orden> findByCorreoIgnoreCaseOrderByFechaDesc(String correo);
    List<Orden> findAllByOrderByFechaDesc();
}
