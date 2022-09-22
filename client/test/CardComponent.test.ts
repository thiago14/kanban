import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import CardComponent from '../src/components/CardComponent.vue';

test('Deve testar o column compoent', async function() {
    const board = new Board(1, 'Projeto 1');
    board.addColumn(1,'Todo', true);
    board.addCard('Todo', 1, 'Atividade 1', 3);
    board.addCard('Todo', 2, 'Atividade 2', 2);
    board.addCard('Todo', 3, 'Atividade 3', 1);
    const [column] = board.columns;
    const [card] = column.cards;
    const wrapper = mount(CardComponent, {
        props: {
            board,
            column,
            card
        }
    });
	expect(wrapper.get(".card-estimative").text()).toBe("3");
	await wrapper.get(".btn-add").trigger("click");
	await wrapper.get(".btn-add").trigger("click");
	await wrapper.get(".btn-add").trigger("click");
	expect(wrapper.get(".card-estimative").text()).toBe("6");
});