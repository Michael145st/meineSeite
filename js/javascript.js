// Ждем, пока документ полностью загрузится
document.addEventListener('DOMContentLoaded', function () {
	// Получаем ссылку на главный элемент 'main'
	const main = document.querySelector('main')
	// Получаем все элементы с классом 'block'
	const blocks = document.querySelectorAll('.block')
	// Получаем все кнопки навигации
	const buttons = document.querySelectorAll('.btn-nav')
	// Получаем кнопку 'Show my skills'
	const skillsButton = document.querySelector('.skills')
	// Флаг для отслеживания прокрутки
	let isScrolling = false

	// Индекс текущего блока
	let currentBlockIndex = 0

	// Функция для обновления стилей кнопок навигации
	function updateButtons() {
		buttons.forEach((button, index) => {
			if (index === currentBlockIndex) {
				button.classList.add('selected')
			} else {
				button.classList.remove('selected')
			}
		})
	}

	// Функция для прокрутки к блоку с заданным индексом
	function scrollToBlock(index) {
		if (index >= 0 && index < blocks.length) {
			currentBlockIndex = index
			isScrolling = true
			// Прокручиваем к выбранному блоку с плавной анимацией
			blocks[currentBlockIndex].scrollIntoView({ behavior: 'smooth' })
			// Устанавливаем таймер для завершения прокрутки
			setTimeout(function () {
				isScrolling = false
			}, 1000)
			// Обновляем стили кнопок навигации
			updateButtons()
		}
	}

	// Добавляем обработчик прокрутки колеса мыши
	main.addEventListener('wheel', function (event) {
		event.preventDefault()
		if (!isScrolling) {
			if (event.deltaY > 0 && currentBlockIndex < blocks.length - 1) {
				scrollToBlock(currentBlockIndex + 1)
			} else if (event.deltaY < 0 && currentBlockIndex > 0) {
				scrollToBlock(currentBlockIndex - 1)
			}
		}
	})

	// Добавляем обработчики клика для кнопок навигации
	buttons.forEach((button, index) => {
		button.addEventListener('click', function () {
			scrollToBlock(index)
		})
	})

	// Инициализируем стили кнопок навигации
	updateButtons()

	// Получаем ссылку на контейнер с навыками
	const skillContainer = document.querySelector('.skill-container')
	// Флаг для отображения/скрытия контейнера с навыками
	let skillContainerVisible = false

	// Добавляем обработчик клика для кнопки 'Show my skills'
	skillsButton.addEventListener('click', function () {
		const currentBlock = blocks[currentBlockIndex]
		// Прокручиваем к текущему блоку для плавного отображения
		currentBlock.scrollIntoView({ behavior: 'smooth', block: 'end' })

		// Инвертируем состояние отображения контейнера с навыками
		skillContainerVisible = !skillContainerVisible
		skillContainer.style.display = skillContainerVisible ? 'flex' : 'none'

		// Обновляем текст кнопки в зависимости от состояния
		skillsButton.textContent = skillContainerVisible
			? 'Скрыть мои навыки'
			: 'Показать мои навыки'

		// Устанавливаем таймер для возврата к текущему блоку после скролла
		setTimeout(function () {
			scrollToBlock(currentBlockIndex)
		}, 500)
	})
})

// Ждем, пока документ полностью загрузится
document.addEventListener('DOMContentLoaded', function () {
	// Получаем ссылку на элемент ресайза
	const resizeHandle = document.getElementById('resizeHandle')
	// Получаем контейнер айфрейма
	const iframeContainer = document.querySelector('.iframe-container')
	// Получаем айфрейм
	const pageFrame = document.getElementById('pageFrame')
	// Получаем кнопку "info"
	const infoButton = document.querySelector('.info')

	// Устанавливаем минимальную и максимальную ширину айфрейма
	const minWidth = 350 // Минимальная ширина
	const maxWidth = 5000 // Максимальная ширина
	let isMinWidth = false // Флаг для отслеживания текущей ширины

	// Функция для установки минимальной ширины ай-фрейма
	function setMinWidth() {
		iframeContainer.style.width = minWidth + 'px'
		isMinWidth = true
	}

	// Функция для установки максимальной ширины ай-фрейма
	function setMaxWidth() {
		iframeContainer.style.width = maxWidth + 'px'
		isMinWidth = false
	}

	// Обработчик клика на кнопку "info"
	infoButton.addEventListener('click', () => {
		if (isMinWidth) {
			setMaxWidth()
		} else {
			setMinWidth()
		}
		infoButton.classList.toggle('mana')
	})

	let isResizing = false
	let startX = 0
	let startWidth = 0

	// Обработчик нажатия кнопки мыши для изменения размера
	resizeHandle.addEventListener('mousedown', e => {
		e.preventDefault()
		isResizing = true
		startX = e.clientX
		startWidth = iframeContainer.offsetWidth
	})

	// Обработчик перемещения мыши для изменения размера
	document.addEventListener('mousemove', e => {
		if (!isResizing) return

		const deltaX = e.clientX - startX
		let newWidth = startWidth + deltaX

		// Ограничиваем новую ширину в пределах минимальной и максимальной ширины
		if (newWidth < minWidth) newWidth = minWidth
		if (newWidth > maxWidth) newWidth = maxWidth

		iframeContainer.style.width = newWidth + 'px'
	})

	// Обработчик отпускания кнопки мыши
	document.addEventListener('mouseup', () => {
		if (isResizing) {
			isResizing = false
		}
	})

	// Добавляем глобальное событие mouseup на всё окно
	window.addEventListener('mouseup', () => {
		if (isResizing) {
			isResizing = false
		}
	})
})

// Ждем, пока документ полностью загрузится
document.addEventListener('DOMContentLoaded', function () {
	// Получаем ссылку на главный элемент 'main'
	const main = document.querySelector('main')
	// Получаем все элементы с классом 'block'
	const blocks = document.querySelectorAll('.block')
	// Получаем все кнопки навигации
	const buttons = document.querySelectorAll('.btn-nav')
	// Получаем кнопку 'Show my skills'
	const skillsButton = document.querySelector('.skills')
	// Получаем кнопки навигации для портфолио
	const portfolioNavButtons = document.querySelectorAll('.portfolio-nav')
	// Флаг для отслеживания прокрутки
	let isScrolling = false

	// Индекс текущего блока
	let currentBlockIndex = 0
	// Номер текущего проекта в портфолио
	let portfolioNumber = 1

	// Функция для обновления стилей кнопок навигации
	function updateButtons() {
		buttons.forEach((button, index) => {
			if (index === currentBlockIndex) {
				button.classList.add('selected')
			} else {
				button.classList.remove('selected')
			}
		})
	}

	// Функция для прокрутки к блоку с заданным индексом
	function scrollToBlock(index) {
		if (index >= 0 && index < blocks.length) {
			currentBlockIndex = index
			isScrolling = true
			// Прокручиваем к выбранному блоку с плавной анимацией
			blocks[currentBlockIndex].scrollIntoView({ behavior: 'smooth' })
			// Устанавливаем таймер для завершения прокрутки
			setTimeout(function () {
				isScrolling = false
			}, 1000)
			// Обновляем стили кнопок навигации
			updateButtons()
		}
	}

	// Добавляем обработчик прокрутки колеса мыши
	main.addEventListener('wheel', function (event) {
		event.preventDefault()
		if (!isScrolling) {
			if (event.deltaY > 0 && currentBlockIndex < blocks.length - 1) {
				scrollToBlock(currentBlockIndex + 1)
			} else if (event.deltaY < 0 && currentBlockIndex > 0) {
				scrollToBlock(currentBlockIndex - 1)
			}
		}
	})

	// Добавляем обработчики клика для кнопок навигации
	buttons.forEach((button, index) => {
		button.addEventListener('click', function () {
			scrollToBlock(index)
		})
	})

	// Инициализируем стили кнопок навигации
	updateButtons()

	// Получаем ссылку на контейнер с навыками
	const skillContainer = document.querySelector('.skill-container')
	// Флаг для отображения/скрытия контейнера с навыками
	let skillContainerVisible = false

	// Добавляем обработчик клика для кнопки 'Show my skills'
	skillsButton.addEventListener('click', function () {
		const currentBlock = blocks[currentBlockIndex]
		// Прокручиваем к текущему блоку для плавного отображения
		currentBlock.scrollIntoView({ behavior: 'smooth', block: 'end' })

		// Инвертируем состояние отображения контейнера с навыками
		skillContainerVisible = !skillContainerVisible
		skillContainer.style.display = skillContainerVisible ? 'flex' : 'none'

		// Обновляем текст кнопки в зависимости от состояния
		skillsButton.textContent = skillContainerVisible
			? 'HEIDE MY SKILLS'
			: 'SHOW MY SKILLS'

		// Устанавливаем таймер для возврата к текущему блоку после скролла
		setTimeout(function () {
			scrollToBlock(currentBlockIndex)
		}, 500)
	})

	// Добавляем слушатели событий для кнопок навигации портфолио
	portfolioNavButtons.forEach((navButton, index) => {
		navButton.addEventListener('click', function () {
			if (index === 0 && portfolioNumber > 1) {
				portfolioNumber--
			} else if (index === 1 && portfolioNumber < 3) {
				portfolioNumber++
			} else if (index === 0 && portfolioNumber === 1) {
				portfolioNumber = 3
			} else if (index === 1 && portfolioNumber === 3) {
				portfolioNumber = 1
			}

			// Получаем элемент с номером проекта и обновляем его значение
			const projectNumberElement = document.querySelector('.project-number')
			projectNumberElement.textContent = portfolioNumber

			// Обновляем данные и значение src айфрейма в зависимости от номера проекта
			updateProjectData(portfolioNumber)
		})
	})

	// Функция для обновления данных и src айфрейма на странице
	function updateProjectData(projectNumber) {
		// Получаем элемент с названием проекта
		const projectNameElement = document.querySelector('.project-name')
		// Получаем элемент с данными 1
		const raaaElement = document.querySelector('.raaa')
		// Получаем элемент с данными для daaa
		const daaaElement = document.querySelector('.daaa')
		// Получаем айфрейм
		const pageFrame = document.getElementById('pageFrame')

		if (projectNumber === 2) {
			// Обновляем данные для второго проекта
			projectNameElement.textContent = 'REST API'
			raaaElement.textContent = 'Данные 2'
			daaaElement.textContent = 'Данные для второго проекта (daaa)'
			// Устанавливаем src айфрейма для второго проекта
			pageFrame.src = 'https://musical-medovik-679a46.netlify.app/'
		} else if (projectNumber === 3) {
			// Обновляем данные для третьего проекта
			projectNameElement.textContent = 'Название третьего'
			raaaElement.textContent = 'Данные 3'
			daaaElement.textContent = 'Данные для третьего проекта (daaa)'
			// Устанавливаем src айфрейма для третьего проекта
			pageFrame.src =
				'https://64fb8b27a1bc445783aec0d5--whimsical-shortbread-7bde7b.netlify.app/'
		} else {
			// Обновляем данные для первого проекта
			projectNameElement.textContent = 'SCROLL EFFECT'
			raaaElement.textContent = 'Данные 1'
			daaaElement.textContent = 'Данные для первого проекта (daaa)'
			// Устанавливаем src айфрейма для первого проекта
			pageFrame.src =
				'https://64fb9eb000d9d56bac8e1297--gregarious-kelpie-fc92a3.netlify.app/'
		}
	}

	// Вызываем функцию с данными первого проекта при загрузке страницы
	updateProjectData(portfolioNumber)
})

// Ждем, пока документ полностью загрузится
document.addEventListener('DOMContentLoaded', function () {
	// Получаем ссылку на контейнер с айфреймом
	const iframe = document.getElementById('iframe-container')
	// Начальное значение процентного размера ширины айфрейма
	const initialWidthPercentage = 53

	// Вычисляем максимальную ширину айфрейма на основе ширины окна и процентного значения
	const maxWidth = window.innerWidth * (initialWidthPercentage / 100)
	// Устанавливаем ширину айфрейма
	iframe.style.width = maxWidth + 'px'
})
