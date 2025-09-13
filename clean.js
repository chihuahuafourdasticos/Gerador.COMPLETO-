import * as nameModifier from './nameModifier.js';
import { 
    generateRandomPhoneNumber, 
    addresses as mainAddresses,
    ballMeta as mainBallMeta,
    lockedBalls as mainLockedBalls,
    addressOrder as mainAddressOrder
} from './addressGenerator.js';

// --- Constants ---
const LOGRADOUROS = [ "Rua", "Avenida", "Travessa", "Alameda", "Estrada", "Viela", "Largo", "Praça", "Caminho", "Passagem", "Beco", "Rodovia", "Recanto", "Conjunto", "Ladeira", "Passeio", "Corredor", "Travessia", "Pátio", "Passarela", "Acesso", "Servidão", "Esplanada", "Contorno", "Atalho", "Ramal", "Trecho", "Galeria", "Parque", "Vila", "Jardim", "Setor", "Quadra", "Residencial", "Condomínio", "Marginal", "Rotatória", ];
const PRE_MODS = [ "Nova", "Velha", "Antiga", "Bela", "Grande", "Pequena", "Central", "Principal", "São", "Santa", "Alto", "Baixa", "Norte", "Sul", "Leste", "Oeste", "Jardim", "Vila", "Residencial", "Parque", "Conjunto", ];
const POS_QUALIFIERS = [ "Central", "Principal", "Antiga", "Nova", "Velha", "Bela Vista", "Boa Vista", "Horizonte", "Horizonte Azul", "Panorama", "Imperial", "Real", "Esperança", "Liberdade", "Harmonia", "Vitória", "Aurora", "Primavera", "Verde", "Azul", "do Sol", "do Sol Nascente", "das Flores", "das Palmeiras", "da Serra", "do Campo", "do Vale", "da Colina", "do Norte", "do Sul", "do Leste", "do Oeste", "Paraíso", "Recanto", ];
const CONNECTORS = ["de", "do", "da", "dos", "das"];

// --- State ---
let result = [];
let robotModeActive = false;

// --- UI Elements ---
let inputEl, qtdEl, incluirLogradouroEl, styleEl, seedEl, resultCountEl, resultOutputEl, resultListEl, generateBtn, clearBtn, copyBtn, downloadTxtBtn, downloadCsvBtn, sortBtn, noResultsHint, robotModeBtn;

// --- Helper Functions ---
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const pick = (arr) => arr[rand(0, arr.length)];
const coin = (p = 0.5) => Math.random() < p;
const normalize = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

function download(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- Core Logic ---
function generateForBase(baseName, opts) {
  const out = [];
  const used = new Set();
  const words = baseName.split(/\s+/).map((w) => w.trim()).filter(Boolean);

  const reorderings = () => {
    const combos = new Set();
    combos.add(words.join(" ")); // Original
    if (words.length >= 2) {
      const first = words[0];
      const rest = words.slice(1).join(" ");
      combos.add(`${rest} ${first}`);
      combos.add(`${words[1]} ${pick(CONNECTORS)} ${first}${words.length > 2 ? " " + words.slice(2).join(" ") : ""}`);
      combos.add(`${first} ${pick(CONNECTORS)} ${words.slice(1).join(" ")}`);
    }
    return Array.from(combos).map((s) => s.replace(/\s+/g, " ").trim());
  };

  const baseVariants = reorderings();
  const maxAttempts = Math.max(opts.count * 10, 2000);
  let attempts = 0;

  while (out.length < opts.count && attempts < maxAttempts) {
    attempts++;
    let core = pick(baseVariants);
    const usePre = opts.style !== "realista" && coin(0.6);
    const usePost = opts.style !== "realista" && coin(0.75);

    const pre = usePre ? pick(PRE_MODS) + " " : "";
    const post = usePost ? " " + pick(POS_QUALIFIERS) : "";

    if (opts.style !== "realista" && coin(0.35) && words.length >= 2) {
      const i = rand(1, words.length);
      core = words.slice(0, i).join(" ") + " " + pick(CONNECTORS) + " " + words.slice(i).join(" ");
    }

    const log = opts.incluirLogradouro ? pick(LOGRADOUROS) + " " : "";
    let candidate = `${log}${pre}${core}${post}`.replace(/\s+/g, " ").trim();

    const key = normalize(candidate);
    if (!used.has(key)) {
      used.add(key);
      out.push(candidate);
    }
  }
  return out;
}

// --- UI Functions ---
function updateResultUI() {
    resultCountEl.textContent = result.length;
    resultListEl.innerHTML = result.map(r => {
        const escapedR = r.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
            <li>
                <span class="street-name">${r}</span>
                <button class="clean-btn copy-street-btn" onclick="clean.copyStreet(this, '${escapedR}')">Copiar</button>
            </li>
        `;
    }).join('');

    const hasResults = result.length > 0;
    noResultsHint.style.display = hasResults ? 'none' : 'block';
    resultListEl.style.display = hasResults ? 'grid' : 'none';
    
    copyBtn.disabled = !hasResults;
    downloadTxtBtn.disabled = !hasResults;
    downloadCsvBtn.disabled = !hasResults;
    sortBtn.style.visibility = hasResults ? 'visible' : 'hidden';
}

function reseed() {
  const seed = seedEl.value;
  if (!seed) return;
  // This is a simple, non-cryptographic pseudo-random seeder.
  // It's not a true PRNG but shifts Math.random()'s sequence based on the seed.
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  const x = (h >>> 0) / 2 ** 32;
  const n = Math.floor(50 + x * 200);
  for (let i = 0; i < n; i++) Math.random();
};

function handleGenerate() {
    reseed();
    const linhas = inputEl.value.split(/\n|,|;|\|/).map((s) => s.trim()).filter(Boolean);
    const totalDesejado = Math.min(Math.max(parseInt(qtdEl.value, 10), 1), 10000);
    const porBase = Math.ceil(totalDesejado / Math.max(linhas.length, 1));
    const style = styleEl.value;
    const incluirLogradouro = incluirLogradouroEl.checked;

    const all = [];
    const seen = new Set();

    for (const base of linhas) {
      const estilo = style === "mista" ? (coin(0.5) ? "realista" : "criativa") : style;
      const cleanBase = base.replace(/^\s*(Rua|Avenida|Travessa|Alameda|Estrada|Viela|Largo|Praça)\s+/i, "").trim();
      const lote = generateForBase(cleanBase, {
        count: porBase,
        style: estilo,
        incluirLogradouro,
      });
      for (const item of lote) {
        const key = normalize(item);
        if (!seen.has(key) && all.length < totalDesejado) {
          seen.add(key);
          all.push(item);
        }
      }
    }
    result = all;
    updateResultUI();
}

function handleClear() {
    result = [];
    updateResultUI();
}

async function handleCopy() {
    if (!navigator.clipboard || result.length === 0) return;
    try {
        await navigator.clipboard.writeText(result.join("\n"));
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="icon">✅</span> Copiado!';
        setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
    } catch (err) {
        console.error("Failed to copy:", err);
        alert("Falha ao copiar.");
    }
}

function handleDownloadTxt() {
    download("variacoes_ruas.txt", result.join("\n"));
}

function handleDownloadCsv() {
    const csv = ["id,nome"].concat(result.map((r, i) => `${i + 1},"${r.replace(/"/g, '""')}"`)).join("\n");
    download("variacoes_ruas.csv", csv, "text/csv");
}

function handleSort() {
    result.sort((a, b) => a.localeCompare(b));
    updateResultUI();
}

function renderBallPicker() {
    const ballContainer = document.getElementById('clean-ball-container');
    if (!ballContainer) return;

    ballContainer.innerHTML = '';
    
    // Use the sorted order from the main generator
    const sortedKeys = mainAddressOrder.length > 0 ? mainAddressOrder : Object.keys(mainAddresses);

    sortedKeys.forEach(key => {
        if (mainLockedBalls.includes(key)) {
            return; // Skip locked balls
        }

        const ball = document.createElement('div');
        ball.classList.add('ball');

        if (mainBallMeta[key]) {
            ball.classList.add('emoji-ball');
            ball.textContent = mainBallMeta[key].display;
            ball.title = mainBallMeta[key].title || `Usar Endereço ${key}`;
        } else {
            ball.textContent = key;
            ball.title = `Usar Endereço ${key}`;
        }

        ball.addEventListener('click', () => handleBallPick(key));
        ballContainer.appendChild(ball);
    });
}

function handleBallPick(key) {
    const addressText = mainAddresses[key];
    if (!addressText) {
        console.warn(`Address for ball key ${key} not found.`);
        return;
    }

    const lines = addressText.split('\n');
    let street = '';
    let number = '';

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.match(/^Endereço:/i)) {
            street = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
        } else if (trimmedLine.match(/^Numero:|Nú:/i)) {
            number = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
        }
    }

    if (street) {
        const fullStreet = `${street} ${number}`.trim();
        inputEl.value = fullStreet;
        // Scroll to the top of the tool container to show the user the updated field
        inputEl.closest('.tool-container').scrollTop = 0;
        inputEl.focus();
    } else {
        alert(`Não foi possível extrair um 'Endereço:' da bolinha ${key}.`);
    }
}

function toggleRobotMode() {
    robotModeActive = !robotModeActive;
    robotModeBtn.classList.toggle('active', robotModeActive);
    if (robotModeActive) {
        alert("Modo Robô Ativado! A cópia gerará um bloco de dados completo.");
    } else {
        alert("Modo Robô Desativado.");
    }
}

export async function copyStreet(button, street) {
    if (robotModeActive) {
        await copyStreetRobotMode(button, street);
    } else {
        await copyStreetStandard(button, street);
    }
}

async function copyStreetStandard(button, street) {
    if (!navigator.clipboard) return;
    try {
        await navigator.clipboard.writeText(street);
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        setTimeout(() => { button.textContent = originalText; }, 1500);
    } catch (err) {
        console.error("Failed to copy street:", err);
        button.textContent = 'Falhou!';
        setTimeout(() => { button.textContent = 'Copiar'; }, 1500);
    }
}

async function copyStreetRobotMode(button, street) {
    button.disabled = true;
    button.textContent = 'Aguarde...';

    // 1. Get Name/CPF data
    const nameData = await nameModifier.getNewName(true);
    if (!nameData) {
        alert('Falha ao obter dados de nome do banco de dados.');
        button.textContent = 'Falhou!';
        setTimeout(() => { button.textContent = 'Copiar'; button.disabled = false; }, 1500);
        return;
    }

    // 2. Generate Phone Number
    const phone = generateRandomPhoneNumber();

    // 3. Use address template (from user example, which is ball 9)
    const addressTemplate = mainAddresses['9'] || "Cep: 13901280\nBairro: SantoAntonio\nEndereço: Rua Barao Cintra\nNúmero: 336\nComplemento: Condominio Loureiro";
    const lines = addressTemplate.split('\n');

    const modifiedLines = lines.map(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.match(/^Endereço:/i)) {
            return `Endereço: ${street}`;
        }
        if (trimmedLine.match(/^Complemento:/i)) {
            const compRegex = /Complemento:\s*(.*)/i;
            const match = trimmedLine.match(compRegex);
            const originalComplemento = (match && match[1]) ? match[1] : '';
            const modifiedComplemento = nameModifier.createSingleComplementVariation(originalComplemento);
            return `Complemento: ${modifiedComplemento}`;
        }
        return line;
    });

    const addressBlock = modifiedLines.join('\n');
    const final_text = `${nameData}\ntelefone: ${phone}\n${addressBlock}`;

    // 4. Copy to clipboard
    try {
        await navigator.clipboard.writeText(final_text);
        button.textContent = 'Copiado!';
    } catch (err) {
        console.error("Failed to copy robot data:", err);
        button.textContent = 'Falhou!';
    } finally {
        setTimeout(() => { button.textContent = 'Copiar'; button.disabled = false; }, 1500);
    }
}

// --- Initialization ---
export function initCleanGenerator() {
    // Get elements
    inputEl = document.getElementById("clean-base-names");
    qtdEl = document.getElementById("clean-quantity");
    incluirLogradouroEl = document.getElementById("clean-include-type");
    styleEl = document.getElementById("clean-style");
    seedEl = document.getElementById("clean-seed");
    resultCountEl = document.getElementById("clean-results-count");
    resultOutputEl = document.getElementById("clean-results-output");
    resultListEl = document.getElementById("clean-results-list");
    generateBtn = document.getElementById("clean-generate-btn");
    clearBtn = document.getElementById("clean-clear-btn");
    copyBtn = document.getElementById("clean-copy-btn");
    downloadTxtBtn = document.getElementById("clean-download-txt-btn");
    downloadCsvBtn = document.getElementById("clean-download-csv-btn");
    sortBtn = document.getElementById("clean-sort-btn");
    noResultsHint = resultOutputEl.querySelector('p');
    robotModeBtn = document.getElementById("clean-robot-mode-btn");

    // Attach listeners
    generateBtn.addEventListener('click', handleGenerate);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopy);
    downloadTxtBtn.addEventListener('click', handleDownloadTxt);
    downloadCsvBtn.addEventListener('click', handleDownloadCsv);
    sortBtn.addEventListener('click', handleSort);
    robotModeBtn.addEventListener('click', toggleRobotMode);
    
    // Initial UI state
    updateResultUI();
    renderBallPicker();
}