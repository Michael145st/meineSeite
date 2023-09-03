document.addEventListener('DOMContentLoaded', function () {
	const main = document.querySelector('main')
	const blocks = document.querySelectorAll('.block')
	const buttons = document.querySelectorAll('.btn-nav')

	let currentBlockIndex = 0
	let startY = 0
	let endY = 0
	let touchStartY = 0
	let touchEndY = 0
	const minSwipeDistance = 50 // Увеличенное значение для более чувствительных свайпов

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
			if (currentBlockIndex < blocks.length - 1) {
				currentBlockIndex++
			}
		} else {
			// Прокрутка вверх
			if (currentBlockIndex > 0) {
				currentBlockIndex--
			}
		}

		// Прокрутите к выбранному блоку
		scrollToBlock(currentBlockIndex)
	})

	// Обработчик события начала сенсорного взаимодействия (touchstart)
	main.addEventListener('touchstart', function (event) {
		touchStartY = event.touches[0].clientY
	})

	// Обработчик события окончания сенсорного взаимодействия (touchend)
	main.addEventListener('touchend', function (event) {
		touchEndY = event.changedTouches[0].clientY
		const swipeDistance = touchStartY - touchEndY

		if (swipeDistance > minSwipeDistance && currentBlockIndex > 0) {
			// Свайп вверх
			currentBlockIndex--
			scrollToBlock(currentBlockIndex)
		} else if (
			swipeDistance < -minSwipeDistance &&
			currentBlockIndex < blocks.length - 1
		) {
			// Свайп вниз
			currentBlockIndex++
			scrollToBlock(currentBlockIndex)
		}
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
