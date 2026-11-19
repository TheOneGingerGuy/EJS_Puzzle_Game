const board = document.querySelector('.ladder-board')
const input = document.querySelector('.ladder input[name="answer"]')

if (board && input) {
    const start = board.dataset.start
    const goal = board.dataset.goal
    const rows = [...board.querySelectorAll('.ladder-row.step')]

    const fill = () => {
        let words = input.value.toLowerCase().split(/[\s,]+/).filter(Boolean)
        if (words[0] === start) words = words.slice(1)
        if (words[words.length - 1] === goal) words = words.slice(0, -1)

        rows.forEach((row, r) => {
            [...row.children].forEach((tile, i) => {
                tile.textContent = (words[r] || '')[i] || ''
            })
        })
    }

    input.addEventListener('input', fill)
}