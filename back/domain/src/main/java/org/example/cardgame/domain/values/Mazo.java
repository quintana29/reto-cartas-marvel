package org.example.cardgame.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Mazo implements ValueObject<Mazo.Props> {

    private final Set<Carta> cartas;
    private final Integer cantidad;

    public Mazo(Set<Carta> cartas) {
        this.cartas = cartas;
        this.cantidad = cartas.size();
    }

    @Override
    public Props value() {
        return new Props() {
            @Override
            public Set<Carta> cartas() {
                return cartas;
            }

            @Override
            public Integer cantidad() {
                return cantidad;
            }
        };
    }

    public Mazo nuevaCarta(Carta carta) {
        var cartas = new HashSet<>(this.cartas);
        cartas.add(carta);
        return new Mazo(cartas);
    }


    public Mazo retirarCarta(Carta cartaRetirada) {
        var cartaId =  cartaRetirada.value().cartaId().value();
        var nuevoMazo = this.cartas.stream()
                .filter(carta -> !cartaId.equals(carta.value().cartaId().value()))
                .collect(Collectors.toCollection(HashSet::new));
        return new Mazo(nuevoMazo);
    }

    public interface Props {

        Set<Carta> cartas();


        Integer cantidad();
    }
}
