document.addEventListener('DOMContentLoaded', function () {
	const main = document.querySelector('main')
	const blocks = document.querySelectorAll('.block')
	const buttons = document.querySelectorAll('.btn-nav')

	let currentBlockIndex = 0

	// Функция для обновления классов кнопок
	function updateButtons() {
		buttons.forEach((button, index) => {
			if (index === currentBlockIndex) {
				button.classList.add('selected')
			} else {
				button.classList.remove('selected')
			}
		})
	}

	// Функция для прокрутки к выбранному блоку
	function scrollToBlock(index) {
		currentBlockIndex = index
		blocks[currentBlockIndex].scrollIntoView({ behavior: 'smooth' })
		updateButtons()
	}

	// Обработчик события прокрутки
	main.addEventListener('wheel', function (event) {
		event.preventDefault() // Отменить стандартное поведение прокрутки

		if (event.deltaY > 0) {
			// Прокрутка вниз
			currentBlockIndex++
		} else {
			// Прокрутка вверх
			currentBlockIndex--
		}

		// Ограничьте индекс блока в пределах доступных блоков
		currentBlockIndex = Math.min(
			Math.max(currentBlockIndex, 0),
			blocks.length - 1
		)

		// Прокрутите к выбранному блоку
		scrollToBlock(currentBlockIndex)
	})

	// Добавьте обработчики событий для каждой кнопки
	buttons.forEach((button, index) => {
		button.addEventListener('click', function () {
			scrollToBlock(index)
		})
	})

	// Инициализация классов кнопок
	updateButtons()
})
