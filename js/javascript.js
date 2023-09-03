document.addEventListener('DOMContentLoaded', function () {
	const main = document.querySelector('main')
	const blocks = document.querySelectorAll('.block')
	const buttons = document.querySelectorAll('.btn-nav')

	let currentBlockIndex = 0
	let isScrolling = false
	let startY = 0

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

		if (!isScrolling) {
			isScrolling = true

			setTimeout(function () {
				isScrolling = false
			}, 1000) // Задержка между прокрутками

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
		}
	})

	// Обработчик события начала сенсорного взаимодействия (touchstart)
	main.addEventListener('touchstart', function (event) {
		startY = event.touches[0].clientY
	})

	// Обработчик события окончания сенсорного взаимодействия (touchend)
	main.addEventListener('touchend', function (event) {
		const endY = event.changedTouches[0].clientY
		const deltaY = endY - startY

		if (!isScrolling) {
			isScrolling = true

			setTimeout(function () {
				isScrolling = false
			}, 1000) // Задержка между прокрутками

			const blockHeight = blocks[currentBlockIndex].offsetHeight
			const screenHeight = window.innerHeight

			if (deltaY > 0 && currentBlockIndex > 0) {
				// Прокрутка вверх
				const scrollDistance = Math.min(screenHeight, blockHeight)
				window.scrollBy(0, -scrollDistance)
			} else if (deltaY < 0 && currentBlockIndex < blocks.length - 1) {
				// Прокрутка вниз
				const scrollDistance = Math.min(screenHeight, blockHeight)
				window.scrollBy(0, scrollDistance)
			}
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