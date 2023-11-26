document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('badukCanvas');
    const context = canvas.getContext('2d');

    // 바둑 게임의 상태를 나타내는 객체
    const game = {
        stones: [],        // 돌의 배열
        isBlackTurn: true   // 현재 차례가 검은 돌인지 여부
    };

    // 전체 바둑판의 크기
    const boardSize = 19;
    // 각 교차점의 크기
    const gridSize = canvas.width / boardSize;

    // 초기 바둑판 그리기
    function drawBoard() {
        context.fillStyle = '#F0C878'; // (240, 200, 120) 배경
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#000000'; // 검은색 격자무늬
        context.lineWidth = 2;

        // 가로 선 그리기
        for (let i = 0; i < boardSize; ++i) {
            context.beginPath();
            context.moveTo(0, i * gridSize);
            context.lineTo(canvas.width, i * gridSize);
            context.stroke();
        }

        // 세로 선 그리기
        for (let i = 0; i < boardSize; ++i) {
            context.beginPath();
            context.moveTo(i * gridSize, 0);
            context.lineTo(i * gridSize, canvas.height);
            context.stroke();
        }
    }

    // 돌을 그리는 함수
    function drawStones(stones) {
        for (const stone of stones) {
            context.fillStyle = stone.isBlack ? '#000000' : '#FFFFFF';
            context.beginPath();
            context.arc(stone.x, stone.y, 15, 0, 2 * Math.PI);
            context.fill();
        }
    }

    // 마우스 클릭 이벤트를 처리하는 함수
    function handleMouseClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const roundedX = Math.round(x / gridSize) * gridSize;
        const roundedY = Math.round(y / gridSize) * gridSize;

        if (!isStoneAtPosition(roundedX, roundedY)) {
            const newStone = { x: roundedX, y: roundedY, isBlack: game.isBlackTurn };
            game.stones.push(newStone);
            game.isBlackTurn = !game.isBlackTurn;

            drawBoard();
            drawStones(game.stones);
        }
    }

    // 특정 위치에 돌이 있는지 확인하는 함수
    function isStoneAtPosition(x, y) {
        return game.stones.some(stone => stone.x === x && stone.y === y);
    }

    // 마우스 클릭 이벤트 리스너 등록
    canvas.addEventListener('click', handleMouseClick);

    // 초기 바둑판 그리기
    drawBoard();
});
