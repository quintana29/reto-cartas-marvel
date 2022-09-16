package org.example.cardgame.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.values.Ronda;

/**
 * The type Ronda creada.
 */
public class RondaCreada extends DomainEvent {
    private final Ronda ronda;
    private final Integer tiempo;
    private final String jugadorRandon;


    /**
     * Instantiates a new Ronda creada.
     *
     * @param ronda  the ronda
     * @param tiempo the tiempo
     */
    public RondaCreada(Ronda ronda, Integer tiempo,String jugadorRandon) {
        super("cardgame.rondacreada");
        this.ronda = ronda;
        this.tiempo = tiempo;
        this.jugadorRandon = jugadorRandon;
    }

    /**
     * Gets ronda.
     *
     * @return the ronda
     */
    public Ronda getRonda() {
        return ronda;
    }

    /**
     * Gets tiempo.
     *
     * @return the tiempo
     */
    public Integer getTiempo() {
        return tiempo;
    }
    public String getJugadorRandon() {
        return jugadorRandon;
    }


}
