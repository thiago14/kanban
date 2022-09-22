import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import BoardComponent from '../src/components/BoardComponent.vue';

test('Deve testar o board compoent', async function() {
    const board = new Board(1, 'Projeto 1');
    board.addColumn(1, 'Todo', true);
    board.addCard('Todo', 1, 'Atividade 1', 3);
    board.addCard('Todo', 2, 'Atividade 2', 2);
    board.addCard('Todo', 3, 'Atividade 3', 1);
    board.addCard('Todo', 4, 'Atividade 4', 2);
    const wrapper = mount(BoardComponent, {
        props: {
            board
        }
    });
    expect(wrapper.get('#estimative').text()).toBe('8');
});