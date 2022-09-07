package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.IniciarRondaCommand;
import org.example.cardgame.events.RondaCreada;
import org.example.cardgame.events.RondaIniciada;
import org.example.cardgame.events.TableroCreado;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.Ronda;
import org.example.cardgame.values.TableroId;
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
class IniciarRondaUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private IniciarRondaUseCase useCase;

    @Test
    void iniciarRondaTest(){
        var command = new IniciarRondaCommand();
        command.setJuegoId("AAA");

        when(repository.obtenerEventosPor("AAA")).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches( domainEvent -> {
                    var event = (RondaIniciada) domainEvent;
                    return "AAA".equals(event.aggregateRootId());
                }).expectComplete()
                .verify();
    }

    private Flux<DomainEvent> history() {
        return Flux.just(
                new TableroCreado( TableroId.of("111"),
                        Set.of(JugadorId.of("333"),JugadorId.of("222"))
                ),
                new RondaCreada(
                        new Ronda(1,
                                Set.of(JugadorId.of("222"),
                                        JugadorId.of("123"))),30)
                );

    }
}