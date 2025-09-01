// planoB.js

import * as nameModifier from './nameModifier.js';
import * as addressGenerator from './addressGenerator.js';

// --- Plano-B State & Data ---

const MIGUXOS_KEY = 'planoB_miguxos';
const CEPS_KEY = 'planoB_cepsCoqueiral';

let miguxosList = [];
let cepsList = [];

// Default data is used if localStorage is empty.
const defaultMiguxos = [
    { name: "Natalye Ribeiro Pereira", number: "12216248738" },
    { name: "Catia Marques Timoteo", number: "07861686760" },
    { name: "Conceicao Marques", number: "58828176768" },
    { name: "Thais Marques de Souza", number: "15784837788" },
    { name: "Marcelo Mendes de Almeida", number: "03365076743" },
    { name: "Ibero Farias de Souza", number: "59288701753" },
    { name: "Michel Gomes Ferreira", number: "18220186763" },
    { name: "Henrique Dorna Castelo Branco", number: "14355291707" },
    { name: "Daniela Cristina Rocha de Freitas", number: "44779420873" },
    { name: "Hekyra Fernandes Ribeiro", number: "00787964743" },
    { name: "Rodrigo Mendes Alves Pontes", number: "12303294711" },
    { name: "Gustavo Fernandes Bandeira", number: "11225536766" },
    { name: "Claudio Cesar Silva Gomes", number: "18791955777" },
    { name: "Vanessa Barroso Barreto", number: "12298517711" },
    { name: "Marcia Fernandes Ribeiro Bandeira", number: "03096369739 (tia Marcia Naty)" },
    { name: "Josimar Lino Bandeira", number: "70516189700" },
    { name: "Kamila Ribeiro Rezende", number: "12695832710" },
    { name: "Maria Ferndandes Ribeiro", number: "03492005721 (bitoca)" },
    { name: "Weber Ribeiro Rezende", number: "10496290789" },
    { name: "Ari da Bella", number: "98511416749" },
    { name: "Matheus Santana da Silva", number: "18731641733" },
    { name: "Thiago de Castro Santos", number: "14917349737" },
    { name: "Patrick da Silva Delestorte Pereira", number: "19421462726" },
    { name: "Marcia Valeria da Costa Pereira", number: "94001090759 (tia Marcia Gabi)" },
    { name: "Kaio Henrique de Brito Moura", number: "15010055708" },
    { name: "Bernardo Luis Ferreira Pires", number: "13174796709 (thais)" },
];

const defaultCeps = [
    { cep: "23894326", logradouro: "Rua Maricá" },
    { cep: "23894322", logradouro: "Rua José Mendonça" },
    { cep: "23894314", logradouro: "Rua Imbarie" },
    { cep: "23894318", logradouro: "Rua Nilópolis" },
    { cep: "23894274", logradouro: "Rua Barra do Piraí" },
    { cep: "23894282", logradouro: "Rua Cabo Frio" },
    { cep: "23894170", logradouro: "Avenida Bento Rodrigues Noia" },
    { cep: "23894270", logradouro: "Rua Setenta e Sete" },
    { cep: "23894258", logradouro: "Rua Oitenta" },
    { cep: "23894254", logradouro: "Rua Oitenta e Um" },
    { cep: "23894234", logradouro: "Rua Oitenta e Dois" },
    { cep: "23894246", logradouro: "Rua Oitenta e Quatro" },
    { cep: "23894174", logradouro: "Rua Pica-Pau" },
    { cep: "23894242", logradouro: "Rua Oitenta e Três" }
];


// --- Helper Functions ---
function loadPlanoBState() {
    try {
        const storedCeps = localStorage.getItem(CEPS_KEY);
        cepsList = storedCeps ? JSON.parse(storedCeps) : [...defaultCeps];

        // Migration logic to remove hyphens from existing CEPs in localStorage
        let cepsDataWasMigrated = false;
        if (cepsList && cepsList.length > 0) {
            cepsList.forEach(item => {
                if (item && item.cep && item.cep.includes('-')) {
                    item.cep = item.cep.replace(/-/g, '');
                    cepsDataWasMigrated = true;
                }
            });
        }
        
        // If we changed any CEP, save it back to localStorage
        if (cepsDataWasMigrated) {
            console.log("Migrating CEP data: removed hyphens.");
            savePlanoBState();
        }

        const storedMiguxos = localStorage.getItem(MIGUXOS_KEY);
        miguxosList = storedMiguxos ? JSON.parse(storedMiguxos) : [...defaultMiguxos];
    } catch (e) {
        console.error("Failed to load Plano-B state, using defaults.", e);
        cepsList = [...defaultCeps];
        miguxosList = [...defaultMiguxos];
    }
}

function savePlanoBState() {
    try {
        localStorage.setItem(CEPS_KEY, JSON.stringify(cepsList));
        localStorage.setItem(MIGUXOS_KEY, JSON.stringify(miguxosList));
    } catch (e) {
        console.error("Failed to save Plano-B state.", e);
    }
}

function checkPassword() {
    const pass = prompt("Para esta ação, por favor, digite a senha:");
    if (pass === '019026') return true;
    if (pass !== null) alert("Senha incorreta.");
    return false;
}

function hideContextMenu() {
    const existingMenu = document.getElementById('plano-b-context-menu');
    if (existingMenu) existingMenu.remove();
    document.removeEventListener('click', hideContextMenu);
};

function showContextMenu(e, type, index) {
    e.preventDefault();
    hideContextMenu(); // Hide any previous menu

    const menu = document.createElement('div');
    menu.id = 'plano-b-context-menu';
    menu.className = 'context-menu'; // Reuse existing style
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;

    menu.innerHTML = `
        <div class="context-menu-item" onclick="planoB.handleAction('edit', '${type}', ${index})">Editar</div>
        <div class="context-menu-item delete" onclick="planoB.handleAction('delete', '${type}', ${index})">Excluir</div>
    `;

    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener('click', hideContextMenu), 0);
}

function renderOutput(title, list, itemRenderer, addHandler) {
    const outputDiv = document.getElementById('plano-b-output');
    if (!outputDiv) return;

    outputDiv.innerHTML = ''; // Clear previous content

    if (!list || list.length === 0) {
        outputDiv.innerHTML = `<p>Nenhum item para exibir em ${title}.</p>`;
    } else {
        list.forEach((item, index) => {
            const itemDiv = itemRenderer(item, index);
            outputDiv.appendChild(itemDiv);
        });
    }

    // Add the "Add New" button
    const addContainer = document.createElement('div');
    addContainer.className = 'plano-b-add-item-container';

    const addBall = document.createElement('div');
    addBall.className = 'ball add-ball';
    addBall.textContent = '+';
    addBall.title = `Adicionar novo item em ${title}`;
    addBall.onclick = addHandler;

    addContainer.appendChild(addBall);
    outputDiv.appendChild(addContainer);
}


// --- CEPs Logic ---
function renderCepItem(item, index) {
    const variationDiv = document.createElement('div');
    variationDiv.className = 'variation'; // Reuse existing style
    variationDiv.addEventListener('contextmenu', (e) => showContextMenu(e, 'cep', index));

    let displayText = `${index + 1}) CEP: ${item.cep} - ${item.logradouro}`;
    if (item.bairro) {
        displayText += `, ${item.bairro}`;
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = displayText;

    const copyButton = document.createElement('button');
    copyButton.className = 'emoji-copy-btn';
    copyButton.textContent = '🐶';
    copyButton.title = 'Copiar';

    copyButton.onclick = async () => {
        const baseAddressForVariation = "Rua Tacaratu Marques";
        const addressNumber = "6";
        const baseComplementForVariation = "WPP-21996690605 CEP:23894-330 MarcosJeanJr";

        const addressPrefix = addressGenerator.getRandomPrefix();
        const modifiedAddressPart = addressGenerator.modifyWord(baseAddressForVariation);
        const generatedAddressLine = `${addressPrefix} ${modifiedAddressPart}`;
        const modifiedComplement = nameModifier.createSingleComplementVariation(baseComplementForVariation);

        const textToCopy = [
            item.logradouro, `CEP: ${item.cep}`, `Endereço: ${generatedAddressLine}`,
            `Nú: ${addressNumber}`, `Complemento: ${modifiedComplement}`
        ].join('\n');

        const originalEmoji = '🐶';
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyButton.textContent = '✅';
            setTimeout(() => { copyButton.textContent = originalEmoji; }, 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
            copyButton.textContent = '❌';
            setTimeout(() => { copyButton.textContent = originalEmoji; }, 1500);
        }
    };

    variationDiv.appendChild(textSpan);
    variationDiv.appendChild(copyButton);
    return variationDiv;
}

export function showCepsCoqueiral() {
    document.getElementById('planoBBtnCeps')?.classList.add('active');
    document.getElementById('planoBBtnMiguxos')?.classList.remove('active');
    renderOutput('CEPs Coqueiral', cepsList, renderCepItem, handleAddCep);
}

function handleAddCep() {
    if (!checkPassword()) return;
    const cep = prompt("Digite o novo CEP:");
    if (!cep) return;
    const logradouro = prompt("Digite o Logradouro (Rua, Av, etc):");
    if (!logradouro) return;
    
    window.saveHistoryState();
    cepsList.push({ cep: cep.trim(), logradouro: logradouro.trim() });
    savePlanoBState();
    showCepsCoqueiral(); // Re-render the list
}


// --- Miguxos Logic ---
function renderMiguxoItem(item, index) {
    const variationDiv = document.createElement('div');
    variationDiv.className = 'variation';
    variationDiv.addEventListener('contextmenu', (e) => showContextMenu(e, 'miguxo', index));

    const textToCopy = `${item.name} — ${item.number}`;
    const textSpan = document.createElement('span');
    textSpan.textContent = `${index + 1}) ${textToCopy}`;

    const copyButton = document.createElement('button');
    copyButton.className = 'emoji-copy-btn';
    copyButton.textContent = '🐶';
    copyButton.title = 'Copiar';

    copyButton.onclick = async () => {
        const originalEmoji = '🐶';
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyButton.textContent = '✅';
            setTimeout(() => { copyButton.textContent = originalEmoji; }, 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
            copyButton.textContent = '❌';
            setTimeout(() => { copyButton.textContent = originalEmoji; }, 1500);
        }
    };
    
    variationDiv.appendChild(textSpan);
    variationDiv.appendChild(copyButton);
    return variationDiv;
}

export function showMiguxos() {
    document.getElementById('planoBBtnMiguxos')?.classList.add('active');
    document.getElementById('planoBBtnCeps')?.classList.remove('active');
    renderOutput('Miguxos', miguxosList, renderMiguxoItem, handleAddMiguxo);
}

function handleAddMiguxo() {
    if (!checkPassword()) return;
    const name = prompt("Digite o nome:");
    if (!name) return;
    const number = prompt("Digite o número (CPF, etc.):");
    if (number === null) return; // Allow empty number

    window.saveHistoryState();
    miguxosList.push({ name: name.trim(), number: number.trim() });
    savePlanoBState();
    showMiguxos(); // Re-render the list
}

// --- Generic Action Handler ---
export function handleAction(action, type, index) {
    if (!checkPassword()) return;
    window.saveHistoryState();

    const isMiguxo = type === 'miguxo';
    const list = isMiguxo ? miguxosList : cepsList;
    const item = list[index];
    const rerenderFunction = isMiguxo ? showMiguxos : showCepsCoqueiral;

    if (action === 'edit') {
        if (isMiguxo) {
            const newName = prompt("Editar nome:", item.name);
            const newNumber = prompt("Editar número:", item.number);
            if (newName !== null && newNumber !== null) {
                item.name = newName.trim();
                item.number = newNumber.trim();
            }
        } else { // is CEP
            const newCep = prompt("Editar CEP:", item.cep);
            const newLogradouro = prompt("Editar Logradouro:", item.logradouro);
            if (newCep !== null && newLogradouro !== null) {
                item.cep = newCep.trim();
                item.logradouro = newLogradouro.trim();
            }
        }
    } else if (action === 'delete') {
        if (confirm(`Tem certeza que deseja excluir "${isMiguxo ? item.name : item.logradouro}"?`)) {
            list.splice(index, 1);
        }
    }
    
    savePlanoBState();
    rerenderFunction();
}


// --- Initialization ---
export function initPlanoB() {
    loadPlanoBState();

    const controlsContainer = document.getElementById('plano-b-controls');
    if(controlsContainer) {
        controlsContainer.innerHTML = ''; // Clear to prevent duplicates

        const cepsBtn = document.createElement('button');
        cepsBtn.textContent = 'CEPs Coqueiral';
        cepsBtn.id = 'planoBBtnCeps';
        cepsBtn.onclick = showCepsCoqueiral;
        controlsContainer.appendChild(cepsBtn);

        const miguxosBtn = document.createElement('button');
        miguxosBtn.textContent = 'Miguxos';
        miguxosBtn.id = 'planoBBtnMiguxos';
        miguxosBtn.onclick = showMiguxos;
        controlsContainer.appendChild(miguxosBtn);

        // Show the first view by default and set its button to active
        showCepsCoqueiral();
    }
    console.log("Plano-B tool initialized.");
}