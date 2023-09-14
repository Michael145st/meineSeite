document.addEventListener('DOMContentLoaded', function () {
	const main = document.querySelector('main')
	const blocks = document.querySelectorAll('.block')
	const buttons = document.querySelectorAll('.btn-nav')
	const skillsButton = document.querySelector('.skills')
	const portfolioNavButtons = document.querySelectorAll('.portfolio-nav')
	let isScrolling = false
	let currentBlockIndex = 0
	let portfolioNumber = 1

	function updateButtons() {
		buttons.forEach((button, index) => {
			if (index === currentBlockIndex) {
				button.classList.add('selected')
			} else {
				button.classList.remove('selected')
			}
		})
	}

	function scrollToBlock(index) {
		if (index >= 0 && index < blocks.length) {
			currentBlockIndex = index
			isScrolling = true
			blocks[currentBlockIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
			setTimeout(function () {
				isScrolling = false
			}, 1000)
			updateButtons()
		}
	}

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

	buttons.forEach((button, index) => {
		button.addEventListener('click', function () {
			scrollToBlock(index)
		})
	})

	updateButtons()

	const skillContainer = document.querySelector('.skill-container')
	let skillContainerVisible = false

	skillsButton.addEventListener('click', function () {
		const currentBlock = blocks[currentBlockIndex]
		currentBlock.scrollIntoView({ behavior: 'smooth', block: 'end' })
		skillContainerVisible = !skillContainerVisible
		skillContainer.style.display = skillContainerVisible ? 'flex' : 'none'
		skillsButton.textContent = skillContainerVisible
			? 'HIDE MY SKILLS'
			: 'SHOW MY SKILLS'
		skillsButton.classList.toggle('mana')
		setTimeout(function () {
			scrollToBlock(currentBlockIndex)
		}, 500)
	})

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
			const projectNumberElement = document.querySelector('.project-number')
			projectNumberElement.textContent = portfolioNumber
			updateProjectData(portfolioNumber)
		})
	})

	function updateProjectData(projectNumber) {
		const projectNameElement = document.querySelector('.project-name')
		const raaaElement = document.querySelector('.raaa')
		const daaaElement = document.querySelector('.daaa')
		const pageFrame = document.getElementById('pageFrame')

		if (projectNumber === 2) {
			projectNameElement.textContent = 'REST API'
			raaaElement.textContent = 'Данные 2'
			daaaElement.textContent = 'Данные для второго проекта (daaa)'
			pageFrame.src = 'https://musical-medovik-679a46.netlify.app/'
		} else if (projectNumber === 3) {
			projectNameElement.textContent = 'Название третьего'
			raaaElement.textContent = 'Данные 3'
			daaaElement.textContent = 'Данные для третьего проекта (daaa)'
			pageFrame.src =
				'https://64fb8b27a1bc445783aec0d5--whimsical-shortbread-7bde7b.netlify.app/'
		} else {
			projectNameElement.textContent = 'SCROLL EFFECT'
			raaaElement.textContent = 'Данные 1'
			daaaElement.textContent = 'Данные для первого проекта (daaa)'
			pageFrame.src =
				'https://64fb9eb000d9d56bac8e1297--gregarious-kelpie-fc92a3.netlify.app/'
		}
	}

	updateProjectData(portfolioNumber)

	const activeButtonIndex = localStorage.getItem('activeButtonIndex')
	if (activeButtonIndex !== null) {
		scrollToBlock(Number(activeButtonIndex))
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const resizeHandle = document.getElementById('resizeHandle')
	const iframeContainer = document.querySelector('.iframe-container')
	const pageFrame = document.getElementById('pageFrame')
	const infoButton = document.querySelector('.info')
	const minWidth = 350
	const maxWidth = 5000
	let isMinWidth = false

	function setMinWidth() {
		iframeContainer.style.width = minWidth + 'px'
		isMinWidth = true
	}

	function setMaxWidth() {
		iframeContainer.style.width = maxWidth + 'px'
		isMinWidth = false
	}

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

	resizeHandle.addEventListener('mousedown', e => {
		e.preventDefault()
		isResizing = true
		startX = e.clientX
		startWidth = iframeContainer.offsetWidth
	})

	document.addEventListener('mousemove', e => {
		if (!isResizing) return
		const deltaX = e.clientX - startX
		let newWidth = startWidth + deltaX
		if (newWidth < minWidth) newWidth = minWidth
		if (newWidth > maxWidth) newWidth = maxWidth
		iframeContainer.style.width = newWidth + 'px'
	})

	document.addEventListener('mouseup', () => {
		if (isResizing) {
			isResizing = false
		}
	})

	window.addEventListener('mouseup', () => {
		if (isResizing) {
			isResizing = false
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const portfolioContainers = document.querySelectorAll('.block.b2')
	const portfolioNavButtons = document.querySelectorAll('.portfolio-nav')
	let currentProjectIndex = 0

	function updateProjectVisibility() {
		portfolioContainers.forEach((container, index) => {
			if (index === currentProjectIndex) {
				container.classList.remove('hidden')
			} else {
				container.classList.add('hidden')
			}
		})
	}

	portfolioNavButtons.forEach((navButton, index) => {
		navButton.addEventListener('click', function () {
			if (index === 0) {
				currentProjectIndex--
				if (currentProjectIndex < 0) {
					currentProjectIndex = portfolioContainers.length - 1
				}
			} else if (index === 1) {
				currentProjectIndex++
				if (currentProjectIndex >= portfolioContainers.length) {
					currentProjectIndex = 0
				}
			}
			updateProjectVisibility()
			updateProjectData(currentProjectIndex)
		})
	})

	updateProjectVisibility()
})

document.addEventListener('DOMContentLoaded', function () {
	const promoContainers = document.querySelectorAll('.promo-container')
	const projectNumberElement = document.querySelector('.project-number')

	function updateProjectAndVisibility(projectNumber) {
		projectNumberElement.textContent = projectNumber
		const hiddenElements = document.querySelectorAll('.hide')
		hiddenElements.forEach(element => {
			element.classList.remove('hide')
		})

		promoContainers.forEach(container => {
			container.classList.add('hide')
		})

		updateProjectData(projectNumber)
	}

	const scrollPromo = document.querySelector('#scroll')
	scrollPromo.addEventListener('click', function () {
		updateProjectAndVisibility(1)
		promoContainers.forEach(container => {
			container.classList.add('hide')
		})
	})

	const restApiPromo = document.querySelector('#rest')
	restApiPromo.addEventListener('click', function () {
		updateProjectAndVisibility(2)
		promoContainers.forEach(container => {
			container.classList.add('hide')
		})
	})

	const etwasNochPromo = document.querySelector('#noch')
	etwasNochPromo.addEventListener('click', function () {
		updateProjectAndVisibility(3)
		promoContainers.forEach(container => {
			container.classList.add('hide')
		})
	})

	function updateProjectData(projectNumber) {
		const projectNameElement = document.querySelector('.project-name')
		const raaaElement = document.querySelector('.raaa')
		const daaaElement = document.querySelector('.daaa')
		const pageFrame = document.getElementById('pageFrame')

		if (projectNumber === 2) {
			projectNameElement.textContent = 'REST API'
			raaaElement.textContent = 'Данные 2'
			daaaElement.textContent = 'Данные для второго проекта (daaa)'
			pageFrame.src = 'https://musical-medovik-679a46.netlify.app/'
		} else if (projectNumber === 3) {
			projectNameElement.textContent = 'Название третьего'
			raaaElement.textContent = 'Данные 3'
			daaaElement.textContent = 'Данные для третьего проекта (daaa)'
			pageFrame.src =
				'https://64fb8b27a1bc445783aec0d5--whimsical-shortbread-7bde7b.netlify.app/'
		} else {
			projectNameElement.textContent = 'SCROLL EFFECT'
			raaaElement.textContent = 'Данные 1'
			daaaElement.textContent = 'Данные для первого проекта (daaa)'
			pageFrame.src =
				'https://64fb9eb000d9d56bac8e1297--gregarious-kelpie-fc92a3.netlify.app/'
		}
	}
})
document.addEventListener('DOMContentLoaded', function () {
	const promoContainers = document.querySelectorAll('.promo-container')
	const projectNumberElement = document.querySelector('.project-number')

	function hideAllPromoContainers() {
		promoContainers.forEach(container => {
			container.classList.add('hide')
		})
	}

	function updateProjectAndVisibility(projectNumber) {
		projectNumberElement.textContent = projectNumber
		hideAllPromoContainers()
		updateProjectData(projectNumber)
	}

	const scrollPromo = document.querySelector('#scroll')
	scrollPromo.addEventListener('click', function () {
		updateProjectAndVisibility(1)
	})

	const restApiPromo = document.querySelector('#rest')
	restApiPromo.addEventListener('click', function () {
		updateProjectAndVisibility(2)
	})

	const etwasNochPromo = document.querySelector('#noch')
	etwasNochPromo.addEventListener('click', function () {
		updateProjectAndVisibility(3)
	})

	function updateProjectData(projectNumber) {
		const projectNameElement = document.querySelector('.project-name')
		const raaaElement = document.querySelector('.raaa')
		const daaaElement = document.querySelector('.daaa')
		const pageFrame = document.getElementById('pageFrame')

		if (projectNumber === 2) {
			projectNameElement.textContent = 'REST API'
			raaaElement.textContent = 'Данные 2'
			daaaElement.textContent = 'Данные для второго проекта (daaa)'
			pageFrame.src = 'https://musical-medovik-679a46.netlify.app/'
		} else if (projectNumber === 3) {
			projectNameElement.textContent = 'Название третьего'
			raaaElement.textContent = 'Данные 3'
			daaaElement.textContent = 'Данные для третьего проекта (daaa)'
			pageFrame.src =
				'https://64fb8b27a1bc445783aec0d5--whimsical-shortbread-7bde7b.netlify.app/'
		} else {
			projectNameElement.textContent = 'SCROLL EFFECT'
			raaaElement.textContent = 'Данные 1'
			daaaElement.textContent = 'Данные для первого проекта (daaa)'
			pageFrame.src =
				'https://64fb9eb000d9d56bac8e1297--gregarious-kelpie-fc92a3.netlify.app/'
		}
	}
})
document.addEventListener('DOMContentLoaded', function () {
	const promoContainers = document.querySelectorAll('.promo-container')
	const container = document.querySelector('.container')
	const projectNumberElement = document.querySelector('.project-number')

	function hideAllPromoContainers() {
		promoContainers.forEach(container => {
			container.classList.add('hide')
		})
	}

	function updateProjectAndVisibility(projectNumber) {
		projectNumberElement.textContent = projectNumber
		hideAllPromoContainers()
		updateProjectData(projectNumber)
	}

	const scrollPromo = document.querySelector('#scroll')
	scrollPromo.addEventListener('click', function () {
		updateProjectAndVisibility(1)
	})

	const restApiPromo = document.querySelector('#rest')
	restApiPromo.addEventListener('click', function () {
		updateProjectAndVisibility(2)
	})

	const etwasNochPromo = document.querySelector('#noch')
	etwasNochPromo.addEventListener('click', function () {
		updateProjectAndVisibility(3)
	})

	function updateProjectData(projectNumber) {
		const projectNameElement = document.querySelector('.project-name')
		const raaaElement = document.querySelector('.raaa')
		const daaaElement = document.querySelector('.daaa')
		const pageFrame = document.getElementById('pageFrame')

		if (projectNumber === 2) {
			projectNameElement.textContent = 'REST API'
			raaaElement.textContent = 'Данные 2'
			daaaElement.textContent = 'Данные для второго проекта (daaa)'
			pageFrame.src = 'https://musical-medovik-679a46.netlify.app/'
		} else if (projectNumber === 3) {
			projectNameElement.textContent = 'Название третьего'
			raaaElement.textContent = 'Данные 3'
			daaaElement.textContent = 'Данные для третьего проекта (daaa)'
			pageFrame.src =
				'https://64fb8b27a1bc445783aec0d5--whimsical-shortbread-7bde7b.netlify.app/'
		} else {
			projectNameElement.textContent = 'SCROLL EFFECT'
			raaaElement.textContent = 'Данные 1'
			daaaElement.textContent = 'Данные для первого проекта (daaa)'
			pageFrame.src =
				'https://64fb9eb000d9d56bac8e1297--gregarious-kelpie-fc92a3.netlify.app/'
		}

		// Добавляем проверку видимости .container и скрываем .promo-container, если .container виден
		const containerStyles = window.getComputedStyle(container)
		if (containerStyles.getPropertyValue('display') !== 'none') {
			hideAllPromoContainers()
		}
	}
})

// Получаем ссылку на элемент с классом "promo-container"
var promoContainer = document.querySelector('.promo-container')

// Добавляем обработчик клика на элемент "promoContainer"
promoContainer.addEventListener('click', function () {
	// Добавляем класс "hide" для скрытия элемента
	promoContainer.style.display = 'none'
})

  const thumbnails = document.querySelectorAll('.thumbnail')
	const pdfModal = document.querySelector('#pdfModal')
	const closeButton = document.querySelector('#closeButton')
	const pdfIframe = document.querySelector('#pdfIframe')

	thumbnails.forEach(thumbnail => {
		thumbnail.addEventListener('click', () => {
			const pdfPath = thumbnail.getAttribute('data-pdf')
			pdfIframe.src = pdfPath
			pdfModal.style.display = 'flex'
		})
	})

	closeButton.addEventListener('click', () => {
		pdfIframe.src = ''
		pdfModal.style.display = 'none'
	})

	window.addEventListener('click', event => {
		if (event.target === pdfModal) {
			pdfIframe.src = ''
			pdfModal.style.display = 'none'
		}
	})