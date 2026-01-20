const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const clearBtn = document.getElementById('clear-btn')

function showError(message) {
    const errorDiv = document.getElementById('error-message')
    errorDiv.textContent = message;
    errorDiv.classList.add('show')
    setTimeout(function () {
        errorDiv.classList.remove('show');
    }, 3000);

}

searchBtn.addEventListener('click', async function () {
    const pokemonName = searchInput.value;

    if (!pokemonName) {
        showError("ใส่ชื่อ Pokemon ก่อนสิ")
        return
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = await response.json();

        const container = document.getElementById("pokemon-container")

        const card = document.createElement('div')
        card.className = 'pokemon-card'

        const img = document.createElement('img')
        img.src = pokemon.sprites.front_default
        img.alt = `${pokemon.name}Img`

        const name = document.createElement('h2')
        name.textContent = `ชื่อ: ${pokemon.name}`

        const type = document.createElement('span')
        type.className = `type ${pokemon.types[0].type.name}`
        type.textContent = `ธาตุ: ${pokemon.types[0].type.name}`
        card.append(img, name, type)

        if (pokemon.types.length > 1) {
            const type2 = document.createElement('span')
            type2.className = `type ${pokemon.types[1].type.name}`
            type2.textContent = `ธาตุ: ${pokemon.types[1].type.name}`
            card.appendChild(type2)
        }

        const hp = document.createElement('p')
        hp.textContent = `HP: ${pokemon.stats[0].base_stat}`

        const attack = document.createElement('p')
        attack.textContent = `Attack: ${pokemon.stats[1].base_stat}`

        const defense = document.createElement('p')
        defense.textContent = `Defense: ${pokemon.stats[2].base_stat}`

        const specialAttack = document.createElement('p')
        specialAttack.textContent = `Special Attack: ${pokemon.stats[3].base_stat}`

        const speed = document.createElement('p')
        speed.textContent = `Speed: ${pokemon.stats[4].base_stat}`

        const statsDiv = document.createElement('div')
        statsDiv.className = 'stats'
        statsDiv.append(hp, attack, defense, specialAttack, speed)

        card.appendChild(statsDiv)
        container.appendChild(card)
        searchInput.value = ''

    } catch (error) {
        showError(`ไม่มี ${pokemonName} ครับ`)
        searchInput.value = ''
        console.log(error)
    }
})

clearBtn.addEventListener('click', function () {
    const container = document.getElementById('pokemon-container')
    container.textContent = ''
})

searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBtn.click()
    }
})

// loadTeam()
