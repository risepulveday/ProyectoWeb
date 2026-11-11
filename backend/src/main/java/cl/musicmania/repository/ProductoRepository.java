package cl.musicmania.repository;

import cl.musicmania.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, String> {
    List<Producto> findByCategoria(String categoria);
}
