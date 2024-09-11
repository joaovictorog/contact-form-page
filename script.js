const camposDeEscrita = document.querySelectorAll('.campo__escrita')
const formulario = document.querySelector('[data-formulario]')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "sobrenome": e.target.elements["sobrenome"].value,
        "email": e.target.elements["email"].value,
        "mensagem": e.target.elements["mensagem"].value
    }

    localStorage.setItem('contact', JSON.stringify(listaRespostas))
})

camposDeEscrita.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo))
    campo.addEventListener('invalid', evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort'
]

const mensagens = {
    nome: {
        valueMissing: "This field is required",
        patternMismatch: "Please, fill in a valid name",
        tooShort: "Please, fill in a valid name"
    },
    sobrenome: {
        valueMissing: "This field is required",
        patternMismatch: "Please, fill in a valid last name",
        tooShort: "Please, fill in a valid last name"
    },
    email: {
        valueMissing: "Please enter a valid email address",
        typeMismatch: "Please enter a valid email address",
        tooShort: "Please enter a valid email address"
    },
    selecao: {
        valueMissing: "Please select a query type",
    },
    mensagem: {
        valueMissing: "This field is required",
        tooShort: "Too short message"
    },
    contato: {
        valueMissing: 'To submit this form, please consent to being contacted',
    }
}

function verificaCampo(campo) {
    let mensagemDefinida = ''
    campo.setCustomValidity('')
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagemDefinida = mensagens[campo.name][erro]
            console.log(mensagemDefinida)
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
    const validadorDeInput = campo.checkValidity()

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagemDefinida
    }
    else {
        mensagemErro.textContent = ''
    }
}