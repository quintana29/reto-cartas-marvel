package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.IniciarJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Ronda;
import org.example.cardgame.domain.values.TableroId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarJuegoUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private IniciarJuegoUseCase useCase;

    @Test
    void iniciarJuego(){
        var command = new IniciarJuegoCommand();
        command.setJuegoId("QQQ");

        when(repository.obtenerEventosPor("QQQ")).thenReturn(crearJuego());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (TableroCreado) domainEvent;
                    return event.aggregateRootId().equals("QQQ");
                }).expectNextMatches(domainEvent -> {
                    var event2 = (RondaCreada) domainEvent;
                    return event2.aggregateRootId().equals("QQQ");
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> crearJuego() {
        var event = new JuegoCreado(JugadorId.of("QQQ"));
        event.setAggregateRootId("QQQ");

        return Flux.just(event);
    }
}