// --- Address Generator Data ---
// Default addresses, used if nothing is in localStorage
const defaultAddresses = {
    1: `São Paulo\n Endereço 1 \nCidade: São Paulo\n Estado: São Paulo\n Cep: 04078010\n Bairro: moema– planalto paulista\n Endereço: Avenida Divino Salvador\n Numero: 12\n Complemento: 152A apto`,
    2: `Endereço 2\n Cep: 04060000\n Cidade: São Paulo\n Estado: São Paulo\n Bairro: Planalto Paulista\n Endereço: Avenida Pianssanguaba\n Numero: 80\n Complemento: Condominio Flores do campo casa 9, ENTREGA DO RONY\n Id: Flores9`,
    3: `São Paulo\n Endereço 3\n Cep: 04089010\n Cidade: São Paulo\n Estado: São Paulo\n Bairro: Indianópolis / Moema / Moema Índios\n Endereço: Alameda dos Macaratins\n Numero: 305\n Complemento: Edifício Oca Maratins Apartamento 152, ENTREGA DO RONY\n Id: Oca152`,
    4: `Bertioga\n Endereço 4\n Cep: 11262141\n Cidade: Bertioga\n Estado: São Paulo\n Bairro: Riviera de São Lourenço Módulo 8\n Endereço: Passeio do Pontal\n Numero: 420\n Complemento: Condomínio AllTime Riviera Torre 4 Apartamento 52, ENTREGA DO RONY\n Id: Allime52`,
    5: `Bertioga\n Endereço 5\n Cep: 11262129\n Cidade: Bertioga\n Estado: São Paulo\n Bairro: Riviera de São Lourenço Módulo 8\n Endereço: Passeio do Maracaí\n Numero: 145\n Complemento: Edifício Evidence Apartamento 64, ENTREGA DO RONY\n Id: Evidence64`,
    6: `Bertioga\n Endereço 6\n Cep: 11262135\n Cidade: Bertioga\n Estado: São Paulo\n Bairro: Riviera de São Lourenço Módulo 7\n Endereço: Alameda do Monjoleiro\n Numero: 32\n Complemento: Edifício Ipanema Apartamento 52, ENTREGA DO RONY\n Id: Ipanema52`,
    7: `Bertioga\n Endereço 7\n Cep: 11262123\n Cidade: Bertioga\n Estado: São Paulo\n Bairro: Riviera de São Lourenço Módulo 6\n Endereço: Passeio do Jatobá\n Numero: 10\n Complemento: Edifício Porto Belo Apartamento 63, ENTREGA DA IVADI\n Id: Portobelo53`,
    8: `Guarulhos\n Endereço 8\n Cep: 07063010\n Cidade: Guarulhos\n Estado: São Paulo\n Bairro: Torres de bagi\n Endereço: avenida Júlio Prestes\n Numero: 901\n Complemento: casa 4, entregar para M`,
    9: `Amparo\n Endereço 9\n Cep: 13901280\n Bairro: SantoAntonio, Sjudas, SanJudas, Sanantoniw\n Endereço: Rua Barao Cintra\n Numero: 336\n Complemento: Condominio Loureiro Colocar casas acima do número 100, exemplos IOOOA, 657B, 876J, 598C, etc)`,
    10: `Amparo\n Endereço 10\n Cep: 13900470\n Bairro: Centro\n Endereço: Rua Comendador Guimaraes\n Numero: 456\n Complemento: Apto 32 Ed Brasilial`,
    11: `Amparo\n Endereço 11\n Cep: 13900370\n Bairro: Centro\n Endereço: Rua Angelo Lavezzo\n Numero: 111\n Complemento: Apto 103`,
    12: `Amparo\n Endereço 12\n Cep: 13901280\n Bairro: SantoAntonio, Sjudas, SanJudas, Sanantoniw\n Endereço: Rua Barao Cintra\n Numero: 261\n Complemento: Entregar VICENTE`,
    13: `Amparo\n Endereço 13\n Cep: 13900400\n Bairro: Centro\n Endereço: Avenida Bernardino de Campos\n Numero: 48\n Complemento: Loja Limaozinho, Loja Baby, Loja Bebe`,
    14: `Amparo\n Endereço 14\n Cep: 13900400\n Bairro: Centro\n Endereço: Avenida Bernardino de Campos\n Numero: 173\n Complemento: Jose Nilton Clinica, Clinica Gastro, Sonia Maria Rosa Clinica, Clinica dos Rosa, Encomenda do Vicente, Entrega do Vicente`,
    15: `Itapeva MG\n Endereço 15\n Cep: 37655000\n Bairro: Centro\n Endereço: Praça Joaquim Luiz\n Numero: 36\n Complemento: ENTREGAR LUIS, OTICAS BELLA`,
    16: `Itatiba\n Endereço 16\n Cep: 13256490\n Cidade: Itatiba\n Estado: SP\n Bairro: Vila Brasileira\n Endereço: Rua dos Operarios\n Numero: 110\n Complemento: Terça e quinta não entrar antes das 13 , Entregar Marcio`,
    17: `Santa Bárbara d'Oeste\n Endereço 17\n Cep: 13456132\n Cidade: Santa Bárbara d'Oeste\n Estado: SP\n Bairro: Distrito Industrial I\n Endereço: Rua Frederico Amadeo Covolan\n Numero: 270\n Complemento: Entregar Anselmo`,
    18: `Itatiba\n Endereço 18\n Cep: 13255057\n Cidade: Itatiba\n Estado: SP\n Bairro: Não especificado (ou Residencial Beija Flor)\n Endereço: Rua Antenor José Momentel\n Numero: S/N\n Complemento: Bloco 21 apto 23 Condomínio residencial Beija Flor Fase B, Entregar Edna`,
    'e1': `Seropedica - Casa\n Endereço 1\n Cep: 23894330\n Cidade: Seropedica\n Estado: rj\n Bairro: Boa Esperança / coqueiral / mutirão\n Endereço: Rua Tacaratu Marques\n Numero: 6\n Complemento: sem xxxxxxxxxxx`,
    'e2': `Seropedica - Girassol\n Endereço 2\n Cep: 23894338\n Cidade: Seropedica\n Estado: rj\n Bairro: Boa Esperança\n Endereço: Rua Marquês de Valência\n Numero: 228\n Complemento: Para Cátia / Marcelo xxxxxxxxxxxxx`,
    'e3': `Seropedica - Vó\n Endereço 3\n Cep: 23895330\n Cidade: Seropedica\n Estado: rj\n Bairro: Fazenda Caxias\n Endereço: Rua Isidro Borges\n Numero: 123\n Complemento: Ao Lado da Igreja Congregacional xxxxxxxxxxxxx`,
    'e4': `Seropedica - Escola\n Endereço 4\n Cep: 23895075\n Cidade: Seropedica\n Estado: rj\n Bairro: Fazenda Caxias\n Endereço: Rua Josino Fernades Nunes\n Numero: 447\n Complemento: Creche Escola Aquarela`
};

const prefixCategories = {
    default: {
        title: "Padrão",
        emoji: "⚪",
        phrases: {
            pt: [
                "enviar para", "destinado a", "encomenda pra", "mercadoria para",
                "objeto destinado", "a morador de", "localizado em", "deixar em",
                "Remeter a", "Dirigido a", "Pedido para", "Produto para",
                "Item destinado a", "Para residente de", "Situado em", "Depositar em"
            ],
            en: [
                "send to", "intended for", "order for", "goods for",
                "object destined for", "to a resident of", "located at", "leave at",
                "Forward to", "Addressed to", "Request for", "Product for",
                "Item intended for", "For resident of", "Situated at", "Deposit at"
            ]
        }
    },
    para: {
        title: "Frases com “para” (destinação, finalidade)",
        emoji: "🟢",
        phrases: {
            pt: ["Produto voltado para", "Material preparado para", "Envio reservado para", "Destinado para uso de", "Exclusivo para", "Embalado para", "Conteúdo preparado para", "Kit elaborado para", "Solução ideal para", "Desenvolvido para"],
            en: ["Product aimed at", "Material prepared for", "Shipment reserved for", "Intended for use by", "Exclusive for", "Packaged for", "Content prepared for", "Kit designed for", "Ideal solution for", "Developed for"]
        }
    },
    localizacaoDestinatario: {
        title: "Frases com “localização/destinatário”",
        emoji: "🟢",
        phrases: {
            pt: ["Enviado a pedido de", "Localizado no endereço de", "Endereçado a", "Encomenda enviada para", "Correspondência dirigida a", "Item localizado em", "Pacote remetido a", "Encaminhado a", "Para entrega em", "Carga destinada a"],
            en: ["Sent at the request of", "Located at the address of", "Addressed to", "Order sent to", "Correspondence addressed to", "Item located at", "Package forwarded to", "Forwarded to", "For delivery to", "Cargo destined for"]
        }
    },
    formais: {
        title: "Frases formais/administrativas",
        emoji: "🟢",
        phrases: {
            pt: ["Objeto encaminhado a", "Documento pertencente a", "Arquivo relativo a", "Solicitação vinda de", "Comunicação dirigida a", "Registro feito para", "Documento expedido em nome de", "Notificação destinada a", "Ordem emitida para", "Referente ao destinatário"],
            en: ["Object forwarded to", "Document belonging to", "File relating to", "Request from", "Communication addressed to", "Record made for", "Document issued in the name of", "Notification intended for", "Order issued for", "Regarding the recipient"]
        }
    },
    destinadoAlguem: {
        title: "Frases com sentido de \"destinado a alguém\"",
        emoji: "🟠",
        phrases: {
            pt: ["Item a ser entregue a", "Carta dirigida ao cuidado de", "Documento a encaminhar para", "Correspondência reservada a", "Mensagem endereçada a", "Conteúdo voltado ao destinatário", "Produto remetido em nome de", "Pacote identificado para", "Comunicação endereçada ao responsável", "Informações destinadas ao solicitante"],
            en: ["Item to be delivered to", "Letter addressed to the care of", "Document to be forwarded to", "Correspondence reserved for", "Message addressed to", "Content aimed at the recipient", "Product sent in the name of", "Package identified for", "Communication addressed to the person in charge", "Information intended for the requester"]
        }
    },
    usoFinalidade: {
        title: "Frases com sentido de “uso ou finalidade de algo”",
        emoji: "🟢",
        phrases: {
            pt: ["Material de uso exclusivo para", "Solução indicada para", "Produto criado especialmente para", "Artigo apropriado para", "Serviço voltado à necessidade de", "Ferramenta ideal para", "Aplicação recomendada para", "Equipamento projetado para", "Componente desenvolvido com foco em", "Kit montado para atender a"],
            en: ["Material for exclusive use by", "Solution indicated for", "Product created especially for", "Appropriate article for", "Service focused on the needs of", "Ideal tool for", "Recommended application for", "Equipment designed for", "Component developed with a focus on", "Kit assembled to meet"]
        }
    },
    localizacaoVinculo: {
        title: "Frases com localização e vínculo",
        emoji: "🔵",
        phrases: {
            pt: ["Pertencente ao endereço de", "Associado ao residente em", "Registrado sob o nome de", "Domiciliado em", "Vinculado ao CPF de", "Inscrito no endereço de", "Constando como morador de", "Localizado junto ao endereço de", "Sob responsabilidade de", "Relativo ao endereço cadastrado"],
            en: ["Belonging to the address of", "Associated with the resident at", "Registered under the name of", "Domiciled at", "Linked to the CPF of", "Registered at the address of", "Listed as a resident of", "Located at the address of", "Under the responsibility of", "Relating to the registered address"]
        }
    },
    juridicas: {
        title: "Frases mais formais ou jurídicas",
        emoji: "🟣",
        phrases: {
            pt: ["Objeto sob posse de", "Expediente remetido a", "Documento lavrado em favor de", "Pedido registrado para atendimento de", "Protocolo vinculado ao requerente", "Declaração assinada por", "Requisição encaminhada ao setor responsável", "Solicitação formalizada em nome de", "Processo em trâmite para", "Arquivo pertencente ao dossiê de"],
            en: ["Object in the possession of", "File sent to", "Document drawn up in favor of", "Request registered for fulfillment of", "Protocol linked to the applicant", "Declaration signed by", "Requisition forwarded to the responsible department", "Request formalized in the name of", "Process underway for", "File belonging to the dossier of"]
        }
    }
};

const defaultLockedBalls = ['4', '18'];
const defaultBallMeta = {
    'e1': { display: '🏠', title: 'Endereço Casa' },
    'e2': { display: '🌻', title: 'Endereço Girassol' },
    'e3': { display: '👵', title: 'Endereço Vó' },
    'e4': { display: '🏫', title: 'Endereço Escola' }
};

// --- Persistent State ---
let addresses = {};
let lockedBalls = [];
let ballMeta = {};
let addressGeneratorTitle = 'Gerador_CH_3.0'; // Default title
let addressOrder = []; // New: To store custom sort order
let killModeActive = false; // For the new KILL variations
let cyborgModeActive = false; // For the new Cyborg Mode
let usePrefixes = true;
let useCleanStreet = false;
let useEnglishPrefixes = false;
let selectedPrefixCategories = ['default'];

// Load state from localStorage or use defaults
function loadState() {
    try {
        const storedAddresses = localStorage.getItem('addressGenerator_addresses');
        const storedLocked = localStorage.getItem('addressGenerator_lockedBalls');
        const storedMeta = localStorage.getItem('addressGenerator_ballMeta');
        const storedTitle = localStorage.getItem('addressGenerator_title');
        const storedOrder = localStorage.getItem('addressGenerator_order');
        const killMode = localStorage.getItem('addressGenerator_killMode');
        const cyborgMode = localStorage.getItem('addressGenerator_cyborgMode');

        const storedUsePrefix = localStorage.getItem('addressGenerator_usePrefix');
        const storedCleanStreet = localStorage.getItem('addressGenerator_cleanStreet');
        const storedUseEnglish = localStorage.getItem('addressGenerator_useEnglish');
        const storedSelectedCategories = localStorage.getItem('addressGenerator_selectedCategories');

        addresses = storedAddresses ? JSON.parse(storedAddresses) : { ...defaultAddresses };
        lockedBalls = storedLocked ? JSON.parse(storedLocked) : [...defaultLockedBalls];
        ballMeta = storedMeta ? JSON.parse(storedMeta) : { ...defaultBallMeta };
        addressGeneratorTitle = storedTitle || 'Gerador_CH_3.0';
        addressOrder = storedOrder ? JSON.parse(storedOrder) : [];
        killModeActive = killMode === 'true';
        cyborgModeActive = cyborgMode === 'true';

        usePrefixes = storedUsePrefix !== null ? storedUsePrefix === 'true' : true;
        useCleanStreet = storedCleanStreet === 'true';
        useEnglishPrefixes = storedUseEnglish === 'true';
        selectedPrefixCategories = storedSelectedCategories ? JSON.parse(storedSelectedCategories) : ['default'];

        // Update title element on load
        const titleEl = document.getElementById('address-generator-title');
        if (titleEl) {
            titleEl.textContent = addressGeneratorTitle;
        }
    } catch (e) {
        console.error("Failed to load state from localStorage, using defaults.", e);
        addresses = { ...defaultAddresses };
        lockedBalls = [...defaultLockedBalls];
        ballMeta = { ...defaultBallMeta };
        addressGeneratorTitle = 'Gerador_CH_3.0';
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('addressGenerator_addresses', JSON.stringify(addresses));
        localStorage.setItem('addressGenerator_lockedBalls', JSON.stringify(lockedBalls));
        localStorage.setItem('addressGenerator_ballMeta', JSON.stringify(ballMeta));
        localStorage.setItem('addressGenerator_title', addressGeneratorTitle);
        localStorage.setItem('addressGenerator_order', JSON.stringify(addressOrder));
        localStorage.setItem('addressGenerator_killMode', killModeActive);
        localStorage.setItem('addressGenerator_cyborgMode', cyborgModeActive);
        localStorage.setItem('addressGenerator_usePrefix', usePrefixes);
        localStorage.setItem('addressGenerator_cleanStreet', useCleanStreet);
        localStorage.setItem('addressGenerator_useEnglish', useEnglishPrefixes);
        localStorage.setItem('addressGenerator_selectedCategories', JSON.stringify(selectedPrefixCategories));
    } catch (e) {
        console.error("Failed to save state to localStorage.", e);
        alert("Erro ao salvar as alterações. O armazenamento pode estar cheio.");
    }
}

// Make addresses available for other modules
export { addresses, ballMeta, lockedBalls, addressOrder };

// --- Robot Sequencer State ---
let robotSequence = [];
let currentRobotIndex = 0;
let robotViewMode = 'blue'; // 'blue' or 'black'

// --- Wizard Sequencer State ---
let wizardSequence = [];
let currentWizardIndex = 0;
let wizardViewMode = 'blue'; // 'blue' or 'black'

// --- Address Generator Functions ---
function generateRandomPunctuation() {
  const puncts = ['.', ',', ';', '(', ')', '-', '/', ''];
  return puncts[Math.floor(Math.random() * puncts.length)];
}

// --- KILL MODE VARIATION LOGIC ---

const killModeChars = {
    vowels: {
        'a': ['á', 'ã', 'à', 'â'], 'e': ['ê', 'é'], 'i': ['í', 'l'],
        'o': ['õ', 'ô', 'ò', 'ó'], 'u': ['ú']
    },
    leet: {
        'o': '0', 't': '7'
    },
    punctuation: ['+', '-', '\'', '/', '(', ')', ';', ':', '.', ',', '\\', '°'],
    numbers: {
        '1': ["+++1", "'xx001", ";/01", "õô001", "1'x"],
        '3': ["Tr3s", "tr3s"],
        '4': ["qu4tr0", "Qu4tr0"],
        '5': ["5inco", "C1nc0"],
        '6': ["6eis", "S31s"],
        '7': ["Se7e", "s3t3"],
        '8': ["Oit8", "o1t8"],
        '9': ["n9ve", "N9v3"]
    }
};

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function transformWordKillMode(word) {
    let newWord = '';
    for (const char of word) {
        let newChar = char.toLowerCase();
        // 50% chance to modify a vowel
        if (killModeChars.vowels[newChar] && Math.random() < 0.5) {
            newChar = getRandomElement(killModeChars.vowels[newChar]);
        }
        // 30% chance for leet speak substitution
        else if (killModeChars.leet[newChar] && Math.random() < 0.3) {
            newChar = killModeChars.leet[newChar];
        }
        // 20% chance to insert random punctuation after a char
        if (Math.random() < 0.2) {
            newWord += getRandomElement(killModeChars.punctuation);
        }
        newWord += Math.random() < 0.5 ? newChar.toUpperCase() : newChar;
    }
    return newWord;
}

function generateKillModeVariation(address, numberStr) {
    const words = address.split(/\s+/);
    let transformedWords = words.map(word => Math.random() < 0.7 ? transformWordKillMode(word) : word);

    // 50% chance to replace spaces with punctuation
    const separator = Math.random() < 0.5 ? getRandomElement(killModeChars.punctuation) : ' ';
    let transformedAddress = transformedWords.join(separator);

    let transformedNumber = numberStr;
    if (numberStr && killModeChars.numbers[numberStr] && Math.random() < 0.8) {
        transformedNumber = getRandomElement(killModeChars.numbers[numberStr]);
    }

    return `${transformedAddress} ${transformedNumber}`.trim();
}
// --- END KILL MODE ---

export function modifyWord(word) {
  let result = '';
  // Remove existing punctuation before adding new ones
  const cleanWord = word.replace(/[.,;()\-/\s]/g, '');
  for (let i = 0; i < cleanWord.length; i++) {
    result += cleanWord[i];
    if (Math.random() < 0.3) {
      result += generateRandomPunctuation();
    }
  }
  return result;
}

function generateVariation(address) {
  // Extract the core address part after "Endereço:"
  const addressRegex = /Endereço:\s*(.*)/i;
  const match = address.match(addressRegex);
  const coreAddress = match ? match[1].trim() : address.trim(); // Use full input if no "Endereço:"
  
  if (useCleanStreet) {
      return coreAddress;
  }
  
  if (killModeActive) {
      // Try to separate address from number for KILL mode
      const numMatch = coreAddress.match(/^(.*?)\s*(\d+)$/);
      if (numMatch) {
          return generateKillModeVariation(numMatch[1].trim(), numMatch[2]);
      } else {
          return generateKillModeVariation(coreAddress, ''); // No number found
      }
  } else {
      return modifyWord(coreAddress);
  }
}

export function getRandomPrefix() {
    if (!usePrefixes) {
        return '';
    }

    const availablePrefixes = [];
    selectedPrefixCategories.forEach(catKey => {
        if (prefixCategories[catKey]) {
            availablePrefixes.push(...prefixCategories[catKey].phrases.pt);
            if (useEnglishPrefixes) {
                availablePrefixes.push(...prefixCategories[catKey].phrases.en);
            }
        }
    });

    if (availablePrefixes.length === 0) {
        // Fallback to default if no categories are selected for some reason
        const defaultPhrases = prefixCategories.default.phrases.pt;
        return defaultPhrases[Math.floor(Math.random() * defaultPhrases.length)];
    }

    return availablePrefixes[Math.floor(Math.random() * availablePrefixes.length)];
}

export async function generateVariations() {
  const originalText = document.getElementById('originalText').value;
  const count = parseInt(document.getElementById('count').value);
  const output = document.getElementById('output');
  if (!output) {
      console.error("Output element not found");
      return;
  }

  // Find the line containing "Endereço:"
  const lines = originalText.split('\n');
  let addressLine = '';
  let addressLineIndex = -1;
  for(let i=0; i< lines.length; i++) {
      // More robust regex to find "Endereço:" ignoring leading/trailing whitespace
      if (lines[i].trim().match(/^Endereço:/i)) {
          addressLine = lines[i];
          addressLineIndex = i;
          break;
      }
  }

  let variationsHtml = '';

  if (addressLineIndex !== -1) {
    const addressRegex = /Endereço:\s*(.*)/i;
    const match = addressLine.match(addressRegex);

    if (match && match[1] !== undefined && match[1].trim() !== '') {
      const originalAddressPart = match[1].trim(); // Get only the text after "Endereço:"

      for (let i = 0; i < count; i++) {
        const prefix = getRandomPrefix();
        // Generate variation based ONLY on the part after "Endereço:"
        const modifiedAddressPart = generateVariation(originalAddressPart);
        const fullVariationText = `${prefix} ${modifiedAddressPart}`;

        // Escape quotes for the onclick handler
        const escapedPrefix = prefix.replace(/'/g, "\\'");
        const escapedVariation = modifiedAddressPart.replace(/'/g, "\\'");

        variationsHtml += `
          <div class="variation">
            <span>${i + 1}) ${fullVariationText}</span>
            <button onclick="addressGenerator.copyVariation(this, '${escapedPrefix}', '${escapedVariation}')">Copiar</button>
          </div>
        `;
      }
    } else {
       variationsHtml += `<div class="variation"><span>A linha "Endereço:" foi encontrada, mas está vazia ou em formato inválido.</span></div>`;
    }
  } else {
     variationsHtml += `<div class="variation"><span>Linha começando com "Endereço:" não encontrada no texto original.</span></div>`;
  }

  output.innerHTML = variationsHtml;
}

export async function copyVariation(buttonElement, prefix, variation) {
    if (cyborgModeActive) {
        await copyCyborgVariation(buttonElement, prefix, variation);
    } else {
        await copyStandardVariation(buttonElement, prefix, variation);
    }
}

async function copyStandardVariation(buttonElement, prefix, variation) {
  const originalText = document.getElementById('originalText').value;
  const lines = originalText.split('\n');
  let addressLineIndex = -1;

  // Find the original "Endereço:" line again
  for(let i=0; i< lines.length; i++) {
      if (lines[i].trim().match(/^Endereço:/i)) {
          addressLineIndex = i;
          break;
      }
  }

  if (addressLineIndex !== -1) {
    const newAddressLine = `Endereço: ${prefix} ${variation}`;
    lines[addressLineIndex] = newAddressLine;
    const newText = lines.join('\n');

    try {
        await navigator.clipboard.writeText(newText);
        const originalButtonText = buttonElement.textContent;
        buttonElement.textContent = 'Copiado!';
        setTimeout(() => {
            buttonElement.textContent = originalButtonText;
        }, 1500);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
       alert('Falha ao copiar texto.');
    }
  } else {
    alert('Linha "Endereço:" não encontrada no texto original para copiar.');
  }
}

async function copyCyborgVariation(buttonElement, prefix, variation) {
    try {
        // 1. Get Name/CPF data from nameModifier
        const nameModifier = await import('./nameModifier.js');
        const nameData = await nameModifier.getNewName(true); // true = silent mode
        if (!nameData) {
            alert('Não foi possível obter dados do banco de nomes. Verifique se há nomes elegíveis.');
            return;
        }

        // 2. Generate a random phone number
        const phoneNumber = generateRandomPhoneNumber();

        // 3. Get original text and modify address/complemento lines
        const originalText = document.getElementById('originalText').value;
        const lines = originalText.split('\n');
        
        let addressLineIndex = -1;
        let complementoLineIndex = -1;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().match(/^Endereço:/i)) addressLineIndex = i;
            if (lines[i].trim().match(/^Complemento:/i)) complementoLineIndex = i;
        }

        if (addressLineIndex !== -1) {
            lines[addressLineIndex] = `Endereço: ${prefix} ${variation}`;
        }

        if (complementoLineIndex !== -1) {
            const compRegex = /Complemento:\s*(.*)/i;
            const match = lines[complementoLineIndex].match(compRegex);
            if (match && match[1]) {
                const modifiedComplemento = nameModifier.createSingleComplementVariation(match[1]);
                lines[complementoLineIndex] = `Complemento: ${modifiedComplemento}`;
            }
        }

        const modifiedAddressBlock = lines.join('\n');
        const finalFullText = `${nameData}\ntelefone: ${phoneNumber}\n${modifiedAddressBlock}`;
        
        // 4. Copy to clipboard and provide feedback
        await navigator.clipboard.writeText(finalFullText);
        const originalButtonText = buttonElement.textContent;
        buttonElement.textContent = 'Ciborg!';
        setTimeout(() => {
            buttonElement.textContent = originalButtonText;
        }, 1500);

    } catch (err) {
        console.error('Falha no modo Ciborgue: ', err);
        alert('Ocorreu um erro ao gerar os dados do modo Ciborgue.');
    }
}

// --- Reorder State ---
let sortableInstance = null;

function createBalls() {
    const ballContentContainer = document.querySelector('#balls-content-container');

    if (!ballContentContainer) return;

    ballContentContainer.innerHTML = ''; // Clear everything, including the old add ball if it was inside

    // --- Context Menu Handling ---
    const hideContextMenu = () => {
        const existingMenu = document.getElementById('ball-context-menu');
        if (existingMenu) existingMenu.remove();
        document.removeEventListener('click', hideContextMenu);
    };

    const showContextMenu = (e, key, isLocked) => {
        e.preventDefault();
        hideContextMenu(); // Hide any previous menu

        const menu = document.createElement('div');
        menu.id = 'ball-context-menu';
        menu.className = 'context-menu';
        menu.style.left = `${e.pageX}px`;
        menu.style.top = `${e.pageY}px`;

        menu.innerHTML += `<div class="context-menu-item" onclick="addressGenerator.handleBallAction('edit', '${key}')">Editar Endereço</div>`;
        menu.innerHTML += `<div class="context-menu-item" onclick="addressGenerator.handleBallAction('reorder', '${key}')">Arrastar</div>`;

        // Add "Edit Icon" option only for black balls (non-numeric keys)
        if (!/^\d+$/.test(key)) {
             menu.innerHTML += `<div class="context-menu-item" onclick="addressGenerator.handleBallAction('editIcon', '${key}')">Alterar Ícone</div>`;
        }

        if (isLocked) {
            menu.innerHTML += `<div class="context-menu-item" onclick="addressGenerator.handleBallAction('unlock', '${key}')">Desbloquear</div>`;
        } else {
            menu.innerHTML += `<div class="context-menu-item" onclick="addressGenerator.handleBallAction('lock', '${key}')">Bloquear</div>`;
        }
        menu.innerHTML += `<div class="context-menu-item delete" onclick="addressGenerator.handleBallAction('delete', '${key}')">Excluir</div>`;

        document.body.appendChild(menu);

        // Use a timeout to add the event listener, preventing it from firing immediately on the same click
        setTimeout(() => document.addEventListener('click', hideContextMenu), 0);
    };
    // --- End Context Menu Handling ---

    const getSortedKeys = () => {
        const currentKeys = Object.keys(addresses);
        // Filter out keys from order array that no longer exist in addresses
        const validOrder = addressOrder.filter(key => currentKeys.includes(key));
        const orderedKeys = new Set(validOrder);
        const remainingKeys = currentKeys.filter(key => !orderedKeys.has(key));
        
        // Default sort for remaining keys
        remainingKeys.sort((a, b) => {
            const aIsNum = /^\d+$/.test(a);
            const bIsNum = /^\d+$/.test(b);
            if (aIsNum && bIsNum) return Number(a) - Number(b);
            if (aIsNum) return -1;
            if (bIsNum) return 1;
            return a.localeCompare(b);
        });

        // Combine valid custom order with newly added/remaining keys
        const finalKeyOrder = [...validOrder, ...remainingKeys];
        // If the order has changed (e.g., due to filtering), update it
        if (JSON.stringify(finalKeyOrder) !== JSON.stringify(addressOrder)) {
            addressOrder = finalKeyOrder;
            // No need to save state here, it will be saved on user actions.
        }
        return finalKeyOrder;
    };

    const sortedKeys = getSortedKeys();

    sortedKeys.forEach(key => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.dataset.key = key; // Add key for reordering
        const isLocked = lockedBalls.includes(key);

        if (isLocked) {
            ball.textContent = (ballMeta[key]?.display || key) + '🔒';
            ball.classList.add('locked');
            ball.title = "Endereço bloqueado";
            ball.addEventListener('click', () => { /* Do nothing */ });
        } else if (ballMeta[key]) {
            ball.classList.add('emoji-ball'); // Assumes black ball for meta entries
            ball.textContent = ballMeta[key].display;
            ball.title = ballMeta[key].title || `Endereço ${key}`;
            ball.addEventListener('click', () => populateAndGenerate(key));
        } else {
            ball.textContent = key;
            ball.title = `Endereço ${key}`;
            ball.addEventListener('click', () => populateAndGenerate(key));
        }

        // Add right-click listener
        ball.addEventListener('contextmenu', (e) => showContextMenu(e, key, isLocked));
        
        // Append to the single container
        ballContentContainer.appendChild(ball);
    });

    // --- Add the Green "Add" Ball at the end of the content container ---
    const addBall = document.createElement('div');
    addBall.classList.add('ball', 'add-ball');
    addBall.textContent = '+';
    addBall.title = 'Adicionar novo endereço';
    addBall.addEventListener('click', handleAddNewBall);
    ballContentContainer.appendChild(addBall);
}

function updateRobotSequence() {
    const allKeys = addressOrder.length > 0 ? addressOrder : Object.keys(addresses);

    if (robotViewMode === 'blue') {
        robotSequence = allKeys
            .filter(key => /^\d+$/.test(key) && !lockedBalls.includes(key));
            // Keep custom order, don't re-sort numerically here
    } else { // 'black' mode
        robotSequence = allKeys
            .filter(key => !/^\d+$/.test(key) && !lockedBalls.includes(key));
            // Keep custom order, don't re-sort alphabetically here
    }

    currentRobotIndex = 0; // Reset index whenever the sequence/view changes
    populateBallSelector();
    updateRobotDisplay();
}

/**
 * Generates a full data package for a given ball key.
 * This is the core reusable logic for robot-style generation.
 * @param {string} ballKey - The key of the address ball to use.
 * @returns {Promise<string|null>} - The combined text data, or null on failure.
 */
async function generateFullDataPackage(ballKey) {
    // 1. Get Name/CPF data from nameModifier
    const nameDataModule = await import('./nameModifier.js');
    const nameData = await nameDataModule.getNewName(true); // true = called by robot

    if (!nameData) {
        console.error('Failed to get name data for batch generation.');
        return null; // Critical failure
    }

    // 2. Generate a random phone number
    const phoneNumber = generateRandomPhoneNumber();

    // 3. Generate Address Variation
    const addressData = addresses[ballKey];
    if (!addressData) {
        console.error(`Address for ball ${ballKey} not found.`);
        return null;
    }

    const prefix = getRandomPrefix();
    const addressVariationPart = generateVariation(addressData);

    // 4. Replace the original "Endereço:" and "Complemento:" lines
    const lines = addressData.split('\n');
    let addressLineIndex = -1;
    let complementoLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().match(/^Endereço:/i)) addressLineIndex = i;
        if (lines[i].trim().match(/^Complemento:/i)) complementoLineIndex = i;
    }

    if (addressLineIndex !== -1) {
        lines[addressLineIndex] = `Endereço: ${prefix} ${addressVariationPart}`;
    }

    if (complementoLineIndex !== -1) {
        const complementoRegex = /Complemento:\s*(.*)/i;
        const match = lines[complementoLineIndex].match(complementoRegex);
        if (match && match[1]) {
            const originalComplemento = match[1];
            const modifiedComplemento = nameDataModule.createSingleComplementVariation(originalComplemento);
            lines[complementoLineIndex] = `Complemento: ${modifiedComplemento}`;
        }
    }

    const modifiedAddressBlock = lines.join('\n');

    // 5. Combine and return
    return `${nameData}\ntelefone: ${phoneNumber}\n${modifiedAddressBlock}`;
}

function generateRandomPhoneNumber() {
    // Generates a random Brazilian-style mobile number (e.g., 21987654321)
    const ddds = [
        11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
        63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99
    ];
    const ddd = ddds[Math.floor(Math.random() * ddds.length)];
    // 8-digit random number (10000000 to 99999999)
    const numberPart = Math.floor(Math.random() * 90000000) + 10000000;
    return `${ddd}9${numberPart}`;
}

async function handleRobotBallClick() {
    if (robotSequence.length === 0) return;
    const feedbackDiv = document.getElementById('robot-feedback');
    const ballDisplay = document.getElementById('robot-ball-display');
    const currentBallKey = robotSequence[currentRobotIndex];

    const combinedText = await generateFullDataPackage(currentBallKey);

    if (!combinedText) {
        alert('Falha ao gerar pacote de dados completo. Verifique o console para erros.');
        feedbackDiv.textContent = `Falha ao gerar dados da bolinha ${currentBallKey}.`;
        feedbackDiv.style.borderColor = 'red';
        feedbackDiv.style.backgroundColor = '#fde2e2';
        feedbackDiv.style.display = 'block';
        return;
    }

    // 5. Combine and Copy
    try {
        await navigator.clipboard.writeText(combinedText);

        // UI Feedback for success
        feedbackDiv.textContent = `Copiado! Bolinha: ${currentBallKey}`;
        feedbackDiv.style.borderColor = '#4CAF50';
        feedbackDiv.style.backgroundColor = '#e7f4e8';
        feedbackDiv.style.display = 'block';

        const originalText = ballDisplay.textContent;
        ballDisplay.textContent = 'OK!';
        setTimeout(() => {
            ballDisplay.textContent = originalText;
            feedbackDiv.style.display = 'none';
        }, 1500);

    } catch (err) {
        console.error('Falha ao copiar dados do robô:', err);
        // UI Feedback for failure
        feedbackDiv.textContent = `Falha ao copiar dados da bolinha ${currentBallKey}.`;
        feedbackDiv.style.borderColor = 'red';
        feedbackDiv.style.backgroundColor = '#fde2e2';
        feedbackDiv.style.display = 'block';
    }
}

// --- New Wizard Functions ---

function generateWizardSuffix() {
    const startPunct = ['.', ',', '-'][Math.floor(Math.random() * 3)];
    const endPunct = [';', '.'][Math.floor(Math.random() * 2)];
    let randomChars = '';
    const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = Math.floor(Math.random() * 2) + 4; // 4 or 5 chars

    for (let i = 0; i < length; i++) {
        randomChars += charPool.charAt(Math.floor(Math.random() * charPool.length));
    }
    
    return `${startPunct}${randomChars}${endPunct}`;
}

async function generateWizardDataPackage(ballKey) {
    // 1. Get Name/CPF data
    const nameDataModule = await import('./nameModifier.js');
    const nameData = await nameDataModule.getNewName(true);
    if (!nameData) return null;

    // 2. Generate Phone Number
    const phoneNumber = generateRandomPhoneNumber();

    // 3. Get original address
    const addressData = addresses[ballKey];
    if (!addressData) return null;

    // 4. Modify Bairro, Endereço, and Complemento lines
    const lines = addressData.split('\n');
    const modifiedLines = lines.map(line => {
        const trimmedLine = line.trim();
        const suffix = generateWizardSuffix();
        
        if (trimmedLine.match(/^Bairro:/i)) {
            const bairroContent = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
            // Take only the first part before a comma if it exists
            const firstBairro = bairroContent.split(',')[0].trim();
            return `Bairro: ${firstBairro}${suffix}`;
        }
        if (trimmedLine.match(/^Endereço:/i)) {
             const enderecoContent = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
             return `Endereço: ${enderecoContent}${suffix}`;
        }
        if (trimmedLine.match(/^Complemento:/i)) {
             const complementoContent = trimmedLine.substring(trimmedLine.indexOf(':') + 1).trim();
             // Take only the first part before a comma if it exists
             const firstComplemento = complementoContent.split(',')[0].trim();
             return `Complemento: ${firstComplemento}${suffix}`;
        }
        return line; // Return original line if no match
    });

    const modifiedAddressBlock = modifiedLines.join('\n');

    // 5. Combine and return
    return `${nameData}\ntelefone: ${phoneNumber}\n${modifiedAddressBlock}`;
}

export { generateRandomPhoneNumber, generateFullDataPackage };

// --- End New Wizard Functions ---

// --- Ball Management Functions ---

function checkPassword() {
    const pass = prompt("Para esta ação, por favor, digite a senha:");
    if (pass === '019026') {
        return true;
    } else if (pass !== null) { // User didn't click cancel
        alert("Senha incorreta.");
    }
    return false;
}

export function handleBallAction(action, key) {
    // Password check is now inside each case that needs it
    switch (action) {
        case 'edit':
            {
                if (!checkPassword()) return;
                window.saveHistoryState();
                const currentAddress = addresses[key];
                const newAddress = prompt(`Editando endereço para a bolinha "${key}":`, currentAddress);

                if (newAddress === null) {
                    // User cancelled, do nothing.
                    return;
                }

                if (newAddress.trim() === '') {
                    alert('O endereço não pode ser vazio. A edição foi cancelada.');
                    return;
                }

                addresses[key] = newAddress;
                alert(`Bolinha "${key}" atualizada com sucesso!`);
                saveState();
            }
            break;
        case 'reorder':
            {
                if (!checkPassword()) return;
                startReorderMode(key);
            }
            break;
        case 'editIcon':
            {
                if (!checkPassword()) return;
                // This case is only for black balls, so ballMeta[key] should exist
                if (ballMeta[key]) {
                    showEmojiPicker().then(emoji => {
                        if (emoji) {
                            window.saveHistoryState();
                            ballMeta[key].display = emoji;
                            ballMeta[key].title = `Endereço ${emoji}`;
                            saveState();
                            createBalls(); // Re-render to show new icon
                            updateRobotSequence(); // Update robot panel as well
                            alert('Ícone atualizado com sucesso!');
                        }
                    });
                }
            }
            break;
        case 'lock':
            if (!checkPassword()) return;
            window.saveHistoryState();
            if (!lockedBalls.includes(key)) {
                lockedBalls.push(key);
            }
            break;
        case 'unlock':
            if (!checkPassword()) return;
            window.saveHistoryState();
            lockedBalls = lockedBalls.filter(k => k !== key);
            break;
        case 'delete':
            if (!checkPassword()) return;
            if (confirm(`Tem certeza que deseja excluir permanentemente o endereço "${key}"?`)) {
                window.saveHistoryState();
                delete addresses[key];
                if (ballMeta[key]) delete ballMeta[key];
                lockedBalls = lockedBalls.filter(k => k !== key);
                addressOrder = addressOrder.filter(k => k !== key); // Also remove from order
            } else {
                return; // Do not save or refresh if user cancels
            }
            break;
        default:
            return;
    }
    // Only save and re-render if it's not an action that handles it internally
    if (action !== 'reorder') {
        saveState();
        createBalls();
        updateRobotSequence();
        updateWizardSequence();
    }
}

async function handleAddNewBall() {
    if (!checkPassword()) return;
    
    window.saveHistoryState();

    const color = prompt("Qual a cor da nova bolinha?\n(Digite 'azul' ou 'preta')")?.toLowerCase();

    let newKey, newBallMeta = {};

    if (color === 'azul') {
        newKey = prompt("Digite o número para a nova bolinha azul:");
        if (!newKey || !/^\d+$/.test(newKey) || addresses[newKey]) {
            alert("Número inválido ou já existente.");
            return;
        }
    } else if (color === 'preta') {
        const display = await showEmojiPicker(); // Use the new emoji picker
        if (!display) {
            alert("Nenhum emoji selecionado. A operação foi cancelada.");
            return;
        }
        // Generate a unique key for custom balls
        let i = 1;
        while (addresses[`c${i}`] || ballMeta[`c${i}`]) { i++; }
        newKey = `c${i}`;
        newBallMeta = { display, title: `Endereço ${display}` };

    } else {
        alert("Cor inválida. A operação foi cancelada.");
        return;
    }

    const addressText = prompt(`Cole o texto completo do endereço para a nova bolinha "${newKey}":`);
    if (addressText === null || addressText.trim() === '') {
        alert("O texto do endereço não pode ser vazio. A operação foi cancelada.");
        return;
    }

    addresses[newKey] = addressText;
    // Add the new key to the end of its color group in the order array
    if (color === 'azul') {
        const lastBlueIndex = addressOrder.map(k => /^\d+$/.test(k)).lastIndexOf(true);
        addressOrder.splice(lastBlueIndex + 1, 0, newKey);
    } else { // black
        addressOrder.push(newKey); // Black balls are always after blue
    }

    if (Object.keys(newBallMeta).length > 0) {
        ballMeta[newKey] = newBallMeta;
    }

    alert(`Bolinha "${newKey}" adicionada com sucesso!`);
    saveState();
    createBalls();
    updateRobotSequence();
}

// --- Reordering Logic ---
function startReorderMode(key) {
    const container = document.querySelector('#balls-content-container');
    if (!container || sortableInstance) return;

    // Add a class to the relevant balls to make them pulse
    const isBlueGroup = /^\d+$/.test(key);
    container.querySelectorAll('.ball[data-key]').forEach(ballEl => {
        const ballKey = ballEl.dataset.key;
        const isBallBlue = /^\d+$/.test(ballKey);

        if (isBlueGroup === isBallBlue) {
            ballEl.classList.add('reorder-active');
        }
    });

    // Show finish button
    document.getElementById('reorder-controls').style.display = 'block';

    sortableInstance = new Sortable(container, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: () => {
            // We will handle saving the order when the "Finish" button is clicked.
        }
    });
}

function finishReorderMode() {
    if (!sortableInstance) return;

    window.saveHistoryState();

    const container = document.querySelector('#balls-content-container');

    // Get the new visual order from the DOM
    const newOrder = Array.from(container.querySelectorAll('.ball[data-key]')).map(b => b.dataset.key);

    // Enforce the "blue first, then black" rule by re-sorting the new order
    newOrder.sort((a, b) => {
        const aIsBlue = /^\d+$/.test(a);
        const bIsBlue = /^\d+$/.test(b);
        if (aIsBlue && !bIsBlue) return -1; // a (blue) comes before b (black)
        if (!aIsBlue && bIsBlue) return 1;  // b (blue) comes before a (black)
        return 0; // Keep original relative order for same-color balls
    });

    addressOrder = newOrder;

    saveState();

    sortableInstance.destroy();
    sortableInstance = null;

    // Remove classes and hide button
    document.getElementById('reorder-controls').style.display = 'none';
    container.querySelectorAll('.ball.reorder-active').forEach(ballEl => {
        ballEl.classList.remove('reorder-active');
    });

    // Re-render everything to reflect the enforced sort order and remove SortableJS artifacts
    createBalls();
    updateRobotSequence();
}

export function populateAndGenerate(ballNumber) {
    // Do nothing if reorder is active
    if(sortableInstance) return;
    
    const addressText = addresses[ballNumber];
    if (addressText) {
        document.getElementById('originalText').value = addressText;
        generateVariations(); 
    } else {
        alert('Endereço para a bola ' + ballNumber + ' não encontrado.');
    }
}

// --- Emoji Picker Function ---
function showEmojiPicker() {
    return new Promise((resolve) => {
        const modal = document.getElementById('emoji-picker-modal');
        const picker = modal.querySelector('emoji-picker');
        const closeBtn = modal.querySelector('.emoji-close');
        
        if (!modal || !picker || !closeBtn) {
            console.error('Emoji picker modal elements not found!');
            resolve(null);
            return;
        }

        // Apply theme to picker
        if (document.body.classList.contains('dark-theme')) {
            picker.classList.add('dark');
        } else {
            picker.classList.remove('dark');
        }

        // Function to close and clean up all listeners
        const closeModal = (resolvedValue = null) => {
            modal.style.display = 'none';
            picker.removeEventListener('emoji-click', handleEmojiClick);
            closeBtn.removeEventListener('click', handleCloseClick);
            window.removeEventListener('click', handleOutsideClick);
            resolve(resolvedValue);
        };

        const handleEmojiClick = (event) => {
            closeModal(event.detail.unicode);
        };

        const handleCloseClick = () => {
            closeModal(null);
        };

        const handleOutsideClick = (event) => {
            if (event.target === modal) {
                closeModal(null);
            }
        };

        // Attach fresh listeners
        picker.addEventListener('emoji-click', handleEmojiClick, { once: true });
        closeBtn.addEventListener('click', handleCloseClick, { once: true });
        window.addEventListener('click', handleOutsideClick);

        modal.style.display = 'flex';
    });
}

// --- Robot Sequencer Functions ---

function updateRobotDisplay() {
    const ballDisplay = document.getElementById('robot-ball-display');
    if (robotSequence.length > 0) {
        const currentBallKey = robotSequence[currentRobotIndex];
        const displayContent = ballMeta[currentBallKey]?.display || currentBallKey;
        ballDisplay.textContent = displayContent;
        ballDisplay.title = ballMeta[currentBallKey]?.title || `Clique para copiar dados da bolinha ${currentBallKey}`;

        // Update the highlight in the selector panel
        const selectorBalls = document.querySelectorAll('#robot-ball-selector .selector-ball');
        selectorBalls.forEach((ball, index) => {
            if (index === currentRobotIndex) {
                ball.classList.add('selected');
            } else {
                ball.classList.remove('selected');
            }
        });

    } else {
        ballDisplay.textContent = 'X';
        ballDisplay.title = 'Nenhuma bolinha válida encontrada';
    }
}

function populateBallSelector() {
    const selectorContainer = document.getElementById('robot-ball-selector');
    if (!selectorContainer) return;

    selectorContainer.innerHTML = ''; // Clear previous content

    if (robotSequence.length === 0) {
        selectorContainer.innerHTML = `<span class="no-balls-message">Nenhuma bolinha ${robotViewMode === 'blue' ? 'azul' : 'preta'} disponível.</span>`;
        return;
    }

    robotSequence.forEach((ballKey, index) => {
        const selectorBall = document.createElement('div');
        selectorBall.classList.add('selector-ball');
        // Use emoji/display text if available, otherwise the key
        const displayContent = ballMeta[ballKey]?.display || ballKey;
        selectorBall.textContent = displayContent;
        selectorBall.title = ballMeta[ballKey]?.title || `Endereço ${ballKey}`;

        selectorBall.dataset.index = index; // Store index for easy lookup

        selectorBall.addEventListener('click', () => {
            currentRobotIndex = index; // Set the main index
            updateRobotDisplay(); // Update main display and highlights
        });

        selectorContainer.appendChild(selectorBall);
    });
}

// --- New Wizard UI Functions ---

function updateWizardDisplay() {
    const ballDisplay = document.getElementById('wizard-ball-display');
    if (wizardSequence.length > 0) {
        const currentBallKey = wizardSequence[currentWizardIndex];
        const displayContent = ballMeta[currentBallKey]?.display || currentBallKey;
        ballDisplay.textContent = displayContent;
        ballDisplay.title = ballMeta[currentBallKey]?.title || `Clique para copiar dados da bolinha ${currentBallKey}`;

        const selectorBalls = document.querySelectorAll('#wizard-ball-selector .selector-ball');
        selectorBalls.forEach((ball, index) => {
            ball.classList.toggle('selected', index === currentWizardIndex);
        });
    } else {
        ballDisplay.textContent = 'X';
        ballDisplay.title = 'Nenhuma bolinha válida encontrada';
    }
}

function populateWizardBallSelector() {
    const selectorContainer = document.getElementById('wizard-ball-selector');
    if (!selectorContainer) return;

    selectorContainer.innerHTML = '';

    if (wizardSequence.length === 0) {
        selectorContainer.innerHTML = `<span class="no-balls-message">Nenhuma bolinha ${wizardViewMode === 'blue' ? 'azul' : 'preta'} disponível.</span>`;
        return;
    }

    wizardSequence.forEach((ballKey, index) => {
        const selectorBall = document.createElement('div');
        selectorBall.className = 'selector-ball';
        selectorBall.textContent = ballMeta[ballKey]?.display || ballKey;
        selectorBall.title = ballMeta[ballKey]?.title || `Endereço ${ballKey}`;
        selectorBall.dataset.index = index;

        selectorBall.addEventListener('click', () => {
            currentWizardIndex = index;
            updateWizardDisplay();
        });
        selectorContainer.appendChild(selectorBall);
    });
}

function updateWizardSequence() {
    const allKeys = addressOrder.length > 0 ? addressOrder : Object.keys(addresses);

    if (wizardViewMode === 'blue') {
        wizardSequence = allKeys.filter(key => /^\d+$/.test(key) && !lockedBalls.includes(key));
    } else { // 'black' mode
        wizardSequence = allKeys.filter(key => !/^\d+$/.test(key) && !lockedBalls.includes(key));
    }
    currentWizardIndex = 0;
    populateWizardBallSelector();
    updateWizardDisplay();
}

async function handleWizardBallClick() {
    if (wizardSequence.length === 0) return;
    const feedbackDiv = document.getElementById('robot-feedback'); // Reuse feedback div
    const ballDisplay = document.getElementById('wizard-ball-display');
    const currentBallKey = wizardSequence[currentWizardIndex];

    const combinedText = await generateWizardDataPackage(currentBallKey);

    if (!combinedText) {
        alert('Falha ao gerar pacote de dados do Mago. Verifique o console para erros.');
        feedbackDiv.textContent = `Falha ao gerar dados da bolinha ${currentBallKey}.`;
        feedbackDiv.style.borderColor = 'red';
        feedbackDiv.style.display = 'block';
        return;
    }

    try {
        await navigator.clipboard.writeText(combinedText);
        feedbackDiv.textContent = `Mago copiou! Bolinha: ${currentBallKey}`;
        feedbackDiv.style.borderColor = '#9C27B0';
        feedbackDiv.style.backgroundColor = '#f3e5f5';
        feedbackDiv.style.display = 'block';

        const originalText = ballDisplay.textContent;
        ballDisplay.textContent = 'OK!';
        setTimeout(() => {
            ballDisplay.textContent = originalText;
            feedbackDiv.style.display = 'none';
        }, 1500);
    } catch (err) {
        console.error('Falha ao copiar dados do Mago:', err);
        feedbackDiv.textContent = `Falha ao copiar dados da bolinha ${currentBallKey}.`;
        feedbackDiv.style.borderColor = 'red';
        feedbackDiv.style.display = 'block';
    }
}

// --- Initialization ---
export function initAddressGenerator() {
    loadState(); // Load addresses and states from localStorage
    createBalls(); 
    initPrefixControls(); // New function call

    const killBtn = document.getElementById('kill-mode-btn');
    if (killBtn) {
        if (killModeActive) {
            killBtn.classList.add('active');
        }
        killBtn.addEventListener('click', () => {
            if (checkPassword()) {
                killModeActive = !killModeActive;
                if(killModeActive) {
                    alert('KILL MODE ATIVADO. As variações agora serão... mais criativas.');
                    killBtn.classList.add('active');
                } else {
                    alert('KILL MODE DESATIVADO. Variações voltarão ao normal.');
                    killBtn.classList.remove('active');
                }
                saveState();
            }
        });
    }

    const cyborgBtn = document.getElementById('cyborg-mode-btn');
    if (cyborgBtn) {
        if (cyborgModeActive) {
            cyborgBtn.classList.add('active');
        }
        cyborgBtn.addEventListener('click', () => {
            cyborgModeActive = !cyborgModeActive;
            if (cyborgModeActive) {
                alert('Modo Ciborgue ATIVADO. Copiar irá gerar um bloco de dados completo.');
                cyborgBtn.classList.add('active');
            } else {
                alert('Modo Ciborgue DESATIVADO.');
                cyborgBtn.classList.remove('active');
            }
            saveState();
        });
    }

    const titleElement = document.getElementById('address-generator-title');
    if (titleElement) {
        titleElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (checkPassword()) {
                window.saveHistoryState();
                const newTitle = prompt('Digite o novo título:', addressGeneratorTitle);
                if (newTitle && newTitle.trim() !== '') {
                    addressGeneratorTitle = newTitle.trim();
                    titleElement.textContent = addressGeneratorTitle;
                    saveState();
                    alert('Título atualizado com sucesso!');
                } else if (newTitle !== null) {
                    alert('O título não pode ser vazio.');
                }
            }
        });
    }

    const originalTextArea = document.getElementById('originalText');
    const countInput = document.getElementById('count');

    if (originalTextArea) {
        originalTextArea.addEventListener('keypress', function(event) {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            generateVariations();
          }
        });
    }

    if (countInput) {
        countInput.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
            generateVariations();
          }
        });
    }

    // Init Robot Sequencer
    const robotToggle = document.getElementById('robot-toggle');
    const robotSequencer = document.getElementById('robot-sequencer');
    const robotNextBtn = document.getElementById('robot-next-btn');

    // New Wizard Sequencer elements
    const wizardToggle = document.getElementById('wizard-toggle');
    const wizardSequencer = document.getElementById('wizard-sequencer');
    const wizardNextBtn = document.getElementById('wizard-next-btn');
    const batchControls = document.getElementById('batch-generate-controls');

    if (robotToggle) {
        robotToggle.addEventListener('click', () => {
            const isVisible = robotSequencer.style.display !== 'none';
            robotSequencer.style.display = isVisible ? 'none' : 'flex';
            batchControls.style.display = isVisible ? 'none' : 'block';
            // Hide wizard if opening robot
            if (!isVisible) wizardSequencer.style.display = 'none';
        });
        // Hide batch button initially
        batchControls.style.display = 'none';
    }

    if (wizardToggle) {
        wizardToggle.addEventListener('click', () => {
            const isVisible = wizardSequencer.style.display !== 'none';
            wizardSequencer.style.display = isVisible ? 'none' : 'flex';
             // Hide robot and batch controls if opening wizard
            if (!isVisible) {
                robotSequencer.style.display = 'none';
                batchControls.style.display = 'none';
            }
        });
    }

    // --- New Robot Filter Logic ---
    const filterBlueBtn = document.getElementById('filter-blue');
    const filterBlackBtn = document.getElementById('filter-black');

    const handleFilterClick = (view) => {
        if (robotViewMode === view) return; // Do nothing if already active

        robotViewMode = view;
        // Update active class on filter buttons
        filterBlueBtn.classList.toggle('active', view === 'blue');
        filterBlackBtn.classList.toggle('active', view === 'black');
        // Re-generate the sequence and update UI
        updateRobotSequence();
    };

    if (filterBlueBtn) {
        filterBlueBtn.addEventListener('click', () => handleFilterClick('blue'));
    }
    if (filterBlackBtn) {
        filterBlackBtn.addEventListener('click', () => handleFilterClick('black'));
    }
    // --- End New Robot Filter Logic ---

    if (robotNextBtn) {
        robotNextBtn.addEventListener('click', () => {
            if (robotSequence.length > 0) {
                currentRobotIndex = (currentRobotIndex + 1) % robotSequence.length;
                updateRobotDisplay();
            }
        });
    }

    // --- New Wizard Filter & Button Logic ---
    const filterBlueWizardBtn = document.getElementById('filter-blue-wizard');
    const filterBlackWizardBtn = document.getElementById('filter-black-wizard');

    const handleWizardFilterClick = (view) => {
        if (wizardViewMode === view) return;
        wizardViewMode = view;
        filterBlueWizardBtn.classList.toggle('active', view === 'blue');
        filterBlackWizardBtn.classList.toggle('active', view === 'black');
        updateWizardSequence();
    };

    if (filterBlueWizardBtn) {
        filterBlueWizardBtn.addEventListener('click', () => handleWizardFilterClick('blue'));
    }
    if (filterBlackWizardBtn) {
        filterBlackWizardBtn.addEventListener('click', () => handleWizardFilterClick('black'));
    }

    if (wizardNextBtn) {
        wizardNextBtn.addEventListener('click', () => {
            if (wizardSequence.length > 0) {
                currentWizardIndex = (currentWizardIndex + 1) % wizardSequence.length;
                updateWizardDisplay();
            }
        });
    }

    // Populate the new selector panel and set initial state
    updateRobotSequence();
    updateWizardSequence();

    // Attach listener for finish reorder button
    const finishBtn = document.getElementById('finish-reorder-btn');
    if (finishBtn) {
        finishBtn.addEventListener('click', finishReorderMode);
    }

    // Attach click listener to the main robot ball display
    const robotBallDisplay = document.getElementById('robot-ball-display');
    if (robotBallDisplay) {
        robotBallDisplay.addEventListener('click', handleRobotBallClick);
    }
    
    // New: Attach listener for wizard ball display
    const wizardBallDisplay = document.getElementById('wizard-ball-display');
    if (wizardBallDisplay) {
        wizardBallDisplay.addEventListener('click', handleWizardBallClick);
    }

    // --- Batch Generator Init ---
    const batchModal = document.getElementById('batch-generator-modal');
    const batchOpenBtn = document.getElementById('batch-generate-btn');
    const batchCloseBtn = document.querySelector('.close-button.batch-close');
    const batchCopyBtn = document.getElementById('batch-copy-btn');
    
    if (batchOpenBtn) {
        batchOpenBtn.addEventListener('click', openBatchGenerator);
    }
    if (batchCloseBtn) {
        batchCloseBtn.addEventListener('click', () => batchModal.style.display = 'none');
    }
    window.addEventListener('click', (event) => {
        if (event.target == batchModal) {
            batchModal.style.display = 'none';
        }
    });
    if (batchCopyBtn) {
        batchCopyBtn.addEventListener('click', handleBatchCopy);
    }
    setupBatchQuickSelect();
}

function initPrefixControls() {
    const prefixToggle = document.getElementById('prefix-toggle-checkbox');
    const cleanStreetToggle = document.getElementById('clean-street-toggle-checkbox');
    const prefixMenuBtn = document.getElementById('prefix-menu-btn');
    const prefixModal = document.getElementById('prefix-menu-modal');
    const prefixModalClose = document.querySelector('.prefix-menu-close');
    const englishToggle = document.getElementById('prefix-english-checkbox');

    // 1. Set initial state for toggles
    if (prefixToggle) prefixToggle.checked = usePrefixes;
    if (cleanStreetToggle) cleanStreetToggle.checked = useCleanStreet;
    if (englishToggle) englishToggle.checked = useEnglishPrefixes;

    // 2. Populate Modal
    populatePrefixModal();

    // 3. Add Event Listeners
    if (prefixToggle) {
        prefixToggle.addEventListener('change', () => {
            usePrefixes = prefixToggle.checked;
            saveState();
        });
    }

    if (cleanStreetToggle) {
        cleanStreetToggle.addEventListener('change', () => {
            useCleanStreet = cleanStreetToggle.checked;
            saveState();
        });
    }

    if (prefixMenuBtn) {
        prefixMenuBtn.addEventListener('click', () => {
            if (prefixModal) prefixModal.style.display = 'flex';
        });
    }

    const closeModal = () => {
        if (prefixModal) prefixModal.style.display = 'none';
    };

    if (prefixModalClose) {
        prefixModalClose.addEventListener('click', closeModal);
    }
    window.addEventListener('click', (event) => {
        if (event.target === prefixModal) {
            closeModal();
        }
    });

    if (englishToggle) {
        englishToggle.addEventListener('change', () => {
            useEnglishPrefixes = englishToggle.checked;
            saveState();
        });
    }
}

function populatePrefixModal() {
    const modalBody = document.getElementById('prefix-modal-body');
    if (!modalBody) return;

    // Create a document fragment to build the list before appending to the DOM
    const fragment = document.createDocumentFragment();

    Object.keys(prefixCategories).forEach(key => {
        const category = prefixCategories[key];
        const isChecked = selectedPrefixCategories.includes(key);

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'prefix-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `prefix-cat-${key}`;
        checkbox.dataset.categoryKey = key;
        checkbox.checked = isChecked;

        const label = document.createElement('label');
        label.htmlFor = `prefix-cat-${key}`;
        label.innerHTML = `<span>${category.emoji}</span> ${category.title}`;

        categoryDiv.appendChild(checkbox);
        categoryDiv.appendChild(label);
        fragment.appendChild(categoryDiv);

        // Add listener
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (!selectedPrefixCategories.includes(key)) {
                    selectedPrefixCategories.push(key);
                }
            } else {
                selectedPrefixCategories = selectedPrefixCategories.filter(cat => cat !== key);
            }
            saveState();
        });
    });

    // Prepend the categories before the HR element
    const hrElement = modalBody.querySelector('hr');
    if (hrElement) {
        modalBody.insertBefore(fragment, hrElement);
    } else {
        modalBody.appendChild(fragment);
    }
}

function openBatchGenerator() {
    const modal = document.getElementById('batch-generator-modal');
    const listContainer = document.getElementById('batch-ball-list-container');
    if (!modal || !listContainer) return;

    listContainer.innerHTML = ''; // Clear previous list

    const allUnlockedBalls = Object.keys(addresses).filter(key => !lockedBalls.includes(key));
    
    // Sort them: blue (numeric) first, then black (non-numeric)
    allUnlockedBalls.sort((a, b) => {
        const aIsNum = /^\d+$/.test(a);
        const bIsNum = /^\d+$/.test(b);
        if (aIsNum && !bIsNum) return -1;
        if (!aIsNum && bIsNum) return 1;
        if (aIsNum && bIsNum) return Number(a) - Number(b);
        return a.localeCompare(b);
    });

    if (allUnlockedBalls.length === 0) {
        listContainer.innerHTML = '<p>Nenhuma bolinha desbloqueada disponível.</p>';
    } else {
        allUnlockedBalls.forEach(key => {
            const isBlue = /^\d+$/.test(key);
            const item = document.createElement('div');
            item.className = 'batch-ball-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `batch-ball-${key}`;
            checkbox.value = key;
            checkbox.dataset.color = isBlue ? 'blue' : 'black';

            const label = document.createElement('label');
            label.htmlFor = `batch-ball-${key}`;
            const displayContent = ballMeta[key]?.display || key;
            label.textContent = displayContent;

            item.appendChild(checkbox);
            item.appendChild(label);
            listContainer.appendChild(item);
        });
    }

    modal.style.display = 'flex';
}

function setupBatchQuickSelect() {
    document.getElementById('batch-select-all')?.addEventListener('click', () => {
        document.querySelectorAll('#batch-ball-list-container input[type="checkbox"]').forEach(cb => cb.checked = true);
    });
    document.getElementById('batch-select-blue')?.addEventListener('click', () => {
        document.querySelectorAll('#batch-ball-list-container input[type="checkbox"]').forEach(cb => {
            cb.checked = cb.dataset.color === 'blue';
        });
    });
     document.getElementById('batch-select-black')?.addEventListener('click', () => {
        document.querySelectorAll('#batch-ball-list-container input[type="checkbox"]').forEach(cb => {
            cb.checked = cb.dataset.color === 'black';
        });
    });
    document.getElementById('batch-select-none')?.addEventListener('click', () => {
        document.querySelectorAll('#batch-ball-list-container input[type="checkbox"]').forEach(cb => cb.checked = false);
    });
}

async function handleBatchCopy() {
    const quantityInput = document.getElementById('batch-quantity');
    const copyBtn = document.getElementById('batch-copy-btn');
    const feedbackP = document.getElementById('batch-feedback');

    const quantity = parseInt(quantityInput.value, 10);
    const selectedCheckboxes = Array.from(document.querySelectorAll('#batch-ball-list-container input:checked'));
    const selectedBallKeys = selectedCheckboxes.map(cb => cb.value);

    if (isNaN(quantity) || quantity < 1) {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }
    if (selectedBallKeys.length === 0) {
        alert('Por favor, selecione pelo menos uma bolinha.');
        return;
    }

    copyBtn.disabled = true;
    feedbackP.textContent = 'Gerando...';

    const allGeneratedData = [];
    let failures = 0;

    for (let i = 0; i < quantity; i++) {
        // Pick a random ball from the selected list for each iteration
        const randomBallKey = selectedBallKeys[Math.floor(Math.random() * selectedBallKeys.length)];
        const dataPackage = await generateFullDataPackage(randomBallKey);
        
        if (dataPackage) {
            allGeneratedData.push(dataPackage);
        } else {
            failures++;
        }
    }

    if (allGeneratedData.length > 0) {
        const finalText = allGeneratedData.join('\n\n========================================\n\n');
        try {
            await navigator.clipboard.writeText(finalText);
            feedbackP.textContent = `${allGeneratedData.length} variações geradas e copiadas!`;
            if (failures > 0) {
                 feedbackP.textContent += ` (${failures} falhas)`;
            }
        } catch (err) {
            console.error('Failed to copy batch data:', err);
            feedbackP.textContent = 'Falha ao copiar para a área de transferência.';
        }
    } else {
        feedbackP.textContent = 'Nenhuma variação pôde ser gerada.';
    }

    setTimeout(() => {
        copyBtn.disabled = false;
        feedbackP.textContent = '';
    }, 3000);
}