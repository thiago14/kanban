import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import BoardView from '../src/views/BoardView.vue';
import BoardServiceInterface, { SaveColumnInput } from '../src/service/BoardServiceInterface';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    })
}

test('Deve testar o board view', async function() {
    const boardService: BoardServiceInterface = {
        async getBoard(idBoard: number) {
            const board = new Board(1, 'Project 1');
            board.addColumn('Todo', true);
            board.addColumn('Doing', true);
            board.addColumn('Done', false);
            board.addCard('Todo', 'Atividade 1', 3)
            board.addCard('Todo', 'Atividade 2', 2)
            board.addCard('Todo', 'Atividade 3', 1)
            return board;
        },
        async saveColumn(column: SaveColumnInput): Promise<number> {
            return new Promise((resolve) => {
                resolve(1);
            });
        }
    }
    const wrapper = mount(BoardView, {
        global: {
            provide: {
                boardService
            }
        }
    });
    await sleep(10);
    expect(wrapper.get('#estimative').text()).toBe('6');
});
