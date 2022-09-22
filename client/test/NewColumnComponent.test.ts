import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import DomainEvent from '../src/events/DomainEvent';
import NewColumnComponent from '../src/components/NewColumnComponent.vue';

test('Deve testar o new column component', async function() {
    const board = new Board(1, 'Projeto 1');
    board.addColumn(1,'Todo', true);
    board.addColumn(2,'Doing', true);
    board.addColumn(3,'Done', false);
    board.addCard('Todo', 1, 'Atividade 1', 3);
    board.addCard('Todo', 2, 'Atividade 2', 2);
    board.addCard('Todo', 3, 'Atividade 3', 1);
    const events: DomainEvent[] = [];
    board.on('addColumn', function(event: DomainEvent) {
        events.push(event);
    });
    const wrapper = mount(NewColumnComponent);
    await wrapper.get(".new-column-input").setValue("Todo");
    await wrapper.get(".new-column-add").trigger("click");
    setTimeout(() => {
        expect(board.columns).toHaveLength(4);
        expect(events).toHaveLength(1);
        const [event] = events;
        expect(event.name).toBe('addColumn');
        expect(event.data.name).toBe('Todo');
    }, 10);
});