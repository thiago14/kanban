import { mount } from '@vue/test-utils';
import Board from '../src/entities/Board';
import BoardView from '../src/views/BoardView.vue';
import BoardServiceInterface, { SaveBoardInput, SaveCardInput, SaveColumnInput, UpdateCardInput } from '../src/service/BoardServiceInterface';

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
            board.addColumn(1, 'Todo', true);
            board.addColumn(2, 'Doing', true);
            board.addColumn(3, 'Done', false);
            board.addCard('Todo', 1, 'Atividade 1', 3);
            board.addCard('Todo', 2, 'Atividade 2', 2);
            board.addCard('Todo', 3, 'Atividade 3', 1);
            return board;
        },
        async saveColumn(column: SaveColumnInput): Promise<number> {
            return new Promise((resolve) => {
                resolve(1);
            });
        },
        saveBoard: function (board: SaveBoardInput): Promise<number> {
            throw new Error('Function not implemented.');
        },
        deleteColumn: function (idBoard: number, idColumn: number): Promise<void> {
            throw new Error('Function not implemented.');
        },
        saveCard: function (card: SaveCardInput): Promise<number> {
            throw new Error('Function not implemented.');
        },
        deleteCard: function (idBoard: number, idColumn: number, idCard: number): Promise<void> {
            throw new Error('Function not implemented.');
        },
        updateCard: function (card: UpdateCardInput): Promise<void> {
            throw new Error('Function not implemented.');
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
