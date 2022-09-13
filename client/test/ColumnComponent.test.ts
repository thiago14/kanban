import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import ColumnComponent from '../src/components/ColumnComponent.vue';

test('Deve testar o column compoent', async function() {
    const board = new Board(1, 'Projeto 1');
    board.addColumn('Todo', true);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);
    const [column] = board.columns;
    const wrapper = mount(ColumnComponent, {
        props: {
            board,
            column
        }
    });
    expect(wrapper.get('.column-estimative').text()).toBe('6');
});